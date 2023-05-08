<template>
  <div class="side-menu" :class="{ collapsed: isCollapsed }">
    <div class="side-menu-header">
      <button @click="isCollapsed = !isCollapsed" class="toggle-button">
        <i class="pi pi-list"></i>
      </button>
      <h2 :class="{ hide: isCollapsed }">TEMGES</h2>
    </div>

    <ul class="side-menu-list">
      <NavBarMenuItem
        v-for="menuItem in menuItems"
        :key="menuItem.text"
        :item="menuItem"
        :is-collapsed="isCollapsed"
        @on-item-click="navigateToRoute"
      />
    </ul>

    <footer class="side-menu-footer">
      <h1>{{ store.user?.username }}</h1>
      <i class="pi pi-times"></i>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import NavBarMenuItem from "./NavBarMenuItem.vue";
import { PrimeIcons } from "primevue/api";
import { MenuItem } from "../types";
import { useStore } from "../store";
import { useRouter } from "vue-router";

const menuItems = [
  {
    icon: PrimeIcons.HOME,
    text: "general.menu.home",
    route: "/",
  },
  {
    icon: PrimeIcons.CART_PLUS,
    text: "general.menu.suppliers",
    route: "/suppliers",
  },
  {
    icon: PrimeIcons.WALLET,
    text: "general.menu.customers",
    route: "/customers",
  },
] as Array<MenuItem>;

const isCollapsed = ref(false);

const store = useStore();
const router = useRouter();
const navigateToRoute = (item: MenuItem) => {
  router.push(item.route);
};
</script>

<style scoped>
.side-menu {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 250px;
  background-color: var(--blue-900); /* Cambiar a azul */
  overflow: hidden;
  transition: all 0.3s ease-in-out;
}

.collapsed {
  width: 50px;
}

.side-menu-header {
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
  width: calc(250px - 2rem);
}
</style>
