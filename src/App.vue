<script setup lang="ts">
import { useStore } from "./store";
import { useApiStore } from "./store/backend";
import { useSpanishGeography } from "./store/geography";
import Header from "./components/TheHeader.vue";
import SideBar from "./components/TheSidebar.vue";
import Login from "./views/Login.vue";
import { onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useShoopfloorStore } from "./modules/shoopfloor/store";
import ProgressSpinner from "primevue/progressspinner";
import ScrollPanel from "primevue/scrollpanel";
import { applyPrimeVueLocale } from "./i18n";
import { usePrimeVue } from "primevue/config";

const store = useStore();
const shopfloorStore = useShoopfloorStore();
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
  shopfloorStore.removeOperator();
  router.push({ path: "/shopfloor" });
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
