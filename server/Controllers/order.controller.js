const db = require("../models");
const Order = db.order;
const orderDetail = db.orderDetail;
console.log(Order);
exports.createOrder = async (req, res) => {
  try {
    // Extract data from the request body
    const { client, address, total, dateCreation, statut } = req.body;

    // Create the order
    const newOrder = await Order.create({
      client,
      address,
      total,
      dateCreation,
      statut,
    });

    res
      .status(201)
      .send({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).send({ message: "Error creating order", error });
  }
};
exports.getAllOrders = async (req, res) => {
  try {
    // Fetch all orders from the database
    // Log that the function is being called
    console.log("Fetching all orders...");
    const orders = await Order.find({ statut: false });

    // Log the number of users fetched
    console.log(`Fetched ${orders.length} orders`);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getAllSales = async (req, res) => {
  try {
    // Fetch all orders from the database
    // Log that the function is being called
    console.log("Fetching all orders...");
    const orders = await Order.find({ statut: true });

    // Log the number of users fetched
    console.log(`Fetched ${orders.length} orders`);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
