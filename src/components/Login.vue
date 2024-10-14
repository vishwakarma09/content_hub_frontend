<script setup>
import { ref, onMounted, onBeforeMount } from 'vue';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();

const form = ref({
  email: '',
  password: '',
});
</script>

<template>
  <div class="flex justify-center items-center h-screen">
    <div class="w-1/3 bg-white p-8 shadow-md">
      <h2 class="text-2xl font-bold mb-4">Login</h2>
      <form @submit.prevent="authStore.handleLogin(form)">
        <div class="mb-4">
          <label for="email" class="block text-gray-700 text-sm font-bold mb-2"
            >Email</label
          >
          <input
            type="email"
            v-model="form.email"
            id="email"
            class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500 text-white"
            placeholder="Enter your email"
          />
          <div v-if="authStore.errors.email">
            <span class="text-red-400 text-sm m-2 p-2">{{
              authStore.errors.email[0]
            }}</span>
          </div>
        </div>
        <div class="mb-4">
          <label
            for="password"
            class="block text-gray-700 text-sm font-bold mb-2"
            >Password</label
          >
          <input
            type="password"
            id="password"
            v-model="form.password"
            class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500 text-white"
            placeholder="Enter your password"
          />
          <div v-if="authStore.errors.password">
            <span class="text-red-400 text-sm m-2 p-2">{{
              authStore.errors.password[0]
            }}</span>
          </div>
        </div>
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </button>
      </form>

      <router-link to="/forgot-password" class="text-blue-500 hover:underline">
        Forgot Password?
      </router-link>
    </div>
  </div>
</template>
