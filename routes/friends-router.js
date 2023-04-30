const express = require('express');
const router = express.Router();

const {
	showingAllFriends,
	showingFriend,
	creatingFriend,
	updatingFriend,
	deletingFriend
	// queryingFriends
} = require('../controllers/friends-controller');

// * GET

router.get('/', showingAllFriends, (req, res) => {
	// const output = JSON.stringify(req.friendsData)
	// res.status(200).json({success: true, data: output})
	res.status(200).send(req.friendsData); // !
});

router.get('/:id', showingFriend);

// ? 'query' needs to have 'api' before in the route; '/friends/query' doesn't work
// router.get('/api/query', [gettingJsonData, gettingFriends, queryingFriends]);

// ***

// * POST, PUT, DELETE

router.post('/postman', creatingFriend);

router.put('/:id', updatingFriend);

router.delete('/:id', deletingFriend);

// ***


module.exports = router;





// 404 Page
// app.all('*', (req, res) => {
//   res.status(404).send("Resource not found");
// })
