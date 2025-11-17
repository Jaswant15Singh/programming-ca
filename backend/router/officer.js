const express = require("express");
const router = express.Router();
const {
  getAdmin,
  addAdmin,
  updateAdmin,
  deleteAdmin,
} = require("../controller/admin");
router.get("/get-admin", getAdmin);
router.post("/add-admin", addAdmin);
router.put("/update-admin", updateAdmin);
router.delete("/delete-admin", deleteAdmin);
module.exports = router;
