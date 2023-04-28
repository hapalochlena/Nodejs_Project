const express = require('express');

const {
	fetchingFriends,
	selectingFriend,
	updatingFriendLogic,
	deletingFriendLogic
} = require('../business-logic/friends-logic');

describe('fetchingFriends', () => {
	test('fetches data from json file and converts it into js object', async () => {
		const friendsData = [
			{ id: 1, name: 'nandha', importance: 'A', lastContacted: 2 },
			{ id: 2, name: 'marco', importance: 'B', lastContacted: 1 },
			{ id: 3, name: 'caro', importance: 'C', lastContacted: 3 }
		];

		const result = await fetchingFriends();
		expect(result).toStrictEqual(friendsData);
	});
});

describe('selectingFriend', () => {
	test('returns the friend whose id matches the input id', async () => {
		const ids = [1, 2, 3];
		for (let i = 0; i < ids.length; i++) {
			const result = await selectingFriend(ids[i]);
			expect(result.id).toBe(ids[i]);
		}
	});
	test('returns undefined if no friend with this id exists', async () => {
		const ids = [2342345, 988, 59120, 72389];
		for (let i = 0; i < ids.length; i++) {
			const result = await selectingFriend(ids[i]);
			expect(result).toBeUndefined();
		}
	});
});


