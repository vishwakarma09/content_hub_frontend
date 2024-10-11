<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useFileStore } from '../stores/file';
import TreeView from './treeview/TreeView.vue';
import FilePath from './filepath/FilePath.vue';
import FileExplorer from './fileexplorer/FileExplorer.vue';

const authStore = useAuthStore();

onMounted(async () => {
  await authStore.getUser();
});
</script>

<template v-if="authStore.user">
  <div class="flex">
    <div class="w-1/3 bg-white p-8 shadow-md">
      <TreeView />
    </div>
    <div class="w-2/3 bg-white p-8 shadow-md">
      <FilePath />
      <FileExplorer />
    </div>
  </div>
</template>
