const db = require("../models");
const User = db.user;
const verifyUpdatedUser = require("../middlewares/verifyUpdatedUser");
exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
// Function to get all users
exports.getAllUsers = async (req, res) => {
  try {
    // Fetch all users from the database
    // Log that the function is being called
    console.log("Fetching all users...");
    const users = await User.find();

    // Log the number of users fetched
    console.log(`Fetched ${users.length} users`);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.updateUser = (req, res) => {
  // Call checkDuplicateUsernameOrEmail middleware to validate username and email
  verifyUpdatedUser.checkDuplicateUsernameOrEmail(req, res, () => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!",
      });
    }

    const id = req.params.id;

    User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update User with id=${id}. Maybe User was not found!`,
          });
        } else res.send({ message: "User was updated successfully." });
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating User with id=" + id,
        });
      });
  });
};
exports.deleteUser = (req, res) => {
  const id = req.params.id;

  User.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      } else {
        res.send({
          message: "User was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};
exports.findOne = (req, res) => {
  const name = req.params.username; // Assuming the username is passed in the URL params
  User.findOne({ username: name }) // Using findOne with the username field
    .then((data) => {
      if (!data)
        res
          .status(404)
          .send({ message: "Not found user with username " + name });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving user with username=" + name });
    });
};
