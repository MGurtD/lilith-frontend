<template>
  <DataTable
    class="small-datatable"
    tableStyle="min-width: 100%"
    scrollable
    scrollHeight="75vh"
    sortMode="multiple"
    :value="details"
    v-model:selection="selectedDetails"
  >
    <template #header v-if="headerVisible">
      <slot name="header"></slot>
    </template>
    <Column selectionMode="multiple" style="width: 2%"></Column>
    <Column header="Quantitat" field="quantity" style="width: 10%"></Column>
    <Column header="Descripció" field="description" style="width: 50%"></Column>
    <Column header="Preu" field="totalCost" style="width: 10%">
      <template #body="slotProps"> {{ slotProps.data.totalCost }} € </template>
    </Column>
  </DataTable>
  <footer class="mt-2">
    <Button
      label="Seleccionar"
      @click="onSelectedClick"
      style="float: right"
      :size="'small'"
    ></Button>
  </footer>
</template>
<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { SalesOrderDetail } from "../types";
import { PrimeIcons } from "primevue/api";
import { useLifecyclesStore } from "../../shared/store/lifecycle";
import { DataTableRowClickEvent } from "primevue/datatable";
import { useSharedDataStore } from "../../shared/store/masterData";
import BaseService from "../../../api/base.service";

const lifecycleStore = useLifecyclesStore();
const sharedData = useSharedDataStore();
const selectedDetails = reactive([] as Array<SalesOrderDetail>);

defineProps<{
  details: Array<SalesOrderDetail> | undefined;
  headerVisible?: boolean;
}>();
const emits = defineEmits<{
  (e: "selected", orderDetails: Array<SalesOrderDetail>): void;
}>();

onMounted(async () => {
  await lifecycleStore.fetchOneByName("SalesInvoice");
});
const getTaxNameById = (taxId: string) => {
  const tax = sharedData.taxes?.find((t) => t.id === taxId);
  if (tax) return `${tax.percentatge} %`;
};

const onSelectedClick = () => {
  emits("selected", selectedDetails);
};
</script>
