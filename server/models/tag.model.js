const mongoose = require("mongoose");

// Define schema for dots
const TagSchema = new mongoose.Schema({
  text: String,
  posX: Number,
  posY: Number,
  dotcolor: String,
  bgcolor: String,
  textcolor: String,
  productID: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

// Create order model
const Tag = mongoose.model("Tag", TagSchema);

// Export the Order model
module.exports = Tag;
