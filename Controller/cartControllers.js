const { default: mongoose } = require("mongoose");
const cart = require("../Model/cartSchema");
const productModel = require("../Model/ProductModel");

exports.addItem = async (req, res) => {
  const { userId } = req.params; // from user collection in the database
  const { productId, quantity } = req.body;

  try {
    //check if the product the customer intend to buy exist in the products collection
    const existing_product = await productModel.findById(productId);

    if (!existing_product) {
      return res.status(404).json({ message: "product not found" });
    }

    // if the products exist gets the products current price
    const price = existing_product.price;

    // check if the user has a cart using the userId
    let userCart = await cart.findOne({ userId });
    if (!userCart) {
      userCart = new cart({
        userId,
        items: [{ productId, quantity }],
        bill: quantity * price,
      }); //if a user has no cart create a new cart and add the products to it
    } else {
      const item = userCart.items.find(
        (p) => p.productId.toString() === productId
      );
      //checks if there is any item with similar Id in the cart
      if (item) {
        item.quantity += quantity;
        // if there is increase the quantity
      } else {
        if (!item) {
          userCart.items.push({ productId: productId, quantity: quantity });
        }
      }
    }
    userCart.bill = 0;
    for (let i of userCart.items) {
      const prouduct_in_cart = await productModel.findById(i.productId);
      userCart.bill += i.quantity * prouduct_in_cart.price;
    }

    await userCart.save();
    res.status(201).json({ message: "new items added to cart", userCart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.removeItem = async (req, res) => {
  const { userId } = req.params;
  const { productId } = req.body;

  try {
    const Cart = await cart.findOne({ userId });
    if (!Cart) {
      return res.status(404).json({ message: "user cart not found" });
    }
    const item = Cart.items.find((p) => p.productId.toString() === productId);
    if (!item) {
      return res.status(404).json({ message: "product not in cart" });
    }
  
        Cart.items = Cart.items.filter((p) => p.productId.toString() !== productId);
       
        Cart.bill = 0;
    for (let i of Cart.items) {
      const prouduct_in_cart = await productModel.findById(i.productId);
      Cart.bill += i.quantity * prouduct_in_cart.price;
        }
  
    await Cart.save();
    res.status(200).json({ message: "Item remove from cart succefully" , Cart});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
