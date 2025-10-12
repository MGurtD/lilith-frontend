<template>
  <div class="" v-if="shopfloorStore.workcenter">
    <DataTable
      :value="shopfloorStore.workcenter.operators"
      class="p-datatable"
      tableStyle="min-width: 100%"
      scrollable
      scrollHeight="72vh"
    >
      <template #header>
        <div
          class="flex flex-wrap align-items-center justify-content-between gap-2"
        >
          <span class="text-900 font-bold">Operaris fitxats</span>
          <Button
            v-if="!isOperatorClockedIn(shopfloorStore.operator!.id)"
            severity="success"
            label="Fitxar"
            size="small"
            :icon="PrimeIcons.SIGN_IN"
            raised
            @click="clockIn"
          />
          <Button
            v-else
            severity="danger"
            label="Desfitxar"
            size="small"
            :icon="PrimeIcons.SIGN_IN"
            raised
            @click="clockOut"
          />
        </div>
      </template>
      <Column field="operatorName" header="Nom"></Column>
      <Column field="operatorTypeDescription" header="Tipus"></Column>
      <Column field="startTime" header="Hora d'inici">
        <template #body="slotProps">
          {{ formatDateTime(slotProps.data.startTime) }}
        </template>
      </Column>
      <Column header="Temps">
        <template #body="slotProps">
          {{ calculateTimeDifference(slotProps.data.startTime) }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useShoopfloorStore } from "../../store";
import { PrimeIcons } from "primevue/api";
import {
  formatDateTime,
  calculateTimeDifference,
} from "../../../../utils/functions";
import { usePlantModelStore } from "../../../production/store/plantmodel";

const route = useRoute();
const shopfloorStore = useShoopfloorStore();
const plantModelStore = usePlantModelStore();

onMounted(async () => {
  const id = route.params.id as string;
  if (!shopfloorStore.workcenter) {
    shopfloorStore.fetchWorkcenter(id);
  }
  if (!plantModelStore.operatorTypes) {
    await plantModelStore.fetchOperatorTypes();
  }
});

const isOperatorClockedIn = (operatorId: string) => {
  if (!shopfloorStore.workcenter || !shopfloorStore.workcenter.operators) {
    return false;
  }

  return shopfloorStore.workcenter.operators.find(
    (o) => o.operatorId === operatorId
  )
    ? true
    : false;
};

const clockIn = async () => {
  await shopfloorStore.clockInOperator(shopfloorStore.operator!.id);
};
const clockOut = async () => {
  await shopfloorStore.clockOutOperator(shopfloorStore.operator!.id);
};
</script>

<style scoped>
.area__header {
  font-size: 1.5rem;
  color: var(--bluegray-600);
  font-weight: bold;
  padding-left: 1rem;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid var(--bluegray-600);
}
.area__header__icon {
  float: right;
  margin-right: 1rem;
  font-size: 2rem;
}
.area__workcenters {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(
    auto-fill,
    minmax(20vw, calc(25vw - var(--side-bar-collapsed-width)))
  );
  margin-bottom: 1rem;
}
.workcenter {
  cursor: pointer;
}
.workcenter__name {
  font-size: 1.15rem;
  font-weight: bold;
}
.workcenter__color {
  width: 100%;
  height: 1rem;
  background-color: var(--green-800);
}
.workcenter__field__icon > i {
  color: var(--blue-800);
}
.workcenter__field {
  display: grid;
  grid-template-columns: 1fr 5fr;
  padding-bottom: 0.5rem;
}
</style>
