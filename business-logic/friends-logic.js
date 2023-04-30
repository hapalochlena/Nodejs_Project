const { readFile } = require('fs').promises;
const knex = require('knex');

const db = knex({
	client: 'pg', // pg = posgres
	connection: {   // tell it where the database lives
		host : '127.0.0.1', // 127.0.0.1 = localhost => later different when hosted on a separate platform
		port : 5432,  // port for Postgres
		user : 'Lena',  // name as appears in the 'Owner' column when you do \d to see db tables
		password : '',
		database : 'friend-reminder'
	}
});

// console.log(db.select('*').from('users'));
// => logs the query statement that Knex builds

// db.select('*').from('users'); // returns a promise => access it:
// db.select('*').from('users').then(data => {
// 	console.log(data);
// });

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

// ! here .then instead of aync/await
const creatingFriendLogic = ({name, importance = null, lastContacted = null}) => {
	const currentDate = new Date();
	const isoDate = currentDate.toISOString();
	console.log(name); // Nandha
	console.log(importance); // A
	console.log(lastContacted); // null


	db('friends').insert({
		name: name,
		importance: importance,
		last_contacted: '2023-04-30T19:10:26.920Z', // ! should be lastContacted
		user_id: 1, // ! userId
		added: '2023-04-30T19:10:26.920Z'
	}).then(console.log).catch(error => console.log(error));
};

const updatingFriendLogic = async ({id, name = null, importance = null, lastContacted = null}) => {
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
		console.log(`Changed ${selectedFriend.name}'s importance to ${importance}`);
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



module.exports = {fetchingFriends, selectingFriend, creatingFriendLogic, updatingFriendLogic, deletingFriendLogic};
