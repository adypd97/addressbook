// a migration file is useful if we want to have a table creation 
// script that we can call at any time during development.
var db = require('./database.js');
db.sequelize.sync(); // initialize the database, which creates the table for our model.
