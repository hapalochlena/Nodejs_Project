const express = require('express');
const app = express();
const router = express.Router();

const { gettingJsonData, gettingFriends, selectingFriend, updatingFriend, deletingFriend, queryingFriends } = require('./middleware/middleware')

// 404 Page
// app.all('*', (req, res) => {
//   res.status(404).send("Resource not found");
// })

app.get('/', (req, res) => {
  res.status(200).send('<h1>Hello World</h1><br><a href="/friends">Show my friends</a>');
})

app.use('/friends', [gettingJsonData, gettingFriends])

app.get('/friends', (req, res) => {
  // const output = JSON.stringify(req.friendsData)
  // res.status(200).json({success: true, data: output})
  res.status(200).send(req.friendsData)
});

app.get('/friends/:id', selectingFriend);

// ? 'query' needs to have 'api' before in the route; '/friends/query' doesn't work
app.get('/friends/api/query', queryingFriends)

// Trying out Postman
// app.use(express.urlencoded())
app.use(express.json())
app.post('/postman', (req, res) => {
  // const { username } = req.body
  console.log(req.body);
  // res.status(201) = successful post request
  // res.status(400) = bad request
        // .json({ success: false, msg: '...' })
})

// PUT - update friend
app.put('/friends/:id', updatingFriend)

// DELETE friend
app.delete('/friends/:id', deletingFriend)

app.listen(3000, () => {
  console.log("Listening on port 3000...");
})

module.exports.app = app
// LATER: FRONTEND
// Using the static assets for frontend
// app.use(express.static('./public'));
// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, './public/index.html'))
      // * OPTION 1) ADDING TO STATIC ASSETS
      // * OPTION 2) SSR
// })
