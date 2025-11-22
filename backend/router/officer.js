const express = require("express");
const router = express.Router();
const { updateOfficer } = require("../controller/officer");
router.put("/update-officer", updateOfficer);
module.exports = router;
