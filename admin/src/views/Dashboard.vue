<template>
  <main id="Dashboard-page">
    <div class="mx-auto max-w-screen-2xl p-2 2xl:p-10">
      <div
        class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5"
      >
        <DataStatsOne />
      </div>
      <div
        class="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5"
      >
        <ProductChart />
        <Orders />
      </div>
    </div>
  </main>
</template>
<script>
import DataStatsOne from "@/components/Dashboard/DataStatsOne.vue";
import ProductChart from "@/components/Dashboard/chart.vue";
import Orders from "@/components/Dashboard/orderCard.vue";

export default {
  name: "Dashboard ",
  components: {
    DataStatsOne,
    ProductChart,
    Orders,
  },
};
</script>
<style></style>
