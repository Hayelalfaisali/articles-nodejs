import mongoose from "mongoose";
const Schema  = mongoose.Schema;

const articleSchema = new Schema({
  title: {
    type: String,
  },
  body: {
    type: String,
  },
  numberOfLikes: {
    type: Number,
    default: 0,
  },
});
const Article = mongoose.model("Article", articleSchema);
export default Article;
