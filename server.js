//import packages
var express = require('express');
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');
const { check } = require('express-validator');

//Link to the Config File
var config = require('./config');

//Creating a Link to the Controller
var userController = require('./controllers/userController');


mongoose.connect(config.MONGO_URI || process.env.MONGO_URI, { useUnifiedTopology: true });
mongoose.connection.on('error', function (err) {
  console.log('Error: Could not connect to MongoDB. Did you forget to run `mongod`?'.red);
});
// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + config.MONGO_URI);
});

// If the connection throws an error
mongoose.connection.on('error', function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});


//Creating a Variable For Express
var app = express();
app.set('port', (process.env.PORT || config.PORT || 80));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));

const distDir = path.join(process.cwd(), '/public/dist/crudApp');

// Set the dist directory as statically servable
app.use(express.static(distDir));

// Set the dist directory as statically servable
app.use(express.static(distDir));

app.engine('html', require('ejs').renderFile);

// Return index.html to bootstrap angular
app.get('/', (req, res) => {
  res.sendFile(distDir + '/index.html');
});




//Api to create a user
app.post('/api/user/createuser', [check('name').isString(), check('email').isEmail(), check('phone').isLength({ min: 10 }).isNumeric()], userController.createUser);
//Api to get User
app.get('/api/user/getuser', userController.fetchUser);
//Api to Update the userDetails
app.put('/api/user/updateuser/:uid', [check('name').isString(), check('email').isEmail(), check('phone').isLength({ min: 10 }).isNumeric()], userController.updateUser);
//Api to Delete
app.delete('/api/user/deleteuser/:uid', userController.deleteUser);



app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

