const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DATABASE,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DB_PORT,
  ssl: { rejectUnauthorized: false },
});

const executeQuery = async (text, params = []) => {
  try {
    const result = await pool.query(text, params);
    return result;
  } catch (error) {
    console.error("Query Error:", error);
    throw error;
  }
};

global.executeQuery = executeQuery;
global.db = pool;

module.exports = { executeQuery, pool };
