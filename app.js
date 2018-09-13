const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport')
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.connect(config.database);

mongoose.connection.on('connected',function(){
	console.log('Connected to the database '+ config.database);
});


mongoose.connection.on('error',function(err ){
	console.log('database error '+ err);
});


const app = express();

const users = require('./routes/users');


app.use(cors());

app.use(bodyParser.json());



app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);


app.use('/users',users);



app.get('/', function(req,res){
	res.send('Home Page');
});

app.use(express.static(path.join(__dirname,'public')));


app.listen(8080,function(){
	console.log('listening on 8080');
});