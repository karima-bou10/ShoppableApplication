<template>
  <Transition name="modal">
    <div
      tabindex="-1"
      class="modal-mask hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div class="relative p-4 w-full max-w-md max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow">
          <button
            type="button"
            class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
            @click="closeModal"
          >
            <svg
              class="w-3 h-3"
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
          <div class="p-4 md:p-5 text-center">
            <svg
              class="mx-auto mb-4 text-gray-400 w-12 h-12"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <h3 class="mb-5 text-lg font-normal text-gray-500">
              All products having this category will be deleted!
            </h3>
            <button
              type="button"
              class="py-2.5 px-5 ms-3 mx-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
              @click="closeModal"
            >
              cancel
            </button>
            <button
              type="button"
              class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center mx-2 px-5 py-2.5 text-center"
              @click="confirmDeleteProducts"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import ProductService from "../../services/product.service.js";
//import CategoryService from "../../services/category.service.js";

export default {
  name: "DeleteAllProdModal",
  props: {
    showDeleteAllModal: Boolean, // Prop to control modal visibility
    categoryToDelete: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      category: { ...this.categoryToDelete }, // Initialize category with the categoryToDelete prop
    };
  },
  methods: {
    closeModal() {
      this.$emit("close"); // Emit an event to close the modal
    },
    async confirmDeleteProducts() {
      try {
        await ProductService.deleteProductsWithCategory(this.category.id);
        this.$emit("delete", this.category);
        this.closeModal();
      } catch (error) {
        console.error("Error deleting products:", error);
        // Handle error
      }
    },
  },
};
</script>

<style scoped>
@import "./styleModal.css";

.modal-mask {
  background-color: rgb(0, 0, 0, 0.5);
}
</style>
