module.exports = (app) => {
  const products = require("../Controllers/product.controller.js");

  var router = require("express").Router();

  // Create a new Product
  router.post("/", products.create);

  // Retrieve all Products
  router.get("/", products.findAll);

  // Retrieve a single Product with id
  router.get("/:id", products.findOne);

  // Update a Product with id
  router.put("/:id", products.update);

  // Delete a Product with id
  router.delete("/:id", products.delete);

  // Delete all Products with a specified category
  router.delete("/category/:id", products.deleteByCategory);

  // Get the number of products in a specified category
  router.get("/category/count/:id", products.getNumberOfProductsInCategory);

  app.use("/api/products", router);
};
