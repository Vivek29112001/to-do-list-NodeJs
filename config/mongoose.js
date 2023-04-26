const mongoose = require('mongoose');

// connecting to local host
mongoose.connect('mongodb://0.0.0.0:27017/');


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Successfully Connected to DB");
});