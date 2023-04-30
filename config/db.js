
const mysql = require('mysql2');

const db = {
  /* don't expose password or any sensitive info, done only for demo */
  host: 'database-1.ccqfducx3ckk.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'Akh123456',
  database: 'Data',
  port: 3306
}
var connection;

function handleDisconnect() {
  console.log("I am Trying....")
  connection = mysql.createConnection(db); 

  connection.connect(function(err) {              
    if(err) {                                 
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); 
    }   

  });                                     
  connection.on('error', function(err) {
    console.log('db error', err);
    if(err) { 
      handleDisconnect();                       
    } else {                                    
      throw err;                               
    }
  });
}

handleDisconnect();
module.exports = connection;


