const dbConfig = require('../database/database.js');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.projects = require('./projects')(mongoose);
db.tasks = require('./tasks')(mongoose);

module.exports = db;
