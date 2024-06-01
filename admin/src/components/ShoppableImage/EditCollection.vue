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
            <div class="col-span-2">
              <div
                class="flex items-center justify-between p-3 md:p-5 rounded-t"
              >
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

              <div class="flex items-center justify-between rounded-t">
                <div>
                  <div>
                    <button
                      class="button bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mx-4 rounded-full"
                      @click="editMode = !editMode"
                    >
                      <template v-if="!editMode"> Edit mode </template>
                      <template v-if="editMode"> View mode </template>
                    </button>
                  </div>
                  <div class="flex justify-center">
                    <div class="settings flex flex-col">
                      <div class="settings__text-color">
                        <label>Text color</label>
                        <input
                          type="color"
                          v-model="text_color"
                          @change="changeColor"
                          id="style2"
                        />
                      </div>
                      <div class="settings__bg-color">
                        <label>BG color</label>
                        <input
                          type="color"
                          v-model="bg_color"
                          class="border border-black rounded-full"
                          id="style2"
                        />
                      </div>
                      <div class="settings__bg-color">
                        <label>Dots color</label>
                        <input type="color" v-model="dots_bg" id="style2" />
                      </div>
                    </div>
                    <div class="container">
                      <HotSpots
                        :image="selectedCollection.imageUrl"
                        :edit="editMode"
                        :showOnClick="false"
                        :onHover="true"
                        :onImageClick="true"
                        :defaultInput="true"
                        :customHint="customHint"
                        @changeArr="changingDots"
                        @add="addedDot"
                        @delete="deleteDot"
                        @changeDot="changeDot"
                        @clickDot="clickDot"
                        :dotsColor="dots_bg"
                        :hintBg="bg_color"
                        :hintTextColor="text_color"
                        :hintStyle="hintStyle"
                        :inputStyle="inputStyles"
                        :inputBg="inputBg"
                        :inputTextColor="inputTextColor"
                        :data="dotsArr"
                        @hotspot-added="handleHotspotAdded"
                        @hotspot-deleted="handleHotspotDeleted"
                        @hotspot-changed="handleHotspotChanged"
                      />
                    </div>
                  </div>
                  <div class="button-group mt-2 flex space-x-4">
                    <button
                      @click="saveCollection"
                      class="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      Save
                    </button>
                  </div>
                </div>
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
import CollectionService from "@/services/collection.service";
export default {
  name: "InfoCollectionModal",
  components: {
    HotSpots, // Register HotSpots as a component
  },
  data() {
    return {
      editMode: false,
      dotcolor: "",
      bgcolor: "",
      textcolor: "",
      dotsArrUpdated: [],
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
          filteredProducts: [],
        };
      });
      console.log("Mapped Dots Array:", mappedDots);
      return mappedDots;
    },
  },

  methods: {
    async saveCollection() {
      console.log("save dots", this.dotsArr);
      try {
        const updatedCollection = await CollectionService.updateCollection(
          this.selectedCollection._id,
          this.dotsArrUpdated
        );
        console.log("Updated Collection:", updatedCollection);
        this.closeModal(); // Close the modal after saving
      } catch (error) {
        console.error("Error updating collection:", error);
      }
    },
    closeModal() {
      console.log("dotsArr:", this.dotsArrUpdated);
      // Assuming you want to access the name of the product of the first dot
      // if (this.dotsArr.length > 0) {
      //   console.log("Name of first product:", this.dotsArr[0].product.name);
      // }
      this.$emit("close"); // Émet un événement pour fermer le modal
    },
    /*eslint-disable*/
    handleHotspotAdded(dots) {
      // Update state or perform any necessary actions with the new array of hotspots
      //this.dotsArr = dots;
      this.dotsArrUpdated = [...dots];
    },
    // Handle hotspot deleted event
    handleHotspotDeleted(payload) {
      // Update state or perform any necessary actions with the updated array of hotspots
      //this.dotsArr = payload.dots;

      this.dotsArrUpdated = [...payload.dots];
    },
    // Handle hotspot changed event
    handleHotspotChanged(payload) {
      // Update state or perform any necessary actions with the updated array of hotspots
      //this.dotsArr = payload.dots;
      this.dotsArrUpdated = [...payload.dots];
    },
    changeText() {
      this.dotsArr = this.dotsArrBuf;
    },
    changingDots(e) {
      // console.log('new dots array')
      // console.log(e)
      // this.dotsArrBuf = e
      //this.dotsArr = e;
    },
    addedDot(e) {
      // console.log('added dot')
      // console.log(e)
      // this.currentIndex = e.index
      // this.activeDot = e.obj
    },
    deleteDot(e) {
      // console.log('delete dot')
      // console.log(e)
    },
    changeDot(e) {
      // console.log('change dot')
      // console.log(e)
    },
    clickDot(e) {
      console.log("click dot");
      console.log(e);
      this.currentIndex = e.index;
      this.activeDot = e.obj;
      this.hint_text = e.obj.text;
    },
    changeColor() {
      // console.log(this.text_color)
    },
    selectImage() {
      // Trigger file input dialog when the button is clicked
      const fileInput = document.getElementById("file-input");
      fileInput.click();
      this.dataSteps.currentStep = 0;
      this.dotsArr = [];
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      // this.uploadedImage = URL.createObjectURL(file);
      this.buttonText = "Change Image";
      if (file) this.createBase64Image(file);
    },
    createBase64Image(fileObjet) {
      const reader = new FileReader();
      reader.readAsDataURL(fileObjet);
      reader.onload = () => {
        this.uploadedImage = reader.result;
      };
    },
    updatedHotspots(data) {
      this.hotspots = data;
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
  watch: {
    selectedCollection: {
      handler(newVal) {
        if (newVal && newVal.dots && newVal.dots.length > 0) {
          const firstDot = newVal.dots[0];
          this.dots_bg = firstDot.dotcolor || "";
          this.bg_color = firstDot.bgcolor || "";
          this.text_color = firstDot.textcolor || "";
        }
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>
.button-group {
  position: relative;
  margin-left: 70%;
  margin-right: 10%;
}
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
.settings {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  div {
    margin-inline: 20px;
  }
  label {
    margin-right: 10px;
    font-family: "Poppins", sans-serif;
    font-size: 15px;
  }
}
.settings__text-color {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 20px;
  gap: 5px;
}
.settings__bg-color {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  label {
    margin-top: 30px;
  }
}
#style2 {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: transparent;
  width: 50px;
  height: 50px;
  border: none;
  cursor: pointer;
}
#style2::-webkit-color-swatch {
  border-radius: 50%;
}
#style2::-moz-color-swatch {
  border-radius: 50%;
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
