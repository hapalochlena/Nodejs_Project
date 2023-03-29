const app = require('./app') // oder const { app } = require('./app') ??????
const gettingJsonData = require('./app')
const gettingFriends = require('./app')


// gettingJsonData()
// ! not working anymore once refactored with next()
// ! something about req, res and next...
// ! READ UP ON IT LATER
test('Fetches data from ./friends.json', async () => {
  const jsonData = await gettingJsonData(req, res, next)
  console.log(typeof jsonData);
  const realDataObject = [
    { "id": 1, "name": "nandha", "importance": "A", "lastContacted": 2 },
    { "id": 2, "name": "marco", "importance": "B", "lastContacted": 1 },
    { "id": 3, "name": "caro", "importance": "C", "lastContacted": 3 }
  ]
  const realDataJson = JSON.stringify(realDataObject)
  expect(jsonData).toStrictEqual(realDataJson)
})

//! according to ChatGPT:
// test('Fetches data from ./friends.json', async () => {
//   const req = {};
//   const res = {};
//   const next = jest.fn();
//   gettingJsonData(req, res, next);
//   expect(next).toHaveBeenCalled();
// })

// gettingFriends()
// test('Converts json to js object', async () => {
//   const objectData = await gettingFriends();
//   const expectedObject = {}
//   expect(typeof objectData).toStrictEqual(typeof expectedObject)
// })

// test('..', () => {
//   const realfriendsObject = [
//     { "id": 1, "name": "nandha", "importance": "A", "lastContacted": 2 },
//     { "id": 2, "name": "marco", "importance": "B", "lastContacted": 1 },
//     { "id": 3, "name": "caro", "importance": "C", "lastContacted": 3 }
//   ]
//   expect(app.get('/friends', gettingJsonData, gettingFriends)).toBe(realfriendsObject)
// })

// // TDD - This is the first test written BEFORE the actual code !!
// // Refactoring middleware => now testing app.get instead of ... for same result

// ! How does app.get/app.post... testing work?
// => "TypeError: app.get is not a function"
