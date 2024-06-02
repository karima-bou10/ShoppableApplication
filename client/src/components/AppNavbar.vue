<template>
  <nav class="navbar">
    <ul>
      <li>
        <a
          href="#"
          class="border-solid border-2 rounded-full border-blue-700 text-blue-700 hover:text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center me-2 mb-2"
          >Shop Products</a
        >
      </li>
      <li>
        <a
          href="#"
          class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center me-2 mb-2"
          >Products</a
        >
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.navbar {
  padding: 10px 0;
}

.navbar ul {
  list-style: none;
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
}

.navbar ul li {
  margin: 0 15px;
}

.navbar ul li a {
  color: white;
  text-decoration: none;
  font-size: 16px;
}
</style>
