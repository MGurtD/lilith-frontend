<template>
  <navbar class="side-menu" :class="{ collapsed: store.menuCollapsed }">
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
        v-for="menuItem in store.menus"
        :key="menuItem.text"
        :item="menuItem"
        :is-collapsed="store.menuCollapsed"
      />
    </ul>
  </navbar>
</template>

<script setup lang="ts">
import { useStore } from "../store";
import NavBarMenuItem from "./NavBarMenuItem.vue";

const store = useStore();
</script>

<style scoped>
.side-menu {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: var(--side-bar-width);
  background-color: var(--blue-900); /* Cambiar a azul */
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  text-align: center;
}

.collapsed {
  width: var(--side-bar-collapsed-width);
}

.side-menu-header {
  display: grid;
  grid-template-columns: 50px calc(100% - 50px);
  color: #fff;
  height: 5rem;
}

.hide {
  visibility: hidden;
}

.toggle-button {
  border: none;
  background-color: #34495e; /* Cambiar a un tono de azul más oscuro */
  color: #fff;
  padding: 10px;
  cursor: pointer;
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
