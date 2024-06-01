const db = require("../models");
const Product = db.product;
const Category = db.category;

// Create and Save a new Product
exports.create = (req, res) => {
  // Validate request
  if (
    !req.body.name ||
    !req.body.price ||
    !req.body.quantity ||
    !req.body.category
  ) {
    return res.status(400).send({
      message: "Name, price, quantity, and category are required fields.",
    });
  }

  // Create a Product
  const product = new Product({
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    quantity: req.body.quantity,
    description: req.body.description || "", // Description is optional
    image: req.body.image || "", // Image is optional
  });

  // Save Product in the database
  product
    .save()
    .then((data) => {
      res.status(201).send({ message: "Product created successfully.", data });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Product.",
      });
    });
};

// Retrieve all Products from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};

  Product.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Products.",
      });
    });
};

// Find a single Product with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Product.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Product with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Product with id=" + id });
    });
};

// Update a Product by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Product.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Product with id=${id}. Maybe Product was not found!`,
        });
      } else res.send({ message: "Product was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Product with id=" + id,
      });
    });
};

// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Product.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Product with id=${id}. Maybe Product was not found!`,
        });
      } else {
        res.send({
          message: "Product was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Product with id=" + id,
      });
    });
};

// Delete all Products with a specified category
exports.deleteByCategory = (req, res) => {
  const categoryId = req.params.id;

  // Find the category document by name
  Category.findOne({ _id: categoryId }).then((category) => {
    if (!category) {
      return res.status(404).send({
        message: `Category with id=${categoryId} not found.`,
      });
    }

    Product.deleteMany({ category: categoryId })
      .then((data) => {
        if (data.deletedCount === 0) {
          res.status(404).send({
            message: `No products found with category name=${category.name}.`,
          });
        } else {
          res.send({
            message: `Deleted ${data.deletedCount} products with category name=${category.name}.`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: `Error deleting products with category name=${category.name}.`,
        });
      });
  });
};

// Get the number of products in a specified category
exports.getNumberOfProductsInCategory = (req, res) => {
  const categoryId = req.params.id;

  Product.countDocuments({ category: categoryId })
    .then((count) => {
      res.send({ count });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error getting count of products with category id=${categoryId}`,
      });
    });
};
