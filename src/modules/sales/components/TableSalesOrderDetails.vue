<template>
  <DataTable
    @row-click="onEditRow"
    :value="props.salesOrderDetails"
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
    <Column field="description" header="Descripció" style="width: 40%" />
    <Column field="unitPrice" header="Preu un." style="width: 10%">
      <template #body="slotProps"> {{ slotProps.data.unitPrice }} € </template>
    </Column>
    <Column field="amount" header="Total" style="width: 10%">
      <template #body="slotProps"> {{ slotProps.data.amount }} € </template>
    </Column>
    <Column style="width: 10%" v-if="!salesOrder.deliveryNoteId">
      <template #body="slotProps">
        <i
          v-if="!slotProps.data.isDelivered"
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
import { SalesOrderHeader, SalesOrderDetail } from "../types";
import { useReferenceStore } from "../../shared/store/reference";
import { useConfirm } from "primevue/useconfirm";

const props = defineProps<{
  salesOrder: SalesOrderHeader;
  salesOrderDetails: Array<SalesOrderDetail> | undefined;
}>();

const emit = defineEmits<{
  (e: "edit", salesOrderDetail: SalesOrderDetail): void;
  (e: "delete", salesOrderDetail: SalesOrderDetail): void;
}>();

const confirm = useConfirm();
const referenceStore = useReferenceStore();

const onEditRow = (row: DataTableRowClickEvent) => {
  if (props.salesOrder.deliveryNoteId) return;

  if (
    !(row.originalEvent.target as any).className.includes(
      "grid_delete_column_button"
    )
  ) {
    emit("edit", row.data);
  }
};

const onDeleteRow = (event: any, salesOrderDetail: SalesOrderDetail) => {
  confirm.require({
    target: event.currentTarget,
    message: `Está segur que vol eliminar la referència?`,
    icon: "pi pi-question-circle",
    acceptIcon: "pi pi-check",
    rejectIcon: "pi pi-times",
    accept: () => {
      emit("delete", salesOrderDetail);
    },
  });
};
</script>
