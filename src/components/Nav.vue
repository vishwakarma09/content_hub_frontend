<template>
  <nav class="flex items-center justify-between bg-gray-800 p-4">
    <div class="flex items-center">
      <router-link :to="{ name: 'Home' }" class="text-white mr-4"
        >Home</router-link
      >
    </div>
    <div class="flex items-center">
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
