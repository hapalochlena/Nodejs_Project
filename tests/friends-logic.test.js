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

describe('updatingFriendLogic', () => {
	test('given id and name: returns a string stating you changed the old name to the new name', async () => {
		const result = await updatingFriendLogic({id: 1, name: 'blubb'});
		expect(result).toEqual('Changed nandha\'s name to blubb');
	});
	test('given id and importance: returns a string stating you changed this friends importance to the new importance', async () => {
		const result = await updatingFriendLogic({id: 2, importance: 'C'});
		expect(result).toEqual('Changed marco\'s importance to C');
	});
	test('given id and lastContacted: returns a string stating you changed this friends contact history to the new contact history', async () => {
		const result = await updatingFriendLogic({id: 3, lastContacted: 55});
		expect(result).toEqual('Changed caro\'s contact history to 55');
	});
});
