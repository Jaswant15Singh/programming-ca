const express = require("express");
const router = express.Router();
const {
  getAdmin,
  addAdmin,
  adminLogin,
  updateAdmin,
  deleteAdmin,
  createOfficer,
  createZone,
  updateZone,
} = require("../controller/admin");
router.get("/get-admin", getAdmin);
router.post("/add-admin", addAdmin);
router.post("/admin-login", adminLogin);
router.put("/update-admin/:id", updateAdmin);
router.delete("/delete-admin", deleteAdmin);
router.post("/create-officer", createOfficer);
router.post("/create-zone", createZone);
router.put("/update-zone/:zone_id", updateZone);
module.exports = router;
