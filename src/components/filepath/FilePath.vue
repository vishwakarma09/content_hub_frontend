<template>
  <div>
    <fieldset>
      <legend>Path:</legend>
      <template v-for="node in ancestors" :key="node.id">
        <button
          @click="setCurrentNode(node)"
          class="bg-cyan-500 text-white m-2"
        >
          {{ node.name }}
        </button>
      </template>
    </fieldset>
    <button @click="populateAncestorsAndDescendents">populate</button>
    <button @click="addFolder" class="bg-green-500 text-white m-2">
      Add Folder
    </button>
    <button @click="addFile" class="bg-orange-500 text-white m-2">
      Add File
    </button>
    <hr />
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
