<template>
  <DataTable
    :value="productionPartStore.productionParts"
    class="p-datatable-sm"
    tableStyle="min-width: 100%"
    scrollable
    scrollHeight="40vh"
  >
    <template #header>
      <slot name="header"></slot>
    </template>
    <template #empty> No s'han trobat tiquets. </template>
    <template #loading> Carregant tiquets. Si us plau espera. </template>
    <Column field="operatorId" header="Operari" style="width: 15%">
      <template #body="slotProps">
        {{ plantModelStore.getOperatorNameById(slotProps.data.operatorId) }}
      </template>
    </Column>
    <Column field="workcenterId" header="Màquina" style="width: 20%">
      <template #body="slotProps">
        {{ plantModelStore.getWorkcenterNameById(slotProps.data.workcenterId) }}
      </template>
    </Column>
    <Column field="workOrderPhaseId" header="Fase" style="width: 20%">
      <template #body="slotProps">
        {{ getWorkOrderPhaseCode(slotProps.data.workOrderPhaseId) }}
      </template>
    </Column>
    <!-- <Column
      field="workOrderPhaseDetailId"
      header="Detall"
      style="width: 20%"
    ></Column> -->
    <Column field="date" header="Data" style="width: 15%">
      <template #body="slotProps">
        {{ formatDateTime(slotProps.data.date) }}
      </template>
    </Column>
    <Column field="quantity" header="Quantitat" style="width: 15%"></Column>
    <Column field="time" header="Temps" style="width: 15%"></Column>
  </DataTable>
</template>

<script setup lang="ts">
import { usePlantModelStore } from "../store/plantmodel";
import { useProductionPartStore } from "../store/productionpart";
import { useWorkOrderStore } from "../store/workorder";
import { formatDateTime } from "../../../utils/functions";

const workorderStore = useWorkOrderStore();
const productionPartStore = useProductionPartStore();
const plantModelStore = usePlantModelStore();

const getWorkOrderPhaseCode = (workOrderPhaseId: string) => {
  if (!workorderStore.workorder) return "";

  const workOrderPhase = workorderStore.workorder.phases!.find(
    (wo) => wo.id === workOrderPhaseId
  );
  return workOrderPhase?.code;
};
</script>
