<template>
  <li class="menu-item">
    <router-link :to="(item.route as string)">
      <span v-if="!isCollapsed">{{ $t(item.text) }}</span>
      <i v-else :class="item.icon" />
    </router-link>
  </li>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { MenuItem } from "../types/component";

defineProps({
  item: { type: Object as PropType<MenuItem>, required: true },
  isCollapsed: Boolean,
});
</script>

<style scoped>
.menu-item {
  margin: 0;
  padding: 0;
  border-bottom: 1px solid #34495e; /* Cambiar a un tono de azul más oscuro */
}

.menu-item a {
  display: block;
  padding: 10px;
  color: var(--bluegray-200);
  text-decoration: none;
}

.menu-item a:hover {
  background-color: #34495e; /* Cambiar a un tono de azul más oscuro */
  color: #fff;
}
</style>
