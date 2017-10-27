'use strict';

module.exports = function(MyModel) {
    // send an email
  console.log('entre a mail ');

  MyModel.sendEmail = function(db) {
      console.log('entre a sendmail ');
      MyModel.app.models.Email.send({
        to: 'reyayelen@gmail.com',
        from: 'chiketo.avisos@gmail.com',
        subject: 'my subject',
        text: 'my text',
        html: 'my <em>html</em>',
      }, function(err, mail) {
        console.log('email sent!');
        cb(err);
      });
    };

};
  module.exports(null);

