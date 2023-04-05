const express = require('express');
const app = express();

// * IMPORT THE ROUTES from Router
const homeRoute = require('./routes/homepage-router')
const friendsRoutes = require('./routes/friends-router')
// ***


// * USEFUL STUFF (static assets, parsing data)
// app.use(express.static('./methods-public'))
// app.use(express.urlencoded())
app.use(express.json())
// ***


// * ROUTES
app.use('/', homeRoute) // ? might not need this if you have index.html as homepage in 'public' and use app.use(express.static('./public')) => that will automatically be the homepage ?
app.use('/friends', friendsRoutes)
// ***


app.listen(3000, () => {
  console.log("Listening on port 3000...");
})








// LATER: FRONTEND
// Using the static assets for frontend
// app.use(express.static('./public'));
// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, './public/index.html'))
      // * OPTION 1) ADDING TO STATIC ASSETS
      // * OPTION 2) SSR
// })
