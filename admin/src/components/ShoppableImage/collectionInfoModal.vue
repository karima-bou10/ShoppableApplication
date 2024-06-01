<template>
  <Transition name="modal">
    <div
      tabindex="-1"
      class="modal-mask hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div class="relative p-6 w-full max-w-3xl max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow">
          <div class="grid gap-4 m-4 grid-cols-4 grid-cols-custom">
            <div class="grid-cols-2 flex items-center justify-center">
              <HotSpots
                :image="selectedCollection.imageUrl"
                :edit="false"
                :data="dotsArr"
                :dotsColor="dotcolor"
                :hintBg="bgcolor"
                :hintTextColor="textcolor"
              />
            </div>

            <div class="col-span-1">
              <div
                class="flex items-center justify-between p-3 md:p-5 rounded-t"
              >
                <h3 class="text-lg font-semibold text-black">
                  {{ selectedCollection.name }}
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
                <table class="w-full text-sm text-gray-500 dark:text-gray-400">
                  <thead
                    class="sticky top-0 z-20 text-xs uppercase rounded-full bg-white dark:bg-gray-700 dark:text-gray-400 border-b border-blue-500 dark:border-blue-600"
                  >
                    <tr class="text-blue-500">
                      <th scope="col" class="px-6 py-3">Product image</th>
                      <th scope="col" class="px-6 py-3">Product Name</th>
                      <th scope="col" class="px-6 py-3">Quantity</th>
                      <th scope="col" class="px-6 py-3">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(dot, index) in selectedCollection.dots"
                      :key="index"
                      class="border-b border-gray-200 dark:border-gray-600"
                    >
                      <td class="px-6 py-4">
                        <img
                          v-if="
                            dot.productID &&
                            Array.isArray(dot.productID) &&
                            dot.productID[0] &&
                            dot.productID[0].image
                          "
                          :src="dot.productID[0].image"
                          :alt="dot.productID[0].name"
                          class="md:w-9 max-w-full max-h-full"
                        />
                      </td>
                      <td class="px-6 py-4">
                        {{
                          dot.productID &&
                          Array.isArray(dot.productID) &&
                          dot.productID[0]
                            ? dot.productID[0].name
                            : ""
                        }}
                      </td>
                      <td class="px-6 py-4">
                        {{
                          dot.productID &&
                          Array.isArray(dot.productID) &&
                          dot.productID[0]
                            ? dot.productID[0].quantity
                            : ""
                        }}
                      </td>
                      <td class="px-6 py-4">
                        {{
                          dot.productID &&
                          Array.isArray(dot.productID) &&
                          dot.productID[0]
                            ? dot.productID[0].price
                            : ""
                        }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div
                class="flex items-center justify-between p-3 md:p-5 rounded-t"
              >
                <h3 class="text-base text-left font-medium text-gray-500">
                  {{ selectedCollection.description }}
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
/* eslint-disable no-unused-vars */
import HotSpots from "./HotSpots.vue";
export default {
  name: "InfoCollectionModal",
  components: {
    HotSpots, // Register HotSpots as a component
  },
  data() {
    return {
      dotcolor: "",
      bgcolor: "",
      textcolor: "",
    };
  },
  props: {
    showInfoModal: Boolean, // Prop to control modal visibility
    selectedCollection: Object, // Prop to pass selected product data
  },
  computed: {
    dotsArr() {
      if (!this.selectedCollection || !this.selectedCollection.dots) {
        return [];
      }
      const mappedDots = this.selectedCollection.dots.map((dot, index) => {
        // Assign values to dotcolor, bgcolor, and textcolor based on dot properties
        this.dotcolor = dot.dotcolor || "";
        this.bgcolor = dot.bgcolor || "";
        this.textcolor = dot.textcolor || "";

        // Ensure `productID` is populated with product details
        const product =
          dot.productID && dot.productID[0] ? dot.productID[0] : {};

        return {
          text: dot.text || "",
          posX: dot.posX || 0,
          posY: dot.posY || 0,
          color: dot.dotcolor || "",
          type: "dot", // Adjust this as per your requirement
          product: {
            name: product.name || "", // Ensure name property exists
            price: product.price || 0, // Ensure price property exists
            // Add other product properties if needed
          },
        };
      });
      console.log("Mapped Dots Array:", mappedDots);
      return mappedDots;
    },
  },

  methods: {
    closeModal() {
      console.log("dotsArr:", this.dotsArr);
      // Assuming you want to access the name of the product of the first dot
      if (this.dotsArr.length > 0) {
        console.log("Name of first product:", this.dotsArr[0].product.name);
      }
      this.$emit("close"); // Émet un événement pour fermer le modal
    },
    calculateTotal(product) {
      return product.quantity * product.price; // Example calculation, adjust as needed
    },
  },
  mounted() {
    if (this.selectedCollection && this.selectedCollection.dots.length > 0) {
      console.log(
        "Product properties of first dot:",
        this.selectedCollection.dots[0].productID
      );
      console.log(
        "Product name of first dot:",
        this.selectedCollection.dots[0].productID.name
      );
    }
  },
};
</script>

<style scoped>
.modal-mask {
  background-color: rgb(0, 0, 0, 0.6);
}
.grid-cols-custom {
  grid-template-columns: 1fr 2fr;
}
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
