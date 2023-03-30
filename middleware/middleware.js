const { readFile } = require('fs').promises

const gettingJsonData = async (req, res, next) => {
  const jsonData = await readFile('./friends.json', 'utf-8');
  req.jsonData = jsonData
  next()
}

const gettingFriends = (req, res, next) => {
  req.friendsData = JSON.parse(req.jsonData)
  next()
}

const selectingFriend = (req, res, next) => {
  const friendId = req.params.id;
  const friendsData = req.friendsData
  const selectedFriend = friendsData.find(friend => friend.id === Number(friendId));
  if (!selectedFriend) {
    return res.status(404).send("Friend not found")
  }
  res.status(200).send(selectedFriend);
}

const queryingFriends = (req, res, next) => {
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

  req.friendsData = friendsData

  res.status(200).json(req.friendsData)
}

module.exports = { gettingJsonData, gettingFriends, selectingFriend, queryingFriends }
