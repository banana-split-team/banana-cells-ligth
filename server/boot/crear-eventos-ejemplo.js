'use strict';

module.exports = function(app) {
  // data sources
  var db = app.dataSources.db;

  db.automigrate(['Evento', 'Teatro'], function(err) {
    if (err) throw err;
    var Teatro = app.models.Teatro;
    var Evento = app.models.Evento;
    const teatros = [
      {
        'nombre': 'SAN MARTIN',
        'direccion': 'CORRIENTES AV. 1530',
        'geolocalizacion': {
          'lat': -58.38864181184383,
          'lng': -34.604238054156944,
        },
        'id': 1,
      },
    ];
    var resultadoTeatros = Teatro.create(teatros, function(err) {
      if (err) throw err;
      console.log('Modelos creados: Teatro');
    });
    const eventos = [
      {
        'nombre': 'El fantasma de la Opera',
        'director': 'Pepe Cibrian',
        'precios': [
          150,
        ],
        'funciones': [
          '2017-10-26T21:30:00.000Z',
        ],
        'sinopsis': "El fantasma de la ópera (Le Fantôme de l'Opéra) es una...",
        'teatroId': resultadoTeatros[0].id,
      },
      {
        'nombre': 'LA FARSA DE LOS AUSENTES',
        'director': 'POMPEYO AUDIVERT',
        'precios': [
          200,
        ],
        'funciones': [
          '2017-10-26T22:30:00.000Z',
        ],
        'sinopsis': 'SOBRE LOS RESTOS DE UN PAISAJE NACIONAL DERRUMBADO',
        'teatroId': resultadoTeatros[0].id,
      },
    ];
    Evento.create(eventos, function(err) {
      if (err) throw err;
      console.log('Modelos creados: Evento');
    });
  });
};
