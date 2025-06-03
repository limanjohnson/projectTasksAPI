const routes = require('express').Router();
const projects = require('../controllers/project.js');
const { isAuthenticated } = require('../middleware/authenticate');

routes.get('/', projects.findAll);
routes.get('/:project_id', projects.findOne);
routes.post('/', isAuthenticated, projects.create);
routes.put('/:project_id', isAuthenticated, projects.updateProject);
routes.delete('/:project_id', isAuthenticated, projects.deleteProject);

module.exports = routes;
