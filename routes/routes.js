const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken')
const path = require('path') 

router.get('/', (req, res) => {
  //might not be the proper solution but it works :)
  // console.log(path.dirname(__dirname))
  res.sendFile(path.dirname(__dirname) + "/views/home.html")
})
router.post(
  '/signup',
  passport.authenticate('signup', { session: false }),
  async (req, res, next) => {
    res.json({
      message: 'Signup successful',
      user: req.user
    });
  }
);

router.get('/signup', (req, res) => {
  res.sendFile(path.dirname(__dirname) + "/views/signup.html")
})


router.get('/login', (req, res) => {
  res.sendFile(path.dirname(__dirname) + "/views/login.html")
})
router.post('/login', async (req, res) => {
  passport.authenticate(
    'login',
    async (err, user, info) => {
      try {
        if (err || !user){
          const error = new Error('An error occured')

          return next(error)
        }
        req.login(
          user,
          //Im not storing the info in session, they say it's better when working with apis
          //but not recommenden for web apps for perfomance reasons
          {session: false},
          async (error) => {
            if(error) return next(error)
            
            const body = { _id: user._id, email: user.email };
            const token = jwt.sign({ user:body }, 'TOP_SECRET')
            console.log("token >>>>",token)
            return res.json({ token })
          }
        )
      }catch(error){
        return next(error)
      }
    }
  )(req, res, next)
})



module.exports = router;
module.exports = router;