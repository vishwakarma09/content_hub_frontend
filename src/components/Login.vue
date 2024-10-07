<template>
  <div class="flex justify-center items-center h-screen">
    <div class="w-1/3 bg-white p-8 shadow-md">
      <h2 class="text-2xl font-bold mb-4">Login</h2>
      <form>
        <div class="mb-4">
          <label for="email" class="block text-gray-700 text-sm font-bold mb-2"
            >Email</label
          >
          <input
            type="email"
            id="email"
            class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            placeholder="Enter your email"
          />
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
            class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </button>
      </form>
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
