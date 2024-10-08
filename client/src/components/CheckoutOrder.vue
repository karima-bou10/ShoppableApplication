<template>
  <Transition name="modal">
    <div
      v-if="isCheckoutRoute"
      tabindex="-1"
      class="modal-mask hidden modal-mask fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center bg-black bg-opacity-50 max-h-full"
    >
      <!-- Modal content -->

      <div class="relative mx-auto flex size-full">
        <div class="w-4/6 bg-gray-100 p-8 shadow-md">
          <h2 class="text-2xl font-semibold mb-6 justify-center items-center">
            Finalize your order
          </h2>

          <form @submit.prevent="submitOrder">
            <div class="mb-4">
              <label
                for="email"
                class="block text-blue-800 text-lg font-medium pb-2"
                >Email address</label
              >
              <input
                type="email"
                v-model="order.email"
                required
                class="w-full p-3 border rounded-lg"
                placeholder="your email address"
              />
            </div>
            <div class="flex mb-4">
              <div class="w-1/2 mr-2">
                <label
                  for="firstName"
                  class="block text-blue-800 text-lg font-medium pb-2"
                  >First name</label
                >
                <input
                  type="text"
                  v-model="order.firstName"
                  required
                  class="w-full p-3 border rounded-lg"
                  placeholder="your first name"
                />
              </div>
              <div class="w-1/2 ml-2">
                <label
                  for="lastName"
                  class="block text-blue-800 text-lg font-medium pb-2"
                  >Last name</label
                >
                <input
                  type="text"
                  v-model="order.lastName"
                  required
                  class="w-full p-3 border rounded-lg"
                  placeholder="your last name"
                />
              </div>
            </div>
            <div class="mb-4">
              <label
                for="address"
                class="block text-blue-800 text-lg font-medium pb-2"
                >Address</label
              >
              <input
                type="text"
                v-model="order.address"
                required
                class="w-full p-3 border rounded-lg"
                placeholder="your address"
              />
            </div>
            <div class="mb-4">
              <label
                for="phoneNumber"
                class="block text-blue-800 text-lg font-medium pb-2"
                >Phone number</label
              >
              <input
                type="text"
                v-model="order.phoneNumber"
                required
                class="w-full p-3 border rounded-lg"
                placeholder="your phone number"
              />
            </div>
            <div class="flex items-center justify-center pt-5">
              <button
                type="submit"
                class="checkout-button"
                @click="submitOrder()"
                :disabled="submittingOrder"
              >
                Confirm Order
              </button>
            </div>
          </form>
        </div>
        <!-- Cart items summary -->

        <div class="cart w-2/6 shadow-md">
          <div class="flex justify-between items-center mb-9 md:p-1 rounded-t">
            <button
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              @click="closeCheckoutForm"
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
          <div class="grow overflow-x-hidden overflow-y-scroll">
            <div
              v-for="item in cartItems"
              :key="item.id"
              class="flex flex-col mb-9"
            >
              <div class="flex w-full mx-6">
                <div class="image m-0.5">
                  <img :src="item.image" :alt="item.name" />
                </div>

                <div class="flex flex-col p-0.5 grow mr-10">
                  <div class="flex justify-between">
                    <p class="text-base font-medium p-0.5">{{ item.name }}</p>

                    <p class="text-base font-semibold p-0.5">
                      {{ item.price }} DH
                    </p>
                  </div>

                  <div
                    class="mt-2 bg-slate-200 w-max px-3 rounded-md p-0.5 text-center"
                  >
                    <span>{{ item.quantity }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-6 flex flex-col p-6">
            <div class="flex justify-between mb-4">
              <div class="text-medium">Sous-total :</div>
              <p>{{ subtotal }} DH</p>
            </div>
            <div class="flex justify-between mb-5">
              <div class="text-medium">Livraison :</div>
              <p>20.00 DH</p>
            </div>
            <div class="flex justify-between mb-2">
              <div class="text-xl font-bold">Total :</div>
              <p class="text-xl font-bold">{{ total }} DH</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import OrderService from "@/services/order.service";
export default {
  props: {
    showCheckoutForm: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      submittingOrder: false,
      cartItems: [],
      order: {
        email: "",
        firstName: "",
        lastName: "",
        address: "",
        phoneNumber: "",
      },
    };
  },
  computed: {
    isCheckoutRoute() {
      return this.$route.path === "/checkout";
    },
    subtotal() {
      // Calculate subtotal based on cartItems
      return this.cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
    total() {
      // Calculate total including delivery
      return this.subtotal + 20;
    },
  },
  mounted() {
    const cartItemsFromStorage = localStorage.getItem("cartItems");
    if (cartItemsFromStorage) {
      try {
        this.cartItems = JSON.parse(cartItemsFromStorage);
      } catch (error) {
        console.error("Error parsing cartItems from local storage:", error);
      }
    } else {
      console.error("No cartItems found in local storage");
    }
  },
  methods: {
    closeCheckoutForm() {
      this.$router.push({
        name: "Home",
      });
    },
    submitOrder() {
      // Process the order submission
      // alert("Order submitted!");
      // this.$router.push({
      //   name: "Home",
      // });
      this.submittingOrder = true;

      const totalQuantity = this.cartItems.reduce(
        (total, item) => total + item.price,
        0
      );
      const orderData = {
        client: {
          name: this.order.firstName + " " + this.order.lastName,
          email: this.order.email,
          telephone: this.order.phoneNumber,
        },
        address: this.order.address,
        total: totalQuantity,
        dateCreation: new Date().toISOString(),
        statut: false,
        items: this.cartItems.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        })),
        // Other properties as needed
      };
      OrderService.createOrder(orderData)
        .then((createdOrder) => {
          alert("Order submitted successfully!");
          console.log("Created order:", createdOrder);
          // Optionally, clear the cartItems and navigate to another route
        })
        .catch((error) => {
          console.error("Error submitting order:", error);
          alert("Failed to submit order. Please try again later.");
        });
    },
  },
};
</script>

<style scoped>
@import "./styleModal.css";
.modal-mask {
  background-color: rgb(0, 0, 0, 0.06);
}
.checkout-button {
  background-color: #00509e;
  color: white;
  padding: 10px;
  padding-left: 20px;
  padding-right: 20px;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
}
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
  right: 0;
  top: 0;
  background-color: white;
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
</style>
