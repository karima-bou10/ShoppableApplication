const controller = require("../Controllers/order.controller");
module.exports = function (app) {
  app.post("/api/orders/create", controller.createOrder);
  app.get("/api/orders/getAllOrders", controller.getAllOrders);
  app.get("/api/orders/getAllSales", controller.getAllSales);
};
