'use strict';

var db = require('../repository/pgPromisse').db;

function vincularParada(idRota, idParada) {
    db.none('INSERT INTO public."rotaParada"("idRota", "idParada") VALUES($1, $2)', [idRota, idParada])
        .catch(error => {
            console.log('ERROR:', error);
        });
};

module.exports.inserirParada =
    function (idRota, parada) {
        db.one('INSERT INTO public.parada(nome, latitude, longitude) VALUES($1, $2, $3) RETURNING id', [parada.nome, parada.latitude, parada.longitude])
            .then(data => {
                vincularParada(idRota, data.id);
            })
            .catch(error => {
                console.log('ERROR:', error);
            });
    };

