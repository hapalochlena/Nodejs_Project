const express = require('express');
const app = express();
const knex = require('knex');

const db = knex({
	client: 'pg', // pg = posgres
	connection: {   // tell it where the database lives
		host : '127.0.0.1', // 127.0.0.1 = localhost => later different when hosted on a separate platform
		port : 5432,  // port for Postgres
		user : 'Lena',  // name as appears in the 'Owner' column when you do \d to see db tables
		password : '',
		database : 'friend-reminder'
	}
});

// console.log(db.select('*').from('users'));
// => logs the query statement that Knex builds

// db.select('*').from('users'); // returns a promise => access it:
db.select('*').from('users').then(data => {
	console.log(data);
});


// * IMPORT THE ROUTES from Router
const homeRoute = require('./routes/homepage-router');
const friendsRoutes = require('./routes/friends-router');
// ***


// * IMPORT THE MIDDLEWARE (as soon as we have any)
// const logger = require('./middleware/logger')
// const authorize = require('./middleware/authorize')
// ***


// * MIDDLEWARE - requests pass through here before they go to controller => functions anywhere else can use the built-in middleware from here
// app.use(express.static('./methods-public'))
// app.use(express.urlencoded())
app.use(express.json());
// app.use(logger) // * ––> notice we don't need route as argument here, because this is where every request passes through, so we would have to put it as argument into every single route; insteaad we put it into app.use here
// app.use(authorize) // * ––> notice we don't need route as argument here, because this is where every request passes through, so we would have to put it as argument into every single route; insteaad we put it into app.use here
// ***


// * ROUTES
app.use('/', homeRoute); // ? might not need this if you have index.html as homepage in 'public' and use app.use(express.static('./public')) => that will automatically be the homepage ?
app.use('/friends', friendsRoutes);
// ***


app.listen(3000, () => {
	console.log('Listening on port 3000...');
});








// LATER: FRONTEND
// Using the static assets for frontend
// app.use(express.static('./public'));
// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, './public/index.html'))
// *      OPTION 1) ADDING TO STATIC ASSETS
// *      OPTION 2) SSR
// })
