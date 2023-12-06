<template>
  <DataTable
    :value="treeTableData"
    tableStyle="min-width: 100%"
    class="p-datatable-sm"
    rowGroupMode="subheader"
    groupRowsBy="salesOrderNumber"
  >
    <template #header>
      <slot name="header"></slot>
    </template>
    <template #groupheader="slotProps">
      <span class="vertical-align-middle ml-2 font-bold line-height-3"
        >Comanda {{ slotProps.data.salesOrderNumber }} ({{
          slotProps.data.customerOrderNumber
        }}) {{ formatDate(slotProps.data.salesOrderDate) }}</span
      >
      &nbsp;
      <i
        v-if="canDelete"
        :class="PrimeIcons.TIMES"
        class="grid_delete_column_button"
        @click="onDeleteRow($event, slotProps.data)"
      />
    </template>
    <Column field="salesOrderNumber" header="Comanda" style="width: 5%" />
    <Column field="" header="" style="width: 5%" />
    <Column field="quantity" header="Quantitat" style="width: 5%" />
    <Column header="Referència" style="width: 10%">
      <template #body="slotProps">
        {{ referenceStore.getFullNameById(slotProps.data.referenceId) }}
      </template>
    </Column>
    <Column field="description" header="Descripció" style="width: 30%" />
    <Column field="unitPrice" header="Preu un." style="width: 10%">
      <template #body="slotProps"> {{ slotProps.data.unitPrice }} € </template>
    </Column>
    <Column field="amount" header="Total" style="width: 10%">
      <template #body="slotProps"> {{ slotProps.data.amount }} € </template>
    </Column>
  </DataTable>
</template>
<script setup lang="ts">
import { PrimeIcons } from "primevue/api";
import { SalesOrderHeader } from "../types";
import { computed } from "vue";
import { formatDate } from "../../../utils/functions";
import { useReferenceStore } from "../../shared/store/reference";

const props = defineProps<{
  orders: Array<SalesOrderHeader> | undefined;
  canDelete: boolean;
}>();

const referenceStore = useReferenceStore();

const treeTableData = computed(() => {
  if (!props.orders) return [];

  let salesOrderDetails = [] as any;
  for (let index = 0; index < props.orders.length; index++) {
    if (!props.orders[index].salesOrderDetails) continue;

    const order = props.orders[index];
    order.salesOrderDetails!.forEach((detail) => {
      salesOrderDetails.push({
        salesOrderId: order.id,
        salesOrderNumber: order.salesOrderNumber,
        salesOrderDate: order.salesOrderDate,
        ...detail,
      });
    });
  }

  return salesOrderDetails;
});

const emit = defineEmits<{
  (e: "delete", order: SalesOrderHeader): void;
}>();

const onDeleteRow = (event: any, clickedOrder: any) => {
  if (!props.orders) return;
  const order = props.orders?.find((o) => o.id === clickedOrder.salesOrderId);

  if (!order) return;
  emit("delete", order);
};
</script>
