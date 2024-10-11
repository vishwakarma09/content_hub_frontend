<template>
  <div class="breadcrumbs text-sm mb-5">
    <ul>
      <template v-for="node in ancestors" :key="node.id">
        <li>
          <button @click="setCurrentNode(node)" class="btn-link">
            {{ node.name }}
          </button>
        </li>
      </template>
      <li>Add Document</li>
    </ul>
  </div>
</template>

<script>
import { nextTick } from 'vue';
import { useFileStore } from '../../stores/file';
import { mapState, mapGetters } from 'pinia';

export default {
  data: function () {
    return {
      path: [],
    };
  },
  methods: {
    async makePath() {
      await this.fileStore.getAncestors();
    },
    async setCurrentNode(node) {
      console.log(node);
      await this.fileStore.setCurrentNode(node);
    },
  },
  mounted: async function () {
    this.fileStore = useFileStore();
  },
  computed: {
    ...mapGetters(useFileStore, [
      'nodes',
      'currentNode',
      'ancestors',
      'descendents',
    ]),
  },
  watch: {
    currentNode: async function (newVal, oldVal) {
      await this.makePath();
    },
  },
};
</script>

<style scoped>
fieldset {
  background-color: #eeeeee;
}
</style>
