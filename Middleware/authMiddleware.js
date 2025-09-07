const jwt = require("jsonwebtoken");
require("dotenv").config();

const tokenMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ message: "Unauthorized token" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Invalid token" })};

  //   }
  //   const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
         
  // req.user = decodedToken;
  //     next();


  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid or expired token" });

    req.user = decoded; // ✅ decoded token attached here
    console.log("Decoded token:", decoded); // 🔍 debug
    next();})

  } catch (err) {
    res.status(403).json({ error: "Error logging", details: err.message });
  }
};
module.exports=tokenMiddleware;
