<template>
  <div id="app">
    <Sidebar />
    <div class="main-content" :style="{ marginLeft: mainContentMargin }">
      <Header />
      <div class="router-view">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Sidebar from "./components/Sidebar.vue";

import { ref, computed } from "vue";

export default {
  name: "app",
  components: {
    Header,
    Sidebar,
  },
  setup() {
    const is_expanded = ref(localStorage.getItem("is_expanded") === "true");

    // Calculate dynamic marginLeft value based on is_expanded
    const mainContentMargin = computed(() => {
      return is_expanded.value ? `calc(var(--sidebar-width))` : "4rem";
    });

    return {
      is_expanded,
      mainContentMargin,
    };
  },
};
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
:root {
  --primary: #476ffe;
  --grey: #8a8a8a;
  --light: #f1f5f9;
  --sidebar-width: 240px;
  --white: #ffffff;
  --black: #000000;
  --black-alt: #e0e4ea;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: var(--light);
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  font-style: normal;
}

.main-content {
  flex: 1 1 0; /* Occupy remaining space */
  transition: margin-left 0.2s ease; /* Apply transition to margin-left */
}
.router-view {
  margin-top: 80px;
}
</style>
