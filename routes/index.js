const routes = require('express').Router();
const project = require('./project');

routes.use('/', require('./swagger'));
routes.use('/temples', temple);
routes.use(
    '/',
    (docData = (req, res) => {
        let docData = {
            githubURL: ''
        }
    })
)