<template>
  <DataTable
    @row-click="onEditRow"
    :value="props.details"
    tableStyle="min-width: 100%"
    class="p-datatable-sm"
  >
    <template #header>
      <slot name="header"></slot>
    </template>
    <Column field="quantity" header="Unitats" style="width: 5%" />
    <Column header="Material" style="width: 40%">
      <template #body="slotProps">
        {{ slotProps.data.reference.code }} -
        {{ slotProps.data.reference.description }}
      </template>
    </Column>
    <Column field="receivedQuantity" header="Un. Rebudes" style="width: 5%" />
    <Column
    field="expectedReceiptDate"
    header="Data Prev. Recepció"
    style="width: 7.5%"
    >
    <template #body="slotProps">
      {{ formatDate(slotProps.data.expectedReceiptDate) }}
    </template>
  </Column>
    <Column field="amount" header="Preu" style="width: 7.5%">
      <template #body="slotProps">
        {{ formatCurrency(slotProps.data.amount) }}
      </template>
    </Column>
    <Column style="width: 5%">
      <template #body="slotProps">
        <i
          v-if="slotProps.data.stockMovementId === null"
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
import { PurchaseOrderDetail, ReceiptDetail } from "../types";
import { formatCurrency, formatDate } from "../../../utils/functions";

const props = defineProps<{
  details: Array<PurchaseOrderDetail> | undefined;
}>();

const emit = defineEmits<{
  (e: "edit", detail: PurchaseOrderDetail): void;
  (e: "delete", detail: PurchaseOrderDetail): void;
}>();

const onEditRow = (row: DataTableRowClickEvent) => {
  if (
    !(row.originalEvent.target as any).className.includes(
      "grid_delete_column_button"
    )
  ) {
    emit("edit", row.data);
  }
};

const onDeleteRow = (event: any, detail: PurchaseOrderDetail) => {
  emit("delete", detail);
};
</script>
