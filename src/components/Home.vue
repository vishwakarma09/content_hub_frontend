<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useFileStore } from '../stores/file';
import TreeView from './treeview/TreeView.vue';
import FilePath from './filepath/FilePath.vue';
import FileExplorer from './fileexplorer/FileExplorer.vue';
import FileUpload from './FileUpload.vue';

const authStore = useAuthStore();
const fileStore = useFileStore();

onMounted(async () => {
  try {
    await authStore.getUser();
    await fileStore.getRootNode();
  } catch (error) {
    console.error(error);
  }
});
</script>

<template v-if="authStore.user">
  <div class="flex">
    <div class="w-1/3 bg-white p-8 shadow-md">
      <TreeView />

      <RouterLink
        to="/hub-home"
        class="btn btn-outline btn-sm btn-block mt-4 mb-4"
        >Shared with me</RouterLink
      >
    </div>
    <div class="w-2/3 bg-white p-8 shadow-md">
      <div class="text-lg">My Drive</div>
      <FilePath />
      <FileUpload />
      <FileExplorer />
    </div>
  </div>
</template>
