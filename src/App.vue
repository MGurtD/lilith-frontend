<script setup lang="ts">
import { useStore } from "./store";
import { useApiStore } from "./store/backend";
import { useSpanishGeography } from "./store/geography";
import Header from "./components/TheHeader.vue";
import SideBar from "./components/TheSidebar.vue";
import Login from "./views/Login.vue";
import { onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { usePlantStore } from "./modules/plant/store";
import ProgressSpinner from "primevue/progressspinner";
import ScrollPanel from "primevue/scrollpanel";
import { applyPrimeVueLocale } from "./i18n";
import { usePrimeVue } from "primevue/config";

const store = useStore();
const plantStore = usePlantStore();
const apiStore = useApiStore();
const spanishGeography = useSpanishGeography();
const router = useRouter();
const primevue = usePrimeVue();

onMounted(async () => {
  spanishGeography.fetch();

  // Initialize language for anonymous users; JWT-based locale will be handled in setAuthorization
  await store.initLanguage();
  await store.getAuthorization();
});

watch(
  () => store.language.current,
  (val) => applyPrimeVueLocale(primevue.config, val)
);

const logout = () => {
  store.removeAuthorization();
  router.push("/");
};

const logoutOperator = () => {
  plantStore.removeOperator();
  router.push({ path: "/plant" });
};
</script>

<template>
  <div v-if="store.authorization">
    <Header @logout-click="logout" @logout-operator-click="logoutOperator" />
    <SideBar />
    <main class="app__view" :class="{ collapsed: store.menuCollapsed }">
      <ScrollPanel style="height: calc(100vh - 5rem)">
        <RouterView />
      </ScrollPanel>
    </main>
  </div>

  <Login v-else />

  <Toast position="bottom-right" />
  <ConfirmDialog />
  <ProgressSpinner v-if="apiStore.isWaiting" class="spinner" />
</template>

<style lang="scss">
// Replaced deprecated @import with @use. Using 'as *' to preserve existing global class availability.
@use "./assets/styles.scss" as *;

.app__view {
  position: fixed;
  top: var(--top-panel-height);
  left: var(--side-bar-width);
  padding: 1rem;
  width: calc(100vw - var(--side-bar-width));
  transition: all 0.3s ease-in-out;
}

.collapsed {
  left: calc(var(--side-bar-collapsed-width) + var(--collapsed-side-padding));
  width: calc(
    100vw - var(--side-bar-collapsed-width) - var(--collapsed-side-padding)
  );
}

.spinner {
  position: absolute;
  top: calc(50% - var(--top-panel-height));
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
