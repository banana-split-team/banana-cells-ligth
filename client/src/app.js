(function(window) {
    var ROUTER_HOOKS = getRouterHooks();
    var ROUTES = getRoutes();
    var DEFAULT_ROUTE = ROUTES[0].name;
  
    Cells.config({
      pageRender: {
        mainNode: '#app__container',
        componentPath: '/src/pages',
        progressive: false,
        maxSimultaneousPages: 6
      },
      router: {
        routes: ROUTES,
        defaultRoute: DEFAULT_ROUTE,
        hooks: ROUTER_HOOKS
      }
    });
  
    function getRouterHooks() {
      var transitionChannel = Cells.Bus.channel('transition');
      var pageTitleChannel = Cells.Bus.channel('page_title');
      var errorChannel = Cells.Bus.channel('error');
  
      return {
        onTransitionStart: function(toState, fromState) {
          transitionChannel.publish('onTransitionStart');
          pageTitleChannel.publish('Starting Transitioning to...' + toState.name);
        },
        onTransitionActivate: function(toState, fromState) {
          transitionChannel.publish('onTransitionActivate');
          pageTitleChannel.publish('Activating transition to...' + toState.name);
  
          return Promise.resolve({});
        },
        onTransitionResolve: function(toState, fromState) {
          transitionChannel.publish('onTransitionResolve');
          pageTitleChannel.publish('Resolving transition to...' + toState.name);
  
          return Promise.resolve({});
        },
        onTransitionCancel: function(toState, fromState) {
          transitionChannel.publish('onTransitionCancel');
        },
        onTransitionError: function(toState, fromState, err) {
          transitionChannel.publish('onTransitionError');
  
          if (err.description) {
            errorChannel.publish(err.description);
          }
        },
        onTransitionSuccess: function(toState, fromState) {
          transitionChannel.publish('onTransitionSuccess');
          pageTitleChannel.publish(toState.name);
        }
      };
    }
  
    function getRoutes() {
      var ROUTE_HOOKS = getRouteHooks();
      var productsOnResolveHook = function(toState, fromState) {
        return new Promise((resolve, reject) => {
          setTimeout(() => resolve({}), 2500);
        });
      };
  
      return [
        createRoute('eventos', '/', {}, {}),
        createRoute('detalle', '/detalle/:evento-id', {}, ROUTE_HOOKS),
        createRoute('teatroscercanos', '/teatroscercanos', {}, ROUTE_HOOKS),
        createRoute('about', '/about', {private: true}, ROUTE_HOOKS),
        createRoute('products', '/products', {}, { onResolve: productsOnResolveHook }),
        createRoute('products.accounts', '/accounts', {}, {}),
      ];
    }
  
    function getRouteHooks() {
      return {
        onActivate: function(toState, fromState, done) {
          var route = ROUTES.find(route => route.name === toState.name);
          var private = isPrivateRoute(route);
          var userLogged = isUserLogged();
  
          return new Promise((resolve, reject) => {
            (!private || private && userLogged) ? resolve() : reject({description: 'You are trying to access a private page.'});
          });
        },
        onResolve: function(toState, fromState, done) {
          return Promise.resolve({timestamp: new Date().toString()});
        }
      };
    }
  
    function createRoute(name, path, data, hooks) {
      return Object.assign({ name, path, data }, hooks);
    }
  
    function isPrivateRoute(state) {
      return state && state.data && state.data.private || false;
    }
  
    function isUserLogged() {
      var isLoggedValue = window.sessionStorage.getItem('isLogged') === "true" || false;
  
      return isLoggedValue;
    }
  }(window));