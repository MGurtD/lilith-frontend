<template>
  <DataTable
    @row-click="onEditRow"
    :value="workorderPhases"
    tableStyle="min-width: 100%"
    sort-field="code"
    :sort-order="1"
  >
    <template #header>
      <div
        class="flex flex-wrap align-items-center justify-content-between gap-2"
      >
        <span class="text-xl text-900 font-bold">Fases</span>
        <Button :icon="PrimeIcons.PLUS" rounded raised @click="onAddClick" />
      </div>
    </template>
    <Column field="code" header="Codi" sortable style="width: 10%"></Column>
    <Column field="description" header="Descripció" style="width: 15%"></Column>
    <Column header="Tipus de màquina" style="width: 15%">
      <template #body="slotProps">
        {{ getWorkcenterType(slotProps.data.workcenterTypeId) }}
      </template>
    </Column>
    <Column header="Màquina preferida" style="width: 15%">
      <template #body="slotProps">
        {{ getWorkcenter(slotProps.data.preferredWorkcenterId) }}
      </template>
    </Column>
    <Column header="Tipus d'operari" style="width: 15%">
      <template #body="slotProps">
        {{ getOperatorType(slotProps.data.operatorTypeId) }}
      </template>
    </Column>
    <Column header="Estat" style="width: 15%">
      <template #body="slotProps">
        {{ getStatus(slotProps.data.statusId) }}
      </template>
    </Column>
    <Column header="Extern" style="width: 5%">
      <template #body="slotProps">
        <BooleanColumn :value="slotProps.data.isExternalWork"></BooleanColumn>
      </template>
    </Column>
    <Column style="width: 5%">
      <template #body="slotProps">
        <i
          :class="PrimeIcons.TIMES"
          class="grid_delete_column_button"
          @click="onDeleteRow($event, slotProps.data)"
        />
      </template>
    </Column>
  </DataTable>

  <Dialog
    v-model:visible="dialogOptions.visible"
    :header="dialogOptions.title"
    :closable="dialogOptions.closable"
    :modal="dialogOptions.modal"
  >
    <FormWorkOrderPhase
      v-if="newPhase"
      :workorder="workorder"
      :phase="newPhase"
      @submit="onAddHandler"
    ></FormWorkOrderPhase>
  </Dialog>
</template>

<script setup lang="ts">
import { PrimeIcons } from "primevue/api";
import { DataTableRowClickEvent } from "primevue/datatable";
import { WorkOrder, WorkOrderPhase } from "../types";
import { getNewUuid } from "../../../utils/functions";
import { useConfirm } from "primevue/useconfirm";
import { usePlantModelStore } from "../store/plantmodel";
import FormWorkOrderPhase from "./FormWorkorderPhase.vue";
import { DialogOptions } from "../../../types/component";
import { reactive, ref } from "vue";
import { useLifecyclesStore } from "../../shared/store/lifecycle";

const props = defineProps<{
  workorder: WorkOrder;
  workorderPhases: Array<WorkOrderPhase>;
}>();

const emit = defineEmits<{
  (e: "add", phase: WorkOrderPhase): void;
  (e: "edit", phase: WorkOrderPhase): void;
  (e: "delete", phase: WorkOrderPhase): void;
}>();

const dialogOptions = reactive({
  visible: false,
  title: "Nova fase",
  closable: true,
  position: "center",
  modal: true,
} as DialogOptions);

const confirm = useConfirm();
const plantModelStore = usePlantModelStore();
const lifecycleStore = useLifecyclesStore();

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
const getStatus = (id: string) => {
  if (!lifecycleStore.lifecycle || !lifecycleStore.lifecycle.statuses)
    return "";
  const entity = lifecycleStore.lifecycle.statuses?.find((s) => id === s.id);
  if (!entity) return "";
  return entity.name;
};

const newPhase = ref({} as WorkOrderPhase);
const onAddClick = () => {
  newPhase.value = {
    id: getNewUuid(),
    workOrderId: props.workorder.id,
    disabled: false,
    code: ((props.workorder.phases.length + 1) * 10).toString(),
    description: "",
    operatorTypeId: null,
    workcenterTypeId: null,
    preferredWorkcenterId: null,
    isExternalWork: false,
    externalWorkCost: 0,
    transportCost: 0,
    serviceReferenceId: null,
    statusId: "",
    startTime: null,
    endTime: null,
    profitPercentage: 0,
    workOrderPhaseDetails: [],
    workOrderPhaseBillOfMaterials: [],
  } as WorkOrderPhase;

  dialogOptions.visible = true;
};

const onAddHandler = (phase: WorkOrderPhase) => {
  dialogOptions.visible = false;
  emit("add", phase);
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

const onDeleteRow = (event: any, phase: WorkOrderPhase) => {
  confirm.require({
    target: event.currentTarget,
    message: `Está segur que vol eliminar la fase?`,
    icon: "pi pi-question-circle",
    acceptIcon: "pi pi-check",
    rejectIcon: "pi pi-times",
    accept: () => {
      emit("delete", phase);
    },
  });
};
</script>
