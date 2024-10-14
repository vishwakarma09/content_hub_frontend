<template>
  <div class="bg-white p-8 shadow-md">
    <ul>
      <p>
        {{ JSON.stringify(sharedWith) }}
      </p>
      <li v-for="user in sharedWith" :key="user.user_id">{{ user.user_id }}</li>
    </ul>
    <form @submit.prevent="addSharedWith(form)">
      <div class="mb-4">
        <label for="email" class="block text-gray-700 text-sm font-bold mb-2"
          >User Email</label
        >
        <input
          type="email"
          v-model="form.email"
          id="email"
          class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500 text-white"
          placeholder="Enter your email"
        />
      </div>
      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add User
      </button>
    </form>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useShareStore } from '../../stores/share';
const shareStore = useShareStore();

const form = ref({
  email: '',
});

const sharedWith = [];

onMounted(() => {
  getSharedWith();
});

async function getSharedWith() {
  try {
    const response = await shareStore.getSharedWith();
    sharedWith.push(...response);
    console.log('Sharing.vue getSharedWith sharedWith', sharedWith);
  } catch (error) {
    console.log(error);
  }
}

async function addSharedWith(form) {
  try {
    console.log('Sharing.vue addSharedWith form', form);
    const response = await shareStore.addSharedWith(form);
    console.log(response);
    // Refresh the sharedWith list after adding a new user
    await getSharedWith();
  } catch (error) {
    console.log(error);
  }
}
</script>
