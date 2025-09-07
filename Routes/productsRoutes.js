const express = require("express");
const Router = express.Router();
const productControllers = require("../Controller/ProductController");
const upload= require("../multer");

// router.get("/all", productControllers.getProducts); //fetch product
// router.get("/:id", productControllers.singleProducts); //get single products
Router.post("/new", upload.array('images',5), productControllers.newProduct); //create new products
// router.put("/update/:id", productControllers.updateProducts); //update products
// router.delete("/delete/:id", productControllers.deleteProducts); // Delete products

module.exports = Router;
