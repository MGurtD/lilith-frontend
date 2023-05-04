<template>
  <li class="menu-item">
    <a href="#">
      <span v-if="!isCollapsed">{{ $t(item.text) }}</span>
      <i v-else :class="item.icon" />
    </a>
  </li>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { MenuItem } from "../types";

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
  color: #fff; /* Cambiar a blanco */
  text-decoration: none;
}

.menu-item a:hover {
  background-color: #34495e; /* Cambiar a un tono de azul más oscuro */
}
</style>
