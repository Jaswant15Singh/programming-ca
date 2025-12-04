const express = require("express");
const router = express.Router();
const {
  updateOfficer,
  getComplantsByUsers,
  updateComplaintStatusByOfficer,
} = require("../controller/officer");
router.put("/update-officer/:officer_id", updateOfficer);
router.post("/complaints-by-officers", getComplantsByUsers);
router.post("/update-complaints-by-officers", updateComplaintStatusByOfficer);
module.exports = router;
