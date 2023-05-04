<script setup lang="ts">
import { useStore } from "./store";
import NavBar from "./components/NavBar.vue";
import Login from "./views/Login.vue";

const store = useStore();
</script>

<template>
  <div v-if="store.isLoggedIn">
    <NavBar />
    <RouterView />
  </div>
  <Login v-else />

  <Toast position="top-center" />
  <ConfirmDialog />
</template>

<style lang="scss">
@import "./assets/styles.scss";
</style>
