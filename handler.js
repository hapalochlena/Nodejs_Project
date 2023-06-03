const serverless = require('serverless-http');
const app = require('./src/app');

module.exports.handler = serverless(app);

// const server = sls(app);
// module.exports.server = async (event, context) => {
//   context.callbackWaitsForEmptyEventLoop = false;
//   console.log('Remaining time: ', context.getRemainingTimeInMillis())
//   console.log('Function name: ', context.functionName)
//   const result = await server(event, context);
//   // and here
//   return result;
// };



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
