<!--
<template>
  <div>
    <DataTable
      class="small-datatable"
      tableStyle="min-width: 100%"
      scrollable
      scrollHeight="70vh"
      sortMode="multiple"
      :value="purchaseStore.purchaseInvoices"
      v-model:selection="selectedInvoices"
      @row-click="editPurchaseInvoice"
    >
      <template #header>
        <div
          class="flex flex-wrap align-items-center justify-content-between gap-2"
        >
          <div class="datatable-filter">
            <div class="filter-field">
              <label class="block text-900 mb-2">Període</label>
              <Calendar
                v-model="filter.dates"
                :numberOfMonths="2"
                selectionMode="range"
                dateFormat="dd/mm/yy"
              />
            </div>
          </div>
          <div class="datatable-buttons">
            <Button
              class="datatable-button"
              :icon="PrimeIcons.SEARCH"
              rounded
              raised
              @click="filterInvoices"
            />
            <Button
              :icon="PrimeIcons.PLUS"
              rounded
              raised              
              @click="createButtonClick"
            />
          </div>
        </div>
      </template>      
      <Column
        field="number"
        header="Número"
        sortable
        style="width: 10%"
      ></Column>
      <Column header="Proveïdor" style="width: 15%">
        <template #body="slotProps">
          {{ getSupplierNameById(slotProps.data.supplierId) }}
        </template>
      </Column>
      <Column header="Estat" style="width: 15%">
        <template #body="slotProps">
          <span
            :class="{
              'managed-status': isManagedStatus(
                slotProps.data.purchaseInvoiceStatusId
              ),
            }"
          >
            {{ getStatusNameById(slotProps.data.purchaseInvoiceStatusId) }}
          </span>
        </template>
      </Column>
      <Column
        header="Data"
        field="purchaseInvoiceDate"
        sortable
        style="width: 15%"
      >
        <template #body="slotProps">
          {{ formatDate(slotProps.data.purchaseInvoiceDate) }}
        </template>
      </Column>
      <Column header="Venciment" style="width: 15%">
        <template #body="slotProps">
          {{ getLastDueDate(slotProps.data) }}
        </template>
      </Column>
      <Column
        field="baseAmount"
        header="Import Base"
        style="width: 15%"
      ></Column>
      <Column style="width: 2%">
        <template #body="slotProps">
          <i
            :class="PrimeIcons.DOWNLOAD"
            class="download_column"
            @click="downloadInvoices(slotProps.data)"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script setup lang="ts">
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { PrimeIcons } from "primevue/api";
import { DataTableRowClickEvent } from "primevue/datatable";
import { useToast } from "primevue/usetoast";
import { useStore } from "../../../store";
import { usePurchaseMasterDataStore } from "../store/purchase";
import { PurchaseInvoice } from "../types";
import SharedServices from "../../../api/services";
import {
  createBlobAndDownloadFile,
  formatDate,
} from "../../../utils/functions";

const toast = useToast();
const store = useStore();
const purchaseStore = usePurchaseMasterDataStore();
const router = useRouter();

const filter = ref({
  dates: undefined as Array<Date> | undefined,
  startDate: undefined as Date | undefined,
  endDate: undefined as Date | undefined,
});
const selectedInvoices = ref([] as Array<PurchaseInvoice>);

onMounted(async () => {
  purchaseStore.fetchMasterData();

  store.setMenuItem({
    icon: PrimeIcons.SERVER,
    text: "Factures de compra",
  });
});

const getSupplierNameById = (id: string) => {
  const supplier = purchaseStore.masterData.suppliers?.find((s) => s.id === id);
  if (supplier) return supplier.comercialName;
  else return "";
};

const getStatusNameById = (id: string) => {
  const status = purchaseStore.masterData.statuses?.find((s) => s.id === id);
  if (status) return status.name;
  else return "";
};

const getLastDueDate = (invoice: PurchaseInvoice): string => {
  if (!invoice.purchaseInvoiceDueDates) {
    return "";
  } else if (invoice.purchaseInvoiceDueDates.length === 0) {
    return formatDate(invoice.purchaseInvoiceDate);
  } else {
    return formatDate(
      invoice.purchaseInvoiceDueDates[
        invoice.purchaseInvoiceDueDates.length - 1
      ].dueDate
    );
  }
};

const isManagedStatus = (statusId: string): boolean => {
  const managedStatus = purchaseStore.masterData.statuses?.find(
    (s) => s.name === "Gestionada"
  );

  return (managedStatus && managedStatus.id === statusId) as boolean;
};

const filterInvoices = async () => {
  if (filter.value.dates) {
    await purchaseStore.getPurchaseInvoices(
      filter.value.dates[0].toISOString().split("T")[0],
      filter.value.dates[1].toISOString().split("T")[0],
      undefined,
      undefined
    );
  } else {
    toast.add({
      severity: "info",
      summary: "Filtre invàlid",
      detail: "Seleccioni un període",
      life: 5000,
    });
  }
};


const createButtonClick = () => {
    router.push({ path: `/purchaseinvoice/${uuidv4()}` });
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

const downloadInvoices = async (invoice: PurchaseInvoice) => {
  const files = await SharedServices.File.GetEntityFiles(
    "PurchaseInvoice",
    invoice.id
  );
  if (files) {
    files.forEach(async (f) => {
      const response = await SharedServices.File.Download(f);
      createBlobAndDownloadFile(f.originalName, response);
    });
  }
};
</script>
<style scoped>
.datatable-filter {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.datatable-button {
  margin-right: 1rem;
}

.download_column:hover {
  color: var(--blue-500);
  cursor: pointer;
}

.managed-status {
  color: green;
}
</style>

-->

<!--

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
  import { useRouter } from "vue-router";
  import { PrimeIcons } from "primevue/api";
  import { useToast } from "primevue/usetoast";
  import { useConfirm } from "primevue/useconfirm";
  import { onMounted, ref } from "vue";

  import { DataTableRowClickEvent } from "primevue/datatable";
  import { useStore } from "../../../store/index";
  import { usePurchaseStore } from "../store/invoices";
  import { PurchaseInvoice } from "../types";
  import { usePurchaseMasterDataStore } from "../store/purchase";

  
  const toast = useToast();
  const confirm = useConfirm();
  const router = useRouter();
  const store = useStore();
  const purchaseInvoiceStore = usePurchaseStore();
  const purchaseStore = usePurchaseMasterDataStore();
  
  const startDate = ref(undefined as Date | undefined);
  const endDate = ref(undefined as Date | undefined);

  onMounted(async () => {
    purchaseStore.fetchMasterData();
    store.setMenuItem({
      icon: PrimeIcons.MONEY_BILL,
      text: "Factures de compra",
    });
  });
  
  const createButtonClick = () => {
    router.push({ path: `/purchaseinvoice/${uuidv4()}` });
  };

  const searchButtonClick = async () => {
    console.log("search button click");
    await purchaseStore.getPurchaseInvoices(
      startDate.value!.toISOString().split("T")[0],
      endDate.value!.toISOString().split("T")[0],
      undefined,
      undefined
    );
    
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
  -->
