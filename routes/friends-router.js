const express = require('express');
const router = express.Router();

const {
  gettingJsonData, // ! einfügen statt app.use in app.js?
  gettingFriends, // ! einfügen statt app.use in app.js?
  selectingFriend,
  updatingFriend,
  deletingFriend,
  queryingFriends
} = require('../middleware/middleware') // !

// ! gettingJsonData, gettingFriends ?
router.get('/', (req, res) => {
  // const output = JSON.stringify(req.friendsData)
  // res.status(200).json({success: true, data: output})
  res.status(200).send(req.friendsData)
});

router.get('/:id', selectingFriend);

// ? 'query' needs to have 'api' before in the route; '/friends/query' doesn't work
router.get('/api/query', queryingFriends)

router.post('/postman', (req, res) => {
  // const { username } = req.body
  console.log(req.body);
  // res.status(201) = successful post request
  // res.status(400) = bad request
        // .json({ success: false, msg: '...' })
})

router.put('/:id', updatingFriend)

router.delete('/:id', deletingFriend)


module.exports = router





// 404 Page
// app.all('*', (req, res) => {
//   res.status(404).send("Resource not found");
// })
