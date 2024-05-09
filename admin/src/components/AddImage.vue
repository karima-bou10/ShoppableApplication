<template>
  <div class="add-Image">
    <StepProgress :data="dataSteps" ref="stepProgress" />
    <div class="steps-display">
      <div class="justify-center m-auto" v-if="dataSteps.currentStep === 0">
        <button
          @click="selectImage"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-4 my-4 border border-blue-700 rounded"
        >
          {{ buttonText }}
        </button>
        <input
          type="file"
          accept="image/*"
          ref="fileInput"
          id="file-input"
          style="display: none"
          @change="handleImageUpload"
        />
        <div v-if="uploadedImage">
          <img
            :src="uploadedImage"
            alt="Uploaded Image"
            width="330"
            height="400"
            class="max-w-full max-h-full rounded-md m-auto"
          />
        </div>
      </div>
      <div v-if="dataSteps.currentStep === 1">
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
              :image="uploadedImage"
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
              :dotsArr="dotsArr"
              @hotspot-added="handleHotspotAdded"
              @hotspot-deleted="handleHotspotDeleted"
              @hotspot-changed="handleHotspotChanged"
            />
          </div>
        </div>
      </div>
      <!-- Template -->
      <div v-if="dataSteps.currentStep === 2">
        <!-- Titre et Description -->
        <div class="settings flex justify-center">
          <div class="relative z-0 m-1">
            <input
              type="text"
              id="titre"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              for="titre"
              class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >Titre</label
            >
          </div>
        </div>
        <!-- Image avec Hotspots -->
        <div class="flex justify-center m-auto">
          <HotSpots
            :image="uploadedImage"
            :data="dotsArr"
            :dotsColor="dots_bg"
            :hintBg="bg_color"
            :hintTextColor="text_color"
          />
        </div>
      </div>
    </div>
    <div class="button-group grid grid-cols-2 mt-10 flex space-x-4">
      <button
        @click="goToPreviousStep"
        :disabled="dataSteps.currentStep === 0"
        class="text-white bg-neutral-300 hover:bg-blue-800 focus:ring-4 focus:ring-neutral-300 font-medium rounded-lg text-sm px-1 py-2.5 mb-2 dark:bg-neutral-400 dark:hover:bg-neutral-400 focus:outline-none dark:focus:ring-neutral-800"
      >
        Back
      </button>
      <button
        @click="goToNextStep"
        v-show="dataSteps.currentStep < 2"
        :disabled="
          dataSteps.currentStep === 0 &&
          !uploadedImage &&
          dataSteps.currentStep === 2
        "
        class="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-1 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Next
      </button>
      <button
        @click="goToNextStep"
        v-show="dataSteps.currentStep == 2"
        class="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-1 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Save
      </button>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import { ref } from "vue";
import StepProgress from "./StepProgress.vue";
import HotSpots from "./HotSpots.vue";
export default {
  components: {
    StepProgress,
    HotSpots, // Register HotSpots as a component
  },
  data() {
    return {
      editMode: false,
      editMode_t: false,
      hintStyle: {
        color: "#fff",
        background: "#333",
        padding: "20px",
        border: "1px solid greenyellow",
      },
      newStyle: {
        padding: "20px",
        color: "#000",
        textShadow: "0 0 10px #fff",
        background: "#f42d82",
        border: "2px solid #000",
      },
      styles: "",
      text_color: "#fff",
      bg_color: "#333",
      dots_bg: "",
      input_bg: "",
      input_color: "",
      hint_text: "",
      inputTextColor: "",
      inputBg: "",
      inputStyles: {
        // background:'#333',
        // color:'#fff',
        // border:'1px solid greenyellow',
        // padding: '10px 15px'
      },
      activeDot: {},
      currentIndex: "",
      dotsArr: [],
      dots: [],
      dotsArrBuf: [
        {
          text: "Jisso",
          show_input: true,
          show_hint: false,
          posX: 15.5,
          posY: 10,
          color: "white",
          type: "dot",
        },
        {
          text: "Jennie",
          show_input: true,
          show_hint: false,
          posX: 30.5,
          posY: 39.2,
          color: "white",
          type: "dot",
        },
        {
          text: "Rose",
          show_input: true,
          show_hint: false,
          posX: 57.4999,
          posY: 14.2,
          color: "white",
          type: "dot",
        },
        {
          text: "Lisa",
          show_input: true,
          show_hint: false,
          posX: 74.125,
          posY: 27.8,
          color: "white",
          type: "dot",
        },
      ],
      customHint: "",
      dataSteps: {
        steps: ["Select Image", "Add Tags", "Save"],
        currentStep: 0,
        activeColor: "#476FFE",
        passiveColor: "#8A8A8A",
      },
      stepProgress: null,
      uploadedImage: null,
      hotspots: [],
      editingMode: true,
      buttonText: "Select Image", // Trigger for editing mode
    };
  },
  methods: {
    /*eslint-disable*/
    handleHotspotAdded(dots) {
      // Update state or perform any necessary actions with the new array of hotspots
      this.dotsArr = dots;
    },
    // Handle hotspot deleted event
    handleHotspotDeleted(payload) {
      // Update state or perform any necessary actions with the updated array of hotspots
      this.dotsArr = payload.dots;
    },
    // Handle hotspot changed event
    handleHotspotChanged(payload) {
      // Update state or perform any necessary actions with the updated array of hotspots
      this.dotsArr = payload.dots;
    },
    changeText() {
      // this.activeDot.text = this.hint_text
      // console.log('active dot')
      // console.log(this.activeDot)
      // console.log('array')

      // console.log(this.dotsArrBuf)
      // this.dotsArrBuf[this.currentIndex].text = this.hint_text

      // this.hint_text= ''
      // this.activeDot = {}
      this.dotsArr = this.dotsArrBuf;
    },
    changingDots(e) {
      // console.log('new dots array')
      // console.log(e)
      // this.dotsArrBuf = e
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
      this.uploadedImage = URL.createObjectURL(file);
      this.buttonText = "Change Image";
    },

    updatedHotspots(data) {
      this.hotspots = data;
    },
    toggleEditingMode() {
      this.editingMode = !this.editingMode; // Toggle editing mode
    },
    goToPreviousStep() {
      if (this.stepProgress && this.dataSteps.currentStep > 0) {
        this.dataSteps.currentStep--;
      }
    },
    goToNextStep() {
      if (
        this.stepProgress &&
        this.dataSteps.currentStep < 2 &&
        this.uploadedImage
      ) {
        this.dataSteps.currentStep++;
      }
    },
  },
  mounted() {
    this.stepProgress = this.$refs.stepProgress; // Assign the reference once mounted
  },
};
</script>

<style scoped>
.button-group {
  position: relative;
  margin-left: 70%;
  margin-right: 10%;
}

.steps-display {
  width: 100%;
  height: 100%;
}

.add-Image {
  position: relative;
  width: 100%;
  height: 100%;
}

.container {
  width: 50%;
  height: 50%;
  margin: 0;
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
  gap: 20px;
}
.settings__bg-color {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
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
</style>
