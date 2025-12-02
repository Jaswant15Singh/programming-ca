const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");
const {
  getComplaint,
  updateComplaint,
  getSingleComplaint,
  addComment,
  addComplaint,
  getAllComments,
  getCommentsOnComplaint,
  likeComment,
  deleteCommentsByComplaint,
  unlikeComment,
  getComplaintByUsers,
  assignOfficerToComplaint,
} = require("../controller/complaint");
router.get("/get-complaints", getComplaint);
router.get("/get-complaints-by-user/:user_id", getComplaintByUsers);
router.put("/update-complaint", updateComplaint);
router.post(
  "/add-complaint",
  upload.array("complaint_images", 10),
  addComplaint
);
router.get("/get-single-comment", getSingleComplaint);
router.get("/get-all-comments", getAllComments);
router.post("/add-comment", addComment);
router.get("/get-comments-on-complaint", getCommentsOnComplaint);
router.delete("/delete-complaints-by-complaint", deleteCommentsByComplaint);
router.post("/like-comment", likeComment);
router.delete("/unlike-comment", unlikeComment);
router.put("/assign-officer-complaint/:complaintId", assignOfficerToComplaint);
module.exports = router;
