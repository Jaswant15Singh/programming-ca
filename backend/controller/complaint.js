const { pool, executeQuery } = require("../utils/db");
const getComplaint = async (req, res) => {
  try {
    const result = await executeQuery("SELECT * FROM complaint_def");
    res.status(200).json({ result: result.rows });
  } catch (error) {
    console.log(error);
  }
};

const addComplaint = async (req, res) => {
  try {
    const { user_id, complaint } = req.body;
    if (!user_id || !complaint) {
      return res.status(400).json({ message: "Missing Fields" });
    }
    await executeQuery(
      "INSERT INTO complaint_def (user_id,complaint,status,created_date) values ($1,$2,false,now())",
      [user_id, complaint]
    );
    res
      .status(200)
      .json({ message: "Complaint Created Successfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", success: false });
  }
};

const updateComplaint = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getComplaint, updateComplaint };
