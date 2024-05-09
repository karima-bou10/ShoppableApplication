<template>
  <div id="Home-page">
    <Sidebar @toggleExpanded="handleToggleExpanded" />
    <div class="main-content" :style="{ marginLeft: mainContentMargin }">
      <Header />
      <div class="router-view">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
import Header from "../components/Header.vue";
import Sidebar from "../components/User/UserSidebar.vue";
import { ref, computed } from "vue";

export default {
  name: "Home",
  components: {
    Header,
    Sidebar,
  },

  setup() {
    const is_expanded = ref(true);
    const handleToggleExpanded = (value) => {
      is_expanded.value = value;
    };

    console.log("is_expanded home ", is_expanded.value);
    // Calculate dynamic marginLeft value based on is_expanded
    const mainContentMargin = computed(() => {
      console.log("is_expanded.value", is_expanded.value);
      return is_expanded.value ? `calc(var(--sidebar-width))` : "4rem";
    });

    return {
      is_expanded,
      mainContentMargin,
      handleToggleExpanded,
    };
  },
};
</script>
<style>
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
