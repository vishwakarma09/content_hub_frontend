<script setup>
import { ref } from 'vue';
import { useFileStore } from '../../stores/file';

// Assuming you're using a file store similar to the Register.vue example
const fileStore = useFileStore();

// Define your form using ref
const form = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
});

// Example function to handle form submission
const handleSubmit = async () => {
  try {
    // Replace `handleRegister` with your actual method to handle the form submission
    await fileStore.handleRegister(form.value);
    console.log('Form submitted successfully');
  } catch (error) {
    console.error('Error submitting form:', error);
  }
};
</script>

<template>
  <div class="w-11/12 bg-white p-8 shadow-md">
    <h2 class="text-sm font-bold mb-4">Upload File</h2>
    <form @submit.prevent="handleSubmit">
      <div class="mb-4">
        <label for="name" class="block text-gray-700 text-sm font-bold mb-2"
          >Name</label
        >
        <input
          type="text"
          v-model="form.name"
          id="name"
          class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
          placeholder="Enter your name"
        />
      </div>

      <div class="mb-4">
        <label for="file" class="block text-gray-700 text-sm font-bold mb-2"
          >Choose File:</label
        >
        <input
          type="file"
          id="file"
          class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
          placeholder="Choose file"
        />
      </div>
      <!-- Add other form fields similar to the above example -->
      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Upload
      </button>
    </form>
  </div>
</template>
