<template>
  <div>
    <DataTable
      class="small-datatable"
      tableStyle="min-width: 100%"
      scrollable
      scrollHeight="70vh"
      sortMode="multiple"
      :value="purchaseInvoiceStore.purchaseInvoices"
      v-model:selection="selectedInvoices"
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
            <div class="filter-field">
              <label class="block text-900 mb-2">Excloure gestionades</label>
              <Checkbox
                v-model="filter.excludeManaged"
                :binary="true"
                @click="filterInvoices"
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
              :icon="PrimeIcons.CHECK"
              :disabled="selectedInvoices.length === 0"
              rounded
              raised
              severity="success"
              @click="updateSelectedInvoiceStatusToManaged"
            />
          </div>
        </div>
      </template>
      <Column selectionMode="multiple" style="width: 2%"></Column>
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
      <Column
        header="Num Fra. Proveïdor"
        style="width: 12%"
        field="supplierNumber"
      ></Column>
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
import { onMounted, ref } from "vue";
import { PrimeIcons } from "primevue/api";
import { useToast } from "primevue/usetoast";
import { useStore } from "../../../store";
import { usePurchaseMasterDataStore } from "../store/purchase";
import { usePurchaseInvoiceStore } from "../store/purchaseInvoices";
import { PurchaseInvoice, PurchaseInvoiceUpdateStatues } from "../types";
import SharedServices from "../../../api/services";
import {
  createBlobAndDownloadFile,
  formatDate,
  formatDateForQueryParameter,
} from "../../../utils/functions";

const toast = useToast();
const store = useStore();
const purchaseStore = usePurchaseMasterDataStore();
const purchaseInvoiceStore = usePurchaseInvoiceStore();

const filter = ref({
  dates: undefined as Array<Date> | undefined,
  startDate: undefined as Date | undefined,
  endDate: undefined as Date | undefined,
  excludeManaged: false,
});
const selectedInvoices = ref([] as Array<PurchaseInvoice>);

onMounted(async () => {
  purchaseStore.fetchMasterData();

  store.setMenuItem({
    icon: PrimeIcons.SERVER,
    text: "Comptabilització de factures",
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
    let managedStatus = undefined;
    if (filter.value.excludeManaged) {
      managedStatus = purchaseStore.masterData.statuses?.find(
        (s) => s.name === "Gestionada"
      );
    }

    const startTime = formatDateForQueryParameter(filter.value.dates[0]);
    const endTime = formatDateForQueryParameter(filter.value.dates[1]);
    const statusId = managedStatus ? managedStatus.id : undefined;

    await purchaseInvoiceStore.GetFiltered(
      startTime,
      endTime,
      undefined,
      statusId
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

const updateSelectedInvoiceStatusToManaged = async () => {
  const statusTo = purchaseStore.masterData.statuses?.find(
    (s) => s.name === "Gestionada"
  );
  if (statusTo) {
    const ids = selectedInvoices.value.map((i) => i.id);
    const request = {
      ids,
      statusToId: statusTo.id,
    } as PurchaseInvoiceUpdateStatues;

    const updated = await purchaseInvoiceStore.UpdateInvoicesStatus(request);
    console.log("UpdateInvoicesStatus", updated);
    if (updated) {
      toast.add({
        severity: "success",
        summary: "Comptabilització de factures",
        detail: `Factures comptabilitzades: ${selectedInvoices.value.length}`,
        life: 5000,
      });

      await filterInvoices();
    }
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