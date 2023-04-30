// const knex = require('knex');
const { sayHi } = require('./app');
const db = require('./app.js');

sayHi();


db.select('*').from('users').then(data => {
	console.log(data);
});
