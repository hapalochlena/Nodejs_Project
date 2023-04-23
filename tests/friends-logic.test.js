const {
	fetchingFriends,
	selectingFriend,
	updatingFriendLogic,
	deletingFriendLogic
} = require('../business-logic/friends-logic');

describe('fetchingFriends', () => {
	test('fetches data from json file and converts it into js object', () => {
		const friendsData = [
			{ id: 1, name: 'nandha', importance: 'A', lastContacted: 2 },
			{ id: 2, name: 'marco', importance: 'B', lastContacted: 1 },
			{ id: 3, name: 'caro', importance: 'C', lastContacted: 3 }
		];

		expect(fetchingFriends()).toStrictEqual(friendsData);
	});
});
