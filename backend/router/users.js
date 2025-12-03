const express = require("express");
const router = express.Router();
const {
  getUsers,
  addUser,
  updateUser,
  userLogin,
  getUserProfile,
} = require("../controller/users");
router.get("/get-users", getUsers);
router.post("/add-user", addUser);
router.post("/user-login", userLogin);
router.put("/update-user", updateUser);
router.get("/profile/:user_id", getUserProfile);
module.exports = router;
