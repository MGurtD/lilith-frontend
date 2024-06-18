<template>
  <h1>WorkcenterDetail</h1>

  <div v-if="shopfloorStore.workcenter">
    <p>{{ shopfloorStore.workcenter.workcenterName }}</p>
    <p>{{ shopfloorStore.workcenter.workcenterDescription }}</p>
  </div>
  <div v-else>
    <p>??</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useStore } from "../../../store";
import { PrimeIcons } from "primevue/api";
import { useShoopfloorStore } from "../store";
import { usePlantModelStore } from "../../production/store/plantmodel";
import { Operator, Workcenter } from "../../production/types";
import { useRoute } from "vue-router";

const store = useStore();
const route = useRoute();
const shopfloorStore = useShoopfloorStore();
const plantModelStore = usePlantModelStore();
const workcenterId = ref("");

onMounted(async () => {
  workcenterId.value = route.params.id as string;
  await shopfloorStore.fetchWorkcenter(workcenterId.value);

  if (shopfloorStore.workcenter) {
    store.setMenuItem({
      icon: PrimeIcons.BUILDING,
      title: `Centre de treball ${shopfloorStore.workcenter.workcenterName}`,
      backButtonVisible: true,
    });
  } else {
    store.setMenuItem({
      icon: PrimeIcons.BUILDING,
      title: "No s'ha trobat el centre de treball",
      backButtonVisible: true,
    });
  }
});

const onSubmit = async (operator: Operator) => {
  shopfloorStore.setOperator(operator);

  plantModelStore.fetchActiveModel();
};
</script>

<style scoped></style>
