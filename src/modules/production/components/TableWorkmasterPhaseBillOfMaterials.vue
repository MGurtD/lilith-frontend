<template>
  <DataTable
    @row-click="onEditRow"
    class="p-datatable-sm"
    :value="billOfMaterials"
    tableStyle="min-width: 100%"
  >
    <template #header>
      <div
        class="flex flex-wrap align-items-center justify-content-between gap-2"
      >
        <span class="text-xl text-900 font-bold">Materials de fabricació</span>
        <Button :icon="PrimeIcons.PLUS" rounded raised @click="onAdd" />
      </div>
    </template>
    <Column header="Material consum" style="width: 30%">
      <template #body="slotProps">
        {{ getReference(slotProps.data.referenceId) }}
      </template>
    </Column>
    <Column field="quantity" header="Consum" style="width: 15%"></Column>
    <Column field="width" header="Ample (x) mm" style="width: 12%"></Column>
    <Column field="length" header="Llarg (y) mm" style="width: 12%"></Column>
    <Column field="height" header="Alt (z) mm" style="width: 12%"></Column>
    <Column field="diameter" header="Diàmetre mm" style="width: 12%"></Column>
    <Column field="thickness" header="Gruix mm" style="width: 12%"></Column>
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
import { WorkMasterPhase, WorkMasterPhaseBillOfMaterials } from "../types";
import { getNewUuid } from "../../../utils/functions";
import { useConfirm } from "primevue/useconfirm";
import { useReferenceStore } from "../../shared/store/reference";

const props = defineProps<{
  workmasterPhase: WorkMasterPhase;
  billOfMaterials: Array<WorkMasterPhaseBillOfMaterials>;
}>();

const emit = defineEmits<{
  (e: "add", phase: WorkMasterPhaseBillOfMaterials): void;
  (e: "edit", phase: WorkMasterPhaseBillOfMaterials): void;
  (e: "delete", phase: WorkMasterPhaseBillOfMaterials): void;
}>();

const confirm = useConfirm();
const referenceStore = useReferenceStore();

const getReference = (id: string) => {
  if (!referenceStore.references) return "";
  const entity = referenceStore.references?.find((e) => id === e.id);
  if (!entity) return "";
  return referenceStore.getFullName(entity);
};

const onAdd = () => {
  const defaultInstance = {
    id: getNewUuid(),
    workMasterPhaseId: props.workmasterPhase.id,
    referenceId: "",
    quantity: 0,
    width: 0,
    diameter: 0,
    height: 0,
    length: 0,
    thickness: 0,
  } as WorkMasterPhaseBillOfMaterials;
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

const onDeleteRow = (event: any, detail: WorkMasterPhaseBillOfMaterials) => {
  confirm.require({
    target: event.currentTarget,
    message: `Está segur que vol eliminar el material de la fase?`,
    icon: "pi pi-question-circle",
    acceptIcon: "pi pi-check",
    rejectIcon: "pi pi-times",
    accept: () => {
      emit("delete", detail);
    },
  });
};
</script>
