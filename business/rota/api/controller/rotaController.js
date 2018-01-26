'use strict';

var mongoose = require('mongoose'),
RotaModel = mongoose.model('Rota');


  exports.listarRotas = function(req, res) {
  RotaModel.find({}, function(err, rota) {
    if (err)
      res.send(err);
    res.json(rota);
  });
};


exports.incluirRota = function(req, res) {
  var rota = new RotaModel(req.body);
  rota.save(function(err, rota) {
    if (err)
      res.send(err);
    res.json(rota);
  });
};

exports.obterRota = function(req, res) {
  RotaModel.findById(req.params.rotaId, function(err, rota) {
    if (err)
      res.send(err);
    res.json(rota);
  });
};