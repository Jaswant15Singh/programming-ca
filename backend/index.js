const express = require("express");
const path = require("path");
const session = require("express-session");
const app = express();
const dotenv = require("dotenv").config();
const users = require("./router/users");
const admin = require("./router/admin");
const complaint = require("./router/complaint");
app.use(express.static("public"));
app.use(express.json());

// console.log(express.static("./index.js"));

app.use((req, res, next) => {
  console.log("next working");
  next();
});
app.use(
  session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, expire: 60000 },
  })
);

app.use("/users", users);
app.use("/admin", admin);
app.use("/complaint", complaint);
app.use((req, res, err, next) => {
  res.status(500).json({ success: false, message: err.message });
});
app.listen(5000, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
