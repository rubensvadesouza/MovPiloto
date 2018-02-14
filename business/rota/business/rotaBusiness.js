'use strict';

var db = require('../repository/pgPromisse').db;

var paradaBus = require('./paradaBusiness');

var placaBus = require('./placaBusiness');

function listarRota(req, res, next) {
    db.any('select * from public.rota')
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Obtido todas as rotas'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function obterParadas(t, rotaId) {

    var sql = 'select p.id , p.nome , p.latitude , p.longitude from "public"."parada" p'
        + ' inner join "public"."rotaParada" rp on rp."idParada" = p."id"'
        + ' where rp."idRota" = $1';

    return t.many(sql, rotaId);
};

function obterRota(req, res, next) {
    var rotaId = parseInt(req.params.rotaId);
    var r;

    db.task(t => {
        return t.one('select * from public.rota where id = $1', rotaId)
            .then(rota => {
                r = rota;
                return obterParadas(t, rotaId);
            });
    })
        .then(paradas => {
            r.paradas = paradas;
            res.status(200)
                .json({
                    status: 'success',
                    data: r,
                    message: 'Obtido Uma Rota'
                });
        })
        .catch(error => {
            res.status(400)
                .json({
                    status: 'error',
                    message: 'Erro na rota'
                });
        });
}

//function obterRota(req, res, next) {
//    var rotaId = parseInt(req.params.rotaId);
//    var rota;
//    var rota = db.one('select * from public.rota where id = $1', rotaId).then(data => { rota = data; });
//    var paradas = obterParadas(rotaId).then(data => { return data });


//    res.status(200)
//        .json({
//            status: 'success',
//            data: data,
//            message: 'Obtido Uma Rota'
//        });
//}

function inserirRota(req, res, next) {
    db.any('insert into public.rota(numero, data)' + 'values($1, $2) RETURNING id', [req.body.numero, req.body.data])
        .then(data => {
            req.body.placas.forEach((placa, index) => {
                placaBus.inserirPlaca(data[0].id, placa);
            });

            req.body.paradas.forEach((parada, index) => {
                paradaBus.inserirParada(data[0].id, parada);
            });

            res.status(200)
                .json({
                    status: 'success',
                    message: 'Inserido  uma rota'
                });
        })
        .catch(function (err) {
            return next(err);
        });
};


module.exports = {
    listarRota: listarRota,
    obterRota: obterRota,
    inserirRota: inserirRota,
};