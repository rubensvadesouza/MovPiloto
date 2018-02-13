'use strict';

const bus = require('../../business/rotaBusiness');

exports.listarRotas = function (req, res, next) {
    return bus.listarRota(req, res, next);
};

exports.incluirRota = function (req, res, next) {
    return bus.inserirRota.call(req, res, next);
};

exports.obterRota = function (req, res, next) {
    return bus.obterRota(req, res, next);
};


