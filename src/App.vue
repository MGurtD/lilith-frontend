<script setup lang="ts">
import { useStore } from "./store";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";

const store = useStore();
</script>

<template>
  <Home v-if="store.isLoggedIn" />
  <Login v-else />

  <Toast position="top-center" />
  <ConfirmDialog />
</template>

<style lang="scss">
@import "./assets/styles.scss";
</style>
