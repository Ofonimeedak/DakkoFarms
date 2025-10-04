const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    post_type: { type: String, enum:["news","article","reserch"]},
    author: { type: String },
    date_published: { type: Date },
    headline: { type: String, required:true, unique:true },
    key_points: { type: String },
    images: [{ type: String }],
  },
  { timestamps: true }
);

const blogModel= mongoose.model("blog",blogSchema);
module.exports=blogModel;