<template>
  <div id="app">
    <HomePage />
  </div>
</template>

<script>
import HomePage from "./views/HomePage.vue";
export default {
  name: "App",
  components: {
    HomePage,
  },
};
</script>

<style>
html,
body {
  margin: 0;
  width: 100%;
  height: 100%;
  font-size: 14px;
  font-family: "poppins", sans-serif;
  background-color: #f4f4f4;
}

* {
  box-sizing: border-box;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

footer {
  margin-top: auto;
}
</style>
