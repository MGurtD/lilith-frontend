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
    <Column field="quantity" header="Quantitat" style="width: 10%" />
    <Column header="Material" style="width: 25%">
      <template #body="slotProps">
        {{ slotProps.data.reference.code }} ({{
          slotProps.data.reference.version
        }}) - {{ slotProps.data.reference.description }}
      </template>
    </Column>
    <Column field="width" header="Amplada" style="width: 10%"></Column>
    <Column field="height" header="Alçada" style="width: 10%"></Column>
    <Column field="lenght" header="Longitud" style="width: 10%"></Column>
    <!-- <Column field="thickness" header="Espessor" style="width: 10%"></Column> -->
    <Column field="diameter" header="Diàmetre" style="width: 10%"></Column>
    <Column style="width: 10%">
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
import { ReceiptDetail } from "../types";

const props = defineProps<{
  details: Array<ReceiptDetail> | undefined;
}>();

const emit = defineEmits<{
  (e: "edit", detail: ReceiptDetail): void;
  (e: "delete", detail: ReceiptDetail): void;
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

const onDeleteRow = (event: any, detail: ReceiptDetail) => {
  emit("delete", detail);
};
</script>
