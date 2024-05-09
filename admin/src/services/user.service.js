import axios from "axios";

const API_URL = "http://localhost:8080/api/users";

class UserService {
  getAllUsers() {
    return axios
      .get(API_URL + "/getAllUsers")
      .then((response) => {
        console.log("Response from getAllUsers:", response.data);
        return response;
      })
      .catch((error) => {
        console.error("Error in getAllUsers request:", error);
        throw error; // Re-throw the error to propagate it to the caller
      });
  }
  updateUser(userId, userData) {
    // Send a PUT request to the appropriate endpoint with the user ID in the URL
    return axios
      .put(`${API_URL}/${userId}`, userData)
      .then((response) => {
        // If the request is successful, return the response
        console.log("Response from update user ", response.data);
        return response.data;
      })
      .catch((error) => {
        // If there's an error, log it and throw it to propagate it to the caller
        console.error("Error in updating request:", error);
        throw error;
      });
  }
  deleteUser(userId, userData) {
    // Send a PUT request to the appropriate endpoint with the user ID in the URL
    return axios
      .delete(`${API_URL}/${userId}`, userData)
      .then((response) => {
        // If the request is successful, return the response
        console.log("Response from delete user ", response.data);
        return response.data;
      })
      .catch((error) => {
        // If there's an error, log it and throw it to propagate it to the caller
        console.error("Error in deleting request:", error);
        throw error;
      });
  }
  findUserByUsername(username) {
    return axios
      .get(`${API_URL}/${username}`)
      .then((response) => {
        console.log("Response from find user by username ", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("Error in finding user by username:", error);
        throw error;
      });
  }
}
export default new UserService();
