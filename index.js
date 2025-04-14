import express from "express";
import mongoose from "mongoose";
import Article from "./models/Article.js";

const app = express();
app.use(express.json());

const uri =
  "mongodb+srv://root:root@myfirstnodejscluster.apxuijv.mongodb.net/myFirstNodeJsCluster?retryWrites=true&w=majority";

// Connect to MongoDB with Mongoose
mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB with Mongoose");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

// Route to create a new article
app.post("/articles", async (req, res) => {
  try {
    const { title, body, numberOfLikes } = req.body;
    const newArticle = new Article({
      title,
      body,
      numberOfLikes,
    });
    await newArticle.save();
    res
      .status(201)
      .json({ message: "Article created successfully!", article: newArticle });
  } catch (error) {
    res.status(500).send("Error creating article: " + error);
  }
});

app.get("/articles", async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).send("Error fetching articles: " + error);
  }
});

app.get("/articles/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).send("Article not found");
    }
    res.status(200).json(article);
  } catch (error) {
    res.status(500).send("Error fetching article: " + error);
  }
});
app.put("/articles/:id", async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!article) {
      return res.status(404).send("Article not found");
    }
    res.status(200).json(article);
  } catch (error) {
    res.status(500).send("Error updating article: " + error);
  }
});

app.delete("/articles/:id", async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).send("Article not found");
    }
    res.status(200).json({ message: "Article deleted successfully!" });
  } catch (error) {
    res.status(500).send("Error deleting article: " + error);
  }
});

// Start the Express server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
