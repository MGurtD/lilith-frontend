<template>
  <h2>Clients</h2>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import { useStore } from "../store";

const store = useStore();

onMounted(() => {
  store.setMenuItem({
    text: "Gestió de clients",
    icon: "",
  });
});
</script>
