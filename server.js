//packages
const app = require('express')();
var apiRoutes = require('express').Router();
var mongoose = require('mongoose');
var morgan = require('morgan');                             //log requests to the console so we can see what is happening
var bodyParser = require('body-parser');                    //let us get parameters from our POST requests
var jsonwebtoken = require('jsonwebtoken');                 //to create & verify jwt

var User = require('./models/user');                       //to interact with database
var config = require('./config');

//configurations
//port
var port = process.env.PORT || 3030;

//bodyparser to get post data or data from url 
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(morgan('dev'));

//connect to database
mongoose.connect(config.database);

//set secret code to app
app.set('secret', config.secret);

app.use("/", apiRoutes);

//verifying
apiRoutes.use((req, res, next) => {

    let token = req.body.token || req.param('token') || req.headers['x-access-token'];

    if(token){
        jsonwebtoken.verify(token, app.get('secret'), (err, decode) => {
            if(err){
                return res.json({
                    success : false,
                    message : "Failed to authenticate token"
                });
            }
            else {
                req.decode = decode;
                next();
            }
        });
    }
    else {
        return res.json({
            success : false,
            message : "No token provided"
        });
    }

});

//apis

// apiRoutes.get('/setup', function(req, res){
//     var chhavi = new User({
//         userName : "Chhavi",
//         password : "chhavi123",
//         admin : true
//     });

//     chhavi.save(function(err){
//         if(err) throw err;
//         console.log("User saved successfully");
//         res.json({ success : true });
//     });
// });

// apiRoutes.get('/', (req, res, next) => {
//     res.json({success : true});
// });

// //get all users
// apiRoutes.get('/users', function(req, res){
//     User.find({}, (err, users) => {
//         if(err) throw err;
//         res.json(users);
//     });
// });

//get one
// apiRoutes.post('/users', (req, res) => {
//     User.findOne({
//         userName : req.query.userName
//     }, (err, user) => {
//         if(err) throw err;
//         if(!user){
//             res.json({ 
//                 success: false, 
//                 message: 'Authentication failed. User not found.' 
//             });
//         }
//         else if(user){
//             //check if password is correct or not
//             if(user.password != req.query.password){
//                 res.json({ 
//                     success: false, 
//                     message: 'Authentication failed. Wrong password.' 
//                 });
//             }
//             else{
//                 const payload = {
//                     admin : user.admin
//                 };

//                 //create-token
//                 var token = jsonwebtoken.sign(payload, app.get('secret'), {
//                     expiresIn: 24*60*60      // expires in 24 hours
//                 });

//                 res.json({
//                     success : true,
//                     message : "Token generated",
//                     //token : token
//                 });
//             }
//         }
//     });
// });

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});