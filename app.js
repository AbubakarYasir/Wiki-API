//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

// Setting up EJS and Express
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Mongoose Connection
mongoose.connect(
  "mongodb+srv://derek:" +
    `${process.env.MONGO_PASS}` +
    "@cluster0.jhh2bm6.mongodb.net/wikiDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Home Page (Request)
app.get("/", function (req, res) {
  // Render HOME Page
  res.render("home");
});

const port = 8000;
app.listen(port, function () {
  console.log("Server Started on http://localhost:" + port);
});
