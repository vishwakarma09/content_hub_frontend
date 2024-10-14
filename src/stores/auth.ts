import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore({
  id: 'auth',
  persist: true,
  state: () => ({
    authUser: null,
    authErrors: [],
    authStatus: null,
  }),
  getters: {
    user: (state) => state.authUser,
    errors: (state) => state.authErrors,
    status: (state) => state.authStatus,
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
    async handleLogin(data) {
      this.authErrors = [];
      try {
        await this.getToken();
        const response = await axios.post('/login', {
          email: data.email,
          password: data.password,
        });
        console.log(response.data);

        // set auth user in store
        await this.getUser();
        // finally, redirect to home
        this.router.push({ name: 'Home' });
      } catch (error) {
        if (error.response.status === 422) {
          console.log('error is 422');
          this.authErrors = error.response.data.errors;
        }
      }
    },
    async handleRegister(data) {
      this.authErrors = [];
      try {
        await this.getToken();
        const response = await axios.post('/register', {
          name: data.name,
          email: data.email,
          password: data.password,
          password_confirmation: data.password_confirmation,
        });
        this.router.push('/login');
      } catch (error) {
        if (error.response.status === 422) {
          console.log('error is 422');
          this.authErrors = error.response.data.errors;
        }
      }
    },
    async handleLogout() {
      try {
        await axios.post('/logout');
        this.authUser = null;
        this.router.push({ name: 'Login' });
      } catch (error) {
        console.error(error);
      }
    },
    async handleForgotPassword(data) {
      this.authErrors = [];
      try {
        await this.getToken();
        const response = await axios.post('/forgot-password', {
          email: data.email,
        });
        this.authStatus = response.data.status;
      } catch (error) {
        if (error.response.status === 422) {
          console.log('error is 422', error.response.data.errors);
          this.authErrors = error.response.data;
        }
      }
    },
    async handleResetPassword(resetData) {
      this.authErrors = [];
      try {
        await this.getToken();
        const response = await axios.post('/reset-password', resetData);
        this.authStatus = response.data.status;
      } catch (error) {
        if (error.response.status === 422) {
          console.log('error is 422', error.response.data.errors);
          this.authErrors = error.response.data;
        }
      }
    },
  },
});
