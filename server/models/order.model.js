const mongoose = require("mongoose");

// Define order schema
const orderSchema = new mongoose.Schema({
  client: {
    name: String,
    email: String,
    telephone: String,
  },
  address: String,
  total: Number,
  dateCreation: Date,
  statut: Boolean,
});

// Create order model
const Order = mongoose.model("Order", orderSchema);

// Export the Order model
module.exports = Order;
