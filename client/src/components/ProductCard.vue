<template>
  <div class="product-card">
    <img :src="product.image" alt="Product Image" />
    <h3>{{ product.name }}</h3>
    <p>{{ product.price }} DH</p>
  </div>
</template>

<script>
export default {
  props: {
    product: Object,
  },
};
</script>

<style scoped>
.product-card {
  width: 200px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  text-align: center;
  background-color: white;
  margin: 10px;
}

.product-card img {
  width: 100%;
  height: auto;
  border-radius: 5px;
}

.product-card h3 {
  font-size: 18px;
  margin: 10px 0;
}

.product-card p {
  font-size: 16px;
  color: #555;
}
</style>
