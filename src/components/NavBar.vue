<template>
  <div class="side-menu" :class="{ collapsed: isCollapsed }">
    <div class="navbar-header">
      <button @click="isCollapsed = !isCollapsed" class="toggle-button">
        <i class="pi pi-list"></i>
      </button>
      <h2 :class="{ hide: isCollapsed }">TEMGES</h2>
    </div>

    <ul class="menu-list">
      <NavBarMenuItem
        v-for="menuItem in menuItems"
        :key="menuItem.text"
        :item="menuItem"
        :is-collapsed="isCollapsed"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import NavBarMenuItem from "./NavBarMenuItem.vue";
import { PrimeIcons } from "primevue/api";
import { MenuItem } from "../types";

const menuItems = [
  {
    icon: PrimeIcons.HOME,
    text: "general.menu.home",
  },
  {
    icon: PrimeIcons.CART_PLUS,
    text: "general.menu.suppliers",
  },
  {
    icon: PrimeIcons.WALLET,
    text: "general.menu.customers",
  },
] as Array<MenuItem>;
const isCollapsed = ref(false);
</script>

<style scoped>
.side-menu {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 250px;
  background-color: #2c3e50; /* Cambiar a azul */
  overflow: hidden;
  transition: all 0.3s ease-in-out;
}

.collapsed {
  width: 50px;
}

.navbar-header {
  display: grid;
  grid-template-columns: 50px calc(100% - 50px);
  color: #fff;
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

.menu-list {
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
