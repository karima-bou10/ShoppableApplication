<template>
  <div class="nav-menu">
    <div
      class="nav-item"
      v-for="item in items"
      :key="item.text"
      @click="selectCategory(item.id)"
    >
      <img :src="item.icon" alt="" class="nav-icon" />
      <span class="nav-text">{{ item.text }}</span>
    </div>
  </div>
  <CategoryProducts
    v-if="selectedCategoryId"
    :categoryId="selectedCategoryId"
  />
</template>

<script>
import CategoryProducts from "@/components/CategoryProducts.vue";
import CategoryService from "@/services/category.service";

export default {
  components: {
    CategoryProducts,
  },
  data() {
    return {
      items: [],
      selectedCategoryId: null,
    };
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await CategoryService.getAllCategories();
        const categories = response.data;

        for (const category of categories) {
          try {
            const products = await CategoryService.getProductsByCategoryId(
              category.id
            );
            const icon =
              products.length > 0
                ? products[0].image
                : require("@/assets/vase.png");

            this.items.push({
              id: category.id,
              text: category.name,
              icon: icon,
            });
          } catch (error) {
            console.error(
              `Error fetching products for category ${category.name}:`,
              error
            );
          }
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },
    selectCategory(categoryId) {
      this.selectedCategoryId = categoryId;
    },
  },
};
</script>

<style scoped>
.nav-menu {
  background-color: white;
  display: flex;
  overflow-x: auto;
  padding: 10px;
  padding-bottom: 20px;
  padding-top: 20px;
  margin: 40px;
  margin-top: 20px;
  border-bottom: 1px solid #ddd;
  scroll-behavior: smooth; /* Smooth scrolling */
}
.nav-menu::-webkit-scrollbar {
  height: 2px; /* Height of the scrollbar */
}

.nav-menu::-webkit-scrollbar-thumb {
  background: #004aad; /* Color of the scrollbar thumb */
  border-radius: 4px; /* Rounded corners for the scrollbar thumb */
  margin-left: 3px;
}

.nav-menu::-webkit-scrollbar-thumb:hover {
  background: #555; /* Color when hovering over the scrollbar thumb */
}
.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 20px;
  text-align: center;
  width: 100px;
  flex: 0 0 auto; /* Prevent items from shrinking */
}
.nav-icon {
  width: 50px;
  height: 50px;
  margin-bottom: 5px;
}
.nav-text {
  font-size: 14px;
  color: #333;
}
:hover.nav-text {
  cursor: pointer;
  text-decoration: underline;
}
</style>
