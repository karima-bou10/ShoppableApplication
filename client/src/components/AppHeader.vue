<template>
  <header class="header">
    <div class="left-section">
      <router-link to="/" style="margin-right: 20px; cursor: pointer"
        >HOME</router-link
      >
      <router-link to="/about" style="cursor: pointer"> ABOUT US</router-link>
    </div>
    <div class="logo">
      <img src="@/assets/TIGMINO.png" alt="Tigmino Logo" />
    </div>
    <div class="right-section">
      <div class="search-bar">
        <input type="text" placeholder="Search ..." />
      </div>
      <div class="cart-icon" @click="toggleCart">
        <img src="@/assets/sac.png" alt="panier" />
      </div>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    toggleCart() {
      this.$emit("toggle-cart");
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(to right, #000, #00509e);
  padding: 20px 20px;
  color: white;
  position: relative;
}

.left-section,
.right-section {
  display: flex;
  align-items: center;
}

.left-section a,
.right-section a {
  color: white;
  text-decoration: none;
  margin-right: 20px;
  font-size: 16px;
}

.logo {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.logo img {
  height: 120px;
}

.search-bar {
  display: flex;
  justify-content: center;
}

.search-bar input {
  width: 300px;
  padding: 8px;
  border-radius: 4px;
  border: none;
}

.cart-icon img {
  height: 20px;
  margin-left: 20px;
  cursor: pointer;
}
</style>
