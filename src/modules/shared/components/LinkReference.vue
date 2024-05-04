<template>
  <span
    v-if="referenceStore.module && id"
    class="p-link"
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
