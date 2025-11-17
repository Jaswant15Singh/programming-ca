const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { pool, executeQuery } = require("../utils/db");
const upload = require("../utils/multer");
const getAdmin = async (req, res) => {
  try {
    const data = await executeQuery("select * from admin_def");
    console.log(data.rows[0]);
    res.json(data.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", success: false });
  }
};

const addAdmin = async (req, res) => {
  try {
    const {
      admin_name,
      admin_address,
      admin_email,
      admin_contact,
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
      INSERT INTO admin_def 
      (admin_name, admin_address, admin_email, admin_contact, created_date, login_username, password) 
      VALUES ($1, $2, $3, $4, NOW(), $5, $6)
      RETURNING admin_id, admin_name, admin_email, login_username
    `;

    const values = [
      admin_name,
      admin_address,
      admin_email,
      admin_contact,
      login_username,
      hashedPassword,
    ];

    const result = await executeQuery(query, values);

    res.status(201).json({
      message: "Admin created successfully",
      admin: result.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", success: false });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { login_username, password } = req.body;

    if (!login_username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password required" });
    }

    const query = "SELECT * FROM admin_def WHERE login_username = $1";
    const result = await executeQuery(query, [login_username]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const admin = result.rows[0];

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { admin_id: admin.admin_id, username: admin.login_username },
      process.env.JWT_TOKEN,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token: token,
      admin: {
        admin_id: admin.admin_id,
        admin_name: admin.admin_name,
        admin_email: admin.admin_email,
        login_username: admin.login_username,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", success: false });
  }
};

const updateAdmin = async (req, res) => {
  try {
    const admin_id = req.params.id;

    const {
      admin_name,
      admin_address,
      admin_email,
      admin_contact,
      login_username,
      password,
    } = req.body;

    const checkQuery = "SELECT * FROM admin_def WHERE admin_id = $1";
    const checkResult = await executeQuery(checkQuery, [admin_id]);

    if (checkResult.rows.length === 0) {
      return res.status(404).json({ message: "Admin not found" });
    }

    let hashedPassword = checkResult.rows[0].password;

    if (password && password.trim() !== "") {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const query = `
      UPDATE admin_def SET
        admin_name = $1,
        admin_address = $2,
        admin_email = $3,
        admin_contact = $4,
        login_username = $5,
        password = $6
      WHERE admin_id = $7
      RETURNING admin_id, admin_name, admin_email, login_username
    `;

    const values = [
      admin_name,
      admin_address,
      admin_email,
      admin_contact,
      login_username,
      hashedPassword,
      admin_id,
    ];

    const result = await executeQuery(query, values);

    res.json({
      message: "Admin updated successfully",
      admin: result.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", success: false });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const { admin_id } = req.body;
  } catch (error) {
    res.status(500).json({ message: "Server Error", success: false });
  }
};

const createZone = async (req, res) => {
  try {
    const { zone_name } = req.body;
    const zoneName = zone_name.toLowerCase();
    const isZonePresent = await executeQuery(
      "select * from zones_def where zone_name=$1",
      [zoneName]
    );
    if (isZonePresent.rows.length > 0) {
      return res.status(400).json({ message: "Zone already exists" });
    }
    const result = await executeQuery(
      "INSERT INTO zones_def(zone_name,created_date) values ($1,now())",
      [zoneName]
    );
    res.status(200).json({ message: "Zone Created Suvvessfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", success: false });
  }
};

const updateZone = async (req, res) => {
  try {
    const { zone_name } = req.body;
    const { zone_id } = req.params;

    const checkQuery = "SELECT * FROM zones_def WHERE zone_id = $1";
    const checkResult = await executeQuery(checkQuery, [zone_id]);

    if (checkResult.rows.length === 0) {
      return res.status(404).json({ message: "Zone not found" });
    }
    const result = await executeQuery(
      "UPDATE zones_def set zone_name=$1,updated_date=now() where zone_id=$2",
      [zone_name, zone_id]
    );
    res
      .status(200)
      .json({ message: "Zone Updated Successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Server Error", success: false });
  }
};
const createOfficer = async (req, res) => {
  try {
    const {
      officer_name,
      officer_address,
      officer_email,
      officer_contact,
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
      INSERT INTO officer_def 
      (officer_name, officer_address, officer_email, officer_contact, created_date, login_username, password) 
      VALUES ($1, $2, $3, $4, NOW(), $5, $6)
      RETURNING officer_id, officer_name, officer_email, login_username
    `;

    const values = [
      officer_name,
      officer_address,
      officer_email,
      officer_contact,
      login_username,
      hashedPassword,
    ];

    const result = await executeQuery(query, values);
    res.status(201).json({
      message: "Officer created successfully",
      admin: result.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", success: false });
  }
};

module.exports = {
  getAdmin,
  adminLogin,
  addAdmin,
  updateAdmin,
  deleteAdmin,
  createOfficer,
  createZone,
  updateZone,
};
