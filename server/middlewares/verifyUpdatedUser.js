const db = require("../models");
const User = db.user;

// Middleware to check duplicate username or email
checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    console.log(
      "Checking for duplicate username or email:",
      req.body.username,
      req.body.email
    );

    // Get the user ID from the request parameters
    const id = req.params.id;

    // Find the user by ID
    const user = await User.findById(id);

    // If the user is not found, return a 404 error
    if (!user) {
      return res.status(404).send({
        message: `User with id=${id} not found!`,
      });
    }

    // Check if the username is being updated and verify uniqueness with other users
    if (req.body.username !== user.username) {
      const usernameExists = await User.findOne({
        username: req.body.username,
      });
      if (usernameExists) {
        return res.status(400).send({
          message: "Failed! Username is already in use!",
        });
      }
    }

    // Check if the email is being updated and verify uniqueness with other users
    if (req.body.email !== user.email) {
      const emailExists = await User.findOne({ email: req.body.email });
      if (emailExists) {
        return res.status(400).send({
          message: "Failed! Email is already in use!",
        });
      }
    }

    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  checkDuplicateUsernameOrEmail,
};
