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

// Schema for Articles
const articleSchema = {
  title: String,
  content: String,
};

// Model for Articles
const Article = mongoose.model("Article", articleSchema);

// Home Page (GET Request)
app.get("/", function (req, res) {
  // Render HOME Page
  res.render("home");
});

// Articles Page (GET Request)
app.get("/articles", function (req, res) {
  Article.find({}, function (err, foundArticles) {
    if (!err) {
      res.send(foundArticles);
    } else {
      res.send(err);
    }
  });
});

// Articles Page (POST Request)
app.get("/articles", function (req, res) {
  Article.find({}, function (err, foundArticles) {
    if (!err) {
      res.send(foundArticles);
    } else {
      res.send(err);
    }
  });
});

const port = 3000;
app.listen(port, function () {
  console.log("Server Started on http://localhost:" + port);
});
