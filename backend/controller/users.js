const { pool, executeQuery } = require("../utils/db");
const bcrypt = require("bcrypt");
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
    const {
      user_name,
      user_address,
      user_email,
      user_contact,
      login_username,
      password,
    } = req.body;

    if (!login_username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `
      INSERT INTO users_def 
      (user_name, user_address, user_email, user_contact, created_date, login_username, password) 
      VALUES ($1, $2, $3, $4, NOW(), $5, $6)
      RETURNING user_id, user_name, user_email, login_username
    `;

    const values = [
      user_name,
      user_address,
      user_email,
      user_contact,
      login_username,
      hashedPassword,
    ];
    const result = await executeQuery(query, values);
    res.status(201).json({
      message: "User created successfully",
      admin: result.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", success: false });
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
