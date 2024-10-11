<template>
  <button @click="addFolder" class="btn btn-primary">Add Folder</button>
  <button @click="addFile" class="btn btn-secondary">Add File</button>
  <tree
    :nodes="nodes"
    :config="config"
    @nodeOpened="nodeOpened"
    @nodeClosed="nodeClosed"
    @nodeFocus="nodeFocus"
    @nodeEdit="nodeEdit"
  >
    <template #loading-slot>
      <div class="progress">
        <div class="indeterminate"></div>
      </div>
    </template>
  </tree>
</template>

<script>
import { nextTick } from 'vue';
import treeview from 'vue3-treeview';
import 'vue3-treeview/dist/style.css';
import './progress.css';
import { useFileStore } from '../../stores/file';
import { mapState, mapGetters } from 'pinia';

export default {
  components: {
    tree: treeview,
  },
  data: function () {
    return {};
  },
  methods: {
    async nodeOpened(n) {
      this.fileStore.setCurrentNode(n);

      console.log('current node is ', this.currentNode);

      if (n.children && n.children.length > 0) return;

      // set node loading state to tree
      this.currentNode.state.isLoading = true;

      try {
        const children = await this.fileStore.getChildren(this.currentNode);

        const parentChildren = [];
        for (const child of children) {
          this.nodes[child.id] = {
            text: child.name,
            children: [],
            state: {},
            ...child,
          };
          parentChildren.push('' + child.id);
        }

        // add the node to nodes
        this.nodes[this.currentNode.id]['children'] = parentChildren;

        this.currentNode.state.isLoading = false;
      } catch (error) {
        console.error(error);
      }
    },
    nodeClosed(n) {
      this.fileStore.setCurrentNode(n);
      console.log('nodeClosed', n);
    },
    nodeFocus(n) {
      this.fileStore.setCurrentNode(n);
      console.log('nodeFocused', n);
    },
    nodeEdit(n) {
      this.fileStore.setCurrentNode(n);
      console.log('nodeEdit', n);
      this.fileStore.updateNode(n);
    },

    async addFolder() {
      try {
        const response = await this.fileStore.addFolder();
        console.log('add folder response is ', response);
      } catch (error) {
        console.log(error);
      }
    },
    addFile() {
      const n = this.fileStore.currentNode;

      // fake server call
      setTimeout(() => {
        // create a fake node
        const id = `${Date.now()}`;
        const newNode = {
          text: `new file from server`,
          children: [],
          state: {},
        };

        // add the node to nodes
        this.nodes[id] = newNode;
        // set children
        n.children = [id];
        // end loading
        n.state.isLoading = false;
      }, 2000);
    },
  },
  mounted: async function () {
    console.log('mounted of tree view component');
    this.fileStore = useFileStore();

    // get root node
    try {
      const rootNode = await this.fileStore.getRootNode();
      console.log('rootNode in mounted', rootNode);

      const children = await this.fileStore.getChildren(rootNode);
      console.log('children in mounted', children);
      const parentChildren = [];
      for (const child of children) {
        this.nodes[child.id] = {
          text: child.name,
          children: [],
          state: {},
          ...child,
        };
        parentChildren.push('' + child.id);
      }

      // reformat the node
      const newNode = {
        text: `Home`,
        children: parentChildren,
        state: {},
        ...rootNode,
      };

      // add the node to nodes
      this.nodes[rootNode.id] = newNode;

      // set the root node
      this.config.roots = ['' + rootNode.id];

      // await this.fileStore.setCurrentNode(newNode);
    } catch (error) {
      console.error(error);
    }
  },
  computed: {
    ...mapState(useFileStore, ['nodes', 'config']),
    ...mapGetters(useFileStore, ['currentNode']),
  },
};
</script>
