<template>
  <button @click="addFolder" class="bg-green-500 text-white m-2">
    Add Folder
  </button>
  <button @click="addFile" class="bg-orange-500 text-white m-2">
    Add File
  </button>
  <tree
    :nodes="nodes"
    :config="config"
    @nodeOpened="nodeOpened"
    @nodeClosed="nodeClosed"
    @nodeFocused="nodeFocused"
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
    return {
      // nodes: {
      //   1: {
      //     text: 'text1',
      //     children: ['11', '12'],
      //   },
      //   11: {
      //     text: 'text11',
      //   },
      //   12: {
      //     text: 'text12',
      //   },
      //   2: {
      //     text: 'text2',
      //   },
      //   fileStore: null,
      // },
      // config: {
      //   roots: ['1', '2'],
      //   leaves: ['fakeid'],
      //   editable: true,
      //   keyboardNavigation: true,
      // },
    };
  },
  methods: {
    async nodeOpened(n) {
      console.log('nodeOpened', n.id);
      this.fileStore.setCurrentNode(n);

      if (n.children && n.children.length > 0) return;

      // set node loading state to tree
      this.currentNode.state.isLoading = true;

      // fake server call
      // setTimeout(() => {
      //   // create a fake node
      //   const id = `${Date.now()}`;
      //   const newNode = {
      //     text: `loaded from server`,
      //     children: [],
      //     state: {},
      //   };

      //   // add the node to nodes
      //   this.nodes[id] = newNode;
      //   // set children
      //   n.children = [id];
      //   // end loading
      //   n.state.isLoading = false;
      // }, 2000);

      try {
        console.log('current node is ', this.currentNode);
        const children = await this.fileStore.getChildren(this.currentNode);

        const parentChildren = [];
        for (const child of children.descendents) {
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
    nodeFocused(n) {
      this.fileStore.setCurrentNode(n);
      console.log('nodeFocused', n);
    },
    nodeEdit(n) {
      this.fileStore.setCurrentNode(n.id);
      console.log('nodeEdit', n);
    },

    addFolder() {
      const n = this.fileStore.currentNode;

      // fake server call
      setTimeout(() => {
        // create a fake node
        const id = `${Date.now()}`;
        const newNode = {
          text: `new folder from server`,
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
      for (const child of children.descendents) {
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
