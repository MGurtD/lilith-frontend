<template>
  <section class="three-columns mb-2">

      
      <label class="block text-900 mb-1">Desde:&nbsp;  
        <Calendar id="start-date" v-model="startDate" dateformat="yyyy-MM-dd" />&nbsp;      
      </label>
        <label class="block text-900 mb-1">Fins a:&nbsp;  
        <Calendar id="end-date" v-model="endDate" dateformat="yyyy-MM-dd" />&nbsp;
      </label>
        <Button
            :icon="PrimeIcons.SEARCH"
            
            rounded
            @click="searchButtonClick"
        />
        <Button
            :icon="PrimeIcons.PLUS"
            class="grid_add_row_button"
            rounded
            @click="createButtonClick"
        />

  </section>
  <DataTable
    :value="purchaseInvoiceStore.purchaseInvoices"
    tableStyle="min-width: 100%"
    @row-click="editPurchaseInvoice"
  >
  <Column field="supplierId" header="Proveïdor" style="width: 25%"></Column>
  <Column field="supplierNumber" header="Num. Fra. Proveïdor" style="width: 25%"></Column>
  <Column field="purchaseInvoiceDate" header="Data Factura" style="width: 25%"></Column>
  <Column field="netAmount" header="Import Total" style="width: 25%"></Column>
  </DataTable>
  
  </template>
  <script setup lang="ts">
  import { v4 as uuidv4 } from "uuid";
  import { PrimeIcons } from "primevue/api";
  import { useToast } from "primevue/usetoast";
  import { useConfirm } from "primevue/useconfirm";
  import { onMounted, ref } from "vue";
  import { useRouter } from "vue-router";
  import { DataTableRowClickEvent } from "primevue/datatable";
  import { useStore } from "../../../store/index";
  import { usePurchaseStore } from "../store/invoices";
  import { PurchaseInvoice } from "../types";

  
  const toast = useToast();
  const confirm = useConfirm();
  const router = useRouter();
  const store = useStore();
  const purchaseInvoiceStore = usePurchaseStore();
  
  const startDate = ref();
  const endDate = ref();

  onMounted(async () => {
    //purchaseInvoiceStore.getPurchaseInvoiceBetweenDates(startDate.value, endDate.value);
    store.setMenuItem({
      icon: PrimeIcons.MONEY_BILL,
      text: "Factures de compra",
    });
  });
  
  const createButtonClick = () => {
    router.push({ path: `/purchaseinvoice/${uuidv4()}` });
  };

  const searchButtonClick = () => {
    console.log("search button click");
    purchaseInvoiceStore.getPurchaseInvoiceBetweenDates(startDate.value, endDate.value);  
  };
  
  const editPurchaseInvoice = (row: DataTableRowClickEvent) => {
    if (
      !(row.originalEvent.target as any).className.includes(
        "grid_delete_column_button"
      )
    ) {
      router.push({ path: `/purchaseinvoice/${row.data.id}` });
    }
  };
  </script>