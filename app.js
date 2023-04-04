const express = require('express');
const app = express();

const { gettingJsonData, gettingFriends, selectingFriend, queryingFriends } = require('./middleware/middleware')

// 404 Page
// app.all('*', (req, res) => {
//   res.status(404).send("Resource not found");
// })

app.get('/', (req, res) => {
  res.status(200).send('<h1>Hello World</h1><br><a href="/friends">Show my friends</a>');
})

app.use('/friends', [gettingJsonData, gettingFriends])

app.get('/friends', (req, res) => {
  res.status(200).send(req.friendsData)
});

app.get('/friends/:id', selectingFriend, (req, res) => {
  res.status(200).send(req.testData);
});

// ? 'query' needs to have 'api' before in the route; '/friends/query' doesn't work
app.get('/friends/api/query', queryingFriends, (req, res) => {
})

app.listen(3000, () => {
  console.log("Listening on port 3000...");
})

module.exports.app = app
module.exports = gettingJsonData
// module.exports = gettingFriends

// LATER: FRONTEND
// Using the static assets for frontend
// app.use(express.static('./public'));
// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, './public/index.html'))
      // * OPTION 1) ADDING TO STATIC ASSETS
      // * OPTION 2) SSR
// })
