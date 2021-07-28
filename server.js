const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');

const User = require('./model.js');

const app = express();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  //the fixe for the deprecation warning
  useCreateIndex: true
  })
  .then(() => console.log('connected to database'))

const routes = require('./routes/routes.js')
// console.log(__dirname)
//took me a while to figure out the use of it 
//but finally used static to fix the error while using 
//javascript in html from other files 
app.use('/public', express.static(__dirname + '/public'));
const port = process.env.PORT || 3000;

// console.log(process.env.PORT)

app.use('/', routes)


app.listen(port, () => {
  console.log(`your app is live on port: ${port}`)
})