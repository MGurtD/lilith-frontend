<template>
  <FileEntityPicker entity="Reports" :id="fixReportsId" title="Informes" />
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import FileEntityPicker from "../components/FileEntityPicker.vue";
import { useStore } from "../store";

const fixReportsId = "22514ad8-7d58-4add-a49a-4396a6e4bbc5";
const store = useStore();

onMounted(() => {
  store.setMenuItem({
    title: "Gestor d'informes",
    icon: "",
  });
});
</script>
