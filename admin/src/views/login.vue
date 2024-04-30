<template>
  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Sign in to your account
      </h2>
    </div>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST" @submit.prevent="login">
        <div>
          <label
            class="block text-sm font-medium leading-6 text-gray-900"
            type="text"
            for="username"
          >
            username
          </label>
          <div class="mt-2">
            <input
              v-model="username"
              class="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              id="username"
              type="text"
              required=""
            />
          </div>
        </div>
        <div>
          <div class="flex items-center justify-between">
            <label
              class="block text-sm font-medium leading-6 text-gray-900"
              for="password"
            >
              Password
            </label>
          </div>
          <div class="mt-2">
            <input
              v-model="password"
              required=""
              class="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              id="password"
              type="password"
            />
          </div>
        </div>
        <div>
          <div class="mt-2 flex items-center space-x-10">
            <label for="role-admin" class="flex items-center space-x-2">
              <input
                v-model="role"
                class="form-radio h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                type="radio"
                id="role-admin"
                value="admin"
                name="role"
              />
              <span class="text-sm text-gray-900">Admin</span>
            </label>
            <label for="role-user" class="flex items-center space-x-2">
              <input
                v-model="role"
                class="form-radio h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                type="radio"
                id="role-user"
                value="user"
                name="role"
              />
              <span class="text-sm text-gray-900">User</span>
            </label>
          </div>
        </div>
        <div class="flex items-center justify-between">
          <button
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
      <div class="mb-4" v-if="errorMessage">
        <p class="mt-10 text-center text-sm text-red-500">
          {{ errorMessage }}
        </p>
      </div>
      <p class="text-center text-gray-500 text-xs">
        &copy;2024 Acme Corp. All rights reserved.
      </p>
    </div>
  </div>
</template>

<script>
import AuthService from "@/services/auth.service";

export default {
  data() {
    return {
      username: "",
      password: "",
      role: "",
      errorMessage: "",
    };
  },
  methods: {
    login() {
      // Check if a role is selected
      if (!this.role) {
        this.errorMessage = "Please select a role (Admin/User).";
        return; // Stop execution if role is not selected
      }
      console.log("Selected role:", this.role);
      AuthService.login({
        username: this.username,
        password: this.password,
        role: this.role,
      })
        .then((response) => {
          // Authentication successful, store token
          localStorage.setItem("token", response.accessToken);
          // Redirect to dashboard or protected route
          this.$router.push("/dashboard");
        })
        .catch((error) => {
          // Handle login error
          console.error("Login error:", error);
          if (error.response && error.response.status === 401) {
            // Unauthorized access (wrong password)
            this.errorMessage = "Invalid username or password or role";
          } else {
            // Other error (network error, server error, etc.)
            this.errorMessage = "An error occurred during login.";
          }
        });
    },
  },
};
// import { reactive } from "vue";
// import { useRouter } from "vue-router";

// export default {
//   name: "Login",
//   setup() {
//     const data = reactive({
//       email: "",
//       password: "",
//     });
//     const router = useRouter();

//     const submit = async () => {
//       try {
//         await fetch("http://localhost:3000/api/login", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           credentials: "include",
//           body: JSON.stringify(data),
//         });

//         router.push("/home");
//       } catch (error) {
//         console.error("Error submitting login:", error);
//         // Handle the error (e.g., display a message to the user)
//       }
//     };

//     return {
//       data,
//       submit,
//     };
//   },
// };
</script>
<style></style>
