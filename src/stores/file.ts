import { defineStore } from 'pinia';
import axios from 'axios';

export const useFileStore = defineStore({
  id: 'file',
  state: () => ({
    authUser: null,
    fileErrors: [],
    fileStatus: null,
  }),
  getters: {
    user: (state) => state.authUser,
    errors: (state) => state.fileErrors,
    status: (state) => state.fileStatus,
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
  },
});
