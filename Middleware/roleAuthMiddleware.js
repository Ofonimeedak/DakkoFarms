const jwt = require("jsonwebtoken");
require("dotenv").config();

const decodedToken=require('../Middleware/authMiddleware')

// const roleAuthorization = (permissionRequired) => {

//   return (req, res, next) => {

//     const roles = {
//     admin: ["write", "read", "update", "delete"],
//     customers:["read"]}

//     const userRole = req.user.role;
//     console.log(userRole)
    
//     if (!roles[userRole] || !permissionRequired.every((perm) => roles[userRole].includes(perm))) {
//       return res.status(403).json({ message: "forbidden access" });
//     }
    
//     next();
//   };
// };

// module.exports=roleAuthorization;

const roleAuthorization = (permissionRequired) => {
  return (req, res, next) => {
    const roles = {
      admin: ["write", "read", "update", "delete"],
      customer: ["read"]
    };

    const userRole = req.user.role; // ✅ req.user is set by previous middleware
    console.log("User role:", userRole);

    if (!roles[userRole] || !permissionRequired.every((perm) => roles[userRole].includes(perm))) {
      return res.status(403).json({ message: "forbidden access" });
    }

    next();
  };
};

module.exports = roleAuthorization;
