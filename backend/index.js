const express = require("express");
const path = require("path");
const session = require("express-session");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv").config();
const users = require("./router/users");
const admin = require("./router/admin");
const complaint = require("./router/complaint");
const officer = require("./router/officer");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);
app.use((req, res, next) => {
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
app.use("/officer", officer);
app.use("/complaint", complaint);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: err.message });
});
app.listen(5000, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
