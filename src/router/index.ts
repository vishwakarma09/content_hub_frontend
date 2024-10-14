import { createRouter, createWebHistory } from 'vue-router';

import Home from '../components/Home.vue';

// check for authUser from auth store
import { useAuthStore } from '../stores/auth';

const routes = [
  { path: '/', name: 'Home', component: Home },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../components/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../components/Register.vue'),
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import('../components/ForgotPassword.vue'),
  },
  {
    path: '/password-reset/:token',
    name: 'ResetPassword',
    component: () => import('../components/ResetPassword.vue'),
  },
  // file upload routes
  {
    path: '/file-upload',
    name: 'FileUpload',
    component: () => import('../components/FileUpload.vue'),
  },
  // tree view routes
  {
    path: '/tree-view',
    name: 'TreeView',
    component: () => import('../components/treeview/TreeView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const openRoutes = ['Login', 'Register', 'ForgotPassword', 'ResetPassword'];
  console.log('router auth beforeEach', to.name, authStore.authUser);
  if (!openRoutes.includes(to.name) && !authStore.authUser) {
    console.log('router auth sending back to login');
    next({ name: 'Login' });
  } else next();
});

export default router;
