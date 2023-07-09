<template>
  <!-- <navbar class="side-menu" :class="{ collapsed: store.menuCollapsed }">
    <header class="side-menu-header">
      <button
        @click="store.menuCollapsed = !store.menuCollapsed"
        class="toggle-button"
      >
        <i class="pi pi-list"></i>
      </button>
      <h2 :class="{ hide: store.menuCollapsed }">TEMGES</h2>
    </header>

    <ul class="side-menu-list">
      <NavBarMenuItem
        v-for="menuItem in store.userMenus"
        :key="menuItem.text"
        :item="menuItem"
        :is-collapsed="store.menuCollapsed"
      />
    </ul>
  </navbar> -->

  <sidebar-menu
    :menu="menu"
    :collapsed="store.menuCollapsed"
    :showOneChild="true"
    @update:collapsed="store.menuCollapsed = !store.menuCollapsed"
  />
</template>

<script setup lang="ts">
import { SidebarMenu } from "vue-sidebar-menu";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";

import { useStore } from "../store";
import { PrimeIcons } from "primevue/api";

const store = useStore();

const menu = [
  {
    header: "TEMGES",
    hiddenOnCollapse: true,
  },
  ...store.userMenus,
];
</script>

<style scoped>
.side-menu {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: var(--side-bar-width);
  background-color: var(--blue-900);
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  text-align: center;
}

.v-sidebar-menu {
  background-color: var(--blue-900);
  width: var(--side-bar-width);
}

.collapsed {
  width: var(--side-bar-collapsed-width);
}

.side-menu-header {
  display: block;
  color: #fff;
  height: var(--top-panel-height);
  width: var(--side-bar-collapsed-width);
}

.hide {
  visibility: hidden;
}

.toggle-button {
  border: none;
  background-color: #34495e; /* Cambiar a un tono de azul más oscuro */
  color: #fff;
  margin-bottom: 1.5rem;
  cursor: pointer;
  z-index: 1000;
}

.side-menu-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.side-menu-footer {
  color: #fff;
  position: fixed;
  left: 1rem;
  bottom: 1rem;
  border: 1px solid white;
  width: calc(var(--side-bar-width) - 2rem);
}
</style>
