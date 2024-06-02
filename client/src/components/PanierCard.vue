<template>
  <div v-if="isVisible" class="cart">
    <div class="flex justify-between items-center mb-9">
      <h3 class="text-2xl text-left font-bold text-black">Panier</h3>
      <div class="flex items-center justify-between md:p-1 rounded-t">
        <button
          type="button"
          class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
          @click="closeCart"
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
    </div>
    <div class="grow overflow-y-scroll">
      <div v-for="item in cartItems" :key="item.id" class="flex flex-col mb-9">
        <div class="flex">
          <div class="image m-0.5">
            <img :src="item.image" :alt="item.name" />
          </div>
          <div class="flex flex-col p-0.5">
            <p class="text-base font-medium p-0.5">{{ item.name }}</p>
            <p class="text-sm p-0.5">{{ item.description }}</p>
            <p class="text-base font-semibold p-0.5">{{ item.price }} DH</p>
            <div class="flex mt-2">
              <div
                class="grid grid-cols-3 gap-0 bg-slate-200 w-24 rounded-md p-0.5"
              >
                <div class="text-center cursor-pointer">
                  <button @click="decreaseQuantity(item)">-</button>
                </div>
                <div class="text-center">
                  <span>{{ item.quantity }}</span>
                </div>
                <div class="text-center cursor-pointer">
                  <button @click="increaseQuantity(item)">+</button>
                </div>
              </div>
              <div class="ml-4">
                <p class="underline decoration-green-950 text-base">Retirer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-6">
      <div class="flex justify-between mb-4">
        <div class="text-medium">Sous-total :</div>
        <p>{{ cartSubtotal }} DH</p>
      </div>
      <button class="finalize-order" @click="finalizeOrder">
        Finalize the order
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
    cartItems: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  methods: {
    closeCart() {
      this.$emit("close-cart");
    },
    finalizeOrder() {
      this.$emit("toggle-contact");
    },
    increaseQuantity(item) {
      item.quantity++;
    },
    decreaseQuantity(item) {
      if (item.quantity > 1) {
        item.quantity--;
      }
    },
  },
  computed: {
    cartSubtotal() {
      return this.cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
  },
};
</script>

<style scoped>
/* width */
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
  background: #004aad;
  border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #004aad;
}

.cart {
  position: fixed;
  right: 0;
  top: 0;
  width: 350px;
  height: 100%;
  background-color: white;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 1000;
}

.image {
  border: 1px solid lightgray;
  width: 85px;
  height: 85px;
  margin-right: 10px;
}

.finalize-order {
  background-color: #00509e;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 1rem;
  width: 100%;
  cursor: pointer;
}
</style>
