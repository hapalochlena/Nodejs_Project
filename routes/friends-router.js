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

router.get('/', showingAllFriends);
router.get('/:id', showingFriend);
router.post('/', creatingFriend);
router.put('/:id', updatingFriend);
router.delete('/:id', deletingFriend);

// ? 'query' needs to have 'api' before in the route; '/friends/query' doesn't work
// router.get('/api/query', [gettingJsonData, gettingFriends, queryingFriends]);


module.exports = router;





// 404 Page
// app.all('*', (req, res) => {
//   res.status(404).send("Resource not found");
// })
