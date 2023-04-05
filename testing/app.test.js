const { default: test } = require('node:test')
const app = require('../app') // oder const { app } = require('./app') ??????
const gettingJsonData = require('../app') // ? why not './middleware/middleware' ???
const gettingFriends = require('../app') // ? why not './middleware/middleware' ???
const selectingFriend = require('../app') // ? why not './middleware/middleware' ???
const queryingFriends = require('../app') // ? why not './middleware/middleware' ???

// * ROUTES

// ! Testing routes later ... Get back to tests from tutorial as a starting point

// ? WHAT TO TEST ?

// ? SUCCESS:
// ? should respond with a 200 status code
// ? should specify json in the content type header (can be important e.g. when you use high-level library like Axios to convert json into js object)
// ? FAILURE:
// ? should respond with a status code of 400

// app.get('/')
test('/', () => {
  expect().
})

// app.get('/friends', (req, res) => {
//   res.status(200).send(req.friendsData)
// });
test('/friends', () => {
  expect().
})

// app.get('/friends/:id', selectingFriend, (req, res) => {
// });
test('/friends/:id', () => {
  expect().
})

// app.get('/friends/api/query', queryingFriends, (req, res) => {
// })
test('/friends/api/query', () => {
  expect().
})

// app.listen(3000, () => {
//   console.log("Listening on port 3000...");
// })



// * MIDDLEWARE

// gettingJsonData()
// ! not working
// test('Fetches data from ./friends.json', () => {
//   const req = {  } // baseUrl: './friends.json' // !
//   const res = {}
//   const next = jest.fn()

//   const jsonData = gettingJsonData(req, res, next)
//   console.log(typeof jsonData); // undefined

//   const realDataObject = [
//     { "id": 1, "name": "nandha", "importance": "A", "lastContacted": 2 },
//     { "id": 2, "name": "marco", "importance": "B", "lastContacted": 1 },
//     { "id": 3, "name": "caro", "importance": "C", "lastContacted": 3 }
//   ]
//   const realDataJson = JSON.stringify(realDataObject)


//   expect(next).toHaveBeenCalledTimes(1)
//   expect(jsonData).toStrictEqual(realDataJson)
// })


// ---------------------------------------------------

// gettingFriends()
test('Converts json to js object', () => {
  // ? Do I need those here ???
  const req = {}
  const res = {}
  const next = jest.fn()

  const objectData = gettingFriends(req, res, next);
  const expectedObject = {}

  console.log(typeof objectData); // object
  console.log(typeof expectedObject); // object

  expect(typeof objectData).toStrictEqual(typeof expectedObject)
})

// ---------------------------------------------------

// selectingFriend()
// => what we get out: req.friendsData (string)

// test('Returns only the single friend whose id is in the req params and 404 if there is no friend with this id', () => {
//   const trueId = req.params.id
//   const selectedFriend = selectingFriend(req, res, next)
//   expect(selectedFriend.id).toEqual(trueId)
// })

test('Returns Marco for id = 2, and 404 if there is no friend with this id', () => {
  const req = {}
  const res = {}
  const next = jest.fn()

  const selectedFriend = selectingFriend(req, res, next)
  // ! selectedFriend = {}
  console.log(JSON.stringify(selectedFriend) + "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
  expect(selectedFriend.id).toBe(2)
})

// test('Returns Marco for id = 2, and 404 if there is no friend with this id', () => {
//   const req = { params: {id : '2'} }
//   const res = {}
//   const next = jest.fn()

//   const selectedFriend = selectingFriend(req, res, next)
//   // ! selectedFriend = {}
//   // console.log(JSON.stringify(selectedFriend) + "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
//   expect(selectedFriend.name).toBe("marco")
// })

// ---------------------------------------------------

// queryingFriends()

// ---------------------------------------------------
