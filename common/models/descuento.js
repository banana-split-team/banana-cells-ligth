'use strict';

module.exports = function(Descuento) {
  // Ante la creacion/modificacion de descuentos.
  Descuento.on('changed', function(inst) {
    console.log('El descuento %s sufrio cambios.', inst.descripcion);
    // => model with id 1 has been changed
  });
  // Ante la eliminación de descuentos.
  Descuento.on('deleted', function(inst) {
    console.log('El descuento %s ha sido dado de baja.', inst.descripcion);
    // => model with id 1 has been changed
  });
};
