import { defineStore } from 'pinia';
import axios from 'axios';

export const useShareStore = defineStore({
  id: 'share',
  persist: true,
  state: () => ({
    _authUser: null,
    _shareResponse: null,
    _shareStatus: null,
    _currentNode: null,
    _rootNode: null,
    _nodes: [],
    _ancestors: [],
    _descendents: [],
    _children: [],
    _sharedWith: [],
    _metadata: {},
  }),
  getters: {
    user: (state) => state._authUser,
    response: (state) => state._shareResponse,
    status: (state) => state._shareStatus,
    currentNode: (state) => {
      if (state._currentNode) {
        return state._currentNode;
      }
      return state._rootNode;
    },
    nodes: (state) => state._nodes,
    rootNode: (state) => state._rootNode,
    ancestors: (state) => state._ancestors,
    descendents: (state) => state._descendents,
    children: (state) => state._children,
    sharedWith: (state) => state._sharedWith,
    metadata: (state) => state._metadata,
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
    setCurrentNode(node) {
      this._currentNode = node;
    },
    async getSharedWith() {
      try {
        await this.getToken();
        const nodeId = this._currentNode.id;
        const response = await axios.get(`/api/file-folders/${nodeId}/share`);
        this._sharedWith = response.data;
        console.log('sharedWith', this._sharedWith);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async addSharedWith(data) {
      console.log('inside addSharedWith store', data);
      try {
        await this.getToken();
        const nodeId = this._currentNode.id;
        const response = await axios.post(`/api/file-folders/${nodeId}/share`, {
          email_id: data.email,
        });
        this._shareResponse = response.data.message;
        this._shareStatus = response.data.status;
        await this.getSharedWith(); // refresh _sharedWith list
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async removeShareWith(userId) {
      console.log('inside removeShareWith store', userId);
      try {
        await this.getToken();
        const nodeId = this._currentNode.id;
        const response = await axios.delete(
          `/api/file-folders/${nodeId}/share`,
          {
            data: {
              user_id: userId,
            },
          }
        );
        this._shareResponse = response.data.message;
        this._shareStatus = response.data.status;
        await this.getSharedWith(); // refresh _sharedWith list
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async getMetadata() {
      try {
        await this.getToken();
        const nodeId = this._currentNode.id;
        const response = await axios.get(
          `/api/file-folders/${nodeId}/metadata`
        );
        this._metadata = response.data;
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async generatePublicLink() {
      try {
        await this.getToken();
        const nodeId = this._currentNode.id;
        const response = await axios.get(
          `/api/file-folders/${nodeId}/public-link`
        );
        console.log('generatePublicLink', response.data);
        // refresh metadta
        await this.getMetadata();
      } catch (error) {
        console.error(error);
      }
    },
  },
});
