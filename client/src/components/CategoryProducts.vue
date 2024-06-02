<template>
  <div class="products px-5 mx-8 overflow-y-scroll h-screen mb-6">
    <h2 class="text-4xl font-semibold text-blue-800 mb-10">
      {{ categoryName }}
    </h2>
    <div class="grid grid-cols-5 gap-3">
      <div v-for="product in products" :key="product.id" class="group relative">
        <ProductCard :product="product" />
        <div class="button-group mt-0.5 flex justify-center items-center">
          <button type="button" class="action-button edit-button">
            <div class="icon-container">
              <span class="material-symbols-outlined"> star </span>
            </div>
          </button>
          <button
            type="button"
            class="action-button info-button"
            @click="toggleCollectionInfo(collection)"
          >
            <div class="icon-container">
              <span class="material-symbols-outlined"> shopping_bag </span>
            </div>
          </button>
          <button
            type="button"
            class="action-button delete-button"
            @click="deleteCollection(collection._id)"
          >
            <div class="icon-container">
              <span class="material-symbols-outlined"> visibility </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue";
import CategoryService from "@/services/category.service";

export default {
  name: "CategoryProducts",
  components: {
    ProductCard,
  },
  data() {
    return {
      products: [],
      categoryName: "",
    };
  },
  props: {
    categoryId: {
      type: String,
      required: true,
    },
  },
  watch: {
    categoryId: "fetchProducts",
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await CategoryService.getProductsByCategoryId(
          this.categoryId
        );
        this.products = response;
        const nameCatResponse = await CategoryService.getCategoryById(
          this.categoryId
        );
        this.categoryName = nameCatResponse.name;
        //  this.products.length > 0 ? this.products[0].categoryName : "";
      } catch (error) {
        console.error("Error fetching products for category:", error);
      }
    },
  },
};
</script>

<style scoped>
/* width */
.products {
  height: 500px;
  border-bottom: 1px solid #c8c7c7;
}
::-webkit-scrollbar {
  width: 8px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
.button-group {
  padding: 5%;
}
.action-button {
  width: 1em;
  height: 1em;
  padding: 10%;
  border: 1px solid #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon-container {
  height: 15px;
  display: flex;
}
.material-symbols-outlined {
  font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
}
:hover.action-button {
  background-color: #dcdcdc;
}
</style>
