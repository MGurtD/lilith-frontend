<template>
  <OperatorClockIn v-if="!shopfloorStore.operator" @submit="onSubmit" />
  <WorkcenterSelector v-else />
</template>

<script setup lang="ts">
import OperatorClockIn from "../components/OperatorClockIn.vue";
import WorkcenterSelector from "../components/WorkcenterSelector.vue";
import { onMounted } from "vue";
import { useStore } from "../../../store";
import { PrimeIcons } from "primevue/api";
import { useShoopfloorStore } from "../store";
import { usePlantModelStore } from "../../production/store/plantmodel";
import { Operator } from "../../production/types";

const store = useStore();
const shopfloorStore = useShoopfloorStore();
const plantModelStore = usePlantModelStore();

onMounted(async () => {
  store.setMenuItem({
    icon: PrimeIcons.BUILDING,
    title: "Operativa de planta",
  });

  plantModelStore.fetchOperators();
});

const onSubmit = async (operator: Operator) => {
  shopfloorStore.setOperator(operator);

  plantModelStore.fetchActiveModel();
};
</script>

<style scoped></style>
