const express = require('express');
const app = express();

app.get('/test', (req, res) => {
  res.send("Banana");
})

app.get('/', (req, res) => {
  res.send("Hello World");
})

module.exports = app
