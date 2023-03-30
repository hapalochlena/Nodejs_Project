const express = require('express');
const app = express();

// Testing
app.get('/test', (req, res) => {
  res.send("Banana");
})

// Home Page
app.get('/', (req, res) => {
  res.status(200).send('<h1>Hello World</h1><br><a href="/friends">Show my friends</a>');
})

// 404 Page
// app.all('*', (req, res) => {
//   res.status(404).send("Resource not found");
// })


// Converting the data from friends.json into an object

const { readFile } = require('fs').promises

const gettingJsonData = async (req, res, next) => {
  const jsonData = await readFile('./friends.json', 'utf-8');
  // console.log(typeof jsonData); // json string
  req.jsonData = jsonData
  // console.log(req.jsonData);
  next()
}

const gettingFriends = (req, res, next) => {
  req.friendsData = JSON.parse(req.jsonData)
  // console.log("MIDDLEWARE 2 ------------------>");
  // console.log(typeof req.friendsData);
  // console.log(req.friendsData);
  next()
}

// * ROUTES

app.use('/friends', [gettingJsonData, gettingFriends])

app.get('/friends', (req, res) => {
  res.status(200).send(req.friendsData)
});

// Find friend by id
app.get('/friends/:id', (req, res) => {
  const friendId = req.params.id;
  // console.log(friendId);

  const friendsData = req.friendsData
  const selectedFriend = friendsData.find(friend => friend.id === Number(friendId));
  // console.log(selectedFriend);
  if (!selectedFriend) {
    return res.status(404).send("Friend not found")
  }
  res.status(200).send(selectedFriend);
});

// Find friend by query params (name, importance, last contacted)
app.get('/friends/api/query', (req, res) => {
  const { name, importance, lastContacted } = req.query;
  const { search, limit } = req.query;

  const x = req.friendsData
  let friendsData = [...x];

  if (name) {
    friendsData = friendsData.find(friend => friend.name === name);
    console.log(friendsData);
  }
  if (importance) {
    friendsData = friendsData.find(friend => friend.importance === importance);
    console.log(friendsData);
  }
  if (lastContacted) {
    friendsData = friendsData.find(friend => friend.lastContacted === Number(lastContacted));
    console.log(friendsData);
  }
  if (search) {
    friendsData = friendsData.filter((friend) => {
      return friend.name.startsWith(search)
    })
  }
  if (limit) {
    friendsData = friendsData.slice(0, Number(limit))
  }

  if (friendsData < 1) {
    res.status(200).json({ success: true, data: []})
  }

  res.status(200).json(friendsData)
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
