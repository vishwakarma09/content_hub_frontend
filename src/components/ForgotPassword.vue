<script setup>
import { ref, onMounted, onBeforeMount } from 'vue';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();

const form = ref({
  email: '',
});
</script>

<template>
  <div class="flex justify-center items-center h-screen">
    <div class="w-1/3 bg-white p-8 shadow-md">
      <h2 class="text-2xl font-bold mb-4">Forgot Password</h2>
      <div
        class="m-2 p-2 text-green-900 font-semibold bg-green-300 rounded-md"
        v-if="authStore.status"
      >
        {{ authStore.status }}
      </div>
      <form @submit.prevent="authStore.handleForgotPassword(form)">
        <div class="mb-4">
          <label for="email" class="block text-gray-700 text-sm font-bold mb-2"
            >Email</label
          >
          <input
            type="email"
            v-model="form.email"
            id="email"
            class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            placeholder="Enter your email"
          />
          <div v-if="authStore.errors.email">
            <span class="text-red-400 text-sm m-2 p-2">{{
              authStore.errors.email[0]
            }}</span>
          </div>
        </div>
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Request password reset email
        </button>
      </form>

      <router-link to="/login" class="text-blue-500 hover:underline">
        Back to Login
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
};
</script>

<style>
/* Add any custom styles here */
</style>
