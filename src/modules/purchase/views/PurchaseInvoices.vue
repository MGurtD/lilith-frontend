<template>
  <section class="our-columns mb-2">
    <div>
        <label for="start-date">Des de:</label>&nbsp;
        <Calendar id="start-date" v-model="startDate" dateformat="dd/mm/yyyy" />&nbsp;
        <label for="end-date">Fins a:</label>&nbsp;
        <Calendar id="end-date" v-model="endDate" dateformat="dd/mm/yyyy" />&nbsp;
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
    </div>     
  </section>
  <DataTable
    :value="purchaseInvoiceStore.purchaseInvoices"
    tableStyle="min-width: 100%"
    @row-click="editPurchaseInvoice"
  >
  <Column field="supplierNumber" header="Num. Fra. Proveïdor"></Column>
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

  
  const toast = useToast();
  const confirm = useConfirm();
  const router = useRouter();
  const store = useStore();
  const purchaseInvoiceStore = usePurchaseStore();
  
  const startDate = ref();
  const endDate = ref();

  onMounted(async () => {
    //await exerciseStore.fetchAll();    
    
    store.setMenuItem({
      icon: PrimeIcons.HASHTAG,
      text: "Exercicis",
    });
  });
  
  const createButtonClick = () => {
    router.push({ path: `/purchaseinvoice/${uuidv4()}` });
  };

  const searchButtonClick = () => {
    console.log(startDate.value)
    console.log(endDate.value)
    console.log("search")
    
    purchaseInvoiceStore.getPurchaseInvoiceBetweenDates(startDate.value, endDate.value)
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