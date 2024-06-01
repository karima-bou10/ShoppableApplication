<template>
  <!-- Card Item Start -->
  <div
    v-for="(item, index) in cardItems"
    :key="index"
    class="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-xl shadow-blue-400/50 dark:border-strokedark dark:bg-boxdark"
  >
    <div class="flex items-center justify-end px-4">
      <div
        class="h-11 w-11 px-2 py-3 rounded-full bg-zinc-200 dark:bg-meta-4 shadow-lg shadow-blue-400/50"
        v-html="item.icon"
      ></div>
    </div>

    <div class="mt-4 px-6 flex items-end justify-between">
      <div>
        <h4 class="text-xl font-bold text-black dark:text-white">
          {{ item.total }}
        </h4>
        <span class="text-sm font-medium">{{ item.title }}</span>
      </div>

      <span
        class="flex items-center gap-1 text-sm font-medium"
        :class="{
          'text-meta-3': item.growthRate > 0,
          'text-meta-5': item.growthRate < 0,
        }"
      >
        {{ item.growthRate }}%
        <svg
          v-if="item.growthRate > 0"
          class="fill-meta-3"
          width="10"
          height="11"
          viewBox="0 0 10 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z"
            fill=""
          />
        </svg>

        <svg
          v-if="item.growthRate < 0"
          class="fill-meta-5"
          width="10"
          height="11"
          viewBox="0 0 10 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.64284 7.69237L9.09102 4.33987L10 5.22362L5 10.0849L-8.98488e-07 5.22362L0.908973 4.33987L4.35716 7.69237L4.35716 0.0848701L5.64284 0.0848704L5.64284 7.69237Z"
            fill=""
          />
        </svg>
      </span>
    </div>
  </div>
  <!-- Card Item End -->
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const cardItems = ref([
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" 
        class="fill-blue-500 dark:fill-white"
          width="26"
          height="20"
          viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/></svg>`,
        title: "shoppable img clicks",
        total: "10K",
        growthRate: 0.43,
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" 
        class="fill-blue-500 dark:fill-white"
          width="26"
          height="20"
          viewBox="0 0 448 512"><path d="M160 112c0-35.3 28.7-64 64-64s64 28.7 64 64v48H160V112zm-48 48H48c-26.5 0-48 21.5-48 48V416c0 53 43 96 96 96H352c53 0 96-43 96-96V208c0-26.5-21.5-48-48-48H336V112C336 50.1 285.9 0 224 0S112 50.1 112 112v48zm24 48a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm152 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z"/></svg>`,
        title: "Total orders",
        total: "150",
        growthRate: 0.43,
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" 
        class="fill-blue-500 dark:fill-white"
          width="26"
          height="20" 
        viewBox="0 0 640 512"><path d="M96 96V320c0 35.3 28.7 64 64 64H576c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H160c-35.3 0-64 28.7-64 64zm64 160c35.3 0 64 28.7 64 64H160V256zM224 96c0 35.3-28.7 64-64 64V96h64zM576 256v64H512c0-35.3 28.7-64 64-64zM512 96h64v64c-35.3 0-64-28.7-64-64zM288 208a80 80 0 1 1 160 0 80 80 0 1 1 -160 0zM48 120c0-13.3-10.7-24-24-24S0 106.7 0 120V360c0 66.3 53.7 120 120 120H520c13.3 0 24-10.7 24-24s-10.7-24-24-24H120c-39.8 0-72-32.2-72-72V120z"/></svg>`,
        title: "Total Sales",
        total: "124",
        growthRate: 0.63,
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="fill-blue-500 dark:fill-white" viewBox="0 0 640 512">
            <path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z"/></svg>`,
        title: "Total Users",
        total: "4 user",
        growthRate: 0.43,
      },
    ]);

    return {
      cardItems,
    };
  },
};
</script>

<style scoped lang="scss">
.border-stroke {
  border-color: #f0f1f3;
}
.border-strokedark {
  border-color: #2e2f34;
}
.bg-boxdark {
  background-color: #202225;
}
.text-meta-2 {
  color: #00b5d8;
}
.text-meta-4 {
  color: #3b3d40;
}
.fill-meta-3 {
  fill: #00b5d8;
}
.fill-meta-5 {
  fill: #ff5c58;
}
.fill-primary {
  fill: #2d9cdb;
}
.dark\:fill-white {
  fill: #ffffff;
}
</style>
