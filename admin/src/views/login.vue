<template>
  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        log in to your account
      </h2>
    </div>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST" @submit.prevent="login">
        <div>
          <div class="flex items-center justify-between">
            <label
              class="block text-sm font-medium leading-6 text-gray-900"
              type="text"
              for="email"
            >
              email
            </label>
          </div>
          <div class="mt-2">
            <input
              v-model="email"
              placeholder="email"
              class="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              id="email"
              type="email"
              required=""
            />
          </div>
        </div>
        <div>
          <div class="mt-2">
            <div class="flex items-center justify-between">
              <label
                class="block text-sm font-medium leading-6 text-gray-900"
                for="password"
              >
                Password
              </label>
            </div>
            <div class="relative mt-2">
              <input
                v-model="password"
                placeholder="**************"
                required
                class="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pr-10"
                id="password"
                :type="passwordFieldType"
              />
              <button
                class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
                @click="togglePasswordVisibility"
              >
                <!-- Position button absolutely -->
                <font-awesome-icon :icon="passwordFieldIcon" />
              </button>
            </div>
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
            Submit
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
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default {
  data() {
    return {
      email: "",
      password: "",
      role: "",
      errorMessage: "",
      showPassword: false,
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
        email: this.email,
        password: this.password,
        role: this.role,
      })
        .then((response) => {
          // Authentication successful, store token
          localStorage.setItem("token", response.accessToken);
          // Redirect to dashboard based on role
          this.$router.push("/dashboard");
        })
        .catch((error) => {
          // Handle login error
          console.error("Login error:", error);
          if (error.response && error.response.status === 401) {
            // Unauthorized access (wrong password)
            this.errorMessage = "Invalid email or password or role";
          } else {
            // Other error (network error, server error, etc.)
            this.errorMessage = "An error occurred during login.";
          }
        });
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
  },
  computed: {
    passwordFieldType() {
      return this.showPassword ? "text" : "password";
    },
    passwordFieldIcon() {
      return this.showPassword ? faEyeSlash : faEye;
    },
  },
};
</script>
<style></style>
