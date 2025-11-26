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
  getAllOfficers,
  getOfficer,
  getZones,
} = require("../controller/admin");
router.get("/get-admin", getAdmin);
router.post("/add-admin", addAdmin);
router.post("/admin-login", adminLogin);
router.put("/update-admin/:id", updateAdmin);
router.delete("/delete-admin", deleteAdmin);
router.post("/create-officer", createOfficer);
router.get("/get-zones", getZones);
router.post("/create-zone", createZone);
router.put("/update-zone/:zone_id", updateZone);
router.get("/get-all-officers", getAllOfficers);
router.get("/get-officer/:officer_id", getOfficer);
module.exports = router;
