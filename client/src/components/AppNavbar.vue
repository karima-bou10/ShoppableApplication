<template>
  <nav class="navbar mb-3">
    <ul>
      <li>
        <a
          href="#"
          class="text-blue-900 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full py-2 px-4 text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
          >Categories</a
        >
      </li>
      <li>
        <a
          href="#"
          class="text-blue-900 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full py-2 px-4 text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
          >Products</a
        >
      </li>
    </ul>
  </nav>
  <NavMenu />
</template>

<script>
import NavMenu from "@/components/NavMenu.vue";

export default {
  name: "App",
  components: {
    NavMenu,
  },
};
</script>

<style scoped>
.navbar {
  padding: 10px 0;
  margin-top: 15px;
}

.navbar ul {
  list-style: none;
  display: flex;
  justify-content: left;
  margin-left: 27px;
  padding: 0;
}

.navbar ul li {
  margin: 0 15px;
}

.navbar ul li a {
  text-decoration: none;
}
</style>
