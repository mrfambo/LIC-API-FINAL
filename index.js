import express from 'express';
import path from 'path';


var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

import config from './config';


mongoose.connect(config.DATABASE_URL,(err,res)=>{
    if(err){
      console.log('Db Connection Failed'+err)
    }
    else
    {
      console.log('Successfull'+ res)
    }
  })



const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


const license = require('./APICore/license.js');
const admin = require('./APICore/admin.js');

app.use('/license',require('./APICore/license.js'));
app.use('/admin',require('./APICore/admin.js'))

app.get('/alimuqaddas',(req,res)=>{
    res.status(200).json({message:"Ali Muqaddas oh wao :: He is the Creator of CueClash"})
})

app.get('/*',(req,res)=>{
    res.sendFile(path.join(__dirname,'src/index.html'));
})

app.listen(config.PORT, () => console.log("Running on LocalHost:"+config.PORT));