<template>
  <div class="nav-menu">
    <div class="nav-item" v-for="item in items" :key="item.text">
      <img :src="item.icon" alt="" class="nav-icon" />
      <span class="nav-text">{{ item.text }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          text: "Storage & organisation",
          icon: require("@/assets/vase.png"),
        },
        { text: "Furniture", icon: require("@/assets/vase.png") },
        { text: "Beds & mattresses", icon: require("@/assets/vase.png") },
        { text: "Textiles", icon: require("@/assets/vase.png") },
        { text: "Decoration", icon: require("@/assets/vase.png") },
        { text: "Lighting", icon: require("@/assets/vase.png") },
        { text: "Outdoor products", icon: require("@/assets/vase.png") },
        { text: "Pots & plants", icon: require("@/assets/vase.png") },
        { text: "Rugs, mats & flooring", icon: require("@/assets/vase.png") },
        { text: "Kitchen & table", icon: require("@/assets/vase.png") },
        {
          text: "Storage & organisation",
          icon: require("@/assets/vase.png"),
        },
        { text: "Furniture", icon: require("@/assets/vase.png") },
        { text: "Beds & mattresses", icon: require("@/assets/vase.png") },
        { text: "Textiles", icon: require("@/assets/vase.png") },
        { text: "Decoration", icon: require("@/assets/vase.png") },
        { text: "Lighting", icon: require("@/assets/vase.png") },
        { text: "Outdoor products", icon: require("@/assets/vase.png") },
        { text: "Pots & plants", icon: require("@/assets/vase.png") },
        { text: "Rugs, mats & flooring", icon: require("@/assets/vase.png") },
        { text: "Kitchen & table", icon: require("@/assets/vase.png") },
        {
          text: "Storage & organisation",
          icon: require("@/assets/vase.png"),
        },
        { text: "Furniture", icon: require("@/assets/vase.png") },
        { text: "Beds & mattresses", icon: require("@/assets/vase.png") },
        { text: "Textiles", icon: require("@/assets/vase.png") },
        { text: "Decoration", icon: require("@/assets/vase.png") },
        { text: "Lighting", icon: require("@/assets/vase.png") },
        { text: "Outdoor products", icon: require("@/assets/vase.png") },
        { text: "Pots & plants", icon: require("@/assets/vase.png") },
        { text: "Rugs, mats & flooring", icon: require("@/assets/vase.png") },
        { text: "Kitchen & table", icon: require("@/assets/vase.png") },
      ],
    };
  },
};
</script>

<style scoped>
.nav-menu {
  display: flex;
  overflow-x: auto;
  padding: 10px;
  padding-bottom: 40px;
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
</style>
