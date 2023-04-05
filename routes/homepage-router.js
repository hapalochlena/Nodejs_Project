const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send('<h1>Hello World</h1><br><a href="/friends">Show my friends</a>');
})

module.exports = router
