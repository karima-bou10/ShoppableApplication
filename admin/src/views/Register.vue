<template>
  <div class="flex justify-center items-center h-screen">
    <div class="w-full max-w-xs">
      <form
        class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        @submit.prevent="submit"
      >
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            type="text"
            for="name"
          >
            Name
          </label>
          <input
            v-model="data.name"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            placeholder="email"
          />
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            type="email"
            for="name"
          >
            Email
          </label>
          <input
            v-model="data.email"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            placeholder="email"
          />
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            Password
          </label>
          <input
            v-model="data.password"
            class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
          />
          <p class="text-red-500 text-xs italic">Please choose a password.</p>
        </div>
        <div class="flex items-center justify-between">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign Up
          </button>
        </div>
      </form>
      <p class="text-center text-gray-500 text-xs">
        &copy;2024 Acme Corp. All rights reserved.
      </p>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
//   import {useRouter} from "vue-router";

export default {
  name: "Register",
  setup() {
    const data = reactive({
      name: "",
      email: "",
      password: "",
    });
    //   const router = useRouter();

    const submit = () => {
      // await fetch('http://localhost:3000/api/register' ,{
      //     method : 'POST',
      //     headers: {'Content_Type':'application/json'},
      //     body: JSON.stringify(data)
      // });
      console.log(data);
    };

    return {
      data,
      submit,
    };
  },
};
</script>
