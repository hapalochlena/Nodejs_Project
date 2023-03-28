const app = require('./app') // oder const { app } = require('./app') ??????
const gettingJsonData = require('./app')
const friends = require('./app')


// gettingJsonData()
test('Fetches data from ./friends.json', async () => {
  const jsonData = await gettingJsonData()
  console.log(jsonData);
})

// friends()
test('Fetches data from ./friends.json', async () => {
  const jsonData = await gettingJsonData()
  console.log(jsonData);
})

// const gettingJsonData = async() => {
//   const jsonData = await readFile('./friends.json', 'utf-8');
//   return jsonData
// }

// const friends = async () => {
//   const jsonData = await gettingJsonData()
//   const friends = JSON.parse(jsonData)
//   return friends
// }
