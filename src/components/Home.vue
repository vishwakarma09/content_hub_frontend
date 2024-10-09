<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useFileStore } from '../stores/file';
import TreeView from './treeview/TreeView.vue';

const authStore = useAuthStore();
const fileStore = useFileStore();

onMounted(async () => {
  await authStore.getUser();
});

const addFolder = () => {
  fileStore.addFolder();
};

const addFile = () => {
  fileStore.addFile();
};
</script>

<template v-if="authStore.user">
  <div class="flex">
    <div class="w-1/3 bg-white p-8 shadow-md">
      <TreeView />
    </div>
    <div class="w-2/3 bg-white p-8 shadow-md">hello</div>
  </div>
</template>
