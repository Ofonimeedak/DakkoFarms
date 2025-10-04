const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: String,
  picture: String,

  // OAuth tokens
  accessToken: String,
  refreshToken: String,
  tokenExpiry: Date,

  // App-specific fields
  role: { type: String, default: "user" },
  createdAt: { type: Date, default: Date.now }
});

 
 const authUser= mongoose.model("google", userSchema);
 module.exports=authUser;