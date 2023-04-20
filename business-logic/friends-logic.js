const { readFile } = require('fs').promises;

const gettingFriends = async () => {
	const jsonData = await readFile('./friends.json', 'utf-8');
	// console.log(req);
	// req.jsonData = jsonData;
	const friendsData = JSON.parse(jsonData);
	return friendsData;
};

// const gettingFriends = (req, res, next) => {
// 	req.friendsData = JSON.parse(req.jsonData);
// 	next();
// };

const selectingFriend = async (id) => {
	const friendsData = await gettingFriends();
	const selectedFriend = friendsData.find(friend => friend.id === Number(id));
	return selectedFriend;
};

module.exports = selectingFriend;
