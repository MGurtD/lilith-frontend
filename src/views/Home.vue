<template>
  <div class="container"></div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import { useStore } from "../store";

const store = useStore();

onMounted(() => {
  store.setMenuItem({
    text: "",
    icon: "",
  });
});
</script>
