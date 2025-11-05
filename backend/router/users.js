const express = require("express");
const router = express.Router();
const { getUsers, addUser } = require("../controller/users");
router.get("/get-users", getUsers);
router.post("/add-user", addUser);
module.exports = router;
