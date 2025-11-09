const { pool, executeQuery } = require("../utils/db");
const upload = require("../utils/multer");
const getUsers = async (req, res) => {
  try {
    const data = await executeQuery("select * from users_def");
    console.log(data.rows[0]);
    res.json(data.rows[0]);
  } catch (error) {
    console.log(error);
  }
};

const addUser = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { user_id } = req.body;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getUsers, addUser, updateUser };
