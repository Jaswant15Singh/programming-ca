const express = require("express");
const router = express.Router();
const { getPets } = require("../controller/pets");
router.get("/get-pets", getPets);

module.exports = router;
