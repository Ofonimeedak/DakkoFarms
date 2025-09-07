const productModel = require("../Model/ProductModel");

exports.getProducts = async (req, res) => {
  try {
    res.status(200).json({ message: "Product fetched successfully" });
  } catch (err) {
    res.status(500).json({ Error: "error fetching products" });
  }
};

exports.singleProducts = async (req, res) => {
  try {
    res.status(200).json({ message: "Single Product fetched successfully" });
  } catch (err) {
    res.status(500).json({ Error: "error fetching  single product" });
  }
};

exports.newProduct = async (req, res) => {
  const {
    name,
    description,
    price,
    slug,
    discountPrice,
    avarageRating,
    numReviews,
  } = req.body;
  try {
    if (!req.files || req.files.length === 0) {
      return res
        .status(400).json({ message: "Atleast one file to be uploaded" });
    }
    const imageUrl = req.files.map((file) => file.path);
    const product = await productModel.create({
      name,
      description,
      price,
      slug,
      discountPrice,
      avarageRating,
      numReviews,
      images: imageUrl,
    });

    res.status(201).json({ message: " New Product created successfully", data:product });
  } catch (err) {
    res.status(500).json({ Error: "error creating new  products" });
  }
};

exports.updateProducts = async (req, res) => {
  try {
    res.status(200).json("Product updated successfully");
  } catch (err) {
    res.status(500).json({ Error: "error updating products" });
  }
};

exports.deleteProducts = async (req, res) => {
  try {
    res.status(200).json("Product deleted successfully");
  } catch (err) {
    res.status(500).json({ Error: "error deleting products" });
  }
};
