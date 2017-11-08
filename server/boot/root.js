'use strict';

module.exports = function(app) {
  app.get('/v*', function(req, res) {
    res.sendFile(app.get('indexFile'));
  });
  app.get('/view2', function(req, res) {
    res.sendFile(app.get('indexFile'));
  });
  app.get('/view3', function(req, res) {
    res.sendFile(app.get('indexFile'));
  });
  app.get('/', function(req, res) {
    res.sendFile(app.get('indexFile'));
  });
};
