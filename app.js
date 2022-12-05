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
    "mongodb+srv://derek:" + `${process.env.MONGO_PASS}` + "@cluster0.jhh2bm6.mongodb.net/wikiDB",
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

// All Articles (ROUTE request)
app.route("/articles")
    // Articles Page (GET request)
    .get(function (req, res) {
        // Find Articles
        Article.find({}, function (err, foundArticles) {
            if (!err) {
                // Send Found Articles
                res.send(foundArticles);
            } else {
                res.send(err);
            }
        });
    })
    // Articles Page (POST Request)
    .post(function (req, res) {
        // Fetch User (New) Article's data
        articleTitle = req.body.title;
        articleContent = req.body.content;

        const newArticle = new Article({
            title: articleTitle,
            content: articleContent,
        });
        // Save the User (New) Article
        newArticle.save(function (err) {
            if (!err) {
                res.send("Successfully added a new article.");
            } else {
                res.send(err);
            }
        });
    })

    // Articles Page (DELETE Request)
    .delete(function (req, res) {
        // Delete Articles
        Article.deleteMany(function (err) {
            // Delete the Articles
            if (!err) {
                res.send("Successfully deleted the article.");
            } else {
                res.send(err);
            }
        });
    });

// Specific Articles (ROUTE request)
app.route("/articles/:articleTitle")
    // Requested Article Page (GET request)
    .get(function (req, res) {
        // Find Articles
        Article.findOne({ title: req.params.articleTitle }, function (err, foundArticle) {
            if (foundArticle) {
                // Send Found Article
                res.send(foundArticle);
            } else {
                res.send("We couldn't find any articles matching that title!");
            }
        });
    })

    .put(function (req, res) {
        Article.updateOne(
            { title: req.params.articleTitle },
            { title: req.body.title, content: req.body.content },
            function (err) {
                if (!err) {
                    res.send("Successfully updated the selected article.");
                } else {
                    res.send(err);
                }
            }
        );
    })

    .patch(function (req, res) {
        Article.updateOne({ title: req.params.articleTitle }, { $set: req.body }, function (err) {
            if (!err) {
                res.send("Successfully updated the selected article.");
            } else {
                res.send(err);
            }
        });
    })

    // Articles Page (DELETE Request)
    .delete(function (req, res) {
        // Delete Articles
        Article.deleteOne({ title: req.params.articleTitle }, function (err, foundArticle) {
            // Delete the Articles
            if (foundArticle) {
                res.send("Successfully deleted the article.");
            } else {
                res.send("We couldn't find any articles matching that title!");
            }
        });
    });

const port = 3000;
app.listen(port, function () {
    console.log("Server Started on http://localhost:" + port);
});
