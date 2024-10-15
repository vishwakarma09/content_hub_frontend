<template>
  <div class="breadcrumbs text-sm mb-5">
    <ul>
      <template v-for="(node, key) in ancestors" :key="node.id">
        <li v-if="key !== ancestors.length - 1">
          <button @click="setCurrentNode(node)" class="btn-link">
            {{ node.name }}
          </button>
        </li>
        <li v-else>{{ node.name }}</li>
      </template>
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
    ancestors: function (newVal, oldVal) {
      console.log('ancestors are ', newVal.length);
    },
  },
};
</script>

<style scoped>
fieldset {
  background-color: #eeeeee;
}
</style>
