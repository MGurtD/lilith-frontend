<script setup lang="ts">
import { useStore } from "./store";
import { useApiStore } from "./store/backend";
import { useSpanishGeography } from "./store/geography";
import Header from "./components/TheHeader.vue";
import SideBar from "./components/TheSidebar.vue";
import Login from "./views/Login.vue";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import ProgressSpinner from "primevue/progressspinner";
import ScrollPanel from "primevue/scrollpanel";

const store = useStore();
const apiStore = useApiStore();
const spanishGeography = useSpanishGeography();
const router = useRouter();

onMounted(() => {
  store.getAuthorization();
  spanishGeography.fetch();
});

const logout = () => {
  store.removeAuthorization();
  router.push("/");
};
</script>

<template>
  <div v-if="store.authorization">
    <Header @logout-click="logout" />
    <SideBar />
    <main class="app__view" :class="{ collapsed: store.menuCollapsed }">
      <ScrollPanel style="height: calc(100vh - 5rem)">
        <RouterView />
      </ScrollPanel>
    </main>
  </div>
  <Login v-else />

  <Toast position="top-center" />
  <ConfirmDialog />
  <ProgressSpinner v-if="apiStore.isWaiting" class="spinner" />
</template>

<style lang="scss">
@import "./assets/styles.scss";

.app__view {
  position: fixed;
  color: var(--bluegray-200);
  top: var(--top-panel-height);
  left: var(--side-bar-width);
  padding: 1rem;
  width: calc(100vw - var(--side-bar-width));
  transition: all 0.3s ease-in-out;
}

.collapsed {
  left: 50px;
  width: calc(100vw - var(--side-bar-collapsed-width));
}

.spinner {
  position: absolute;
  top: calc(50% - var(--top-panel-height));
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
