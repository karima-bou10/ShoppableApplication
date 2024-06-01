const controller = require("../Controllers/tag.controller");

module.exports = function (app) {
  // Define the route with a dynamic parameter for collectionId
  app.get(
    "/api/collection/:collectionId/tags",
    controller.getTagsForCollection
  );
};
