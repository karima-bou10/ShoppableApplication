const mongoose = require("mongoose");

var schema = mongoose.Schema({
  name: String,
  reference: { type: String, unique: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  quantity: { type: Number, min: 0, integer: true },
  description: String,
  price: { type: Number, min: 0 }, // Double (positive)
  image: String,
  creationDate: { type: Date, default: Date.now() },
});

schema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const Product = mongoose.model("Product", schema);

module.exports = Product;
