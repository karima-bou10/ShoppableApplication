<template>
  <Transition name="modal">
    <div
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
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                Edit User
              </h3>
              <button
                type="button"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="crud-modal"
                @click="close"
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
                    >Username</label
                  >
                  <input
                    type="text"
                    name="username"
                    id="userName"
                    v-model="editedUser.username"
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
                    v-model="editedUser.phoneNumber"
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
                    v-model="editedUser.address"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
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
                    v-model="editedUser.email"
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
            </form>
          </div>
        </div>
      </form>
    </div>
  </Transition>
</template>

<script>
import UserService from "@/services/user.service";
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      editedUser: { ...this.user }, // Initialize editedUser with the user prop
    };
  },
  methods: {
    close() {
      // Emit a close event to notify the parent component
      this.$emit("close");
    },
    async handleSubmit() {
      try {
        console.log(this.user._id);
        await UserService.updateUser(this.user._id, this.editedUser);
        this.$emit("edit-user", this.editedUser);
        this.close();
      } catch (error) {
        console.error("Error updating user:", error);
        // Handle error
      }
    },
  },
};
</script>

<style scoped>
/* Styles for the modal */
.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}
.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}
.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
