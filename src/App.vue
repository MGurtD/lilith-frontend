<script setup lang="ts">
import { useStore } from "./store";
import TitleBar from "./components/TitleBar.vue";
import NavBar from "./components/NavBar.vue";
import Login from "./views/Login.vue";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

onMounted(() => store.getAuthorization());

const logout = () => {
  store.removeAuthorization();
  router.push("/");
};
</script>

<template>
  <div v-if="store.authorization">
    <TitleBar @logout-click="logout" />
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
