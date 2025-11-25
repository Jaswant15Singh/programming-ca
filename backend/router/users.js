const express = require("express");
const router = express.Router();
const {
  getUsers,
  addUser,
  updateUser,
  userLogin,
} = require("../controller/users");
router.get("/get-users", getUsers);
router.post("/add-user", addUser);
router.post("/user-login", userLogin);
router.put("/update-user", updateUser);
module.exports = router;
