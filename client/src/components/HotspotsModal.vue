<template>
  <div class="hotspot-image-container relative inline-block">
    <img
      :src="imageSrc"
      alt="Product Image"
      class="product-image w-full h-auto"
    />
    <div
      v-for="(hotspot, index) in hotspots"
      :key="index"
      class="hotspot"
      :style="{
        top: `${hotspot.y}%`,
        left: `${hotspot.x}%`,
        backgroundColor: hotspot.dotcolor,
      }"
      @click="navigateToProduct(hotspot.product.id)"
    >
      <div
        class="tooltip"
        :style="{ backgroundColor: hotspot.bgcolor, color: hotspot.textcolor }"
      >
        <h3 class="border-b-2 mb-2">{{ hotspot.title }}</h3>
        <p>{{ hotspot.description }}</p>
        <p>{{ hotspot.product.price }} DH</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router"; // Correctly import useRouter

export default {
  props: {
    imageSrc: {
      type: String,
      required: true,
    },
    hotspots: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const router = useRouter(); // Use useRouter
    const navigateToProduct = (productId) => {
      router.push({ name: "ProductDetail", params: { id: productId } });
    };
    return { navigateToProduct };
  },
};
</script>

<style scoped>
.hotspot-image-container {
  position: relative;
  display: inline-block;
}

.hotspot {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  cursor: pointer;
}

.tooltip {
  display: none;
  position: absolute;
  top: 25px;
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  white-space: nowrap;
}

.hotspot:hover .tooltip {
  display: block;
}
</style>
