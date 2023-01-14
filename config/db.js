
const mysql = require('mysql2');

const db = {
  /* don't expose password or any sensitive info, done only for demo */
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'check_stc'
}

module.exports = mysql.createConnection(db)


