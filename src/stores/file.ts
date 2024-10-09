import { defineStore } from 'pinia';
import axios from 'axios';
import { root } from 'postcss';

export const useFileStore = defineStore({
  id: 'file',
  state: () => ({
    authUser: null,
    fileErrors: [],
    fileStatus: null,
    _config: {
      roots: ['1', '2'],
      leaves: ['fakeid'],
      editable: true,
      keyboardNavigation: true,
    },
    _currentNode: null,
    _rootNode: null,
    _nodes: [],
  }),
  getters: {
    user: (state) => state.authUser,
    errors: (state) => state.fileErrors,
    status: (state) => state.fileStatus,
    currentNode: (state) => {
      if (state._currentNode) {
        return state._currentNode;
      }
      return state._rootNode;
    },
    nodes: (state) => state._nodes,
    rootNode: (state) => state._rootNode,
    config: (state) => state._config,
  },
  actions: {
    async getToken() {
      await axios.get('/sanctum/csrf-cookie');
    },
    async getUser() {
      try {
        console.log('inside authStore.getUser');
        await this.getToken();
        const response = await axios.get('/api/user');
        this.authUser = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async handleUpload(data) {
      this.fileErrors = [];
      try {
        await this.getToken();
        const response = await axios.post('/api/file-folders', data);
        console.log(response.data);
        // this.router.push({ name: 'Home' });
      } catch (error) {
        if (error.response.status === 422) {
          console.log('error is 422');
          this.fileErrors = error.response.data.errors;
        }
      }
    },
    async getRootNode() {
      console.log('inside getRootNode');
      try {
        await this.getToken();
        const response = await axios.get('/api/file-folders/get-root');
        this._rootNode = response.data.root;
        return this._rootNode;
      } catch (error) {
        console.error(error);
      }
    },
    async getChildren(node) {
      try {
        await this.getToken();
        const response = await axios.get(`/api/file-folders/${node.id}`);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
    setCurrentNode(node) {
      this._currentNode = node;
    },
    async addFolder() {
      console.log('inside addFolder');
      await this.addNode('folder');
    },
    async deleteNode(node) {
      console.log('inside deleteNode', node);
      try {
        await this.getToken();
        const response = await axios.delete(`/api/file-folders/${node.id}`);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async addNode(type) {
      console.log('inside addNode', type);
      let parentId = null;
      if (!this._currentNode) {
        parentId = this._rootNode?.id;
      }
      if (!parentId) {
        console.error('No parent id found');
        return false;
      }

      console.log('inside add folder', this._currentNode);
      try {
        await this.getToken();
        const response = await axios.post(`/api/file-folders`, {
          name: 'New Folder',
          text: 'New Folder',
          parent_id: parentId,
          type,
        });
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
