// * REALITY/BIGGER APP: All of the above you don't want in your controllers. Why? Because controllers are responsibile for routing a given request where it needs to go for "processing". They don't directly deal with application logic, but send the request to code that does. Controllers should be fairly "thin" and not do a whole lot. So, a "book order" controller would take the request object after it's already been "pre-processed" by middleware and "successfully passed" it, *****pull out what data it needs from either the query string or body***** and send it to the service layer/domain logic layer to execute the business logic.
// * It's the controller that ultimately FULFILLS the request with a successful response.

// * Controller
// ! => Make Controller functions ASYNC
// ! => Read out the relevant info from request (body/params)
// ! => Await the functions where the business logic happens
// ! => Await the functions where the business logic happens
// ! => Pass relevant info from request as arguments into the await functions

const { readFile } = require('fs').promises;

// ! eigentlich service function outside of controller (takes relevant request info as argument)
const gettingJsonData = async (req, res, next) => {
	const jsonData = await readFile('./friends.json', 'utf-8');
	// console.log(req);
	req.jsonData = jsonData;
	next();
};

// ! eigentlich service function outside of controller (takes relevant request info as argument)
const gettingFriends = (req, res, next) => {
	req.friendsData = JSON.parse(req.jsonData);
	next();
};

const selectingFriend = (req, res) => {
	console.log(req.params);
	const friendId = req.params.id;
	const friendsData = req.friendsData; // from gettingFriends
	const selectedFriend = friendsData.find(friend => friend.id === Number(friendId));
	if (!selectedFriend) {
		return res.status(404).send('Friend not found');
	}
	res.status(200).send(selectedFriend);
};

// PUT
const updatingFriend = (req, res) => {
	// selecting friend (same as in selectingFriend)
	const friendId = req.params.id;
	const friendsData = req.friendsData; // from gettingFriends
	const selectedFriend = friendsData.find(friend => friend.id === Number(friendId));
	if (!selectedFriend) {
		return res.status(404).send('Friend not found');
	}

	// updating // * tbd - currently can handle only one change at a time
	const { name, importance, lastContacted } = req.body; // app.use(express.json()) from app.js
	if (name) {
		const oldName = selectedFriend.name;
		selectedFriend.name = name;
		console.log(selectedFriend);
		console.log(`Changed ${oldName}'s name to ${name}`);
		res.status(200).send(`Changed ${oldName}'s name to ${name}`);
	}
	if (importance) {
		selectedFriend.importance = importance;
		console.log(selectedFriend);
		console.log(`Changed ${selectedFriend.name}'s importance to ${importance}`);
		res.status(200).send(`Changed ${selectedFriend.name}'s importance to ${importance}`);
	}
	if (lastContacted) {
		console.log(typeof lastContacted);
		selectedFriend.lastContacted = lastContacted;
		console.log(selectedFriend);
		console.log(`Changed ${selectedFriend.name}'s contact history to ${lastContacted}`);
		res.status(200).send(`Changed ${selectedFriend.name}'s contact history to ${lastContacted}`);
	}

	// * tbd - some logic here that would actually persist the new data (in json file / database)
};

const deletingFriend = (req, res) => {
	// selecting friend (same as in selectingFriend)
	const friendId = req.params.id;
	const friendsData = req.friendsData; // from gettingFriends
	const selectedFriend = friendsData.find(friend => friend.id === Number(friendId));
	if (!selectedFriend) {
		return res.status(404).send('Friend not found');
	}

	// * tbd - some logic here that would actually persist the new data (in json file / database)
	// const newfriendsData = friendsData.filter((friend) => friend.id === Number(friendId))
	// ... -> persist in json file / database
	const msg = `You successfully deleted ${selectedFriend.name}`;
	console.log(msg);
	res.status(200).json({success: true, data: msg});
};

const queryingFriends = (req, res) => {
	const { name, importance, lastContacted } = req.query;
	const { search, limit } = req.query;

	const x = req.friendsData;
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
			return friend.name.startsWith(search);
		});
	}
	if (limit) {
		friendsData = friendsData.slice(0, Number(limit));
	}

	if (friendsData < 1) {
		res.status(200).json({ success: true, data: []});
	}

	req.friendsData = friendsData;

	res.status(200).json(req.friendsData);
};

module.exports = {
	gettingJsonData,
	gettingFriends,
	selectingFriend,
	updatingFriend,
	deletingFriend,
	queryingFriends
};
