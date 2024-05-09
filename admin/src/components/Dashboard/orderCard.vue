<template>
  <div
    class="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4"
  >
    <h4 class="mb-6 px-7.5 text-xl font-semibold text-blue-500 dark:text-white">
      Recent Orders
    </h4>

    <div class="order-container">
      <div class="order-list">
        <template v-for="(order, index) in orderData" :key="index">
          <div
            class="flex items-center gap-5 py-3 px-7 hover:bg-gray-3 dark:hover:bg-meta-4"
          >
            <div
              class="flex flex-1 items-center justify-between border-b border-blue-500 pb-3"
            >
              <div>
                <h5 class="font-medium text-black dark:text-white">
                  {{ order.name }}
                </h5>
                <p>
                  <span class="text-sm text-black dark:text-white">
                    {{ order.text }}
                  </span>
                  <span class="text-xs"> . {{ order.time }} min</span>
                </p>
              </div>
              <div
                v-if="order.textCount !== 0"
                class="flex h-6 w-6 items-center justify-center rounded-full bg-primary"
              >
                <span class="text-sm font-medium text-white">
                  {{ order.textCount }}
                </span>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const orderData = ref([
      {
        name: "Order 001",
        text: "Product A",
        time: 5,
        textCount: 0,
        color: "#10B981",
      },
      {
        name: "Order 002",
        text: "Product B",
        time: 10,
        textCount: 0,
        color: "#DC3545",
      },
      {
        name: "Order 003",
        text: "Product C",
        time: 15,
        textCount: 2,
        color: "#FFBA00",
      },
      {
        name: "Order 004",
        text: "Product D",
        time: 20,
        textCount: 0,
        color: "#10B981",
      },
      {
        name: "Order 004",
        text: "Product D",
        time: 20,
        textCount: 0,
        color: "#10B981",
      },
      {
        name: "Order 004",
        text: "Product D",
        time: 20,
        textCount: 0,
        color: "#10B981",
      },
      {
        name: "Order 004",
        text: "Product D",
        time: 20,
        textCount: 0,
        color: "#10B981",
      },
    ]);

    return { orderData };
  },
};
</script>

<style scoped>
.order-container {
  height: 350px; /* Adjust this value as needed */
  overflow-y: auto;
}

/* Style the scrollbar */
.order-container::-webkit-scrollbar {
  width: 10px;
}

.order-container::-webkit-scrollbar-thumb {
  background-color: #3c50e0; /* Blue color */
  border-radius: 5px;
}

.order-container::-webkit-scrollbar-track {
  background-color: #f1f1f1; /* Track color */
}
</style>
