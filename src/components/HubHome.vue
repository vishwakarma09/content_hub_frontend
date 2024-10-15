<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from '../stores/auth';
import HubTreeView from './treeview/HubTreeView.vue';
import HubFilePath from './filepath/HubFilePath.vue';
import HubFileExplorer from './fileexplorer/HubFileExplorer.vue';
import HubFileUpload from './HubFileUpload.vue';

const authStore = useAuthStore();

onMounted(async () => {
  await authStore.getUser();
});
</script>

<template v-if="authStore.user">
  <div class="flex">
    <div class="w-1/3 bg-white p-8 shadow-md">
      <HubTreeView />

      <RouterLink to="/" class="btn btn-outline btn-sm btn-block mt-4 mb-4"
        >My Content Hub</RouterLink
      >
    </div>
    <div class="w-2/3 bg-white p-8 shadow-md">
      <HubFilePath />
      <HubFileUpload />
      <HubFileExplorer />
    </div>
  </div>
</template>
