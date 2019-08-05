require('dotenv').config()

module.exports = {
  client: 'mysql2',
  connection: {
    host: process.env.MYSQL_HOSTNAME || 'localhost',
    user: process.env.MYSQL_USERNAME || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'elings_ar'
  }
}
