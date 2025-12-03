const { pool, executeQuery } = require("../utils/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const upload = require("../utils/multer");
const getUsers = async (req, res) => {
  try {
    const data = await executeQuery("select * from users_def");
    res.json(data.rows);
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

const userLogin = async (req, res) => {
  try {
    const { login_username, password } = req.body;

    if (!login_username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password required" });
    }

    const query = "SELECT * FROM users_def WHERE login_username = $1";
    const result = await executeQuery(query, [login_username]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = result.rows[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    req.session.user = user;

    const token = jwt.sign(
      { user_id: user.user_id, username: user.login_username },
      process.env.JWT_TOKEN,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token: token,
      user: {
        user_id: user.user_id,
        user_name: user.user_name,
        user_email: user.user_email,
        login_username: user.login_username,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", success: false });
  }
};

const updateUser = async (req, res) => {
  try {
    const { user_name, user_address, user_email, user_contact, user_id } =
      req.body;

    const checkQuery = "SELECT * FROM users_def WHERE user_id = $1";
    const checkResult = await executeQuery(checkQuery, [user_id]);

    if (checkResult.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // let hashedPassword = checkResult.rows[0].password;

    // if (password && password.trim() !== "") {
    //   hashedPassword = await bcrypt.hash(password, 10);
    // }

    const query = `
       UPDATE users_def SET
         user_name = $1,
         user_address = $2,
         user_email = $3,
         user_contact = $4
       WHERE user_id = $5
       RETURNING user_id, user_name, user_email, login_username
     `;

    const values = [user_name, user_address, user_email, user_contact, user_id];

    const result = await executeQuery(query, values);

    res.json({
      message: "User updated successfully",
      admin: result.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", success: false });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const { user_id } = req.params;
    const result = await executeQuery(
      "Select * from users_def where user_id=$1",
      [user_id]
    );
    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: "Server Error", success: false });
  }
};

module.exports = { getUsers, addUser, updateUser, userLogin, getUserProfile };
