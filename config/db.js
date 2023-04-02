
const mysql = require('mysql2');

const db = {
  /* don't expose password or any sensitive info, done only for demo */
  host: 'p3nlmysql173plsk.secureserver.net',
  user: 'stc_admin',
  password: 'Akh123456@',
  database: 'stcdatabase'
}

module.exports = mysql.createConnection(db)


