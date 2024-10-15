import { defineStore } from 'pinia';
import axios from 'axios';

export const useShareStore = defineStore({
  id: 'share',
  persist: true,
  state: () => ({
    _authUser: null,
    _shareErrors: [],
    _shareStatus: null,
    _currentNode: null,
    _rootNode: null,
    _nodes: [],
    _ancestors: [],
    _descendents: [],
    _children: [],
    _sharedWith: [],
  }),
  getters: {
    user: (state) => state._authUser,
    errors: (state) => state._shareErrors,
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
        await this.getSharedWith(); // refresh _sharedWith list
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
