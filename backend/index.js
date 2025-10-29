const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const pets = require("./router/pet");
app.use("/pets", pets);
app.listen(5000, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
