<template>
  <main id="Dashboard-page">
    <h1>dashboard</h1>
    <p>This is the dashboard page</p>
  </main>
</template>
<script></script>
<style>
body {
  background: var(--light);
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  font-style: normal;
}

button {
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  background: none;
}

.app {
  display: flex;

  main {
    flex: 1 1 0;
    padding: 2rem;

    @media (max-width: 1024px) {
      padding-left: 6rem;
    }
  }
  .main-content {
    flex: 1; /* Occupy remaining space */
    padding: 2rem;
    transition: margin-left 0.2s ease; /* Apply transition to margin-left */
  }
}
.router-view {
  margin-top: 80px;
}
</style>
