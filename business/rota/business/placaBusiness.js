'use strict';

var db = require('../repository/pgPromisse').db;

function vincularPlaca(idRota, idPlaca) {
    db.none('INSERT INTO public.rotaplaca ("idRota", "idPlaca") VALUES($1, $2)', [idRota, idPlaca])
        .catch(error => {
            console.log('ERROR:', error);
        });
};

module.exports.inserirPlaca =
    function (idRota, placa) {
        db.one('INSERT INTO public.placa(numero, antena) VALUES($1, $2) RETURNING id', [placa.numero, placa.antena])
            .then(data => {
                vincularPlaca(idRota, data.id);
            })
            .catch(error => {
                console.log('ERROR:', error);
            });
    };

