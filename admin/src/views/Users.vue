<template>
  <main id="Users-page">
    <form class="flex items-center ml-12 mt-20">
      <label for="search" class="sr-only">Search</label>
      <div class="relative w-full">
        <div
          class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
        >
          <svg
            class="w-4 h-4 me-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="#8a8a8a"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="text"
          id="search"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search ..."
          style="width: 20rem"
          v-model="searchQuery"
          @input="handleSearch"
        />
      </div>

      <!-- Modal toggle -->
      <button
        id="show-modal"
        class="flex justify-around items-center py-2 px-3 ms-2 me-6 text-base font-medium text-white bg-blue-800 rounded-full border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        @click="showModal = true"
      >
        <svg
          class="w-6 h-6 me-2 mt-0.5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
          style="margin-top: -6px"
        >
          <path
            stroke="#ffffff"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        <span class="whitespace-nowrap">Add user</span>
      </button>
    </form>
    <!-- Users Table  -->
    <div
      class="table-container relative overflow-x-auto shadow-md sm:rounded-lg my-8 mx-7 overflow-y-scroll"
    >
      <table
        class="w-full text-sm rtl:text-right text-gray-500 dark:text-gray-400"
      >
        <thead
          class="sticky top-0 text-xs uppercase rounded-full dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">User Id</th>
            <th scope="col" class="px-6 py-3">Name</th>
            <th scope="col" class="px-6 py-3">Phone number</th>
            <th scope="col" class="px-6 py-3">email</th>
            <th scope="col" class="px-6 py-3 whitespace-nowrap">Address</th>

            <th scope="col" class="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(user, index) in filteredUsers"
            :key="index"
            class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
          >
            <td
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ index + 1 }}
            </td>
            <td class="px-6 py-4">{{ user.username }}</td>
            <td class="px-6 py-4">{{ user.phoneNumber }}</td>
            <td class="px-6 py-4">{{ user.email }}</td>
            <td class="px-6 py-4">{{ user.address }}</td>

            <td class="px-6 py-4">
              <div class="button-group flex justify-between">
                <button
                  type="button"
                  class="action-button edit-button"
                  @click="editUser(user)"
                >
                  <div class="icon-container">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="#ffffff"
                        d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"
                      />
                    </svg>
                  </div>
                </button>
                <button
                  type="button"
                  class="action-button delete-button"
                  @click="deleteUser(user)"
                >
                  <div class="icon-container">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path
                        fill="#ffffff"
                        d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"
                      />
                    </svg>
                  </div>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- create user modal -->
      <Transition name="modal">
        <div
          v-if="showModal"
          tabindex="-1"
          aria-hidden="true"
          class="modal-mask hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <form class="p-4 md:p-5 w-full max-w-xl mx-auto">
            <div class="relative p-4 w-full max-w-3xl max-h-full">
              <!-- Modal content -->
              <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div
                  class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
                >
                  <h3
                    class="text-lg font-semibold text-gray-900 dark:text-white"
                  >
                    Create New User
                  </h3>
                  <button
                    type="button"
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-toggle="crud-modal"
                    @click="closeModal"
                  >
                    <svg
                      class="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span class="sr-only">Close modal</span>
                  </button>
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
                    <div class="px-4 py-2 m-2">
                      <label
                        for="password"
                        class="block mb-2 text-sm font-medium text-left text-gray-900 dark:text-white"
                        >Password</label
                      >
                      <input
                        type="password"
                        name="password"
                        id="password"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        required
                        placeholder="Type user password"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    class="text-white mt-4 mb-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Save
                  </button>
                  <div
                    v-if="accessMessage"
                    :class="{
                      'text-green-600': successMessage,
                      'text-red-600': !successMessage,
                    }"
                  >
                    {{ accessMessage }}
                  </div>
                </form>
              </div>
            </div>
          </form>
        </div>
      </Transition>
      <!-- Success alert -->
      <!-- Edit User Modal -->
      <EditUserModal
        v-if="showEditModal"
        :user="selectedUser"
        @edit-user="handleEditUser"
        @close="handleModalClose"
      />
      <deleteUserModal
        v-if="showDeleteModal"
        :user="selectedUser"
        @delete-user="handleDeletetUser"
        @close="showDeleteModal = false"
      />
    </div>
    <Alert :message="message" v-if="showSuccessAlert" />
  </main>
</template>

<script>
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

<style lang="scss" scoped>
.table-container {
  height: 480px;
}
td,
th {
  text-align: center;
}
td {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
thead {
  background-color: var(--primary);
  color: var(--white);
}
/* width */
::-webkit-scrollbar {
  width: 3px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: var(--primary);
  border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #004aad;
}
.button-group {
  padding: 5% 10% 5% 10%;
  margin-top: -2px;
}
.action-button {
  width: 1.8em;
  height: 1.8em;
  padding: 15%;
  border-radius: 50%;
  background-color: #476ffe;
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon-container {
  height: 14px;
  margin: 5px auto;
  display: flex;
}
.edit-button {
  margin-right: 0.8rem;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}
.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.grid-cols-custom {
  grid-template-columns: 1fr 1fr 2fr; /* 3ème colonne prend 2 fois la taille de la 2ème */
}
</style>
