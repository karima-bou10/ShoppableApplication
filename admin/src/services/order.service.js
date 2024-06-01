import axios from "axios";

const API_URL = "http://localhost:8080/api/orders";

class OrderService {
  getAllOrders() {
    return axios
      .get(API_URL + "/getAllOrders")
      .then((response) => {
        console.log("Response from getAllOrders:", response.data);
        return response;
      })
      .catch((error) => {
        console.error("Error in getAllOrders request:", error);
        throw error; // Re-throw the error to propagate it to the caller
      });
  }
  getAllSales() {
    return axios
      .get(API_URL + "/getAllSales")
      .then((response) => {
        console.log("Response from getAllSales:", response.data);
        return response;
      })
      .catch((error) => {
        console.error("Error in getAllSales request:", error);
        throw error; // Re-throw the error to propagate it to the caller
      });
  }
}
export default new OrderService();
