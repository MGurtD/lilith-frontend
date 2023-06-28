<template>
  <DataTable
    :value="purchaseStore.purchaseInvoiceStatuses"
    tableStyle="min-width: 100%"
    @row-click="editPurchaseInvoiceStatus"
  >
    <template #header>
      <div
        class="flex flex-wrap align-items-center justify-content-between gap-2"
      >
        <span class="text-xl text-900 font-bold">Estats</span>
        <Button
          :icon="PrimeIcons.PLUS"
          rounded
          raised
          @click="createButtonClick"
        />
      </div>
    </template>
    <Column field="name" header="Nom" style="width: 20%"></Column>
    <Column field="description" header="Descripció" style="width: 50%"></Column>
    <Column header="Desactivada" style="width: 20%">
      <template #body="slotProps">
        <BooleanColumn :value="slotProps.data.disabled" :showColor="false" />
      </template>
    </Column>
    <Column>
      <template #body="slotProps">
        <i
          :class="PrimeIcons.TIMES"
          class="grid_delete_column_button"
          @click="deletePurchaseInvoiceStatus($event, slotProps.data)"
        />
      </template>
    </Column>
  </DataTable>
</template>
<script setup lang="ts">
import { v4 as uuidv4 } from "uuid";
import { PrimeIcons } from "primevue/api";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import { usePurchaseInvoiceStatusStore } from "../store/purchaseInvoiceStatus";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { DataTableRowClickEvent } from "primevue/datatable";
import { PurchaseInvoiceStatus } from "../types";
import { useStore } from "../../../store";

const toast = useToast();
const confirm = useConfirm();
const router = useRouter();
const store = useStore();
const purchaseStore = usePurchaseInvoiceStatusStore();

onMounted(async () => {
  await purchaseStore.fetchPurchaseInvoiceStatuses();
  store.setMenuItem({
    icon: PrimeIcons.SERVER,
    text: "Estats de Factures de Compra",
  });
});
const createButtonClick = () => {
  router.push({ path: `/purchaseinvoicestatus/${uuidv4()}` });
};

const editPurchaseInvoiceStatus = (row: DataTableRowClickEvent) => {
  if (
    !(row.originalEvent.target as any).className.includes(
      "grid_delete_column_button"
    )
  ) {
    router.push({ path: `/purchaseinvoicestatus/${row.data.id}` });
  }
};

const deletePurchaseInvoiceStatus = (
  event: any,
  purchaseInvoiceStatus: PurchaseInvoiceStatus
) => {
  confirm.require({
    target: event.currentTarget,
    message: `Está segur que vol eliminar la sèrie de factures de compra ${purchaseInvoiceStatus.name}?`,
    icon: "pi pi-question-circle",
    acceptIcon: "pi pi-check",
    rejectIcon: "pi pi-times",
    accept: async () => {
      const deleted = await purchaseStore.deletePurchaseInvoiceStatus(
        purchaseInvoiceStatus.id
      );

      if (deleted) {
        toast.add({
          severity: "success",
          summary: "Eliminat",
          life: 3000,
        });
        await purchaseStore.fetchPurchaseInvoiceStatuses();
      }
    },
  });
};
</script>
