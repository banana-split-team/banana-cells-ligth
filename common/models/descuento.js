'use strict';

module.exports = function(Descuento) {
  // Ante la creacion/modificacion de descuentos.
  var app = require('../../server/server');
  Descuento.on('changed', function(inst) {
    let Evento = app.models.Evento;
    let suscripcion = app.models.suscripcion;
    let notificacion = app.models.notificacion;
    console.log('inst: "' + JSON.stringify(inst) + '"');
    console.log('El descuento %s sufrio cambios.', inst.descripcion);
    Evento.scope('eventosConDescuento', {where: {_id: inst.eventoId}});
    Evento.eventosConDescuento(function(err, data) {
      console.log(JSON.stringify(data));
      suscripcion.scope('suscripcionAlEvento', {where: {eventoId: data._id}});
      suscripcion.suscripcionAlEvento(function(err, data) {
        console.log(JSON.stringify(data));
        // ACA CREAMOS LA NOTIFICACION!
        // notificacion.create({})
      });
      // console.log(JSON.stringify(Evento.nestRemoting('suscripcion')));
    });
    // => model with id 1 has been changed
  });
  // Ante la eliminación de descuentos.
  Descuento.on('deleted', function(inst) {
    console.log('El descuento %s ha sido dado de baja.', inst.descripcion);
    // => model with id 1 has been changed
  });
};
