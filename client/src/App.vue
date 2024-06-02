<template>
  <div id="app">
    <AppHeader @toggle-cart="toggleCart" />
    <router-view />
    <Cart
      :is-visible="isCartVisible"
      :cart-items="cartItems"
      @close-cart="closeCart"
    />
  </div>
</template>

<script>
import AppHeader from "./components/AppHeader.vue";
import Cart from "./components/PanierCard.vue";

export default {
  name: "App",
  components: {
    AppHeader,
    Cart,
  },
  data() {
    return {
      isCartVisible: false,
      cartItems: [
        {
          id: 1,
          name: "MICKE Desk, white",
          price: 549,
          quantity: 1,
          image: "vase.png",
        },
        {
          id: 2,
          name: "MICKE Drawer unit on castors, white",
          price: 1195,
          quantity: 1,
          image: "vase.png",
        },
      ],
    };
  },
  methods: {
    toggleCart() {
      this.isCartVisible = !this.isCartVisible;
    },
    closeCart() {
      this.isCartVisible = false;
    },
  },
};
</script>

<style>
html,
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #ffffff;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

footer {
  margin-top: auto;
}
</style>
