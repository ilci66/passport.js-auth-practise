const passport = require('passport');
//I keep forgetting to add the .Strategy in the end 
const localStrategy = require('passport-local').Strategy;
const User = require('../model.js')

//a middleware using passport for sign ups
passport.use(
  'signup',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        const user = await User.create({ email, password });
        //creating and passing the user I create to the next middleware
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  'login',
  new localStrategy(
    {
      usernameField: "email",
      passwordField: 'password'
    },
    async (email, password, done) => {
      try{
        const user = await User.findOne({ email });
        if(!user){
          return done(null, user, 'User not found')
        }
        //the method I added to the instance is used for validation here
        //as it's defined on the model, I can call it as model.exampleMethod
        const validate = await user.isValidPassword(password);

        if(!validate) {
          return done(null, false, {message: 'Wrong password' });
        }
        // again passing the user info to the next middleware
        return done(null, user, {'Login successful' })
      }catch (error) {
        return done(error);
      }
    }
  )
);