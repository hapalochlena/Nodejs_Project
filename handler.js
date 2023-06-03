const serverless = require('serverless-http');
const app = require('./src/app');

module.exports.handler = serverless(app);



// module.exports.hello = async (event) => {
//   return {
//     statusCode: 200,
//     body: JSON.stringify(
//       {
//         message: 'Your HELLO function executed successfully!',
//         input: event
//       },
//       null,
//       2
//     )
//   };
// };
