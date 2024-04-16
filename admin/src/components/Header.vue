<template>
  <div id="header">
    <link href="https://fonts.googleapis.com/css?family=Roboto|Poppins" rel="stylesheet">
    <meta name="viewport" content="width=device-width">
    <header>
      <div class="wrap">
        
        <img src="@/assets/shoppableImageLogo.png" alt="logo">
        
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: 'AppHeader', // Changed component name to 'AppHeader'
  data() {
    return {
      load: false,
    };
  },
  
};
</script>

<style scoped>
@import '../style.css';
</style>
