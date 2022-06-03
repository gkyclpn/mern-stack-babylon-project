const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const PORT = 4000;
app.use(cors());
app.use(bodyParser.json());
require("./routes/auth.routes")(app);

mongoose.connect(
  "mongodb+srv://root:gokay123@cluster0.w1rxq.mongodb.net/mern-stack",
  { useNewUrlParser: true }
);
const connection = mongoose.connection;

connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});
