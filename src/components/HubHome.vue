<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useHubStore } from '../stores/hub';
import HubTreeView from './treeview/HubTreeView.vue';
import HubFilePath from './filepath/HubFilePath.vue';
import HubFileExplorer from './fileexplorer/HubFileExplorer.vue';
import HubFileUpload from './HubFileUpload.vue';

const authStore = useAuthStore();
const hubStore = useHubStore();

onMounted(async () => {
  try {
    await authStore.getUser();
    await hubStore.getRootNode();
  } catch (error) {
    console.error(error);
  }
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
      <div class="text-lg">Shared with me</div>

      <HubFilePath />
      <HubFileUpload />
      <HubFileExplorer />
    </div>
  </div>
</template>
