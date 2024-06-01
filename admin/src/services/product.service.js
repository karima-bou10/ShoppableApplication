import axios from "axios";

const API_URL = "http://localhost:8080/api/products/";

class ProductService {
  getAllProducts() {
    return axios
      .get(API_URL)
      .then((response) => {
        console.log("Response from getAllProducts:", response.data);
        return response;
      })
      .catch((error) => {
        console.error("Error in getAllProducts request:", error);
        throw error; // Re-throw the error to propagate it to the caller
      });
  }

  getProductById(id) {
    return axios
      .get(API_URL + id)
      .then((response) => {
        console.log("Response from find product by id ", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("Error in finding product by id:", error);
        throw error;
      });
  }

  createProduct(data) {
    // // Convert data to JSON string
    // const jsonData = JSON.stringify(data);

    // // Create a Blob from the JSON string
    // const blob = new Blob([jsonData], { type: "application/json" });

    // // Measure the size of the Blob in bytes
    // const payloadSize = blob.size;

    // // Log the payload size
    // console.log("Payload size:", payloadSize, "bytes");
    return axios
      .post(API_URL, data)
      .then((response) => {
        // If the request is successful, return the response
        console.log("Response from create product ", response.data);
        return response.data;
      })
      .catch((error) => {
        // If there's an error, log it and throw it to propagate it to the caller
        console.error("Error in create request:", error);
        throw error;
      });
  }

  updateProduct(id, data) {
    return axios
      .put(API_URL + id, data)
      .then((response) => {
        // If the request is successful, return the response
        console.log("Response from update product ", response.data);
        return response.data;
      })
      .catch((error) => {
        // If there's an error, log it and throw it to propagate it to the caller
        console.error("Error in update request:", error);
        throw error;
      });
  }

  deleteProduct(id) {
    return axios
      .delete(API_URL + id)
      .then((response) => {
        // If the request is successful, return the response
        console.log("Response from delete product ", response.data);
        return response.data;
      })
      .catch((error) => {
        // If there's an error, log it and throw it to propagate it to the caller
        console.error("Error in delete request:", error);
        throw error;
      });
  }

  // Delete all Products with a specified category
  deleteProductsWithCategory(categoryId) {
    return axios
      .delete(API_URL + "category/" + categoryId)
      .then((response) => {
        // If the request is successful, return the response
        console.log(
          "Response from delete all product with a specified category",
          response.data
        );
        return response.data;
      })
      .catch((error) => {
        // If there's an error, log it and throw it to propagate it to the caller
        console.error("Error in delete all products request:", error);
        throw error;
      });
  }

  // Get the number of products in a specified category
  getNumberOfProductsInCategory(categoryId) {
    return axios
      .get(API_URL + "category/count/" + categoryId)
      .then((response) => {
        console.log(
          "Response from getNumberOfProductsInCategory:",
          response.data
        );
        return response.data;
      })
      .catch((error) => {
        console.error("Error in getNumberOfProductsInCategory request:", error);
        throw error;
      });
  }
}

export default new ProductService();
