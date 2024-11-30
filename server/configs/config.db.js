const {Client} = require('pg');

const {DB_HOST, DB_NAME, DB_PORT, DB_USER, DB_PASSWORD} = process.env;

const DB = new Client({
  database: DB_NAME,
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
});
 
module.exports = DB;
