const controller = require("../Controllers/collection.controller");

module.exports = function (app) {
  app.post("/api/collection/create", controller.create);
  app.get("/api/collection/getAllCollections", controller.getAllCollections);
  app.delete("/api/collection/:id", controller.delete);
  app.put("/api/collection/:id", controller.update);
};
