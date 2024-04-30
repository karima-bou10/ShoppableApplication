<template>
  <div
    class="min-w-screen relative flex min-h-screen flex-col items-center justify-center bg-white pt-4 z-200"
    x-data="{ open: isLogoutModalVisible }"
  >
    <!-- Modal content -->
    <div
      x-show="open"
      class="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center"
    >
      <div class="bg-white rounded-lg p-8 max-w-sm w-full">
        <h2 class="text-xl font-bold mb-4">Sign out</h2>
        <p class="text-gray-600 mb-6">
          Are you sure you would like to sign out of your account?
        </p>
        <div class="flex justify-center">
          <button
            @click="handleLogout"
            class="bg-blue-500 text-white px-4 py-2 rounded mr-4"
          >
            Sign out
          </button>
          <button class="bg-gray-300 text-gray-700 px-4 py-2 rounded">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import AuthService from "@/services/auth.service";
// import { router } from "vue-router";
// export default {
//   methods: {
//     signOut() {
//       AuthService.logout(); // Call logout method from AuthService to clear localStorage
//       router.push("/"); // Redirect user to login page
//     },
//   },
// };
</script>
