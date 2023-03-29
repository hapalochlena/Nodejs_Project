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
  // console.log(typeof jsonData);
  // return jsonData
  next(jsonData)
}

const gettingFriends = async (req, res, next) => {
  const jsonData = await gettingJsonData()
  console.log(typeof jsonData); //! typeof => string
  const friendsData = JSON.parse(jsonData)
  // console.log(typeof friends); // typeof => object
  // return friendsData
  res.send(friendsData)
}

app.get('/friends', gettingJsonData, gettingFriends, (req, res) => {
  // const friendsData = gettingFriends()
});

// Find friend by id
app.get('/friends/:id', async (req, res) => {
  console.log(req.params);
  const friendId = req.params.id;
  console.log(friendId);
  const data = await friends();
  const selectedFriend = data.find(friend => friend.id === Number(friendId));
  console.log(selectedFriend);

  if (!selectedFriend) {
    return res.status(404).send("Friend not found")
  }

  res.status(200).send(selectedFriend);
});

// Find friend by query params (name, importance, last contacted)
app.get('/api/v1/query', async (req, res) => {
  console.log(req.query);  // url: /api/v1/query?name=nandha
  const { name, importance, lastContacted } = req.query;
  const { search, limit } = req.query;
  const data = await friends(); // ! middleware function -> take this line out
  let friendsData = [...data];

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
module.exports = gettingFriends

// LATER: FRONTEND
// Using the static assets for frontend
// app.use(express.static('./public'));
// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, './public/index.html'))
      // * OPTION 1) ADDING TO STATIC ASSETS
      // * OPTION 2) SSR
// })
