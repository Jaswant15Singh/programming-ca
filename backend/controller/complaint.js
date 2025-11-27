const { pool, executeQuery } = require("../utils/db");
const getComplaint = async (req, res) => {
  try {
    const result = await executeQuery("SELECT * FROM complaint_def");
    res.status(200).json(result.rows);
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

const getCommentsOnComplaint = async (req, res) => {
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

/*
request to be made
add,delete,update comments
*/

const addComment = async (req, res) => {
  try {
    const { complaint_id, comment, user_id } = req.body;
    if (!complaint_id || !comment) {
      res.status(400).json({ message: "Missing Fields" });
    }
    await executeQuery(
      "INSERT INTO comments_def (complaint_id, comment, comment_date, user_id) VALUES ($1, $2, NOW(), $3)",
      [complaint_id, comment, user_id]
    );

    res.status(200).json({ message: "Comment has been added", success: true });
  } catch (error) {
    res.status(500).json({ message: "Server Error", success: false });
  }
};

const deleteCommentsByComplaint = async (req, res) => {
  try {
    const { complaint_id } = req.body;

    if (!complaint_id) {
      return res.status(400).json({ message: "Missing complaint_id" });
    }

    const result = await executeQuery(
      "DELETE FROM comments_def WHERE complaint_id = $1",
      [complaint_id]
    );

    res.status(200).json({
      message: "Comments for the complaint deleted",
      count: result.rowCount,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", success: false });
  }
};

const likeComment = async (req, res) => {
  try {
    const { comment_id, user_id } = req.body;

    if (!comment_id || !user_id) {
      return res.status(400).json({ message: "Missing fields" });
    }

    await executeQuery(
      "INSERT INTO comment_likes (comment_id, user_id, liked_at) VALUES ($1, $2, NOW())",
      [comment_id, user_id]
    );

    res.status(200).json({
      message: "Comment liked",
      success: true,
    });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({
        message: "You already liked this comment",
        success: false,
      });
    }

    res.status(500).json({ message: "Server Error", success: false });
  }
};

const unlikeComment = async (req, res) => {
  try {
    const { comment_id, user_id } = req.body;

    if (!comment_id || !user_id) {
      return res.status(400).json({
        message: "Missing fields",
        success: false,
      });
    }

    const result = await executeQuery(
      "DELETE FROM comment_likes WHERE comment_id = $1 AND user_id = $2",
      [comment_id, user_id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Like not found or already removed",
        success: false,
      });
    }

    res.status(200).json({
      message: "Comment unliked",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};

module.exports = {
  getComplaint,
  updateComplaint,
  getSingleComplaint,
  addComplaint,
  getAllComments,
  getCommentsOnComplaint,
  addComment,
  deleteCommentsByComplaint,
  likeComment,
  unlikeComment,
};
