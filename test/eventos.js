'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var server = require('../server/server.js');
var should = chai.should();

describe('Consulta lista completa de eventos', function() {
  it('Devuelve la lista completa de eventos', function() {
    chai.request(server)
      .get('/api/Eventos')
      .end(function(err, res) {
        err.should.be.null();
        res.should.have.status(200);
        res.body.SUCCESS.should.be.json();
        res.body.SUCCESS.should.have.property('nombre');
        res.body.SUCCESS.should.have.property('director');
        res.body.SUCCESS.should.have.property('precios');
        res.body.SUCCESS.should.have.property('funciones');
        res.body.SUCCESS.should.have.property('sinopsis');
        res.body.SUCCESS.should.have.property('teatroId');
      });
  });
});
