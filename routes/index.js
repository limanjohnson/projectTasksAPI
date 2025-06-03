const routes = require('express').Router();
const project = require('./project');
const task = require('./tasks.js');
const passport = require('passport');

routes.use('/', require('./swagger'));
routes.use('/project', project);
routes.use('/task', task);
// routes.use(
//     '/',
//     (docData = (req, res) => {
//         let docData = {
//             githubURL: 'https://github.com/limanjohnson/week3project',
//         };
//         res.send(docData);
//     })
// )

routes.get('/login', passport.authenticate('github'), (req, res) => {});

routes.get('/logout', function (req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = routes;