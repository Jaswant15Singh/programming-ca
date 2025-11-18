const express = require("express");
const router = express.Router();
const { getComplaint, updateComplaint } = require("../controller/complaint");
router.get("/get-complaints", getComplaint);
router.put("/update-complaint", updateComplaint);

module.exports = router;
