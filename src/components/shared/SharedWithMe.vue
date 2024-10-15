<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from '../../stores/auth';
import { useFileStore } from '../../stores/file';
import TreeViewSharedWithMe from '../treeview/TreeViewSharedWithMe.vue';
import FilePath from '../filepath/SharedWithMeFilePath.vue';
import FileExplorer from '../fileexplorer/FileExplorer.vue';
import FileUpload from '../FileUpload.vue';

const authStore = useAuthStore();

onMounted(async () => {
  await authStore.getUser();
});
</script>

<template v-if="authStore.user">
  <div class="flex">
    <div class="w-1/3 bg-white p-8 shadow-md">
      <TreeViewSharedWithMe />

      <RouterLink to="/" class="btn btn-outline btn-sm btn-block mt-4 mb-4"
        >My Content Hub</RouterLink
      >
    </div>
    <div class="w-2/3 bg-white p-8 shadow-md">
      <div><p class="text-lg">Shared with me</p></div>
      <FilePath />
      <FileUpload />
      <FileExplorer />
    </div>
  </div>
</template>
