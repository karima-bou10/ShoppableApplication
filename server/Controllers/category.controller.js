const db = require("../models");
const Category = db.category;

// Create and Save a new Category
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Check if a category with the same name already exists
  Category.findOne({ name: req.body.name }).then((existingCategory) => {
    if (existingCategory) {
      res
        .status(400)
        .send({ message: "Category with the same name already exists!" });
      return;
    }

    // Create a Category
    const category = new Category({
      name: req.body.name,
    });

    // Save Category in the database
    category
      .save()
      .then((data) => {
        res
          .status(201)
          .send({ message: "Category created successfully.", data });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Category.",
        });
      });
  });
};

// Retrieve all Categories from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};

  Category.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Categories.",
      });
    });
};

// Find a single Category with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Category.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Category with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Category with id=" + id });
    });
};

// Update a Category by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  // Check if a category with the same name already exists
  Category.findOne({ name: req.body.name }).then((existingCategory) => {
    if (existingCategory) {
      res
        .status(400)
        .send({ message: "Category with the same name already exists!" });
      return;
    }

    const id = req.params.id;

    Category.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Category with id=${id}. Maybe Category was not found!`,
          });
        } else res.send({ message: "Category was updated successfully." });
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating Category with id=" + id,
        });
      });
  });
};

// Delete a Category with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Category.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Category with id=${id}. Maybe Category was not found!`,
        });
      } else {
        res.send({
          message: "Category was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Category with id=" + id,
      });
    });
};
