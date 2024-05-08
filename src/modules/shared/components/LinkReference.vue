<template>
  <span
    v-if="referenceStore.module && id"
    class="link"
    @click="navegateToReference"
  >
    {{ referenceStore.getShortNameById(id) }}
  </span>
</template>
<script setup lang="ts">
import { defineProps } from "vue";
import { useReferenceStore } from "../store/reference";
import { useRouter } from "vue-router";

const props = defineProps<{
  id: string;
}>();

const referenceStore = useReferenceStore();
const router = useRouter();

const navegateToReference = () => {
  router.push({
    path: `/reference/${referenceStore.module}/${props.id}`,
  });
};
</script>
<style scoped>
.link {
  text-decoration: none; /* Elimina la subrayado predeterminado */
  color: var(--blue-800); /* Color del texto */
  font-weight: bold; /* Fuente en negrita */
  transition: color 0.3s; /* Agrega una transición suave al color del texto */
}

.link:hover {
  color: var(
    --blue-900
  ); /* Cambia el color del texto al pasar el mouse sobre el enlace */
  cursor: pointer;
}
</style>
