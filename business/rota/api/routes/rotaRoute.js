module.exports = function(app) {
  var rotaList = require('../controller/rotaController');

  // todoList Routes
  app.route('/rota')
    .get(rotaList.listarRotas)
    .post(rotaList.incluirRota);

  app.route('/rota/:rotaId')
    .get(rotaList.obterRota)
};
