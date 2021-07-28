const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');

const User = require('./model.js');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  //the fixe for the deprecation warning
  useCreateIndex: true
  })
  .then(() => console.log('connected to database'))

const routes = require('./routes/routes.js')
const secureRoutes = require('./routes/secure-routes.js'); 

require('./auth/auth.js')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))

// console.log(__dirname)
//took me a while to figure out the use of it 
//but finally used static to fix the error while using 
//javascript in html from other files 
app.use('/public', express.static(__dirname + '/public'));


app.use('/', routes)
//now using jwt strategy as a middleware to restrict access
app.use('/user', passport.authenticate('jwt', { session: false }), secureRoutes);


// Handle errors.
app.use((err, req, res, next) => {
  console.log("err in server.js file", err)
  res.status(err.status || 500);
  res.json({ error: err });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`your app is live on port: ${port}`)
})