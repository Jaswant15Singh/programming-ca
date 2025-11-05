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
    const { pet_name, per_description, additional_policy } = req.body;
    const { pet_images } = req.file;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getUsers, addUser };
