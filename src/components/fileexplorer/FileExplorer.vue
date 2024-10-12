<script setup>
import { ref } from 'vue';
import { useFileStore } from '../../stores/file';
import { FolderIcon } from '@heroicons/vue/24/solid';
import { DocumentIcon } from '@heroicons/vue/24/solid';

// Assuming you're using a file store similar to the Register.vue example
const fileStore = useFileStore();
</script>

<template>
  <div class="flex grid grid-cols-3 gap-4">
    <div
      v-for="file in fileStore.children"
      :key="file.id"
      class="flex items-center justify-center"
    >
      <FolderIcon
        v-if="file.type === 'folder'"
        class="size-36"
        @click="fileStore.setCurrentNode(file)"
      />
      <DocumentIcon v-else class="size-36" />
      <span>{{ file.name }}</span>
    </div>
  </div>
</template>
