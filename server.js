const express = require('express');

const app = express();

const routes = require('./routes/routes.js')

const port = process.env.PORT || 3000;



app.use('/', routes)


app.listen(port, () => {
  console.log('you app is now live')
})