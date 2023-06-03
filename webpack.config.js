// const nodeExternals = require('webpack-node-externals');
// const webpack = require('webpack');

module.exports = {
  target: 'node', // what are we trying to compile down
  // mode: 'production', // => minifies it as much as possible
  mode: 'none', // => we are not in a production environment, so don't need the extra processing to minify the code
  // externals: /^[a-z\-0-9]+$/
  // externals: [
  //   nodeExternals({
  //     allowlist: ['pg']
  //   })
  // ],
  // resolve: {
  //   alias: {
  //     pg: 'node_modules/pg/*'
  //   }
  // }
  // externals: [
  //   nodeExternals({
  //   })
  // ]
  externals: { knex: 'commonjs knex' }
  // plugins: [
    // new webpack.NormalModuleReplacementPlugin(/\.\.\/migrate/, '../util/noop.js'),
    // new webpack.NormalModuleReplacementPlugin(/\.\.\/seed/, '../util/noop.js'),
    // new webpack.IgnorePlugin(/mariasql/, /\/knex\//),
    // new webpack.IgnorePlugin(/mssql/, /\/knex\//),
    // new webpack.IgnorePlugin(/mysql/, /\/knex\//),
    // new webpack.IgnorePlugin(/mysql2/, /\/knex\//),
    // new webpack.IgnorePlugin(/oracle/, /\/knex\//),
    // new webpack.IgnorePlugin(/oracledb/, /\/knex\//),
    // new webpack.IgnorePlugin(/pg-query-stream/, /\/knex\//),
    // new webpack.IgnorePlugin(/sqlite3/, /\/knex\//),
    // new webpack.IgnorePlugin(/strong-oracle/, /\/knex\//),
    // new webpack.IgnorePlugin(/pg-native/, /\/pg\//)
  //   new webpack.IgnorePlugin(/better-sqlite3/, /\/knex\//),
  // ]
  // plugins: [
  //   new webpack.ContextReplacementPlugin(/knex\/lib\/dialects/)
  // ]
};


// other solution for knex bundling:
// const { NormalModuleReplacementPlugin } = require('webpack');
// module.exports = {
//   ...
//   plugins: [
//     // Ignore knex dynamic required dialects that we don't use
//     new NormalModuleReplacementPlugin(
//       /m[sy]sql2?|oracle(db)?|sqlite3|pg-(native|query)/,
//       'noop2'
//     ),
//   ],
// }
