const express = require("express");
const router = express.Router();
const { getUsers, addUser, updateUser } = require("../controller/users");
router.get("/get-users", getUsers);
router.post("/add-user", addUser);
router.put("/update-user", updateUser);
module.exports = router;
