<template>
  <main id="Product-page">
    <form class="flex items-center ml-12 mt-20 relative">
      <label for="search" class="sr-only">Search</label>
      <div class="flex items-center relative w-full">
        <div
          class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
        >
          <svg
            class="w-4 h-4 me-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="#8a8a8a"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="text"
          v-model="searchQuery"
          id="search"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ps-10 p-2.5"
          placeholder="Search ..."
          style="width: 20rem"
        />
        <div class="relative">
          <button
            id="dropdowncatButton"
            class="text-white bg-gray-400 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-200 font-semibold rounded-full text-sm px-5 mx-5 py-2.5 text-center inline-flex items-center"
            type="button"
            @click="
              dropDownCategory = !dropDownCategory;
              this.showNewCategoryInput = false;
              this.newCategoryName = '';
              this.showEditCategoryInput = false;
            "
          >
            {{ buttonText }}
            <svg
              class="w-2.5 h-2.5 ms-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          <!-- Dropdown menu -->
          <div
            v-if="dropDownCategory"
            class="absolute z-30 top-12 left-0 bg-white rounded-lg shadow w-60"
          >
            <ul class="h-48 py-2 overflow-y-auto text-left text-gray-700">
              <li>
                <a
                  href="#"
                  class="px-4 py-2 text-gray-500 hover:bg-gray-100"
                  @click="
                    selectedCategory = null;
                    buttonText = 'Category';
                  "
                >
                  All
                </a>
              </li>
              <li v-for="(category, index) in categories" :key="index">
                <div class="block flex justify-between">
                  <div class="px-4 py-2 hover:bg-gray-100">
                    <a
                      href="#"
                      @click="
                        selectedCategory = category;
                        buttonText = category.name;
                      "
                    >
                      {{ category.name }}
                    </a>
                  </div>
                  <div class="flex justify-end h-8 px-4 py-2">
                    <div class="flex px-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        class="cursor-pointer"
                        @click="toggleEditCategoryInput(category)"
                      >
                        <path
                          fill="#9ca3af"
                          d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"
                        />
                      </svg>
                    </div>
                    <div class="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        class="cursor-pointer"
                        @click="showAllProductDelete(category)"
                      >
                        <path
                          fill="#b92525"
                          d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <a
              href="#"
              class="flex items-center p-3 text-sm font-medium text-blue-600 border-t border-gray-200 rounded-b-lg bg-gray-50 dark:border-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-blue-500 hover:underline"
              @click="toggleNewCategoryInput()"
            >
              <svg
                class="w-4 h-4 me-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
                style="margin-top: -6px"
              >
                <path
                  stroke="#476ffe"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add new category
            </a>
            <!-- New category input field and button -->
            <div v-if="showNewCategoryInput" class="p-4">
              <input
                v-model="newCategoryName"
                type="text"
                placeholder="New category"
                class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full mb-3"
              />
              <div v-if="categoryExists" class="text-xs pb-3 text-red-600">
                Category name already exists
              </div>
              <button
                @click="addNewCategory"
                type="button"
                class="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
              >
                Add
              </button>
            </div>

            <!-- Edit category input field and button -->
            <div v-if="showEditCategoryInput" class="p-4">
              <input
                v-model="editCategoryName"
                type="text"
                class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full mb-3"
              />
              <div
                v-if="categoryEditedExists"
                class="text-xs pb-3 text-red-600"
              >
                Category name already exists
              </div>
              <button
                @click="handleEditCategory(this.categoryToEdit)"
                type="button"
                class="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
              >
                Edit
              </button>
            </div>

            <!-- Affichage du modal de suppression des produit d'une catégorie spécifique -->
            <DeleteAllProdModal
              v-if="showDeleteAllModal && productsExists"
              :showDeleteAllModal="showDeleteAllModal"
              :categoryToDelete="categoryToDelete"
              @close="closeDeleteAllModal"
              @delete="handleDeleteCategory"
            />
          </div>
        </div>
      </div>

      <!-- Modal toggle -->
      <button
        class="flex justify-around items-center py-2 px-3 ms-2 me-6 text-base font-medium text-white bg-blue-800 rounded-full border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
        type="button"
        @click="showModal = true"
      >
        <svg
          class="w-6 h-6 me-2 mt-0.5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
          style="margin-top: -6px"
        >
          <path
            stroke="#ffffff"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        <span class="whitespace-nowrap">Add product</span>
      </button>
    </form>

    <!-- Affichage du modal de création de produit -->
    <ProductModal
      v-if="showModal"
      :categories="categories"
      @close="showModal = false"
      @save="handleSaveProduct"
    />

    <!-- Products Table  -->
    <div
      class="table-container relative shadow-md sm:rounded-lg my-8 mx-7 overflow-y-scroll"
    >
      <table class="w-full text-sm rtl:text-right text-gray-500">
        <thead class="sticky top-0 z-10 text-xs uppercase">
          <tr>
            <th scope="col" class="px-3 py-3">
              <span class="sr-only">Image</span>
            </th>
            <th scope="col" class="px-6 py-3">Ref</th>
            <th scope="col" class="px-6 py-3">Name</th>
            <th scope="col" class="px-6 py-3">Category</th>
            <th scope="col" class="px-6 py-3">Price</th>
            <th scope="col" class="px-6 py-3">Quantity</th>
            <th scope="col" class="px-6 py-3 whitespace-nowrap">
              Creation date
            </th>
            <th scope="col" class="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(product, index) in filteredProducts"
            :key="index"
            class="group relative odd:bg-white even:bg-gray-50 border-b"
          >
            <td class="p-4">
              <img
                :src="product.image"
                :alt="product.name"
                class="md:w-9 max-w-full max-h-full"
              />
            </td>
            <td class="px-6 py-4">{{ product.reference }}</td>
            <td
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              {{ product.name }}
            </td>
            <td class="px-6 py-4">
              {{ product.categoryName }}
            </td>
            <td class="px-6 py-4">{{ product.price }} DH</td>
            <td class="px-6 py-4">{{ product.quantity }}</td>
            <td class="px-6 py-4">{{ formatDate(product.creationDate) }}</td>

            <td class="px-6 py-4">
              <div class="button-group flex justify-between">
                <button
                  type="button"
                  class="action-button edit-button"
                  @click="showProductEdit(product)"
                >
                  <div class="icon-container">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="#ffffff"
                        d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"
                      />
                    </svg>
                  </div>
                </button>
                <!-- Pass selected product data to EditProdModal component -->
                <EditProdModal
                  v-if="showEditModal"
                  @close="showEditModal = false"
                  :categories="categories"
                  :product="selectedProduct"
                  @update="handleSaveChanges"
                />
                <button
                  type="button"
                  class="action-button info-button"
                  @click="showProductInfo(product)"
                >
                  <div class="icon-container">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 192 512"
                    >
                      <path
                        fill="#ffffff"
                        d="M48 80a48 48 0 1 1 96 0A48 48 0 1 1 48 80zM0 224c0-17.7 14.3-32 32-32H96c17.7 0 32 14.3 32 32V448h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H64V256H32c-17.7 0-32-14.3-32-32z"
                      />
                    </svg>
                  </div>
                </button>
                <!-- Pass selected product data to InfoProdModal component -->
                <InfoProdModal
                  v-if="showInfoModal"
                  @close="showInfoModal = false"
                  :selectedProduct="selectedProduct"
                />
                <button
                  type="button"
                  class="action-button delete-button"
                  @click="showProductDelete(product)"
                >
                  <div class="icon-container">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path
                        fill="#ffffff"
                        d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"
                      />
                    </svg>
                  </div>
                </button>
                <!-- Affichage du modal de suppression de produit -->
                <DeleteProdModal
                  v-if="showDeleteModal"
                  :showDeleteModal="showDeleteModal"
                  :product="productToDelete"
                  @close="closeDeleteModal"
                  @delete="handleDeleteProduct"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Alert :message="message" v-if="showSuccessAlert" />
  </main>
