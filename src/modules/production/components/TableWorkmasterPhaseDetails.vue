<template>
  <DataTable
    @row-click="onEditRow"
    :value="details"
    tableStyle="min-width: 100%"
  >
    <template #header>
      <div
        class="flex flex-wrap align-items-center justify-content-between gap-2"
      >
        <span class="text-xl text-900 font-bold">Pasos de fabricació</span>
        <Button :icon="PrimeIcons.PLUS" rounded raised @click="onAdd" />
      </div>
    </template>
    <Column header="Tipus de màquina" style="width: 25%">
      <template #body="slotProps">
        {{ getWorkcenterType(slotProps.data.workcenterTypeId) }}
      </template>
    </Column>
    <Column header="Estat de màquina" style="width: 25%">
      <template #body="slotProps">
        {{ getMachineStatus(slotProps.data.machineStatusId) }}
      </template>
    </Column>
    <Column header="Màquina preferida" style="width: 25%">
      <template #body="slotProps">
        {{ getWorkcenter(slotProps.data.preferredWorkcenterId) }}
      </template>
    </Column>
    <Column header="Tipus d'operari" style="width: 25%">
      <template #body="slotProps">
        {{ getOperatorType(slotProps.data.operatorTypeId) }}
      </template>
    </Column>
    <Column
      field="estimatedTime"
      header="Temps (min)"
      style="width: 25%"
    ></Column>
    <Column header="Extern" style="width: 25%">
      <template #body="slotProps">
        <BooleanColumn :value="slotProps.data.isExternalWork"></BooleanColumn>
      </template>
    </Column>
    <Column style="width: 25%">
      <template #body="slotProps">
        <i
          :class="PrimeIcons.TIMES"
          class="grid_delete_column_button"
          @click="onDeleteRow($event, slotProps.data)"
        />
      </template>
    </Column>
  </DataTable>
</template>

<script setup lang="ts">
import { PrimeIcons } from "primevue/api";
import { DataTableRowClickEvent } from "primevue/datatable";
import { WorkMasterPhase, WorkMasterPhaseDetail } from "../types";
import { getNewUuid } from "../../../utils/functions";
import { useConfirm } from "primevue/useconfirm";
import { usePlantModelStore } from "../store/plantmodel";
import BooleanColumn from "../../../components/tables/BooleanColumn.vue";
import { onMounted } from "vue";

const props = defineProps<{
  workmasterPhase: WorkMasterPhase;
  details: Array<WorkMasterPhaseDetail>;
}>();

const emit = defineEmits<{
  (e: "add", phase: WorkMasterPhaseDetail): void;
  (e: "edit", phase: WorkMasterPhaseDetail): void;
  (e: "delete", phase: WorkMasterPhaseDetail): void;
}>();

const confirm = useConfirm();
const plantModelStore = usePlantModelStore();

const getWorkcenterType = (id: string) => {
  if (!plantModelStore.workcenterTypes) return "";
  const entity = plantModelStore.workcenterTypes?.find((e) => id === e.id);
  if (!entity) return "";
  return entity.name;
};
const getWorkcenter = (id: string) => {
  if (!plantModelStore.workcenters) return "";
  const entity = plantModelStore.workcenters?.find((e) => id === e.id);
  if (!entity) return "";
  return entity.name;
};
const getOperatorType = (id: string) => {
  if (!plantModelStore.operatorTypes) return "";
  const entity = plantModelStore.operatorTypes?.find((e) => id === e.id);
  if (!entity) return "";
  return entity.name;
};
const getMachineStatus = (id: string) => {
  if (!plantModelStore.machineStatuses) return "";
  const entity = plantModelStore.machineStatuses?.find((e) => id === e.id);
  if (!entity) return "";
  return entity.name;
};

const onAdd = () => {
  const defaultInstance = {
    id: getNewUuid(),
    workMasterPhaseId: props.workmasterPhase.id,
    estimatedTime: 0,
    isCycleTime: false,
    isExternalWork: false,
    externalWorkCost: 0,
    machineStatusId: "",
    operatorTypeId: "",
    workcenterTypeId: "",
  } as WorkMasterPhaseDetail;
  emit("add", defaultInstance);
};

const onEditRow = (row: DataTableRowClickEvent) => {
  if (
    !(row.originalEvent.target as any).className.includes(
      "grid_delete_column_button"
    )
  ) {
    emit("edit", row.data);
  }
};

const onDeleteRow = (event: any, detail: WorkMasterPhaseDetail) => {
  confirm.require({
    target: event.currentTarget,
    message: `Está segur que vol eliminar el pas de la fase?`,
    icon: "pi pi-question-circle",
    acceptIcon: "pi pi-check",
    rejectIcon: "pi pi-times",
    accept: () => {
      emit("delete", detail);
    },
  });
};
</script>