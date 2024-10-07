<script setup lang="ts">
import Nav from './components/Nav.vue';
</script>

<template>
  <main>
    <Nav loggedIn></Nav>
    <RouterView />
  </main>
</template>
