const express = require("express");
const router = express.Router();
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
} = require("../controller/complaint");
router.get("/get-complaints", getComplaint);
router.put("/update-complaint", updateComplaint);
router.post("/add-complaint", addComplaint);
router.get("/get-single-comment", getSingleComplaint);
router.get("/get-all-comments", getAllComments);
router.post("/add-comment", addComment);
router.get("get-comments-on-complaint", getCommentsOnComplaint);
router.delete("/delete-complaints-by-complaint", deleteCommentsByComplaint);
router.post("/like-comment", likeComment);
router.delete("/unlike-comment", unlikeComment);
module.exports = router;
