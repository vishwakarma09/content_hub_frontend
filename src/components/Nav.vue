<script setup>
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
</script>

<template>
  <nav class="flex items-center justify-between bg-gray-800 p-4">
    <div class="flex items-center">
      <router-link :to="{ name: 'Home' }" class="text-white mr-4"
        >Home</router-link
      >
    </div>

    <div class="flex items-center" v-if="authStore.user">
      <button @click="authStore.handleLogout" class="text-white mr-4">
        Logout
        <span class="bg-secondary">{{ authStore.user.email }}</span>
      </button>
    </div>
    <div class="flex items-center" v-else>
      <router-link :to="{ name: 'Login' }" class="text-white mr-4"
        >Login</router-link
      >
      <router-link :to="{ name: 'Register' }" class="text-white"
        >Register</router-link
      >
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Nav',
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
