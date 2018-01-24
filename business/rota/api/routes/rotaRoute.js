module.exports = function(app) {
  var rotaList = require('../controllers/rotaController');

  // todoList Routes
  app.route('/tasks')
    .get(rotaList.list_all_tasks)
    .post(rotaList.create_a_task);


  app.route('/tasks/:taskId')
    .get(rotaList.read_a_task)
    .put(rotaList.update_a_task)
    .delete(rotaList.delete_a_task);
};
