import axios from "axios";

const API_URL = "http://localhost:8080/api/orders";

class OrderService {
  createOrder(orderData) {
    return axios
      .post(`${API_URL}/create`, orderData)
      .then((response) => {
        // Handle successful creation of the order
        console.log("Order created successfully:", response.data);
        return response.data; // Optionally, return the created order data
      })
      .catch((error) => {
        // Handle errors
        console.error("Error creating order:", error);
        throw error; // Optionally, rethrow the error to handle it in the caller
      });
  }
}

export default new OrderService();
