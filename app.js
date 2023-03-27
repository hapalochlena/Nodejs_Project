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



// Printing the data from friends.json to the browser

const { readFile } = require('fs').promises

const gettingFriends = async() => {
  try {
    const friends = await readFile('./friends.json', 'utf-8');
    // console.log(friends);
    return friends
  } catch (error) {
    console.log(error);
  }
}

app.get('/friends', async (req, res) => {
  try {
    const friends = await gettingFriends();
    console.log(friends);
    res.status(200).send(friends)
  } catch (error) {
    console.log(error);
  }
})



module.exports = app

// LATER: FRONTEND
// Using the static assets for frontend
// app.use(express.static('./public'));
// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, './public/index.html'))
      // * OPTION 1) ADDING TO STATIC ASSETS
      // * OPTION 2) SSR
// })
