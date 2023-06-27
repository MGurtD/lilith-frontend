<template>
  <div>
    <DataTable
      class="small-datatable"
      tableStyle="min-width: 100%"
      scrollable
      scrollHeight="75vh"
      sortMode="multiple"
      :value="purchaseInvoiceStore.purchaseInvoices"
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
                selectionMode="range"
                dateFormat="dd/mm/yy"
              />
            </div>
            <div class="filter-field">
              <label class="block text-900 mb-2">Proveïdor</label>
              <Dropdown
                v-model="filter.supplierId"
                editable
                :options="puchaseMasterDataStore.masterData.suppliers"
                optionValue="id"
                optionLabel="comercialName"
                class="w-full"
              />
            </div>
          </div>
          <div class="datatable-buttons">
            <Button
              class="datatable-button"
              :icon="PrimeIcons.FILTER"
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
        :sortable="true"
        style="width: 10%"
      ></Column>
      <Column header="Proveïdor" style="width: 15%">
        <template #body="slotProps">
          {{ getSupplierNameById(slotProps.data.supplierId) }}
        </template>
      </Column>
      <Column
        header="Num Fra. Proveïdor"
        style="width: 12%"
        field="supplierNumber"
      ></Column>
      <Column header="Estat" style="width: 15%">
        <template #body="slotProps">
          {{ getStatusNameById(slotProps.data.purchaseInvoiceStatusId) }}
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
    </DataTable>
  </div>
</template>
<script setup lang="ts">
import { v4 as uuidv4 } from "uuid";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";
import { useStore } from "../../../store";
import { usePurchaseMasterDataStore } from "../store/purchase";
import { DataTableRowClickEvent } from "primevue/datatable";
import { usePurchaseInvoiceStore } from "../store/purchaseInvoices";
import { onMounted, ref } from "vue";
import { PrimeIcons } from "primevue/api";
import {
  formatDateForQueryParameter,
  formatDate,
} from "../../../utils/functions";
import { PurchaseInvoice } from "../types";

const toast = useToast();
const confirm = useConfirm();
const router = useRouter();
const store = useStore();
const puchaseMasterDataStore = usePurchaseMasterDataStore();
const purchaseInvoiceStore = usePurchaseInvoiceStore();

const filter = ref({
  dates: undefined as Array<Date> | undefined,
  supplierId: undefined as string | undefined,
});

onMounted(async () => {
  await puchaseMasterDataStore.fetchMasterData();

  const storageFilter = localStorage.getItem(filterLocalStorageKey);
  if (storageFilter !== null) {
    filter.value = JSON.parse(storageFilter);

    if (filter.value.dates) {
      filter.value.dates[0] = new Date(filter.value.dates[0]);
      filter.value.dates[1] = new Date(filter.value.dates[1]);
    }
    await filterInvoices();
  } else {
    let startDate: Date = new Date();
    let endDate: Date = new Date();
    startDate.setDate(endDate.getDate() - 30);

    const strStartDate = formatDateForQueryParameter(startDate);
    const strEndDate = formatDateForQueryParameter(endDate);
    await purchaseInvoiceStore.GetFiltered(strStartDate, strEndDate);
  }

  store.setMenuItem({
    icon: PrimeIcons.MONEY_BILL,
    text: "Factures de compra",
  });
});

const filterLocalStorageKey = "temges.purchaseinvoice.filter";
const filterInvoices = async () => {
  if (filter.value.dates) {
    const startTime = formatDateForQueryParameter(filter.value.dates[0]);
    const endTime = formatDateForQueryParameter(filter.value.dates[1]);

    await purchaseInvoiceStore.GetFiltered(
      startTime,
      endTime,
      undefined,
      undefined,
      filter.value.supplierId
    );

    localStorage.setItem(filterLocalStorageKey, JSON.stringify(filter.value));
  } else {
    toast.add({
      severity: "info",
      summary: "Filtre invàlid",
      detail: "Seleccioni un període",
      life: 5000,
    });
  }
};

const getSupplierNameById = (id: string) => {
  const supplier = puchaseMasterDataStore.masterData.suppliers?.find(
    (s) => s.id === id
  );
  if (supplier) return supplier.comercialName;
  else return "";
};

const getStatusNameById = (id: string) => {
  const status = puchaseMasterDataStore.masterData.statuses?.find(
    (s) => s.id === id
  );
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

const createButtonClick = () => {
  router.push({ path: `/purchaseInvoice/${uuidv4()}` });
};

const editPurchaseInvoice = (row: DataTableRowClickEvent) => {
  console.log("edit", row.data);
  if (
    !(row.originalEvent.target as any).className.includes(
      "grid_delete_column_button"
    )
  ) {
    router.push({ path: `/purchaseinvoice/${row.data.id}` });
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

.filter-field {
  display: grid;
  grid-template-columns: 0.4fr 1fr;
}

.filter-field > label {
  padding-top: 12px;
  font-size: 1rem;
}
</style>
