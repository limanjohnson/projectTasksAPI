const routes = require('express').Router();
const projects = require('../controllers/project.js');

routes.get('/', projects.findAll);
routes.get('/:project_id', projects.findOne);

routes.post('/', projects.create);

routes.put('/', projects.updateProject);

module.exports = routes;
