import axios from "axios";

const API_URL = "http://localhost:8080/api/categories/";

class CategoryService {
  getAllCategories() {
    return axios
      .get(API_URL)
      .then((response) => {
        console.log("Response from getAllCategories:", response.data);
        return response;
      })
      .catch((error) => {
        console.error("Error in getAllCategories request:", error);
        throw error; // Re-throw the error to propagate it to the caller
      });
  }

  getCategoryById(id) {
    return axios
      .get(API_URL + id)
      .then((response) => {
        console.log("Response from find category by id ", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("Error in finding category by id:", error);
        throw error;
      });
  }

  createCategory(data) {
    return axios
      .post(API_URL, data)
      .then((response) => {
        // If the request is successful, return the response
        console.log("Response from create category ", response.data);
        return response.data;
      })
      .catch((error) => {
        // If there's an error, log it and throw it to propagate it to the caller
        console.error("Error in create request:", error);
        throw error;
      });
  }

  updateCategory(id, data) {
    return axios
      .put(API_URL + id, data)
      .then((response) => {
        // If the request is successful, return the response
        console.log("Response from update category ", response.data);
        return response.data;
      })
      .catch((error) => {
        // If there's an error, log it and throw it to propagate it to the caller
        console.error("Error in update request:", error);
        throw error;
      });
  }

  deleteCategory(id) {
    return axios
      .delete(API_URL + id)
      .then((response) => {
        // If the request is successful, return the response
        console.log("Response from delete category ", response.data);
        return response.data;
      })
      .catch((error) => {
        // If there's an error, log it and throw it to propagate it to the caller
        console.error("Error in delete request:", error);
        throw error;
      });
  }

  getProductsByCategoryId(categoryId) {
    return axios
      .get(`${API_URL}${categoryId}/products`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching products by category:", error);
        throw error;
      });
  }
}

export default new CategoryService();
