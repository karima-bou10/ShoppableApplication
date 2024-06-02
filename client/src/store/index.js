// src/store.js
import { createStore } from "vuex";

const basket = JSON.parse(localStorage.getItem("basket")) || [];

export default createStore({
  state: {
    basket,
  },
  mutations: {
    ADD_TO_BASKET(state, product) {
      const item = state.basket.find((p) => p.id === product.id);
      if (item) {
        item.quantity += product.quantity;
      } else {
        state.basket.push(product);
      }
      localStorage.setItem("basket", JSON.stringify(state.basket));
    },
    LOAD_BASKET(state) {
      const basket = JSON.parse(localStorage.getItem("basket"));
      if (basket) {
        state.basket = basket;
      }
    },
    INCREASE_QUANTITY(state, productId) {
      const item = state.basket.find((p) => p.id === productId);
      if (item) {
        item.quantity++;
        localStorage.setItem("basket", JSON.stringify(state.basket));
      }
    },
    DECREASE_QUANTITY(state, productId) {
      const item = state.basket.find((p) => p.id === productId);
      if (item && item.quantity > 1) {
        item.quantity--;
        localStorage.setItem("basket", JSON.stringify(state.basket));
      }
    },
  },
  actions: {
    addToBasket({ commit }, product) {
      commit("ADD_TO_BASKET", product);
    },
    loadBasket({ commit }) {
      commit("LOAD_BASKET");
    },
    increaseQuantity({ commit }, productId) {
      commit("INCREASE_QUANTITY", productId);
    },
    decreaseQuantity({ commit }, productId) {
      commit("DECREASE_QUANTITY", productId);
    },
  },
  getters: {
    basketItems: (state) => state.basket,
    cartSubtotal: (state) =>
      state.basket.reduce((sum, item) => sum + item.price * item.quantity, 0),
  },
});
