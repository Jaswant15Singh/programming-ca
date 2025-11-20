const { pool, executeQuery } = require("../utils/db");
const getComplaint = async (req, res) => {
  try {
    const result = await executeQuery("SELECT * FROM complaint_def");
    res.status(200).json({ result: result.rows });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", success: false });
  }
};

const getSingleComplaint = async (req, res) => {
  try {
    const { complaint_id } = req.body;
    if (!complaint_id) {
      return res.status(400).json({ message: "Missing Fields" });
    }
    const result = await executeQuery(
      "SELECT * FROM complaint_def where complaint_id=$1",
      [complaint_id]
    );
    res.status(200).json({ result: result.rows });
  } catch (error) {
    res.status(500).json({ message: "Server Error", success: false });
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

const deleteComplaint = async (req, res) => {
  try {
    const { complaint_id } = req.body;
    const isComplaintPresent = await executeQuery(
      "SELECT * FROM complaint_def where complaint_id=$1",
      [complaint_id]
    );
    if (isComplaintPresent.rows.length < 1) {
      return res.status(400).json({ message: "Complaint does not exist" });
    }
    await executeQuery(
      "UPDATE complaint_def set status=false where complaint_id=$1",
      [complaint_id]
    );
    res
      .status(200)
      .json({ message: "Complaint Deleted Successfully", success: true });
  } catch (error) {}
};

const getAllComments = async (req, res) => {
  try {
    const result = await executeQuery("SELECT * FROM comments_def");
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Server Error", success: false });
  }
};

getCommentsOnComplaint = async (req, res) => {
  try {
    const { complaint_id } = req.body;
    if (!complaint_id) {
      return res.status(400).json({ message: "Missing Fields" });
    }
    const result = await executeQuery(
      "SELECT c.comment FROM comments_def c inner join complaint_def cd on cd.complaint_id=c.complaint_id where cd.complaint_id=$1",
      [complaint_id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Server Error", success: false });
  }
};
module.exports = {
  getComplaint,
  updateComplaint,
  getSingleComplaint,
  addComplaint,
  getAllComments,
  getCommentsOnComplaint,
};
