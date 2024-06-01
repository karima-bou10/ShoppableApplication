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
              Order N° 4
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
              <div class="col-span-3 row-span-4">
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
                        <th scope="col" class="px-6 py-3">Price</th>
                        <th scope="col" class="px-6 py-3">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(product, index) in products"
                        :key="index"
                        class="border-b border-gray-200 dark:border-gray-600"
                      >
                        <td class="px-6 py-4">{{ product.name }}</td>
                        <td class="px-6 py-4">{{ product.prix }}</td>
                        <td class="px-6 py-4">
                          {{ product.quantity }}
                        </td>
                        <td class="px-6 py-4">1100 DH</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div
              class="flex items-center justify-end p-4 md:p-5 border-t rounded-t dark:border-gray-600"
            >
              <h3
                class="text-base text-right font-medium text-gray-900 dark:text-white"
              >
                Order Total : 12000 DH
              </h3>
            </div>
          </form>
        </div>
      </div>
    </div>
  </Transition>
</template>
<script>
export default {
  data() {
    return {
      products: [
        { name: "Product A", prix: "150", quantity: 10 },
        { name: "Product B", prix: "150", quantity: 5 },
        { name: "Product C", prix: "150", quantity: 3 },
        { name: "Product A", prix: "150", quantity: 10 },
        { name: "Product B", prix: "150", quantity: 5 },
        { name: "Product C", prix: "150", quantity: 3 },
        { name: "Product A", prix: "150", quantity: 10 },
        { name: "Product B", prix: "150", quantity: 5 },
        { name: "Product C", prix: "150", quantity: 3 },
      ],
    };
  },
  methods: {
    close() {
      // Emit a close event to notify the parent component
      this.$emit("close");
    },
  },
};
</script>
<style scoped>
/* width */
.productsInfo {
  height: 300px;
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
