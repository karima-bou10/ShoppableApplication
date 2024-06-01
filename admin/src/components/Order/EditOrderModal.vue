<template>
  <Transition name="modal">
    <div
      tabindex="-1"
      aria-hidden="true"
      class="modal-mask hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div class="relative p-4 w-full max-w-3xl max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div
            class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
          >
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Edit Order
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
          <form class="p-4 md:p-5">
            <div class="grid gap-4 mb-4 grid-cols-3 grid-cols-custom">
              <div class="col-span-1">
                <label
                  for="name"
                  class="block mt-14 mb-2 text-sm font-medium text-left text-gray-900 dark:text-white"
                  >Client Name</label
                >
                <input
                  type="text"
                  name="name"
                  id="name"
                  v-model="editedOrder.client.name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type product name"
                  required
                />
              </div>

              <div class="col-span-2 row-span-4">
                <label
                  for="product-image"
                  class="block text-center mb-5 text-base font-medium text-left text-gray-800 dark:text-white"
                  >Order products
                </label>
                <div class="productsInfo overflow-y-scroll">
                  <table
                    class="w-full text-sm text-gray-500 dark:text-gray-400"
                  >
                    <thead
                      class="sticky top-0 z-20 text-xs uppercase rounded-full bg-white dark:bg-gray-700 dark:text-gray-400 border-b border-blue-500 dark:border-blue-600"
                    >
                      <tr class="text-blue-500">
                        <th scope="col" class="px-6 py-3">Product Name</th>
                        <th scope="col" class="px-6 py-3">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(product, index) in products"
                        :key="index"
                        class="border-b border-gray-200 dark:border-gray-600"
                      >
                        <td class="px-6 py-4">{{ product.name }}</td>
                        <td class="px-6 py-4">
                          <input
                            type="number"
                            v-model="product.quantity"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            required
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="col-span-1">
                <label
                  for="price"
                  class="block mt-4 mb-2 text-sm font-medium text-left text-gray-900 dark:text-white"
                  >Price</label
                >
                <input
                  type="number"
                  name="price"
                  id="price"
                  v-model="editedOrder.total"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                />
              </div>

              <div class="col-span-1">
                <label
                  for="description"
                  class="block mt-4 mb-2 text-sm font-medium text-left text-gray-900 dark:text-white"
                  >Address</label
                >
                <textarea
                  id="description"
                  rows="4"
                  v-model="editedOrder.address"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write address here"
                ></textarea>
              </div>
            </div>
            <button
              type="submit"
              class="text-white mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  </Transition>
</template>
<script>
export default {
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      editedOrder: { ...this.order },
      products: [
        { name: "Product A", quantity: 10 },
        { name: "Product B", quantity: 5 },
        { name: "Product C", quantity: 3 },
        { name: "Product A", quantity: 10 },
        { name: "Product B", quantity: 5 },
        { name: "Product C", quantity: 3 },
        { name: "Product A", quantity: 10 },
        { name: "Product B", quantity: 5 },
        { name: "Product C", quantity: 3 },
      ],
    };
  },
  methods: {
    close() {
      // Emit a close event to notify the parent component
      this.$emit("close");
    },
  },
  mounted() {
    // Log the prop when the component is mounted
    console.log("Initial Order Prop:", this.order);
  },
};
</script>
<style scoped>
/* width */
.productsInfo {
  height: 350px;
}
::-webkit-scrollbar {
  width: 4px;
  height: 4px;
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
</style>
