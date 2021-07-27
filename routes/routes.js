const express = require('express');
const router = express.Router();
const passport = require('passport')
const path = require('path') 

router.get('/', (req, res) => {
  //might not be the proper solution but it works :)
  // console.log(path.dirname(__dirname))
  res.sendFile(path.dirname(__dirname) + "/views/home.html")
})

router.get('/signup', (req, res) => {
  res.sendFile(path.dirname(__dirname) + "/views/signup.html")
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

router.get('/login', (req, res) => {
  res.sendFile(path.dirname(__dirname) + "/views/login.html")
})


module.exports = router;