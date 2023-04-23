// * This file exists for testing with Jest/Supertest
// => put app.listen(3000) in here so Jest/Supertest can bind to whatever port it wants

const { app } = require('../app')

app.listen(3000, () => {
  console.log("Listening on port 3000...");
})

// Only need to run 'node server.js' => app.js also gets executed!
