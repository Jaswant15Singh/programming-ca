const express = require("express");
const path = require("path");
const app = express();
const dotenv = require("dotenv").config();
const users = require("./router/users");
const admin = require("./router/admin");
app.use(express.static("public"));

// console.log(express.static("./index.js"));

app.use((req, res, next) => {
  console.log("next working");
  next();
});
app.use("/users", users);
app.use("/admin", admin);
app.use((req, res, err, next) => {
  res.status(500).json({ success: false, message: err.message });
});
app.listen(5000, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
