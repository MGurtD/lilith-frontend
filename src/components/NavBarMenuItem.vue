<template>
  <li class="menu-item" @click="() => emit('click', item)">
    <router-link :to="(item.href as string)">
      <i :class="item.icon" />
      <span v-if="!isCollapsed">&nbsp;&nbsp;{{ item.title }}</span>
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

const emit = defineEmits<{
  (event: "click", item: MenuItem): void;
}>();
</script>

<style scoped>
.menu-item {
  margin: 0;
  padding: 0;
  border-bottom: 1px solid #34495e; /* Cambiar a un tono de azul más oscuro */
  font-size: 1rem;
  text-align: left;
}

.menu-item i {
  padding-left: 5px;
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
