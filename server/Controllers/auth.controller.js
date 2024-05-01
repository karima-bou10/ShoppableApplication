const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user
    .save()
    .then((savedUser) => {
      // If roles are provided in the request, assign them to the user
      if (req.body.roles) {
        return Role.find({ name: { $in: req.body.roles } }).then((roles) => {
          savedUser.roles = roles.map((role) => role._id);
          return savedUser.save();
        });
      } else {
        // If no roles are provided, assign 'user' role by default
        return Role.findOne({ name: "user" }).then((role) => {
          savedUser.roles = [role._id];
          return savedUser.save();
        });
      }
    })
    .then(() => {
      res.send({ message: "User was registered successfully!" });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occurred while registering the user.",
      });
    });
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username }).populate(
      "roles",
      "-__v"
    );

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    //compare password with password in database
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }
    // Check if the user has the selected role
    const selectedRole = req.body.role; // Assuming the role is sent from the frontend
    const hasRole = user.roles.some((role) => role.name === selectedRole);

    if (!hasRole) {
      return res.status(401).send({
        accessToken: null,
        message: "User does not have the selected role",
      });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: 86400, // 24 hours
    });

    const authorities = user.roles.map(
      (role) => "ROLE_" + role.name.toUpperCase()
    );

    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      roles: authorities,
      accessToken: token,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "An error occurred while signing in.",
    });
  }
};
