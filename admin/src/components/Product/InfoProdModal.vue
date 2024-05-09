<template>
  <Transition name="modal">
    <div
      tabindex="-1"
      class="modal-mask hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div class="relative p-6 w-full max-w-3xl max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow">
          <div class="grid gap-4 m-4 grid-cols-2 grid-cols-custom">
            <div class="col-span-1 flex items-center justify-center">
              <img
                :src="selectedProduct.image"
                :alt="selectedProduct.name"
                class="max-w-full max-h-full rounded-md m-6"
              />
            </div>

            <div class="col-span-1">
              <div
                class="flex items-center justify-between p-3 md:p-5 rounded-t"
              >
                <h3 class="text-lg font-semibold text-black">
                  {{ selectedProduct.name }}
                </h3>
                <button
                  type="button"
                  class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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

              <div
                class="flex items-center justify-between p-3 md:p-5 rounded-t"
              >
                <h3 class="text-lg font-medium text-blue-500">
                  {{ selectedProduct.price }}
                </h3>
              </div>
              <div
                class="flex items-center justify-between p-3 md:p-5 rounded-t"
              >
                <h3 class="text-base text-left font-medium text-gray-500">
                  {{ selectedProduct.description }}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  name: "InfoProdModal",
  props: {
    showInfoModal: Boolean, // Prop to control modal visibility
    selectedProduct: Object, // Prop to pass selected product data
  },
  methods: {
    closeModal() {
      this.$emit("close"); // Émet un événement pour fermer le modal
    },
  },
};
</script>

<style scoped>
@import "./styleModal.css";

.modal-mask {
  background-color: rgb(0, 0, 0, 0.06);
}
.grid-cols-custom {
  grid-template-columns: 1fr 2fr;
}
</style>
