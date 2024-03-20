<template>
  <DataTable
    @row-click="onEditRow"
    :value="details"
    tableStyle="min-width: 100%"
    class="p-datatable-sm"
  >
    <template #header>
      <slot name="header"></slot>
    </template>
    <Column field="quantity" header="Quantitat" style="width: 10%" />
    <Column header="Referencia" style="width: 15%">
      <template #body="slotProps">
        {{ referenceStore.getShortNameById(slotProps.data.referenceId) }}
      </template>
    </Column>
    <Column field="description" header="Descripció" style="width: 30%" />
    <Column field="unitPrice" header="Preu un." style="width: 10%">
      <template #body="slotProps"> {{ slotProps.data.unitPrice }} € </template>
    </Column>
    <Column field="amount" header="Total" style="width: 10%">
      <template #body="slotProps"> {{ slotProps.data.amount }} € </template>
    </Column>
    <Column style="width: 5%">
      <template #body="slotProps">
        <i
          v-if="budgetStore.order === undefined"
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
import { Budget, BudgetDetail } from "../types";
import { useConfirm } from "primevue/useconfirm";
import { useReferenceStore } from "../../shared/store/reference";
import { useBudgetStore } from "../store/budget";

const props = defineProps<{
  budget: Budget;
  details: Array<BudgetDetail> | undefined;
}>();

const emit = defineEmits<{
  (e: "edit", detail: BudgetDetail): void;
  (e: "delete", detail: BudgetDetail): void;
}>();

const confirm = useConfirm();
const budgetStore = useBudgetStore();
const referenceStore = useReferenceStore();

const onEditRow = (row: DataTableRowClickEvent) => {
  if (
    !(row.originalEvent.target as any).className.includes(
      "grid_delete_column_button"
    )
  ) {
    emit("edit", row.data);
  }
};

const onDeleteRow = (event: any, detail: BudgetDetail) => {
  confirm.require({
    target: event.currentTarget,
    message: `Está segur que vol eliminar la línea?`,
    icon: "pi pi-question-circle",
    acceptIcon: "pi pi-check",
    rejectIcon: "pi pi-times",
    accept: () => {
      emit("delete", detail);
    },
  });
};
</script>
