import axios from "axios";

const API_URL = "http://localhost:8080/api/collection/";

class CollectionService {
  // Method to create a new collection with associated tags
  createCollection(imageUrl, dotsArr) {
    // Make a POST request to the server API endpoint
    console.log(dotsArr);
    return axios
      .post(API_URL + "create", { imageUrl, dots: dotsArr })
      .then((response) => {
        // Return the response data (created collection object)
        return response.data;
      })
      .catch((error) => {
        // Handle error if request fails
        console.error("Error creating collection:", error);
        throw error; // Re-throw the error to handle it in the calling code
      });
  }
  getAllCollections() {
    return axios
      .get(API_URL + "getAllCollections")
      .then((response) => {
        console.log("Response from getAllCollections:", response.data);
        return response;
      })
      .catch((error) => {
        console.error("Error in getAllCollections request:", error);
        throw error; // Re-throw the error to propagate it to the caller
      });
  }
  // Method to delete a collection by ID
  deleteCollection(id) {
    return axios
      .delete(API_URL + id)
      .then((response) => {
        console.log("Collection deleted successfully:", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("Error deleting collection:", error);
        throw error; // Re-throw the error to handle it in the calling code
      });
  }
  // Method to update a collection by ID
  updateCollection(id, dotsArrUpdated) {
    console.log("dotsArrUpdated:", dotsArrUpdated);

    return axios
      .put(API_URL + id, dotsArrUpdated)
      .then((response) => {
        console.log("Collection updated successfully:", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("Error updating collection:", error);
        throw error; // Re-throw the error to handle it in the calling code
      });
  }
  // Method to get tags for a specific collection by ID
  getTagsForCollection(collectionId) {
    return axios
      .get(API_URL + collectionId + "/tags")
      .then((response) => {
        console.log("Tags for collection", collectionId, ":", response.data);
        return response;
      })
      .catch((error) => {
        console.error("Error fetching tags for collection:", error);
        throw error;
      });
  }
}

export default new CollectionService();
