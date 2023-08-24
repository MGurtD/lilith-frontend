<template>
  <DataTable
    class="small-datatable"
    tableStyle="min-width: 100%"
    scrollable
    scrollHeight="55vh"
    sortMode="multiple"
    :value="details"
  >
    <template #header v-if="headerVisible">
      <slot name="header"></slot>
    </template>
    <Column header="Quantitat" field="quantity" style="width: 10%"></Column>
    <Column header="Descripció" field="description" style="width: 40%"></Column>
    <Column header="Preu unitat" field="unitCost" style="width: 10%">
      <template #body="slotProps"> {{ slotProps.data.unitCost }} € </template>
    </Column>
    <Column header="IVA" style="width: 10%">
      <template #body="slotProps">
        {{ getTaxNameById(slotProps.data.taxId) }}
      </template>
    </Column>
    <Column header="Total" field="totalCost" style="width: 10%">
      <template #body="slotProps"> {{ slotProps.data.amount }} € </template>
    </Column>
    <Column style="width: 10%">
      <template #body="slotProps">
        <i
          :class="PrimeIcons.TIMES"
          class="grid_delete_column_button"
          @click="deleteButtonClick($event, slotProps.data)"
        />
      </template>
    </Column>
  </DataTable>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import { SalesInvoiceDetail } from "../types";
import { PrimeIcons } from "primevue/api";
import { useLifecyclesStore } from "../../shared/store/lifecycle";
import { DataTableRowClickEvent } from "primevue/datatable";
import { useSharedDataStore } from "../../shared/store/masterData";

const lifecycleStore = useLifecyclesStore();
const sharedData = useSharedDataStore();

defineProps<{
  details: Array<SalesInvoiceDetail> | undefined;
  headerVisible?: boolean;
}>();

onMounted(async () => {
  await lifecycleStore.fetchOneByName("SalesInvoice");
});
const getTaxNameById = (taxId: string) => {
  const tax = sharedData.taxes?.find((t) => t.id === taxId);
  if (tax) return `${tax.percentatge} %`;
};

const emit = defineEmits<{
  (e: "edit", detail: SalesInvoiceDetail): void;
  (e: "delete", detail: SalesInvoiceDetail): void;
}>();

const editButtonClick = (row: DataTableRowClickEvent) => {
  if (
    !(row.originalEvent.target as any).className.includes(
      "grid_delete_column_button"
    )
  ) {
    emit("edit", row.data);
  }
};

const deleteButtonClick = (event: any, detail: SalesInvoiceDetail) => {
  emit("delete", detail);
};
</script>
