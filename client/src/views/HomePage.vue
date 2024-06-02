<template>
  <div>
    <AppHeader @toggle-cart="toggleCart" />
    <AppNavbar />
    <HomeBanner />
    <section class="products">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </section>
    <AppFooter />
    <Cart
      :is-visible="isCartVisible"
      :cart-items="cartItems"
      @close-cart="closeCart"
      @toggle-contact="toggleContact"
    />
    <CheckoutOrder
      :showCheckoutForm="showCheckoutForm"
      :cartItems="cartItems"
      @close-contact="closeContact"
    />
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import AppNavbar from "@/components/AppNavbar.vue";
import HomeBanner from "@/components/HomeBanner.vue";
import ProductCard from "@/components/ProductCard.vue";
import AppFooter from "@/components/AppFooter.vue";
import Cart from "@/components/PanierCard.vue";
import CheckoutOrder from "@/components/CheckoutOrder.vue";
import img from "@/assets/desk.jpg";

export default {
  components: {
    AppHeader,
    AppNavbar,
    HomeBanner,
    ProductCard,
    AppFooter,
    Cart,
    CheckoutOrder,
  },
  data() {
    return {
      isCartVisible: false,
      showCheckoutForm: false,
      cartItems: [
        {
          id: 1,
          name: "MICKE Desk",
          description: "white",
          price: 549,
          quantity: 1,
          image: img,
        },
        {
          id: 2,
          name: "MICKE Drawer",
          description: "unit on castors, white",
          price: 1195,
          quantity: 1,
          image: img,
        },
        {
          id: 2,
          name: "MICKE Drawer",
          description: "unit on castors, white",
          price: 1195,
          quantity: 1,
          image: img,
        },
        {
          id: 2,
          name: "MICKE Drawer",
          description: "unit on castors, white",
          price: 1195,
          quantity: 1,
          image: img,
        },
        {
          id: 2,
          name: "MICKE Drawer",
          description: "unit on castors, white",
          price: 1195,
          quantity: 1,
          image: img,
        },
        {
          id: 2,
          name: "MICKE Drawer",
          description: "unit on castors, white",
          price: 1195,
          quantity: 1,
          image: img,
        },
        {
          id: 2,
          name: "MICKE Drawer",
          description: "unit on castors, white",
          price: 1195,
          quantity: 1,
          image: img,
        },
      ],
      products: [
        {
          id: 1,
          name: "MICKE Desk, white",
          price: "549 DH",
          image: "micke-desk.jpg",
        },
        {
          id: 2,
          name: "Lamp",
          price: "199 DH",
          image: "lamp.jpg",
        },
        {
          id: 3,
          name: "Chair",
          price: "299 DH",
          image: "chair.jpg",
        },
        // Add more products as needed
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
    toggleContact() {
      this.showCheckoutForm = true;
    },
    closeContact() {
      this.showCheckoutForm = false;
    },
  },
};
</script>

<style scoped>
.products {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
  background-color: #f4f4f4;
}
</style>
