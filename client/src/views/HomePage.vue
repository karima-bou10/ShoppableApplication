<template>
  <div class="page-container">
    <AppNavbar />
    <HomeBanner />
    <section class="products">
      <div class="product-gallery">
        <HotspotImage
          v-for="(product, index) in products"
          :key="index"
          :imageSrc="product.image"
          :hotspots="product.hotspots"
        />
      </div>
    </section>
    <!-- <AppFooter /> -->
    <Cart
      :is-visible="isCartVisible"
      :cart-items="cartItems"
      @close-cart="closeCart"
    />
  </div>
</template>

<script>
import AppNavbar from "@/components/AppNavbar.vue";
import HomeBanner from "@/components/HomeBanner.vue";
// import AppFooter from "@/components/AppFooter.vue";
import Cart from "@/components/PanierCard.vue";
import HotspotImage from "@/components/HotspotsModal.vue";
import CollectionService from "@/services/collection.service";
import ProductService from "@/services/product.service";

export default {
  components: {
    // AppHeader,
    AppNavbar,
    HomeBanner,
    HotspotImage,
    //AppFooter,
    Cart,
  },
  data() {
    return {
      isCartVisible: false,
      cartItems: [
        {
          id: 1,
          name: "MICKE Desk, white",
          price: 549,
          quantity: 1,
          image: "vase.png",
        },
        {
          id: 2,
          name: "MICKE Drawer unit on castors, white",
          price: 1195,
          quantity: 1,
          image: "vase.png",
        },
      ],
      products: [], // Updated to be fetched dynamically
    };
  },
  methods: {
    //  toggleCart() {
    //    this.isCartVisible = !this.isCartVisible;
    //  },
    // closeCart() {
    //   this.isCartVisible = false;
    // },
    async fetchCollections() {
      try {
        const collectionsResponse = await CollectionService.getAllCollections();
        console.log("Fetched collections:", collectionsResponse.data);

        this.products = await Promise.all(
          collectionsResponse.data.map(async (collection) => {
            const collectionId = collection._id;
            const tagsResponse = await CollectionService.getTagsForCollection(
              collectionId
            );
            const tags = tagsResponse.data;

            const hotspots = await Promise.all(
              tags.map(async (tag) => {
                // Fetch product details for each hotspot
                const product = await ProductService.getProductById(
                  tag.productID
                );
                return {
                  x: tag.posX,
                  y: tag.posY,
                  title: tag.text,
                  bgcolor: tag.bgcolor,
                  dotcolor: tag.dotcolor,
                  textcolor: tag.textcolor,
                  product: product, // Assign the fetched product directly
                  // Add other properties as needed
                };
              })
            );

            return {
              id: collectionId,
              name: "Collection Item", // Update as needed
              price: "", // Update as needed
              image: collection.imageUrl,
              hotspots: hotspots,
            };
          })
        );
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    },
  },
  mounted() {
    this.fetchCollections();
  },
};
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header,
.products,
footer {
  width: 100%;
}

.products {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
  background-color: #f4f4f4;
}

.product-gallery {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-gap: 1.25rem;
}

footer {
  background: #002147;
  color: white;
  text-align: center;
  padding: 10px;
  margin-top: auto; /* Ensure footer stays at the bottom */
}
</style>
