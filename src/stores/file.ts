import { defineStore } from 'pinia';
import axios from 'axios';
import { nextTick } from 'vue';

export const useFileStore = defineStore({
  id: 'file',
  persist: true,
  state: () => ({
    authUser: null,
    fileErrors: [],
    fileStatus: null,
    _config: {
      roots: [],
      leaves: [],
      editable: true,
      keyboardNavigation: true,
    },
    _currentNode: null,
    _rootNode: null,
    _nodes: [],
    _ancestors: [],
    _descendents: [],
    _children: [],
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
    ancestors: (state) => state._ancestors,
    descendents: (state) => state._descendents,
    children: (state) => state._children,
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
        data.parent_id = this.currentNode.id;
        console.log('data in handleUpload', data);
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
        this._rootNode = {
          id: '' + response.data.root.id,
          text: response.data.root.name,
          state: {},
          children: [],
        };

        // reset nodes
        this._nodes = [];

        // append children to root node
        for (const child of response.data.children) {
          child.id = '' + child.id; // make string
          this._nodes[child.id] = {
            id: child.id,
            text: child.name,
            children: [],
            state: {},
          };
          this._rootNode.children.push(child.id);
        }

        // add root node to nodes
        this._nodes[this._rootNode.id] = this._rootNode;

        // fill root node in _config
        this._config.roots = [this._rootNode.id];

        return this._rootNode;
      } catch (error) {
        console.error(error);
      }
    },
    async setCurrentNode(node) {
      this._currentNode = node;
      await this.getChildren();
    },
    async addFolder() {
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
      console.log('inside fileStore addNode', type);
      const parentId = this.currentNode.id;

      console.log('inside add folder with parent id', parentId);
      try {
        await this.getToken();
        const response = await axios.post(`/api/file-folders/create-node`, {
          name: 'New Folder',
          text: 'New Folder',
          parent_id: parentId,
          type,
        });
        console.log('add node response', response.data);
        const nodeChildren = [];
        for (const node of response.data.descendents) {
          node.id = '' + node.id; // make string
          this._nodes[node.parent_id] = {
            text: node.name,
            children: [],
            state: {},
            ...node,
          };
          nodeChildren.push(node.id);
        }
        this.currentNode.children = nodeChildren;
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async getAncestors() {
      console.log('inside getAncestors store');
      try {
        await this.getToken();
        const nodeId = this.currentNode.id;
        const response = await axios.get(
          `/api/file-folders/${nodeId}/ancestors`
        );
        const tmp = response.data;
        console.log('ancestors in getAncestors', tmp);
        // push root node in ancestors array if at root
        if (tmp.length === 0) {
          this._ancestors = [this._rootNode];
          console.log('assigned root node to ancestors');
        } else {
          this._ancestors = [...tmp, this.currentNode];
        }
        return this._ancestors;
      } catch (error) {
        console.error(error);
      }
    },
    async getDescendents() {
      console.log('inside getDescendents store');
      try {
        await this.getToken();
        const nodeId = this.currentNode.id;
        const response = await axios.get(
          `/api/file-folders/${nodeId}/descendents`
        );
        this._descendents = response.data;
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async getChildren() {
      console.log('inside getChildren store');
      try {
        await this.getToken();
        const nodeId = this.currentNode.id;
        const response = await axios.get(
          `/api/file-folders/${nodeId}/children`
        );
        // add text and id string
        for (const child of response.data) {
          child.id = '' + child.id; // make string
          child.text = child.name;
        }
        this._children = response.data;
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async updateNode(node) {
      console.log('inside updateNode', node);
      try {
        await this.getToken();
        const response = await axios.put(`/api/file-folders/${node.id}`, {
          _method: 'PUT',
          ...node,
        });
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async downloadFile(node) {
      console.log('inside downloadFile', node);
      try {
        await this.getToken();
        const response = await axios.get(
          `/api/file-folders/${node.id}/download`
        );
        console.log(response.data);
        const url = window.URL.createObjectURL(
          new Blob([atob(response.data.file)])
        );
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', response.data.fileName);
        document.body.appendChild(link);
        link.click();
      } catch (error) {
        console.error(error);
      }
    },
    async deleteFile(node) {
      console.log('inside deleteFile', node);
      try {
        await this.getToken();
        const response = await axios.delete(`/api/file-folders/${node.id}`);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
