const { app } = require('./app')

app.listen(3000, () => {
  console.log("Listening on port 3000...");
})

// Only need to run 'node server.js' => app.js also gets executed!
