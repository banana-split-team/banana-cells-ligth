'use strict';

module.exports = function(Evento) {
  // Ante la creacion/modificacion de descuentos.
  var app = require('../../server/server');
  Evento.on('changed', function(dataEvento) {
    let suscripcion = app.models.suscripcion;
    let notificacion = app.models.notificacion;
    console.log(dataEvento);
    suscripcion.scope('suscripcionAlEvento'
    , {where: {eventoId: dataEvento.id}});
    suscripcion.suscripcionAlEvento(function(err, dataSuscripciones) {
      dataSuscripciones.forEach(function(dataSuscripcion) {
        console.log(JSON.stringify(dataSuscripcion));
        // ACA CREAMOS LA NOTIFICACION!
        let aviso = {
          'tipo': 'mail',
          'texto': 'Hoy novedades sobre el evento ' + dataEvento.nombre,
          'mail': dataSuscripcion.email,
          'link': process.env.CHIKETTO_CLIENT_URL + 'detalle/' +
            dataSuscripcion.eventoId};
        notificacion.create(aviso);
      });
    });
  });
};
