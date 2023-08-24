<template>
    <DataTable
    @row-click="onEditRow"
    :value="props.salesOrderDetails"
    tableStyle="min-width: 100%"
    >
    <Button
    @click="onAdd"
    rounded
    :icon="PrimeIcons.PLUS"
    class="grid_add_row_button"
    style="margin-right:1.5rem"
    />
    <Column field="description" header="Descripció" style="width: 20%;" />
    <Column field="quantity" header="Quantitat" style="width: 20%;" />
    <Column field="unitCost" header="Cost un." style="width: 15%;" />
    <Column field="unitPrice" header="Preu un." style="width: 15%;" />
    <Column field="amount" header="Total" style="width: 20%;" />
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
</template><script setup lang="ts">
import { PrimeIcons } from "primevue/api";
import { DataTableRowClickEvent } from "primevue/datatable";
import { SalesOrderDetail } from "../types";
import { getNewUuid } from "../../../utils/functions";

import { useSalesOrderStore } from "../store/salesOrder";

const props = defineProps<{
  salesOrderDetails: Array<SalesOrderDetail> | undefined;
}>();

const emit = defineEmits<{
  (e: "add", salesOrderDetail: SalesOrderDetail): void;
  (e: "edit", salesOrderDetail: SalesOrderDetail): void;
  (e: "delete", salesOrderDetail: SalesOrderDetail): void;
}>();

const salesOrder = useSalesOrderStore();



const onAdd = () => {
  const defaultSalesOrderDetail = {
    id: getNewUuid(),
    referenceId: "",
    quantity: 0,
    unitCost:0,
    unitPrice: 0,
    totalCost: 0,
    amount: 0,
    salesOrderHeaderId: "", 
    description: "", 
    estimatedDeliveryDate: new Date(), 
    isServerd: false,
    isInvoiced: false,
  } as SalesOrderDetail;
  emit("add", defaultSalesOrderDetail);
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

const onDeleteRow = (event: any, salesOrderDetail: SalesOrderDetail) => {
  emit("delete", salesOrderDetail);
};
</script>
