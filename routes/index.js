const routes = require('express').Router();
const project = require('./project');
const task = require('./tasks.js');

routes.use('/', require('./swagger'));
routes.use('/project', project);
routes.use('/task', task);
routes.use(
    '/',
    (docData = (req, res) => {
        let docData = {
            githubURL: 'https://github.com/limanjohnson/week3project',
        };
        res.send(docData);
    })
)

module.exports = routes;