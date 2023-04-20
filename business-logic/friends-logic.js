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

const updatingFriendLogic = async (id, name, importance, lastContacted) => {
	const friendsData = await fetchingFriends();
	const selectedFriend = friendsData.find(friend => friend.id === Number(id));

	// * tbd - currently can handle only one change at a time
	if (name) {
		const oldName = selectedFriend.name;
		selectedFriend.name = name;
		return `Changed ${oldName}'s name to ${name}`;
	}
	if (importance) {
		selectedFriend.importance = importance;
		return `Changed ${selectedFriend.name}'s importance to ${importance}`;
	}
	if (lastContacted) {
		selectedFriend.lastContacted = lastContacted;
		return `Changed ${selectedFriend.name}'s contact history to ${lastContacted}`;
	}

	// * tbd - some logic here that would actually persist the new data (in json file / database)
};

const deletingFriendLogic = async (id) => {
	const friendsData = await fetchingFriends();
	const selectedFriend = friendsData.find(friend => friend.id === Number(id));
	// * tbd - some logic here that would actually persist the new data (in json file / database)
	// const newfriendsData = friendsData.filter((friend) => friend.id === Number(friendId))
	// ... -> persist in json file / database
	return `You successfully deleted ${selectedFriend.name}`;
};



module.exports = {fetchingFriends, selectingFriend, updatingFriendLogic, deletingFriendLogic};
