var apiRoutes = require('express').Router();

var mongoose = require('mongoose');
var config = require('./config');
var User = require('./models/user');

//connect to database
mongoose.connect(config.database);

const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/User';

var emp_data = [];

apiRoutes.get('/', (req, res, next) => {
    res.json({success : true});
});

apiRoutes.get('/setup', function(req, res){
    var chhavi = new User({
        userName : "Chhavi",
        password : "chhavi123",
        admin : true
    });

    chhavi.save(function(err){
        if(err) throw err;
        console.log("User saved successfully");
        res.json({ success : true });
    });
});

//get all users
apiRoutes.get('/users', function(req, res){
    User.find({}, (err, users) => {
        if(err) throw err;
        res.json(users);
    });
});

//get one
apiRoutes.post('/authenticate', (req, res, next) => {
    User.findOne({
        userName : req.body.userName
    }, (err, user) => {
        if(err) throw err;
        if(!user){
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        }
        res.json(user);
    });
});

// apiRoutes.put('/', (req, res, next) => {
    
// });

// apiRoutes.delete('/', (req, res, next) => {
    
// });

module.exports = apiRoutes;