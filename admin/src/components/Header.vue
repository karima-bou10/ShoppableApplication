<template>
  <header>
    <div>
      <h1>{{ pageTitle }}</h1>
    </div>
    <div class="header-buttons flex justify-around">
      <button type="button">
        <div class="button-container">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path
              fill="#8a8a8a"
              d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v25.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm0 96c61.9 0 112 50.1 112 112v25.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V208c0-61.9 50.1-112 112-112zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"
            />
          </svg>
        </div>
      </button>
      <button type="button">
        <div class="button-container">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path
              fill="#8a8a8a"
              d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"
            />
          </svg>
        </div>
      </button>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      pageTitle: "Dashboard",
    };
  },
  created() {
    // Watch for route changes and update the pageTitle accordingly
    this.$router.afterEach((to) => {
      this.pageTitle = this.getPageTitle(to);
    });
  },
  methods: {
    // Helper method to get the page title based on the route
    getPageTitle(route) {
      const matchingRoute = this.$route.matched.find(
        (record) => record.path === route.path
      );
      return matchingRoute ? matchingRoute.meta.title : "Unknown";
    },
  },
};
</script>

<style scoped>
/* @import '../style.css'; */
header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 18px 25px;
  background-color: var(--white);
  position: fixed;
  z-index: 1;
  width: 100%;
  height: 58px;
  top: 0;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.1);
  transition: width 0.2s ease;
}
h1 {
  color: rgb(84, 84, 84);
  font-weight: 400;
  font-size: large;
}
.header-buttons {
  width: 7rem;
  position: fixed;
  right: 0;
}
button {
  width: 40px;
  height: 40px;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.button-container {
  height: 20px;
  display: flex;
}
</style>
