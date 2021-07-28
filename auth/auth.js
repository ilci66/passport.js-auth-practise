const passport = require('passport');
//I keep forgetting to add the .Strategy in the end 
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

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

        return done(null, user);
      } catch (error) {
        console.log(error)
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
        console.log(user)
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
        return done(null, user, {message: 'Login successful' })
      }catch (error) {
        return done(error);
      }
    }
  )
);

//extracting JWT form query parameter
//then verifies if the secretorkey is set(TOP_SECRET)
//if token is valid, user details are passed to the other middleware
passport.use(
  new JWTstrategy(
    {
      secretOrKey: 'TOP_SECRET',
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
    },
    async (token, done) => {
      //_id should be available in the token,
      //with it I can do database calls
      console.log(token)
      try {
        //passing to the other middleware here
        return done(null, token.user);
      } catch (error) {
        done("this is the error", error);
      }
    }
  )
);