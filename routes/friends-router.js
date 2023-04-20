const express = require('express');
const router = express.Router();

const {
	showingAllFriends,
	showingFriend,
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

router.post('/postman', (req) => {
	// const { username } = req.body
	console.log(req.body);
	// res.status(201) = successful post request
	// res.status(400) = bad request
	// .json({ success: false, msg: '...' })
});

router.put('/:id', updatingFriend);

router.delete('/:id', deletingFriend);

// ***


module.exports = router;





// 404 Page
// app.all('*', (req, res) => {
//   res.status(404).send("Resource not found");
// })
