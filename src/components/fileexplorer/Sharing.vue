<template>
  <div class="bg-white p-8 shadow-md">
    <ul>
      <li v-for="user in sharedWith" :key="user.email" class="text-black">
        {{ user.email }}
      </li>
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

<script>
import { computed, onMounted, ref } from 'vue';
import { useShareStore } from '../../stores/share';
import { mapState, mapGetters } from 'pinia';

export default {
  data: function () {
    return {
      form: ref({
        email: '',
      }),
    };
  },
  methods: {
    async getSharedWith() {
      try {
        const response = await shareStore.getSharedWith();
        console.log(shareStore.sharedWith);
      } catch (error) {
        console.log(error);
      }
    },
    async addSharedWith(form) {
      try {
        console.log('Sharing.vue addSharedWith form', form);
        const response = await shareStore.addSharedWith(form);
        console.log(response); // rely on store to refresh shared with list
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted: async function () {
    this.shareStore = useShareStore();
    await this.shareStore.getSharedWith();
  },
  computed: {
    ...mapGetters(useShareStore, ['sharedWith']),
  },
};
</script>
