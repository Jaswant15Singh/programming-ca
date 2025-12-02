const express = require("express");
const router = express.Router();
const { updateOfficer, getComplantsByUsers } = require("../controller/officer");
router.put("/update-officer/:officer_id", updateOfficer);
router.post("/complaints-by-officers", getComplantsByUsers);
module.exports = router;