</template>

<script>
//import components
import ProductModal from "../components/Product/ProductModal.vue";
import InfoProdModal from "../components/Product/InfoProdModal.vue";
import DeleteProdModal from "../components/Product/DeleteProdModal.vue";
import EditProdModal from "../components/Product/EditProdModal.vue";
import DeleteAllProdModal from "../components/Product/DeleteAllProdModal.vue";
import Alert from "../components/AlertModal.vue";
//import services
import CategoryService from "../services/category.service.js";
import ProductService from "../services/product.service.js";

export default {
  name: "Product",
  components: {
    ProductModal,
    InfoProdModal,
    DeleteProdModal,
    EditProdModal,
    DeleteAllProdModal,
    Alert,
  },

  data() {
    return {
      categories: [],
      products: [],
      selectedProduct: null,
      selectedCategory: null,
      showModal: false,
      showInfoModal: false,
      showEditModal: false,
      showDeleteModal: false,
      showDeleteAllModal: false,
      productToDelete: null,
      categoryToDelete: null,
      dropDownCategory: false,
      showNewCategoryInput: false,
      showEditCategoryInput: false,
      newCategoryName: "",
      editCategoryName: "",
      buttonText: "Category",
      searchQuery: "",
      showSuccessAlert: false,
      message: "",
      categoryExists: false,
      categoryEditedExists: false,
      productsExists: false,
      categoryToEdit: null,
    };
  },

  async mounted() {
    this.updateProductsCategories();
  },

  computed: {
    // Computed property to filter products based on selected category
    filteredProducts() {
      const query = this.searchQuery.toLowerCase().trim();

      if (!query && !this.selectedCategory) {
        return this.products; // Return all products if no category is selected and search query is empty
      } else if (!query && this.selectedCategory) {
        // Filter products based on selected category only
        return this.products.filter(
          (product) => product.category === this.selectedCategory.id
        );
      } else if (query && !this.selectedCategory) {
        // Filter products based on search query only
        return this.products.filter((product) =>
          product.name.toLowerCase().includes(query)
        );
      } else {
        // Filter products based on both selected category and search query
        return this.products.filter(
          (product) =>
            product.category === this.selectedCategory.id &&
            product.name.toLowerCase().includes(query)
        );
      }
    },
  },

  methods: {
    async updateProductsCategories() {
      try {
        // Fetch categories
        const categoriesResponse = await CategoryService.getAllCategories();
        this.categories = categoriesResponse.data;

        // Fetch products
        const productsResponse = await ProductService.getAllProducts();
        this.products = productsResponse.data;

        // // Assign category name to each product
        for (let product of this.products) {
          const category = await CategoryService.getCategoryById(
            product.category
          );
          product.categoryName = category.name;
        }

        // Assign nbr of products to each category
        for (let category of this.categories) {
          const response = await ProductService.getNumberOfProductsInCategory(
            category.id
          );
          // const numberOfProductsInCategory = response.count;
          category.nbrOfProducts = response.count;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    // Method to handle info button click and set selectedProduct
    showProductInfo(product) {
      this.selectedProduct = product;
      this.showInfoModal = true;
    },
    // Method to handle edit button click and set selectedProduct
    showProductEdit(product) {
      this.selectedProduct = product;
      this.showEditModal = true;
    },
    toggleNewCategoryInput() {
      this.showNewCategoryInput = !this.showNewCategoryInput; // Toggle the visibility of the input field and add button
      if (!this.showNewCategoryInput) {
        this.newCategoryName = ""; // Clear the input field if it's hidden
      }
      this.showEditCategoryInput = false;
      this.categoryExists = false;
    },
    toggleEditCategoryInput(category) {
      this.showEditCategoryInput = true; // Toggle the visibility of the input field and edit button
      this.editCategoryName = category.name; // fill the input field with category name
      this.categoryToEdit = category;
      this.showNewCategoryInput = false;
      this.categoryEditedExists = false;
    },
    showProductDelete(product) {
      this.showDeleteModal = true;
      this.productToDelete = product;
    },
    showAllProductDelete(category) {
      this.showDeleteAllModal = true;
      if (category.nbrOfProducts > 0) {
        this.productsExists = true;
        this.categoryToDelete = category;
      } else {
        this.handleDeleteCategory(category);
      }
    },
    closeSuccessAlert() {
      // Method to close the success alert
      this.showSuccessAlert = false;
    },
    closeDeleteModal() {
      this.showDeleteModal = false;
      this.productToDelete = null;
    },
    closeDeleteAllModal() {
      this.showDeleteAllModal = false;
      this.categoryToDelete = null;
    },

    // Method to add new product to the products array
    async handleSaveProduct(newProduct) {
      console.log("created product data:", newProduct);
      this.updateProductsCategories();
      // Show success alert with create message
      this.showSuccessAlert = true;
      this.message = "Product created successfully.";
    },

    async handleSaveChanges(editedProduct) {
      console.log("updated product data:", editedProduct);
      this.updateProductsCategories();
      // Show success alert with update message
      this.showSuccessAlert = true;
      this.message = "Product updated successfully.";
    },

    async handleDeleteProduct(deletedProduct) {
      console.log("deleted product data:", deletedProduct);
      this.updateProductsCategories();
      // Show success alert with delete message
      this.showSuccessAlert = true;
      this.message = "Product deleted successfully.";
    },

    async addNewCategory() {
      // Check if the new category name is not empty
      if (this.newCategoryName.trim() !== "") {
        try {
          await CategoryService.createCategory({
            name: this.newCategoryName,
          });

          // Fetch the updated list of categories
          const updatedCategoriesResponse =
            await CategoryService.getAllCategories();
          // Update the categories array with the newly fetched list
          this.categories = updatedCategoriesResponse.data;

          // Show success alert with delete message
          this.showSuccessAlert = true;
          this.message = "Category created successfully.";
          this.categoryExists = false;

          this.newCategoryName = ""; // Clear the input field after adding the category
          this.toggleNewCategoryInput(); // Hide the input field and add button after adding the category
        } catch (error) {
          // Handle error response
          if (error.response && error.response.status === 400) {
            this.categoryExists = true; // Set flag to display error message
            console.error("Error Category already exists:", error);
          } else {
            // Other errors
            console.error("Error creating category:", error);
          }
        }
      }
    },

    async handleEditCategory(category) {
      // Check if the new category name is not empty
      if (this.editCategoryName.trim() !== "") {
        try {
          await CategoryService.updateCategory(category.id, {
            name: this.editCategoryName,
          });

          console.log("updated category data:", category.name);
          this.updateProductsCategories();

          // Show success alert with delete message
          this.showSuccessAlert = true;
          this.message = "Category updated successfully.";
          this.categoryEditedExists = false;

          this.showEditCategoryInput = false; // Hide the input field and edit button after updating the category
        } catch (error) {
          // Handle error response
          if (error.response && error.response.status === 400) {
            this.categoryEditedExists = true; // Set flag to display error message
            console.error("Error Category already exist:", error);
          } else {
            // Other errors
            console.error("Error updating category:", error);
          }
        }
      }
    },

    async handleDeleteCategory(category) {
      try {
        await CategoryService.deleteCategory(category.id);

        console.log("deleted category data:", category.name);
        this.updateProductsCategories();

        // Show success alert with delete message
        this.showSuccessAlert = true;
        this.message = "Category deleted successfully.";
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.table-container {
  height: 480px;
}
td,
th {
  text-align: center;
}
td {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
thead {
  background-color: var(--primary);
  color: var(--white);
}

/* width */
::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: var(--primary);
  border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #004aad;
}
.button-group {
  padding: 5% 5% 5% 5%;
  margin-top: -2px;
}
.action-button {
  width: 1.2em;
  height: 1.2em;
  padding: 13%;
  border-radius: 50%;
  background-color: #476ffe;
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon-container {
  height: 15px;
  margin: 4px auto;
  display: flex;
}
.info-button {
  margin-right: 0.8rem;
  margin-left: 0.8rem;
}
</style>
