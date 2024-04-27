<template>
  <div class="bg-white overflow-y-scroll h-screen">
    <div class="mx-auto max-w-2xl px-4 py-10 lg:max-w-7xl lg:px-8">
      <div
        class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
      >
        <div
          v-for="shopImg in shopImgs"
          :key="shopImg.id"
          class="group relative"
        >
          <div
            class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-t-lg bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-72"
          >
            <img
              :src="shopImg.imageSrc"
              :alt="shopImg.imageAlt"
              class="h-full w-full object-cover object-center lg:h-full lg:w-full"
            />
          </div>

          <div class="button-group mt-4 rounded-b-lg flex justify-around">
            <button type="button" class="action-button edit-button">
              <div class="icon-container">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path
                    fill="#ffffff"
                    d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"
                  />
                </svg>
              </div>
            </button>
            <button
              type="button"
              class="action-button info-button"
              @click="toggleImgInfo(shopImg)"
            >
              <div class="icon-container">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512">
                  <path
                    fill="#ffffff"
                    d="M48 80a48 48 0 1 1 96 0A48 48 0 1 1 48 80zM0 224c0-17.7 14.3-32 32-32H96c17.7 0 32 14.3 32 32V448h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H64V256H32c-17.7 0-32-14.3-32-32z"
                  />
                </svg>
              </div>
            </button>
            <button type="button" class="action-button delete-button">
              <div class="icon-container">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path
                    fill="#ffffff"
                    d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"
                  />
                </svg>
              </div>
            </button>
          </div>

          <!-- Div for displaying shoppable image information -->
          <div
            v-if="selectedImg"
            v-show="selectedImg.id === shopImg.id"
            class="absolute top-0 right-0 left-0 z-0 mt-6 ml-6 mr-6 bg-white/50 p-4 rounded-md shadow-md"
            ref="ImgInfo"
          >
            <button
              @click="selectedImg = null"
              class="absolute top-0 right-0 p-2 transition duration-150 ease-in-out"
            >
              <div class="icon-container">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path
                    fill="#808080"
                    d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                  />
                </svg>
              </div>
            </button>
            <h3 class="text-lg font-semibold">Infos</h3>
            <div v-for="(product, index) in selectedImg.products" :key="index">
              <div class="flex justify-between mt-2">
                <p class="mr-4">{{ product.name }}</p>
                <p class="text-gray-600">{{ product.price }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* width */
::-webkit-scrollbar {
  width: 8px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.button-group {
  padding: 5% 10% 5% 10%;
  background-color: gainsboro;
}
.action-button {
  width: 1em;
  height: 1em;
  padding: 8%;
  border-radius: 50%;
  background-color: #476ffe;
  display: flex;
  justify-content: center;
  align-items: center;
}
.mt-4 {
  margin-top: 0rem;
  background-color: none;
}
.icon-container {
  height: 15px;
  margin: 5px auto;
  display: flex;
}
</style>
<script setup>
import { ref } from "vue";
import image from "../assets/shopImage.jpeg";

const selectedImg = ref(null);

const products = [
  {
    id: 1,
    name: "pantalone",
    price: "$35",
  },
  {
    id: 2,
    name: "chemise",
    price: "$30",
  },
  {
    id: 3,
    name: "sac",
    price: "$20",
  },
  {
    id: 4,
    name: "sandale",
    price: "$40",
  },
];

const shopImgs = [
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    imageSrc: image,
    imageAlt: "Shop Image 1",
    products: products,
  },
  {
    id: 2,
    name: "Basic Tee",
    href: "#",
    imageSrc: image,
    imageAlt: "Shop Image 2",
    products: products,
  },
  {
    id: 3,
    name: "Basic Tee",
    href: "#",
    imageSrc: image,
    imageAlt: "Shop Image 3",
    products: products,
  },
  {
    id: 4,
    name: "Basic Tee",
    href: "#",
    imageSrc: image,
    imageAlt: "Shop Image 4",
    products: products,
  },
  {
    id: 5,
    name: "Basic Tee",
    href: "#",
    imageSrc: image,
    imageAlt: "Shop Image 5",
    products: products,
  },
  {
    id: 6,
    name: "Basic Tee",
    href: "#",
    imageSrc: image,
    imageAlt: "Shop Image 6",
    products: products,
  },
  {
    id: 7,
    name: "Basic Tee",
    href: "#",
    imageSrc: image,
    imageAlt: "Shop Image 7",
    products: products,
  },
  {
    id: 8,
    name: "Basic Tee",
    href: "#",
    imageSrc: image,
    imageAlt: "Shop Image 8",
    products: products,
  },
  {
    id: 9,
    name: "Basic Tee",
    href: "#",
    imageSrc: image,
    imageAlt: "Shop Image 8",
    products: products,
  },
  {
    id: 10,
    name: "Basic Tee",
    href: "#",
    imageSrc: image,
    imageAlt: "Shop Image 8",
    products: products,
  },
];

const toggleImgInfo = (shopImg) => {
  selectedImg.value = selectedImg.value === shopImg ? null : shopImg; // Show shopImg info if not already selected && Hide it if already selected
};
</script>
