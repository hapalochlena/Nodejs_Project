const app = require('./app') // oder const { app } = require('./app') ??????
const gettingJsonData = require('./app')
const friends = require('./app')


// gettingJsonData()
test('Fetches data from ./friends.json', async () => {
  const jsonData = await gettingJsonData()
  const realData = [
    { "id": 1, "name": "nandha", "importance": "A", "lastContacted": 2 },
    { "id": 2, "name": "marco", "importance": "B", "lastContacted": 1 },
    { "id": 3, "name": "caro", "importance": "C", "lastContacted": 3 }
  ]
  // expect(gettingJsonData()).toEqual(realData)
  expect(jsonData).toEqual(realData)
})

// friends()
// test('Converts json to js object', async () => {
//   const data = await friends();
//   console.log(data);
//   // actual test
// })

// const gettingJsonData = async() => {
//   const jsonData = await readFile('./friends.json', 'utf-8');
//   return jsonData
// }

// const friends = async () => {
//   const jsonData = await gettingJsonData()
//   const friends = JSON.parse(jsonData)
//   return friends
// }
