//packages
const app = require('express')();

var mongoose = require('mongoose');                         //to interact with database
var morgan = require('morgan');                             //log requests to the console so we can see what is happening
var bodyParser = require('body-parser');                    //let us get parameters from our POST requests
var jsonwebtoken = require('jsonwebtoken');                 //to crreate & verify jwt

var config = require('./config');

//configurations
//port
var port = process.env.PORT || 3030;
var apiRoutes = require('./apiRoutes');

//set secret code to app
app.set('secret', config.secret);

//bodyparser to get post data or data from url 
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use("/", apiRoutes);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});