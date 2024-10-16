<template>
  <div class="bg-white p-8 shadow-md">
    <div class="text-black bg-secondary" v-if="response">
      {{ response }}
    </div>
    <ul>
      <li v-for="user in sharedWith" :key="user.email" class="text-black">
        {{ user.email }}
        <button class="btn btn-sm btn-danger" @click="removeShareWith(user.id)">
          Remove
        </button>
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
      <button type="submit" class="btn btn-primary btn-sm">Add User</button>
    </form>
    <div class="mt-4 mb-4 shadow-md">
      <div class="mb-4">
        <template v-if="metadata.public_token">
          <a
            :href="`${'public/' + metadata.public_token}`"
            target="_blank"
            class="btn btn-primary btn-sm"
            >Open Public Link</a
          >
        </template>
        <template v-else>
          <button
            class="btn btn-secondary btn-sm"
            @click="shareStore.generatePublicLink(metadata.file_folder_id)"
          >
            Generate Public Link
          </button>
        </template>
      </div>
    </div>
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
        const response = await this.shareStore.getSharedWith();
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
    async addSharedWith(form) {
      try {
        console.log('Sharing.vue addSharedWith form', form);
        const response = await this.shareStore.addSharedWith(form);
        console.log(response); // rely on store to refresh shared with list
      } catch (error) {
        console.log(error);
      }
    },
    async removeShareWith(userId) {
      try {
        console.log('Sharing.vue removeShareWith id', userId);
        const response = await this.shareStore.removeShareWith(userId);
        console.log(response); // rely on store to refresh shared with list
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted: async function () {
    this.shareStore = useShareStore();
    await this.shareStore.getSharedWith();
    await this.shareStore.getMetadata();
  },
  beforeUnmount: function () {
    console.log('inside unmounted of sharing.vue');
    this.shareStore.$reset();
  },
  computed: {
    ...mapGetters(useShareStore, [
      'sharedWith',
      'metadata',
      'response',
      'status',
    ]),
    statusBg: () => {
      this.status ? 'secondary' : 'primary';
    },
  },
};
</script>
