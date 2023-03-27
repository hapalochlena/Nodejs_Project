const express = require('express');
const app = express();

// Testing
app.get('/test', (req, res) => {
  res.send("Banana");
})


app.get('/', (req, res) => {
  res.send("<h1>Hello World</h1>");
})


// Printing out the data from friends.json

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
    res.send(friends)
  } catch (error) {
    console.log(error);
  }
})



module.exports = app
