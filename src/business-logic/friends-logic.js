// * LOCAL db Connection

// const knex = require('knex');

// const db = knex({
// 	client: 'pg', // pg = posgres
// 	connection: {   // tell it where the database lives
// 		host : '127.0.0.1', // 127.0.0.1 = localhost => later different when hosted on a separate platform
// 		port : 5432,  // port for Postgres
// 		user : 'Lena',  // name as appears in the 'Owner' column when you do \d to see db tables
// 		password : '',
// 		database : 'friend-reminder'
// 	}
// });

///////////////

const fetchingFriends = () => {
  const db = require('knex')({
    client: 'pg',
    connection: {   // tell it where the database lives
      // ! host : '127.0.0.1', // 127.0.0.1 = localhost => later different when hosted on a separate platform
      // ! port : 5432,  // port for Postgres
      user : 'Lena',  // name as appears in the 'Owner' column when you do \d to see db tables
      // ! password : '',
      database : 'friend-reminder'
    }
  });
	return db.select('*').from('friends')
		// .then(data => data)
    .then((data) => {
      console.log('received data: ', data);
      db.client.destroy();
      return data;
    })
		// .catch(error => console.log(error));
    .catch((error) => {
      console.log('error occurred: ', error);
      db.client.destroy();
    });
};

// exports.handler = (event, context, callback) => {
//   console.log('event received: ', event);

//   // Connect
//   const knex = require('knex')({
//     client: 'pg',
//     connection: {...},
//   });

//   console.log('knex connection: ', knex);

//   knex('goals')
//     .then((goals) => {
//       console.log('received goals: ', goals);
//       knex.client.destroy();
//       return callback(null, goals);
//     })
//     .catch((err) => {
//       console.log('error occurred: ', err);
//       // Disconnect
//       knex.client.destroy();
//       return callback(err);
//     });
// };














































const selectingFriend = (id) => {
  return db('friends').where('id', id)
    .then(data => data)
    .catch(error => console.log(error));
};

const creatingFriendLogic = ({name, importance = null, lastContacted = null}) => {
	const currentDate = new Date();
	const isoDate = currentDate.toISOString();
	console.log(name); // Nandha
	console.log(importance); // A
	console.log(lastContacted); // null

	db('friends').insert({
		name: name,
		importance: importance,
		last_contacted: isoDate, // ! should be lastContacted
		user_id: 1, // ! userId
		added: isoDate
	}).then(console.log).catch(error => console.log(error));
};

const updatingFriendLogic = async (id, properties) => {
  // console.log(properties); // { name: 'Elly', importance: 'B' }
  for (const [key, value] of Object.entries(properties)) {
    if (key === 'name') {
      // console.log(name);
      db('friends')
        .where('id', '=', id)
        .update({
          name: value
        })
        .returning('friends')
        .then(data => data)
        .catch(error => console.log(error));
    } else if (key === 'importance') {
      db('friends')
        .where('id', '=', id)
        .update({
          importance: value
        })
        .returning('friends')
        .then(data => data)
        .catch(error => console.log(error));
    } else if (key === 'lastContacted') {
      return db('friends')
        .where('id', '=', id)
        .update({
          last_contacted: value
        })
        .returning('friends')
        .then(data => data)
        .catch(error => console.log(error));
    }
  }
};

const deletingFriendLogic = (id) => {
  return db('friends')
    .where('id', id)
    .returning('*') // now the promise resolves with an array of the deleted rows, which contains the data of the deleted row(s)
    .del()
    .then(data => data) // without 'returning' returns 1 -> promise resolves to the number of rows deleted = 1
    .catch(error => console.log(error));
};



module.exports = {fetchingFriends, selectingFriend, creatingFriendLogic, updatingFriendLogic, deletingFriendLogic};
