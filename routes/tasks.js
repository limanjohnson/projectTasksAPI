const routes = require('express').Router();
const tasks = require('../controllers/task');

routes.post('/', tasks.create); // create a task
routes.get('/:task_id', tasks.getSingleTask); // get a single task
routes.get('/', tasks.getAllTasks); // get all tasks
routes.put('/:task_id', tasks.update); // update a tasks
routes.delete('/:task_id', tasks.deleteTask); // delete a task

module.exports = routes;