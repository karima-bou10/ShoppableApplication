const mongoose = require("mongoose");

// Define schema for orderDetail
const orderDetailSchema = new mongoose.Schema({
  idProduct: String,
  idOrder: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  quantite: Number,
});

// Create model for orderDetail
const orderDetail = mongoose.model("orderDetail", orderDetailSchema);

// Export the Order model
module.exports = orderDetail;
