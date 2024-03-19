<script setup>
import MainNav from './components/MainNav.vue';
import { useAuthStore } from './stores/auth';
let auth = useAuthStore();
auth.getUser();
</script>

<template>
  <MainNav></MainNav>
  <div class="container">
    <RouterView></RouterView>
  </div>
</template>

<style scoped></style>
