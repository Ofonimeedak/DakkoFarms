const blogModel = require("../Model/blogSchema");

exports.newBlogPost = async (req, res) => {
  const { headline, post_type, author, date_published, key_points } = req.body;
  const imageURl = await req.files.map((file) => file.path);
  if (!headline || !post_type) {
    return res.status(400).json({ message: "bad request" });
  }

  try {
    const newPost = await blogModel.create({
      headline,
      post_type,
      author,
      date_published,
      key_points,
      images: imageURl,
    });

    res
      .status(201) .json({ message: "post created successfully", post: newPost });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.readPost = async (req, res) => {
  const { headline } = req.params;
  if (!headline) {
    return res.status(400).json({ message: "Blog post Headline is required" });
  }

  try {
    const existingPost = await blogModel.findOne({ headline });

    if (!existingPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res
      .status(200)
      .json({ message: "post retrived successfully", post: existingPost });
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};

exports.updatePost = async (req, res) => {
  const { headline } = req.params;
  const { key_points } = req.body;
  if (!headline) {
    return res.status(400).json({ message: "Blog post Headline is required" });
  }

  try {

    
    const updateData = {};
    if (key_points !== undefined) {
      updateData.key_points = key_points;
    }

    if (req.files && req.files.length>0) { 
        updateData.images =req.files.map((file)=>file.path)
    }
    
    const existingPost = await blogModel.findOneAndUpdate(
      { headline },
       updateData ,
      { new: true, runValidators:true }
    );

    if (!existingPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res
      .status(200)
      .json({ message: "post updated successfully", post: existingPost });
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};


exports.deleteBlog=async(req,res)=>{

const {headline}=req.params;
 
if(!headline){ return res.status(400).json({message:"bad request"})}
const deletePost= await blogModel.findOneAndDelete({headline})

if(deletePost){
res.status(200).json({message:"post deleted succesfully"})}

else{

    res.status(404).json({message:"error deleting post"})
}
}