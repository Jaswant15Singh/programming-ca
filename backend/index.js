const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const pets = require("./router/pet");
app.use((req, res, next) => {
  console.log("next working");
  next();
});
app.use("/pets", pets);
app.use((req, res, err, next) => {
  res.status(500).json({ success: false, message: err.message });
});
// app.use();
app.listen(5000, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
