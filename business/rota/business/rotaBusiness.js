'use strict';

var db = require('../repository/pgPromisse').db;

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

function obterRota(req, res, next) {
    var rotaId = parseInt(req.params.rotaId);




    db.one('select * from public.rota where id = $1', rotaId)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Obtido Uma Rota'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function inserirRota(req, res, next) {
    req.body.age = parseInt(req.body.age);
    db.none('insert into public.rota(numero, data)' +
        'values(${numero}, ${data})',
        req.body)
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Inserido  uma rota'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

//function updatePuppy(req, res, next) {
//    db.none('update pups set name=$1, breed=$2, age=$3, sex=$4 where id=$5',
//        [req.body.name, req.body.breed, parseInt(req.body.age),
//        req.body.sex, parseInt(req.params.id)])
//        .then(function () {
//            res.status(200)
//                .json({
//                    status: 'success',
//                    message: 'Updated puppy'
//                });
//        })
//        .catch(function (err) {
//            return next(err);
//        });
//}

//function removePuppy(req, res, next) {
//    var pupID = parseInt(req.params.id);
//    db.result('delete from pups where id = $1', pupID)
//        .then(function (result) {
//            /* jshint ignore:start */
//            res.status(200)
//                .json({
//                    status: 'success',
//                    message: `Removed ${result.rowCount} puppy`
//                });
//            /* jshint ignore:end */
//        })
//        .catch(function (err) {
//            return next(err);
//        });
//}

module.exports = {
    listarRota: listarRota,
    obterRota: obterRota,
    inserirRota: inserirRota,
};