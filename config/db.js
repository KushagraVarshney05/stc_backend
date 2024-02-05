const mysql = require("mysql2");

const db = {
  /* don't expose password or any sensitive info, done only for demo */
  host: "p3nlmysql173plsk.secureserver.net",
  user: "stc_admin",
  password: "Akh123456@",
  database: "stcdatabase",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  connectTimeout: 30000, // 30 seconds
  rowsAsArray: false,
  enableKeepAlive: true,
  multipleStatements: true,
};

// var connection;

const connection = mysql.createPool(db);
// function handleDisconnect() {
//   console.log("I am Trying....")
//   connection = mysql.createPool(db);

//   connection.connect(function(err) {
//     if(err) {
//       console.log('error when connecting to db:', err);
//       setTimeout(handleDisconnect, 2000);
//     }

//   });
//   connection.on('error', function(err) {
//     console.log('db error', err);
//     if(err) {
//       handleDisconnect();
//     } else {
//       throw err;
//     }
//   });
// }

// handleDisconnect();
module.exports = connection;
