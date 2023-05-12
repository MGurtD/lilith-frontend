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
    <main class="app__view" :class="{ collapsed: store.menuCollapsed }">
      <RouterView />
    </main>
  </div>
  <Login v-else />

  <Toast position="top-center" />
  <ConfirmDialog />
</template>

<style lang="scss">
@import "./assets/styles.scss";

.app__view {
  position: fixed;
  color: var(--bluegray-200);
  top: 5rem;
  left: 250px;
  padding: 1rem;
  width: calc(100vw - 250px);
  transition: all 0.3s ease-in-out;
}

.collapsed {
  left: 50px;
  width: calc(100vw - 50px);
}
</style>
