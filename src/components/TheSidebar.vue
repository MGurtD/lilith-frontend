<template>
  <sidebar-menu
    :menu="store.menus"
    :collapsed="store.menuCollapsed"
    :showOneChild="true"
    @update:collapsed="store.menuCollapsed = !store.menuCollapsed"
  />
</template>

<script setup lang="ts">
import { SidebarMenu } from "vue-sidebar-menu";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";

import { useStore } from "../store";
const store = useStore();
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
</style>
