const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/codial_development');
const db = mongoose.connection;
db.on('error', console.error.bind(console, "Error connecting to MongoDb"));

db.once('open', function(){
    console.log('connected to database:: MongoDB');
});

module.exports = db;