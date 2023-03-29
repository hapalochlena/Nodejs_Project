const app = require('./app') // oder const { app } = require('./app') ??????
const gettingJsonData = require('./app')
const friends = require('./app')


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

// friends()
test('Converts json to js object', async () => {
  const objectData = await friends();
  const expectedObject = {}
  expect(typeof objectData).toStrictEqual(typeof expectedObject)
})
