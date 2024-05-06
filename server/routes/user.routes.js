const { authJwt } = require("../middlewares");
const { verifySignUp } = require("../middlewares");
const controller = require("../Controllers/user.controller");
// const db = require("../models");
// const User = db.user;
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Route to get all users
  app.get("/api/users/getAllUsers", controller.getAllUsers);

  app.get("/api/test/all", controller.allAccess);

  app.get(
    "/api/test/user",
    [authJwt.verifyToken, authJwt.isUser],
    controller.userBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
  app.put("/api/users/:id", controller.updateUser);
  app.delete("/api/users/:id", controller.deleteUser);
  app.get("/api/users/:username", controller.findOne);
};
