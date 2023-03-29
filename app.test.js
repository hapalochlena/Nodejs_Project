const app = require('./app') // oder const { app } = require('./app') ??????
const gettingJsonData = require('./app')
const gettingFriends = require('./app')


// gettingJsonData()
test('Fetches data from ./friends.json', async () => {
  const jsonData = await gettingJsonData()
  console.log(typeof jsonData);
  const realDataObject = [
    { "id": 1, "name": "nandha", "importance": "A", "lastContacted": 2 },
    { "id": 2, "name": "marco", "importance": "B", "lastContacted": 1 },
    { "id": 3, "name": "caro", "importance": "C", "lastContacted": 3 }
  ]
  const realDataJson = JSON.stringify(realDataObject)
  expect(jsonData).toStrictEqual(realDataJson)
})

// gettingFriends()
test('Converts json to js object', async () => {
  const objectData = await gettingFriends();
  const expectedObject = {}
  expect(typeof objectData).toStrictEqual(typeof expectedObject)
})

// // TDD - This is the first test written BEFORE the actual code !!
// // Refactoring middleware => now testing app.get instead of ... for same result
