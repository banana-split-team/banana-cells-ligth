'use strict';

module.exports = function(Descuento) {
  // Ante la creacion/modificacion de descuentos.
  var app = require('../../server/server');
  Descuento.on('changed', function(dataDescuento) {
    let Evento = app.models.Evento;
    let suscripcion = app.models.suscripcion;
    let notificacion = app.models.notificacion;
    console.log('inst: "' + JSON.stringify(dataDescuento) + '"');
    console.log('El descuento %s sufrio cambios.', dataDescuento.descripcion);
    Evento.scope('eventosConDescuento', {where: {_id: dataDescuento.eventoId}});
    Evento.eventosConDescuento(function(err, dataEventos) {
      console.log(JSON.stringify(dataEventos));
      dataEventos.forEach(function(dataEvento) {
        suscripcion.scope('suscripcionAlEvento'
        , {where: {eventoId: dataEvento._id}});
        suscripcion.suscripcionAlEvento(function(err, dataSuscripciones) {
          dataSuscripciones.forEach(function(dataSuscripcion) {
            console.log(JSON.stringify(dataSuscripcion));
            // ACA CREAMOS LA NOTIFICACION!
            let aviso = {
              'tipo': 'mail',
              'texto': 'Hoy novedades sobre el ' + dataDescuento.descripcion +
              ' del evento ' + dataEvento.nombre,
              'mail': dataSuscripcion.email};
            notificacion.create(aviso);
          });
        });
      });
    });
  });
  // Ante la eliminación de descuentos.
  /* Descuento.on('deleted', function(dataDescuento) {
    console.log('El descuento %s ha sido dado de baja.'
      , dataDescuento.descripcion);
    // => model with id 1 has been changed
    let Evento = app.models.Evento;
    let suscripcion = app.models.suscripcion;
    let notificacion = app.models.notificacion;
    console.log('inst: "' + JSON.stringify(dataDescuento) + '"');
    console.log('El descuento %s sufrio cambios.', dataDescuento.descripcion);
    Evento.scope('eventosConDescuento', {where: {_id: dataDescuento.eventoId}});
    Evento.eventosConDescuento(function(err, dataEventos) {
      console.log(JSON.stringify(dataEventos));
      dataEventos.forEach(function(dataEvento) {
        suscripcion.scope('suscripcionAlEvento'
        , {where: {eventoId: dataEvento._id}});
        suscripcion.suscripcionAlEvento(function(err, dataSuscripciones) {
          dataSuscripciones.forEach(function(dataSuscripcion) {
            console.log(JSON.stringify(dataSuscripcion));
            // ACA CREAMOS LA NOTIFICACION!
            let aviso = {
              'tipo': 'mail',
              'texto': 'Se cancelo el ' + dataDescuento.descripcion +
              ' del evento ' + dataEvento.nombre,
              'mail': dataSuscripcion.email};
            notificacion.create(aviso);
          });
        });
      });
      // console.log(JSON.stringify(Evento.nestRemoting('suscripcion')));
    });
  });
*/
};
