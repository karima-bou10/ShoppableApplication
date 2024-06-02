<template>
  <div v-if="isVisible" class="cart">
    <div class="cart-header">
      <h3>Panier</h3>
      <button @click="closeCart">X</button>
    </div>
    <div class="cart-content">
      <div v-for="item in basketItems" :key="item.id" class="cart-item">
        <img :src="item.image" :alt="item.name" />
        <div>
          <h4>{{ item.name }}</h4>
          <p>{{ item.price }} DH</p>
          <div class="quantity">
            <button @click="decreaseQuantity(item.id)">-</button>
            <span>{{ item.quantity }}</span>
            <button @click="increaseQuantity(item.id)">+</button>
          </div>
        </div>
      </div>
    </div>
    <div class="cart-footer">
      <p>Sous-total : {{ cartSubtotal }} DH</p>
      <button class="finalize-order">Finalize the order</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["basketItems", "cartSubtotal"]),
  },
  methods: {
    ...mapActions(["increaseQuantity", "decreaseQuantity"]),
    closeCart() {
      this.$emit("close-cart");
    },
  },
};
</script>

<style scoped>
.cart {
  position: fixed;
  right: 0;
  top: 0;
  width: 300px;
  height: 100%;
  background-color: white;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 1000;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cart-content {
  flex-grow: 1;
  overflow-y: auto;
}

.cart-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.cart-item img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.quantity {
  display: flex;
  align-items: center;
}

.quantity button {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

.finalize-order {
  background-color: #00509e;
  color: white;
  padding: 10px;
  border: none;
  width: 100%;
  cursor: pointer;
}
</style>
