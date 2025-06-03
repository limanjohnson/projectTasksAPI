const routes = require('express').Router();
const tasks = require('../controllers/task');
const { isAuthenticated } = require("../middleware/authenticate");

routes.post('/', isAuthenticated, tasks.create); // create a task
routes.get('/:task_id', tasks.getSingleTask); // get a single task
routes.get('/', tasks.getAllTasks); // get all tasks
routes.put('/:task_id', isAuthenticated, tasks.update); // update a tasks
routes.delete('/:task_id', isAuthenticated, tasks.deleteTask); // delete a task

module.exports = routes;