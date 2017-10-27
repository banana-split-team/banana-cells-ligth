'use strict';

module.exports = function(Notificacion) {
    // send an email
    console.log('entre a email ');

    Notificacion.sendEmail = function(cb) {
      console.log('entre a sendmail ');
            
      Notificacion.app.models.Email.send({
        to: 'reyayelen@gmail.com',
        from: 'chiketo.avisos@gmail.com',
        subject: 'my subject',
        text: 'my text',
        html: 'my <em>html</em>'
      }, function(err, mail) {
        console.log('email sent!');
        cb(err);
      });
    }
    //Notificacion.sendEmail(null);
  };
