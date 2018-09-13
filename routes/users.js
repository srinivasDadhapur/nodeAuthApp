const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/database');

router.post('/register', function(req,res){
	// res.send('Register');
	let newUser = new User({
		name: req.body.name,
		email: req.body.email,
		username: req.body.username,
		password: req.body.password
	});

	User.addUser(newUser,function(err, user){
		if(err){
			res.json({success: false, msg: ' Failed to register'});
			}
		else{
			res.json({success: true, msg:'added user successfully'});
		}
	});

});


router.post('/authenticate', function(req,res){
	// res.send('Authenticate');
	const username = req.body.username;
	const password = req.body.password;

	User.getUserByUsername(username,function(err, user){
		if (err) throw err;
		if(!user){
			return res.json({success: false, msg: 'Invalid user'});
		}

		User.comparePassword(password, user.password, function(err, isMatch){
			if(err) throw err;
			if(isMatch){
				const token = jwt.sign({data:user},config.secret,
					{
						expiresIn: 602333

				});

				res.json({
					success: true, 
					token: 'JWT '+token,
					user: {
						id: user._id,
						name: user.name,
						username: user.username,
						email: user.email
					}
				});
			}
			else{
				return res.json({success:false, msg: 'Wrong password'});
			}
		});
	});
});


router.get('/profile', passport.authenticate('jwt',{session:false}), function(req,res,next){
	// res.send('Profile');
	res.json({user: req.user});
});

/*
router.get('/validate', function(req,res){
	res.send('Validate');
});

*/

module.exports = router;