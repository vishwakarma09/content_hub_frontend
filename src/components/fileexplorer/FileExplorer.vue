<script setup>
import { ref, onMounted } from 'vue';
import { useFileStore } from '../../stores/file';
import { useShareStore } from '../../stores/share';
import { FolderIcon } from '@heroicons/vue/24/solid';
import { DocumentIcon } from '@heroicons/vue/24/solid';
import ContextMenu from 'primevue/contextmenu';
import Dialog from 'primevue/dialog';
import Sharing from './Sharing.vue';

const fileStore = useFileStore();
const shareStore = useShareStore();

const menu = ref();
const items = ref([
  {
    label: 'Download',
    icon: 'pi pi-star',
    shortcut: '⌘+D',
    command: async () => {
      console.log('Download');
      await fileStore.downloadFile({ id: selectedId.value });
    },
  },
  {
    label: 'Delete',
    icon: 'pi pi-trash',
    shortcut: '⌘+A',
    command: async () => {
      console.log('Delete');
      await fileStore.deleteFile({ id: selectedId.value });
      await fileStore.getChildren();
    },
  },
  {
    separator: true,
  },
  {
    label: 'Share',
    icon: 'pi pi-share-alt',
    shortcut: '⌘+S',
    command: async () => {
      // share store setCurrentNode
      await shareStore.setCurrentNode({ id: selectedId.value });
      openPosition('right');
    },
  },
]);

const products = ref(null);
const selectedId = ref(null);

onMounted(() => {
  console.log('mounted');
});

const onRightClick = (event, id) => {
  selectedId.value = id;
  menu.value.show(event);
};

const position = ref('center');
const visible = ref(false);

const openPosition = (pos) => {
  position.value = pos;
  visible.value = true;
};
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
        @contextmenu="onRightClick($event, file.id)"
      />
      <DocumentIcon
        v-else
        class="size-36"
        @contextmenu="onRightClick($event, file.id)"
      />
      <span>{{ file.name }}</span>
    </div>

    <ContextMenu ref="menu" :model="items">
      <template #item="{ item, props }">
        <a
          class="flex items-center context-menu-backgroud"
          v-bind="props.action"
        >
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
          <!-- <Badge v-if="item.badge" class="ml-auto" :value="item.badge" /> -->
          <span
            v-if="item.shortcut"
            class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1"
            >{{ item.shortcut }}</span
          >
          <i v-if="item.items" class="pi pi-angle-right ml-auto"></i>
        </a>
      </template>
    </ContextMenu>

    <Dialog
      v-model:visible="visible"
      header="Sharing"
      :style="{ width: '25rem' }"
      :position="position"
      :modal="true"
      :draggable="false"
    >
      <Sharing />
    </Dialog>
  </div>
</template>
