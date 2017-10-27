'use strict';

module.exports = function(Descuento) {
  Descuento.on('changed', function(inst) {
    console.log('Descuento with id %s has been changed', inst.id);
    // => model with id 1 has been changed
  });
};
