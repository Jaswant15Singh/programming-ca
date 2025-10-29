const { pool, executeQuery } = require("../utils/db");
const getPets = async (req, res) => {
  try {
    const data = await executeQuery("select * from pets_def");
    console.log(data.rows[0]);
    res.json(data.rows[0]);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getPets };
