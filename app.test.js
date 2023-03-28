const app = require('./app') // oder const { app } = require('./app') ??????
const gettingJsonData = require('./app')
const friends = require('./app')


// gettingJsonData()
// test('Fetches data from ./friends.json', async () => {
//   const jsonData = await gettingJsonData()
//   const realData = [
//     { "id": 1, "name": "nandha", "importance": "A", "lastContacted": 2 },
//     { "id": 2, "name": "marco", "importance": "B", "lastContacted": 1 },
//     { "id": 3, "name": "caro", "importance": "C", "lastContacted": 3 }
//   ]
//   console.log(typeof realData);
//   // expect(gettingJsonData()).toEqual(realData)
//   expect(jsonData).toEqual(realData)
// })

// friends()
test('Converts json to js object', async () => {
  const objectData = await friends();
  const expectedObject = {}
  expect(typeof objectData).toStrictEqual(typeof expectedObject)
})

