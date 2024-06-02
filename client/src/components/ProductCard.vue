<template>
  <div class="product-card">
    <div
      class="aspect-h-1 aspect-w-1 w-full mb-4 overflow-hidden lg:aspect-none group-hover:opacity-75 lg:h-72"
    >
      <img
        :src="product.image"
        alt="Product Image"
        class="h-full w-full object-center object-contain lg:h-full lg:w-full"
      />
    </div>
    <div class="text-center">
      <h3 class="font-bold text-base">{{ product.name }}</h3>
      <p class="text-sm">{{ product.description }}</p>
      <p class="font-bold text-lg">{{ product.price }} DH</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.product-card {
  border: 1px solid #ddd;
  padding: 10px;
}
</style>
