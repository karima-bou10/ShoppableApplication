<template>
  <div id="app">
    <Header/>
    <AdminNavbar/>
    <router-view/>
  </div>
</template>

<script>
import AdminNavbar from './components/AdminNavbar.vue';
import Header from './components/Header.vue';

export default {
  name: 'app',
  components: {
    // Register the Header component within App.vue
    Header,
    AdminNavbar
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
