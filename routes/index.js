const routes = require('express').Router();
const project = require('./project');

routes.use('/', require('./swagger'));
routes.use('/project', project);
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