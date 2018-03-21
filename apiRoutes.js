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
apiRoutes.post('/users', (req, res) => {
    console.log(req.param.userName);
    console.log(req.body.userName);
    User.findOne({
        userName : req.params.userName
    }, (err, user) => {
        if(err) throw err;
        if(!user){
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        }
        else if(user){
            //check if password is correct or not
            if(user.password != req.params.password){
                res.json({ 
                    success: false, 
                    message: 'Authentication failed. Wrong password.' 
                });
            }
            else{
                const payload = {
                    admin : user.admin
                };

                //create-token
                var token = jwt.sign(payload, app.get('secret'), {
                    expiresInMinutes: 1440      // expires in 24 hours
                });

                res.json({
                    success : true,
                    message : "Token generated",
                    token : token
                });
            }
        }
        res.json(user);
    });
});

// apiRoutes.put('/', (req, res, next) => {
    
// });

// apiRoutes.delete('/', (req, res, next) => {
    
// });

module.exports = apiRoutes;