const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  database: "icetube_dev",
  password: "mynewpassword",
  port: 5432,
  host: "localhost",
});

module.exports = { pool };