const { readFile } = require('fs').promises;

// fetching friends data from json file; converting it into js object
const fetchingFriends = async () => {
	const jsonData = await readFile('./friends.json', 'utf-8');
	const friendsData = JSON.parse(jsonData);
	return friendsData;
};

// selecting friend with id from request
const selectingFriend = async (id) => {
	const friendsData = await fetchingFriends();
	const selectedFriend = friendsData.find(friend => friend.id === Number(id));
	return selectedFriend;
};

module.exports = [fetchingFriends, selectingFriend];
// ! [] oder {} ?
