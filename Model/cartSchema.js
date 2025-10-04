const  mongoose= require('mongoose');

const cartItemSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "products", required: true },
    quantity: { type: Number, default: 1 },
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users"},
  items: [cartItemSchema],
  bill: { type: Number, default: 0 },
  cartUpdate: { type: Date, default: Date.now },
});

// Only ONE model: Cart
const cart =  mongoose.model("cart", cartSchema);

module.exports=cart;

