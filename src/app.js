const serverless = require('serverless-http');
const express = require('express');
const app = express();


// * IMPORT THE ROUTES
const homeRoute = require('./routes/homepage-router');
const friendsRoutes = require('./routes/friends-router');
// ***


// * IMPORT THE MIDDLEWARE (as soon as we have any)
// const logger = require('./middleware/logger')
// const authorize = require('./middleware/authorize')
// ***


// * MIDDLEWARE - requests pass through here before they go to controller => functions anywhere else can use the built-in middleware from here
// app.use(express.static('./methods-public'))
// app.use(express.urlencoded())  // * => PARSING incoming data (from POST requests)
app.use(express.json()); // * => PARSING incoming data (from POST requests)
// app.use(logger) // * ––> notice we don't need route as argument here, because this is where every request passes through, so we would have to put it as argument into every single route; insteaad we put it into app.use here
// app.use(authorize) // * ––> notice we don't need route as argument here, because this is where every request passes through, so we would have to put it as argument into every single route; insteaad we put it into app.use here
// ***


// * ROUTES
app.use('/', homeRoute); // ? might not need this if you have index.html as homepage in 'public' and use app.use(express.static('./public')) => that will automatically be the homepage ?
app.use('/friends', friendsRoutes);
// ***


// development localhost
app.listen(3000, () => {
	console.log('Listening on port 3000...');
});


// this is it!
module.exports.handler = serverless(app);

// or as a promise
// const handler = serverless(app);
// module.exports.handler = async (event, context) => {
//   // you can do other things here
//   const result = await handler(event, context);
//   // and here
//   return result;
// };


// module.exports = app;







// LATER: FRONTEND
// Using the static assets for frontend
// app.use(express.static('./public'));
// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, './public/index.html'))
// *      OPTION 1) ADDING TO STATIC ASSETS
// *      OPTION 2) SSR
// })
