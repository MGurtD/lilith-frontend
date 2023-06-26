<template>
    <Button
    :icon="PrimeIcons.PLUS"
    class="grid_add_row_button"
    rounded
    @click="createButtonClick"
    />
    <DataTable
    :value="purchaseStore.purchaseInvoices"
    tableStyle="min-width: 100%"
    @row-click="editPurchaseInvoice"
    >
    <Column field="supllierId" header="Proveïdor"></Column>
    <Column field="supllierNumber" header="Num. Fra. Proveïdor"></Column>
    <Column field="purchaseInvoiceDate" header="Data Factura"></Column>
    </DataTable>
</template>
<script setup lang="ts">
import { v4 as uuidv4 } from "uuid";
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import { useRouter } from "vue-router";
import { useStore } from '../../../store';
import { usePurchaseMasterDataStore } from "../store/purchase";
import { DataTableRowClickEvent } from "primevue/datatable";
import { usePurchaseStore } from "../store/invoices";
import { onMounted } from 'vue';
import { PrimeIcons } from 'primevue/api';

const toast = useToast();
const confirm = useConfirm();
const router = useRouter();
const store = useStore();
const purchaseMDStore = usePurchaseMasterDataStore();
const purchaseStore = usePurchaseStore();

onMounted(async () => {
    let startDate: Date;
    let endDate: Date;
    startDate = new Date();
    endDate = new Date(startDate.getTime()-2592000000);
    console.log(startDate, endDate);
    await purchaseStore.getPurchaseInvoiceBetweenDates(startDate, endDate);
    store.setMenuItem({
        icon: PrimeIcons.MONEY_BILL,
        text: "Factures de compra",
    });
});

const createButtonClick = () => {
    router.push({ path: `/purchaseInvoice/${uuidv4()}`});
};

const editPurchaseInvoice = (row: DataTableRowClickEvent) => {
  console.log("edit")
  if (
    !(row.originalEvent.target as any).className.includes(
      "grid_delete_column_button"
    )
  ) {
    router.push({ path: `/purchaseinvoice/${row.data.id}` });
  }
};

</script>