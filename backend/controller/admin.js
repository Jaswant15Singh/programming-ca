const { pool, executeQuery } = require("../utils/db");
const upload = require("../utils/multer");
const getAdmin = async (req, res) => {
  try {
    const data = await executeQuery("select * from admin_def");
    console.log(data.rows[0]);
    res.json(data.rows[0]);
  } catch (error) {
    console.log(error);
  }
};

const addAdmin = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

const updateAdmin = (req, res) => {
  try {
    const { admin_id } = req.body;
  } catch (error) {
    console.log(error);
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const { admin_id } = req.body;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAdmin, addAdmin, updateAdmin, deleteAdmin };
