<template>
  <DataTable
    @row-click="onEditRow"
    :value="workmasterPhases"
    tableStyle="min-width: 100%"
  >
    <template #header>
      <div
        class="flex flex-wrap align-items-center justify-content-between gap-2"
      >
        <span class="text-xl text-900 font-bold">Fases de la ruta</span>
        <Button :icon="PrimeIcons.PLUS" rounded raised @click="onAdd" />
      </div>
    </template>
    <Column field="phaseCode" header="Codi" style="width: 25%"></Column>
    <Column
      field="phaseDescription"
      header="Descripció"
      style="width: 65%"
    ></Column>
    <!-- <Column header="Núm. Detalls" style="width: 25%">
      <template #body="slotProps">
        {{ slotProps.data.details.length }}
      </template>
    </Column>
    <Column header="Núm. Materials" style="width: 25%">
      <template #body="slotProps">
        {{ slotProps.data.billOfMaterials.length }}
      </template>
    </Column> -->
    <Column style="width: 10%">
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
import { WorkMaster, WorkMasterPhase } from "../types";
import { getNewUuid } from "../../../utils/functions";
import { useConfirm } from "primevue/useconfirm";

const props = defineProps<{
  workmaster: WorkMaster;
  workmasterPhases: Array<WorkMasterPhase>;
}>();

const emit = defineEmits<{
  (e: "add", phase: WorkMasterPhase): void;
  (e: "edit", phase: WorkMasterPhase): void;
  (e: "delete", phase: WorkMasterPhase): void;
}>();

const confirm = useConfirm();

const onAdd = () => {
  const defaultImport = {
    id: getNewUuid(),
    workMasterId: props.workmaster.id,
    disabled: false,
    phaseCode: "",
    phaseDescription: "",
    workmasterPhaseDetails: [],
    workmasterPhaseBillOfMaterials: [],
  } as WorkMasterPhase;
  emit("add", defaultImport);
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

const onDeleteRow = (event: any, phase: WorkMasterPhase) => {
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
