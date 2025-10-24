<template>
  <RouterView />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useStore } from "../../../store";
import { PrimeIcons } from "primevue/api";
import { usePlantStore } from "../store";
import { usePlantModelStore } from "../../production/store/plantmodel";

const store = useStore();
const plantModelStore = usePlantModelStore();
const plantStore = usePlantStore();

onMounted(async () => {
  // Pre-cargar datos necesarios
  await plantModelStore.fetchOperators();
  await plantStore.fetchAreasWithWorkcenters();

  store.setMenuItem({
    icon: PrimeIcons.BUILDING,
    title: `Àrees de ${plantStore.site?.name || "Planta"}`,
  });

  // El guard se encargará de la navegación
  await plantStore.getOperator();
});
</script>

<style scoped></style>
