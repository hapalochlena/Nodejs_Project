const {fetchingFriends, selectingFriend, creatingFriendLogic, updatingFriendLogic, deletingFriendLogic} = require('../business-logic/friends-logic');

const showingAllFriends = async (req, res) => {
	try {
		const friends = await fetchingFriends();
		return res.status(200).json({success: true, data: friends});
	} catch (error) {
		return res.sendStatus(500);
	}
};

const showingFriend = async (req, res) => {
	try {
		const selectedFriend = await selectingFriend(req.params.id);
		if (!selectedFriend) {
			return res.status(404).send('Friend not found');
		}
		return res.status(200).json({success: true, data: selectedFriend});
	} catch (error) {
		return res.sendStatus(500); // * which status code
	}
};

const creatingFriend = async (req, res) => {
	const { name, importance, lastContacted } = req.body;
	// const userId = ... (access id of current user)
	try {
		const createdFriend = await creatingFriendLogic({name: name, importance: importance, lastContacted: lastContacted}); // + userId
		return res.status(200).json({ success: true, data: createdFriend });
	} catch (error) {
		return res.sendStatus(500); // * which status code
	}
};

const updatingFriend = async (req, res) => {
	try {
		const id = req.params.id;
		const properties = req.body; // app.use(express.json()) from app.js
    // const { name, importance, lastContacted } = req.body
    // const properties = { name, importance, lastContacted }
		const answer = await updatingFriendLogic(id, properties);
		if (!answer) {
			return res.status(404).json({ success: false, data: 'Friend or property not found' });
		}
		return res.status(200).json({ success: true, data: answer });
	} catch (error) {
		return res.sendStatus(500);
	}
};

const deletingFriend = async (req, res) => {
	try {
		const answer = await deletingFriendLogic(req.params.id);
		if (!answer) {
			return res.status(404).json({ success: false, data: 'Friend not found' });
		}
		return res.status(200).json({success: true, data: answer});
	} catch (error) {
		return res.sendStatus(500);
	}
};


// const queryingFriends = (req, res) => {
// 	const { name, importance, lastContacted } = req.query;
// 	const { search, limit } = req.query;

// 	const x = req.friendsData;
// 	let friendsData = [...x];

// 	if (name) {
// 		friendsData = friendsData.find(friend => friend.name === name);
// 		console.log(friendsData);
// 	}
// 	if (importance) {
// 		friendsData = friendsData.find(friend => friend.importance === importance);
// 		console.log(friendsData);
// 	}
// 	if (lastContacted) {
// 		friendsData = friendsData.find(friend => friend.lastContacted === Number(lastContacted));
// 		console.log(friendsData);
// 	}
// 	if (search) {
// 		friendsData = friendsData.filter((friend) => {
// 			return friend.name.startsWith(search);
// 		});
// 	}
// 	if (limit) {
// 		friendsData = friendsData.slice(0, Number(limit));
// 	}

// 	if (friendsData < 1) {
// 		res.status(200).json({ success: true, data: []});
// 	}

// 	req.friendsData = friendsData;

// 	res.status(200).json(req.friendsData);
// };


module.exports = {
	showingAllFriends,
	showingFriend,
	creatingFriend,
	updatingFriend,
	deletingFriend
	// queryingFriends
};
