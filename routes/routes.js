const express = require('express');
const router = express.Router();
const path = require('path') 

router.get('/', (req, res) => {
  //might not be the proper solution but it works :)
  // console.log(path.dirname(__dirname))
  res.sendFile(path.dirname(__dirname) + "/home.html")
})

router.get('/register', (req, res) => {
  res.sendFile(path.dirname(__dirname) + "/register.html")
})

router.get('/login', (req, res) => {
  res.sendFile(path.dirname(__dirname) + "/login.html")
})
module.exports = router;