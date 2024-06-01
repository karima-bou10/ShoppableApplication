<template>
  <div class="product-detail">
    <div class="product-main">
      <img :src="product.image" alt="Product Image" class="product-image" />
      <div class="product-info">
        <h1>{{ product.name }}</h1>
        <p>{{ product.description }}</p>
        <p class="product-price">{{ product.price }}DH</p>
        <div class="add-to-cart">
          <button class="btn-add-to-cart">Add to basket</button>
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
      <h2>Recommended for you</h2>
      <div class="recommended-list">
        <div
          v-for="item in recommendedProducts"
          :key="item.id"
          class="recommended-item"
        >
          <img
            :src="item.image"
            alt="Recommended Product"
            class="recommended-image"
          />
          <p>{{ item.name }}</p>
          <p>{{ item.price }}DH</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      product: {},
      recommendedProducts: [],
      quantity: 1,
    };
  },
  created() {
    // Fetch the product details using the id prop
    this.fetchProductDetails();
    // Fetch recommended products (this is a placeholder, you should replace it with actual logic)
    this.fetchRecommendedProducts();
  },
  methods: {
    fetchProductDetails() {
      // Replace this with your actual API call or logic to fetch product details
      this.product = {
        id: this.id,
        name: "MICKE",
        description:
          "A clean and simple look that fits just about anywhere. You can combine it with other desks or drawer units in the MICKE series to extend your work space. The clever design at the back hides messy cables.",
        price: 549,
        image: require("@/assets/product-image.png"), // Replace with actual image path
      };
    },
    fetchRecommendedProducts() {
      // Replace this with your actual API call or logic to fetch recommended products
      this.recommendedProducts = [
        {
          id: 1,
          name: "MICKE",
          price: 549,
          image: require("@/assets/recommended-product1.png"), // Replace with actual image path
        },
        // Add more recommended products here
      ];
    },
  },
};
</script>

<style scoped>
.product-detail {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
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
}

.product-info h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

.product-info p {
  margin: 10px 0;
}

.product-price {
  font-size: 24px;
  font-weight: bold;
  color: #00509e;
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
}

.quantity-input {
  width: 60px;
  padding: 5px;
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
  display: flex;
  overflow-x: auto;
}

.recommended-item {
  margin-right: 20px;
  text-align: center;
}

.recommended-image {
  width: 100px;
  height: auto;
}
</style>
