const mongoose = require("mongoose");

const cartItemsSchema = new mongoose.Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "products", required: true },
    quantity: { type: Number, default: 1 },
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema({
  items: [cartItemsSchema],
  cartUpdate: { type: Date, default: Date.now },
});

const cartItems = mongoose.model("cart-items", cartItemsSchema);
const cart = mongoose.model("cart", cartSchema);
export { cartItems, cart };
