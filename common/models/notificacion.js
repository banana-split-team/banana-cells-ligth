'use strict';

module.exports = function(Notificacion) {
    // send an email
  // Ante la creacion/modificacion de notificacion.
  Notificacion.on('changed', function(inst) {
    console.log('Envia notificacion.', inst);
    // => model with id 1 has been changed

    Notificacion.app.models.Email.send({
      to: inst.mail,
      from: 'chiketo.avisos@gmail.com',
      subject: 'Novedades Chiketto',
      // text: inst.texto,
      html: 'Tenemos novedades interesantes para vos!<br> Enterate <a href=' +
        inst.link + '>aquí</a>!'}
    , function(err, mail) {
      console.log('email sent!');
      console.log(process.env.CHIKETTO_CLIENT_URL);
    });
  });
};
