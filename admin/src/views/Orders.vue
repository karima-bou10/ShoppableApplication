<template>
  <main id="Orders-page">
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
        />
      </div>

      <!-- Modal toggle -->

      <EditOrder
        v-if="showEditOrder"
        :order="selectedOrder"
        @close="showEditOrder = false"
      />
      <InfoOrder v-if="showInfoOrder" @close="showInfoOrder = false" />
      <deleteOrder
        v-if="showDeleteModal"
        :order="selectedOrder"
        @close="showDeleteModal = false"
      />
    </form>
    <!-- Products Table  -->
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
            <th scope="col" class="px-3 py-3">Mark as Sale</th>
            <th scope="col" class="px-6 py-3">Order Id</th>
            <th scope="col" class="px-6 py-3">Client Name</th>
            <th scope="col" class="px-6 py-3">Address</th>
            <th scope="col" class="px-6 py-3">Quantity</th>
            <th scope="col" class="px-6 py-3 whitespace-nowrap">Prix Total</th>
            <th scope="col" class="px-6 py-3">Date Creation</th>
            <th scope="col" class="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(order, index) in orders"
            :key="index"
            class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
          >
            <td class="px-4 py-1">
              <label class="flex justify-center">
                <input
                  type="checkbox"
                  class="form-checkbox text-indigo-600"
                  @change="markAsSale"
                />
              </label>
            </td>
            <td
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ index + 1 }}
            </td>
            <td class="px-6 py-4">{{ order.client.name }}</td>
            <td class="px-6 py-4">{{ order.address }}</td>
            <td class="px-6 py-4">10 pr</td>
            <td class="px-6 py-4">{{ order.total }}</td>
            <td class="px-6 py-4">{{ order.dateCreation.split("T")[0] }}</td>
            <td class="px-6 py-4">
              <div class="button-group flex justify-between">
                <button
                  type="button"
                  class="action-button edit-button"
                  @click="editOrder(order)"
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
                <!-- Pass selected product data to EditProdModal component -->

                <button
                  type="button"
                  class="action-button info-button"
                  @click="showInfoOrder = true"
                >
                  <div class="icon-container">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 192 512"
                    >
                      <path
                        fill="#ffffff"
                        d="M48 80a48 48 0 1 1 96 0A48 48 0 1 1 48 80zM0 224c0-17.7 14.3-32 32-32H96c17.7 0 32 14.3 32 32V448h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H64V256H32c-17.7 0-32-14.3-32-32z"
                      />
                    </svg>
                  </div>
                </button>
                <!-- Pass selected product data to InfoProdModal component -->

                <button
                  type="button"
                  class="action-button delete-button"
                  @click="deleteOrder(order)"
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
    </div>
  </main>
</template>

<script>
import EditOrder from "@/components/Order/EditOrderModal.vue";
import InfoOrder from "@/components/Order/InfoOrderModal.vue";
import deleteOrder from "@/components/Order/deleteOrderModal.vue";
import orderService from "@/services/order.service.js";
export default {
  name: "Product",
  components: {
    EditOrder,
    InfoOrder,
    deleteOrder,
  },
  data() {
    return {
      buttonText: "Upload Image",
      showEditOrder: false,
      showInfoOrder: false,
      showDeleteModal: false,
      uploadedImage: null, // Add a data property to store the uploaded image
      orders: [],
      selectedOrder: null,
    };
  },

  methods: {
    editOrder(order) {
      console.log(order);
      this.showEditOrder = true;
      this.selectedOrder = order;
      console.log(order.id);
    },
    deleteOrder(order) {
      console.log(order);
      this.showDeleteModal = true;
      this.selectedOrder = order;
      console.log(order.id);
    },
  },
  async mounted() {
    console.log("Component mounted");
    try {
      const response = await orderService.getAllOrders();
      console.log(response.data);
      this.orders = response.data; // Assign fetched orders to the data property
      // Map the orders to include only the necessary fields (including the ID)
    } catch (error) {
      console.error("Error fetching orders :", error);
      // Handle error
    }
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
  padding: 5% 5% 5% 5%;
  margin-top: -2px;
}
.action-button {
  width: 1.2em;
  height: 1.2em;
  padding: 13%;
  border-radius: 50%;
  background-color: #476ffe;
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon-container {
  height: 15px;
  margin: 4px auto;
  display: flex;
}
.info-button {
  margin-right: 0.8rem;
  margin-left: 0.8rem;
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
