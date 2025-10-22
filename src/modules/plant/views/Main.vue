<template>
  <OperatorClockIn v-if="!plantStore.operator" @submit="onSubmit" />
  <SitePlantLayout v-else />
</template>

<script setup lang="ts">
import OperatorClockIn from "../components/OperatorClockIn.vue";
import SitePlantLayout from "../components/SiteAreas.vue";
import { onMounted } from "vue";
import { useStore } from "../../../store";
import { PrimeIcons } from "primevue/api";
import { usePlantStore } from "../store";
import { usePlantModelStore } from "../../production/store/plantmodel";
import { Operator } from "../../production/types";

const store = useStore();
const plantModelStore = usePlantModelStore();
const plantStore = usePlantStore();

onMounted(async () => {
  await plantModelStore.fetchOperators();
  await plantStore.fetchAreasWithWorkcenters();

  store.setMenuItem({
    icon: PrimeIcons.BUILDING,
    title: `Àreas de ${plantStore.site?.name}`,
  });

  await plantStore.getOperator();
});

const onSubmit = async (operator: Operator) => {
  plantStore.setOperator(operator);
};
</script>

<style scoped></style>
