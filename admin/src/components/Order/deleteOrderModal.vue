<template>
  <div
    tabindex="-1"
    aria-hidden="true"
    class="modal-mask hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <!-- Modal content -->
    <div
      x-show="open"
      class="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center"
    >
      <div class="bg-white rounded-lg p-8 max-w-sm w-full">
        <h2 class="text-xl font-bold mb-4">
          delete {{ order.client.name }} Order
        </h2>
        <p class="text-gray-600 mb-6">
          Are you sure you would like to delete ?
        </p>
        <div class="flex justify-center">
          <button
            class="text-white bg-gray-300 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-4"
            @click="close"
          >
            Cancel
          </button>
          <button
            class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
          >
            yes , i'm sure
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      deletedOrder: { ...this.order }, // Initialize deletedUser with the order prop
    };
  },
  methods: {
    close() {
      // Emit a close event to notify the parent component
      this.$emit("close");
    },
  },
};
</script>
