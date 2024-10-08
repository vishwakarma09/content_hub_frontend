<script setup>
import { ref, onMounted, onBeforeMount } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRoute } from 'vue-router';

const route = useRoute();
const authStore = useAuthStore();

const form = ref({
  password: '',
  password_confirmation: '',
  email: route.query.email,
  token: route.params.token,
});
</script>

<template>
  <div class="flex justify-center items-center h-screen">
    <div class="w-1/3 bg-white p-8 shadow-md">
      <h2 class="text-2xl font-bold mb-4">Reset Password</h2>
      <div
        class="m-2 p-2 text-green-900 font-semibold bg-green-300 rounded-md"
        v-if="authStore.status"
      >
        {{ authStore.status }}
      </div>
      <form @submit.prevent="authStore.handleResetPassword(form)">
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
            class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            placeholder="Enter your password"
          />
          <div v-if="authStore.errors.password">
            <span class="text-red-400 text-sm m-2 p-2">{{
              authStore.errors.password[0]
            }}</span>
          </div>
        </div>
        <div class="mb-4">
          <label
            for="password_confirmation"
            class="block text-gray-700 text-sm font-bold mb-2"
            >Confirm Password</label
          >
          <input
            type="password"
            id="password_confirmation"
            v-model="form.password_confirmation"
            class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            placeholder="Re-enter your password"
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
          Reset Password
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
