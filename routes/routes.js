const express = require('express');
const router = express.Router();
const path = require('path') 

router.get('/', (req, res) => {
  //might not be the proper solution but it works :)
  // console.log(path.dirname(__dirname))
  res.sendFile(path.dirname(__dirname) + "/views/home.html")
})

router.get('/register', (req, res) => {
  res.sendFile(path.dirname(__dirname) + "/views/register.html")
})

router.get('/login', (req, res) => {
  res.sendFile(path.dirname(__dirname) + "/views/login.html")
})
module.exports = router;