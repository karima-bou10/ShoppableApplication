// Define schema for images with associated dots
const mongoose = require("mongoose");

const CollectionSchema = new mongoose.Schema({
  imageUrl: String,
  dots: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }], // Array of dots associated with the image
  // Add any other properties you need for images
});

// Create model for images with associated dots
const Collection = mongoose.model("Collection", CollectionSchema);

module.exports = Collection;
