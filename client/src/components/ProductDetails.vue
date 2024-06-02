<template>
  <div class="product-detail">
    <div class="product-main">
      <img :src="product.image" alt="Product Image" class="product-image" />
      <div class="product-info">
        <h1>{{ product.name }}</h1>
        <p>{{ product.description }}</p>
        <p class="product-price">{{ product.price }} DH</p>
        <div class="add-to-cart">
          <button class="btn-add-to-cart" @click="addToBasket">
            Add to Basket
          </button>
          <input
            type="number"
            v-model="quantity"
            min="1"
            class="quantity-input"
          />
        </div>
      </div>
    </div>
    <div class="recommended-products">
      <h2>Recommended for You</h2>
      <div class="recommended-list">
        <div
          v-for="item in recommendedProducts"
          :key="item.id"
          class="recommended-item"
          @click="navigateToProduct(item.id)"
        >
          <img
            :src="item.image"
            alt="Recommended Product"
            class="recommended-image"
          />
          <p>{{ item.name }}</p>
          <p>{{ item.price }} DH</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex"; // Correctly import useStore
import ProductService from "@/services/product.service";
import CategoryService from "@/services/category.service.js";

export default {
  props: ["id"],
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore(); // Use useStore
    const product = ref({});
    const category = ref("");
    const recommendedProducts = ref([]);
    const quantity = ref(1);

    const fetchProductDetails = async (id) => {
      try {
        const response = await ProductService.getProductById(id);
        product.value = response;
        category.value = product.value.category;
        fetchRecommendedProducts(category.value);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    const fetchRecommendedProducts = async (category) => {
      try {
        const response = await CategoryService.getProductsByCategoryId(
          category
        );
        recommendedProducts.value = response;
      } catch (error) {
        console.error("Error fetching recommended products:", error);
      }
    };

    const navigateToProduct = (productId) => {
      router.push({ name: "ProductDetail", params: { id: productId } });
    };

    const addToBasket = () => {
      const productToAdd = {
        ...product.value,
        quantity: quantity.value,
      };
      store.dispatch("addToBasket", productToAdd); // Dispatch action to Vuex store
    };

    watch(
      () => route.params.id,
      (newId) => {
        fetchProductDetails(newId);
      },
      { immediate: true }
    );

    return {
      product,
      category,
      recommendedProducts,
      quantity,
      navigateToProduct,
      addToBasket,
    };
  },
};
</script>

<style scoped>
.product-detail {
  padding: 20px;
  max-width: 1200px;
  margin: 20px auto;
  border: 4px solid #0a084d;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.product-main {
  display: flex;
}

.product-image {
  width: 300px;
  height: auto;
  margin-right: 20px;
}

.product-info {
  flex: 1;
  margin-left: 30px;
  margin-top: 30px;
}

.product-info h1 {
  font-size: 50px;
  font-weight: bold;
  margin-bottom: 10px;
}

.product-info p {
  margin: 10px 0;
}

.product-price {
  font-size: 24px;
  font-weight: bold;
  color: #000000;
}

.add-to-cart {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.btn-add-to-cart {
  background-color: #00509e;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  margin-right: 10px;
  border-radius: 20px;
}

.quantity-input {
  width: 60px;
  padding: 5px;
  border-radius: 20px;
  text-align: center;
  background-color: #bdc2c6;
}

.recommended-products {
  margin-top: 40px;
}

.recommended-products h2 {
  margin-bottom: 20px;
  font-size: 20px;
  color: #00509e;
}

.recommended-list {
  background-color: white;
  display: flex;
  overflow-x: auto;
}

.recommended-item {
  margin-right: 20px;
  text-align: center;
  cursor: pointer;
}

.recommended-image {
  width: 100px;
  height: auto;
  cursor: pointer;
}
</style>
