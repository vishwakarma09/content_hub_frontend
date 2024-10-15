<template>
  <div class="mb-4">
    <button @click="addFolder" class="btn btn-primary btn-sm">
      Add Folder
    </button>
    <button @click="addFile" class="btn btn-secondary btn-sm">Add File</button>
  </div>

  <tree
    :nodes="nodes"
    :config="config"
    @nodeOpened="nodeOpened"
    @nodeClosed="nodeClosed"
    @nodeFocus="nodeFocus"
  >
    <template #after-input="props">
      <button class="btn btn-sm" @click.stop="nodeEdit(props.node)">
        Rename
      </button>
    </template>

    <template #loading-slot>
      <div class="progress">
        <div class="indeterminate"></div>
      </div>
    </template>
  </tree>
</template>

<script>
import treeview from 'vue3-treeview';
import 'vue3-treeview/dist/style.css';
import './progress.css';
import { useFileStore } from '../../stores/file';
import { mapState, mapGetters } from 'pinia';
import { root } from 'postcss';

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
          child.id = '' + child.id; // convert to string
          this.nodes[child.id] = {
            text: child.name,
            children: [],
            state: {},
            ...child,
          };
          parentChildren.push(child.id);
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
      console.log('nodeEdit', n);
      this.fileStore.setCurrentNode(n);
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
      await this.fileStore.getRootNode();
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
