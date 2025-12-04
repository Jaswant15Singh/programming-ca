const { pool, executeQuery } = require("../utils/db");
const getComplaint = async (req, res) => {
  try {
    const result =
      await executeQuery(`select  cd.complaint_id,cd.complaint,zd.zone_name,cd.complaint_address,cd.complaint_images ,u.user_name,cd.status,cd.complaint_date from complaint_def cd
inner join users_def  u on u.user_id=cd.user_id inner join zones_def zd on zd.zone_id=cd.zone_name`);
    res.status(200).json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", success: false });
  }
};

const getComplaintByUsers = async (req, res) => {
  try {
    const { user_id } = req.params;
    if (!user_id) {
      return res.status(400).json({ message: "Missing Fields" });
    }
    const result = await executeQuery(
      "SELECT * FROM complaint_def where user_id=$1",
      [user_id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
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
    res.status(200).json({ result: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: "Server Error", success: false });
  }
};
const addComplaint = async (req, res) => {
  try {
    const { user_id, complaint, zone_name, address } = req.body;
    console.log(user_id, complaint, zone_name);

    const files = req.files;
    if (!files || files.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one image is required" });
    }

    if (!user_id || !complaint) {
      return res.status(400).json({ message: "Missing Fields" });
    }

    const imagePaths = files.map((file) => file.path);
    await executeQuery(
      "INSERT INTO complaint_def (user_id,complaint,complaint_images,status,complaint_date,zone_name,complaint_address) values ($1,$2,$3,'pending',now(),$4,$5)",
      [user_id, complaint, imagePaths, zone_name, address]
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

const assignOfficerToComplaint = async (req, res) => {
  try {
    const { complaintId } = req.params;
    const { officer_id } = req.body;

    if (!officer_id) {
      return res.status(400).json({
        success: false,
        message: "Officer ID is required",
      });
    }

    const query = `
      UPDATE complaint_def 
      SET assigned_officer = $1, 
          status = 'progress'
      WHERE complaint_id = $2
      RETURNING *
    `;

    const result = await pool.query(query, [officer_id, complaintId]);

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Officer assigned successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error assigning officer:", error);
    res.status(500).json({
      success: false,
      message: "Failed to assign officer",
      error: error.message,
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
  getComplaintByUsers,
  assignOfficerToComplaint,
};
