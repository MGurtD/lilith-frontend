<template>
  <a
    :href="`/reference/${referenceStore.module}/${id}`"
    class="p-link"
    v-if="referenceStore.module && id"
  >
    {{ referenceStore.getShortNameById(id) }}
  </a>
</template>
<script setup lang="ts">
import { defineProps } from "vue";
import { useReferenceStore } from "../store/reference";

defineProps<{
  id: string;
}>();

const referenceStore = useReferenceStore();
</script>
