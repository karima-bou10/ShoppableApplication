<template>
  <Transition name="modal">
    <form class="p-4 md:p-5 w-full max-w-xl mx-auto">
      <div class="relative p-4 w-full max-w-3xl max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div
            class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
          >
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Account Informations
            </h3>
          </div>
          <!-- Modal body -->
          <form
            class="p-4 md:p-5 w-full max-w-xl mx-auto"
            @submit.prevent="handleSubmit"
            method="POST"
          >
            <div class="flex flex-col justify_center">
              <div class="px-4 py-1 m-2">
                <label
                  for="userName"
                  text="samar ait lmaalem"
                  class="block mb-2 text-sm font-medium text-left text-gray-900 dark:text-white"
                  >Full Name</label
                >
                <input
                  type="text"
                  name="username"
                  id="userName"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type user name"
                  required
                />
              </div>

              <div class="px-4 py-2 m-2">
                <label
                  for="phoneNumber"
                  class="block mb-2 text-sm font-medium text-left text-gray-900 dark:text-white"
                  >Phone number</label
                >
                <input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type user phone number"
                  required
                />
              </div>

              <div class="px-4 py-2 m-2">
                <label
                  for="address"
                  class="block mb-2 text-sm font-medium text-left text-gray-900 dark:text-white"
                  >Address</label
                >
                <input
                  type="text"
                  name="address"
                  id="address"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                  placeholder="Type user address"
                />
              </div>
              <div class="px-4 py-2 m-2">
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-left text-gray-900 dark:text-white"
                  >Email</label
                >
                <input
                  type="email"
                  name="email"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                  placeholder="Type user email"
                />
              </div>
            </div>
            <button
              type="submit"
              class="text-white mt-4 mb-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Save
            </button>
            <!-- <div
                    v-if="accessMessage"
                    :class="{
                      'text-green-600': successMessage,
                      'text-red-600': !successMessage,
                    }"
                  >
                    {{ accessMessage }}
                  </div> -->
          </form>
        </div>
      </div>
    </form>
  </Transition>
</template>
<script>
/* eslint-disable */
import authService from "@/services/auth.service";
import userService from "../services/user.service";
import EditUserModal from "../components/User/EditUserModal.vue";
import deleteUserModal from "../components/User/deleteUserModal.vue";
import Alert from "../components/AlertModal.vue";

export default {
  name: "user",
  components: {
    EditUserModal,
    deleteUserModal,
    Alert,
  },
  data() {
    return {
      buttonText: "Upload Image",
      showModal: false,
      uploadedImage: null, // Add a data property to store the uploaded image
      accessMessage: "",
      users: [],
      successMessage: false,
      // Define data properties for managing modal and selected user
      showEditModal: false,
      showDeleteModal: false,
      selectedUser: null,
      showSuccessAlert: false,
      message: "",
      searchQuery: "",
    };
  },

  methods: {
    // Method to open edit modal and set selected user
    editUser(user) {
      console.log(user);
      this.showEditModal = true;
      this.selectedUser = user;
      console.log(user.id);
    },
    deleteUser(user) {
      console.log(user);
      this.selectedUser = user;
      this.showDeleteModal = true;
      console.log(user._id);
    },
    async handleDeletetUser(deletedUser) {
      console.log("Deleted user data:", deletedUser);
      // Fetch the updated list of users
      const updatedUsersResponse = await userService.getAllUsers();
      // Update the users array with the newly fetched list
      this.users = updatedUsersResponse.data;
      // Show success alert with delete message
      this.showSuccessAlert = true;
      this.message = "User deleted successfully.";
    },
    async handleEditUser(updatedUserData) {
      console.log("Edited user data:", updatedUserData);
      // Fetch the updated list of users
      const updatedUsersResponse = await userService.getAllUsers();
      // Update the users array with the newly fetched list
      this.users = updatedUsersResponse.data;
      // Show success alert with edit message
      this.showSuccessAlert = true;
      this.message = "User updated successfully.";
    },
    handleModalClose() {
      // Handle the modal close event here
      this.showEditModal = false; // Close the modal
    },
    closeSuccessAlert() {
      // Method to close the success alert
      this.showSuccessAlert = false;
    },
    async handleSubmit(event) {
      event.preventDefault();

      // Extract user input from form fields
      const username = event.target.elements.username.value;
      const email = event.target.elements.email.value;
      const phoneNumber = event.target.elements.phoneNumber.value;
      const address = event.target.elements.address.value;
      const password = event.target.elements.password.value;

      const user = {
        username: username,
        email: email,
        password: password,
        phoneNumber: phoneNumber,
        address: address,
      };
      try {
        // Call the register method of authService to sign up the user
        const response = await authService.register(user);

        // Handle success response
        this.accessMessage = response.data.message;
        this.successMessage = true;
        // Fetch the updated list of users
        const updatedUsersResponse = await userService.getAllUsers();
        // Update the users array with the newly fetched list
        this.users = updatedUsersResponse.data;
      } catch (error) {
        // Handle error
        console.error("Error signing up:", error);
        // Display error message to the user
        this.accessMessage =
          error.response.data.message || "An error occurred while signing up.";
        this.successMessage = false;
      }
    },
    closeModal() {
      // Close the modal
      this.showModal = false;
      // Clear the accessMessage when modal is closed
      this.accessMessage = "";
    },
    selectImage() {
      this.$refs.fileInput.click();
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      this.uploadedImage = URL.createObjectURL(file);
      this.buttonText = "Change Image";
    },
    handleSearch() {
      // Triggered when search input changes
      // You can perform additional actions here if needed
    },
  },
  async mounted() {
    // Move mounted method outside of the methods object
    // Call getAllUsers method when the component is mounted
    console.log("Component mounted");
    try {
      const response = await userService.getAllUsers();

      this.users = response.data; // Assign fetched users to the data property
      // Map the users to include only the necessary fields (including the ID)
    } catch (error) {
      console.error("Error fetching users:", error);
      // Handle error
    }
  },
  computed: {
    filteredUsers() {
      // Filter users based on search query
      return this.users.filter((user) =>
        user.username.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
};
</script>
