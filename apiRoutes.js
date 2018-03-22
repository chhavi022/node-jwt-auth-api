//you can also create a separate module for routing 
//but i was getting an error in setting buffer or string to app so i just embedded all in app.


// var api = require('express');
// var apiRoutes = api.Router();
// var mongoose = require('mongoose');
// var jsonwebtoken = require('jsonwebtoken');                 //to create & verify jwt
// var config = require('./config');
// var User = require('./models/user');

// //connect to database
// mongoose.connect(config.database);

// //set secret code to app
// api().set('secret', config.secret);

// apiRoutes.get('/', (req, res, next) => {
//     res.json({success : true});
// });

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

// //get all users
// apiRoutes.get('/users', function(req, res){
//     User.find({}, (err, users) => {
//         if(err) throw err;
//         res.json(users);
//     });
// });

// //get one
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
//                 var token = jsonwebtoken.sign(payload, api().get('secret'), {
//                     expiresIn: 24*60*60      // expires in 24 hours
//                 });

//                 res.json({
//                     success : true,
//                     message : "Token generated",
//                     token : token
//                 });
//             }
//         }
//     });
// });

// module.exports = apiRoutes;