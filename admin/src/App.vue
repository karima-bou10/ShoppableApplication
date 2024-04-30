<template>
  <div id="app">
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: "app",
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
</style>
