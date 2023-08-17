<template>
  <div>
    <DataTable
      class="small-datatable"
      tableStyle="min-width: 100%"
      scrollable
      scrollHeight="75vh"
      sortMode="multiple"
      :value="invoiceStore.invoices"
      @row-click="editSalesInvoice"
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
              <label class="block text-900 mb-2">Client</label>
              <Dropdown
                v-model="filter.customerId"
                editable
                :options="customersStore.customers"
                optionValue="id"
                optionLabel="comercialName"
                class="w-full"
              />
            </div>
          </div>
          <div class="datatable-buttons">
            <Button
              class="datatable-button mr-2"
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
        field="invoiceNumber"
        header="Número"
        :sortable="true"
        style="width: 10%"
      ></Column>
      <Column header="Client" style="width: 15%">
        <template #body="slotProps">
          {{ getSupplierNameById(slotProps.data.customerId) }}
        </template>
      </Column>
      <Column header="Estat" style="width: 15%">
        <template #body="slotProps">
          {{ getStatusNameById(slotProps.data.statusId) }}
        </template>
      </Column>
      <Column
        header="Data"
        field="purchaseInvoiceDate"
        sortable
        style="width: 15%"
      >
        <template #body="slotProps">
          {{ formatDate(slotProps.data.invoiceDate) }}
        </template>
      </Column>
      <Column header="Venciment" style="width: 15%">
        <template #body="slotProps">
          {{ getLastDueDate(slotProps.data) }}
        </template>
      </Column>
      <Column header="Import" style="width: 15%">
        <template #body="slotProps">
          {{ slotProps.data.netAmount }} €
        </template>
      </Column>
      <Column style="width: 5%">
        <template #body="slotProps">
          <i
            v-if="
              getStatusNameById(slotProps.data.statusId) ===
              lifecycleStore.lifecycle?.initialStatusId
            "
            :class="PrimeIcons.TIMES"
            class="grid_delete_column_button"
            @click="deleteSalesInvoice($event, slotProps.data)"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script setup lang="ts">
import { v4 as uuidv4 } from "uuid";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";
import { useStore } from "../../../store";
import { useSalesInvoiceStore } from "../store/invoice";
import { useCustomersStore } from "../store/customers";
import { DataTableRowClickEvent } from "primevue/datatable";
import { useSharedDataStore } from "../../shared/store/masterData";
import { useLifecyclesStore } from "../../shared/store/lifecycle";
import { onMounted, ref } from "vue";
import { PrimeIcons } from "primevue/api";
import {
  formatDateForQueryParameter,
  formatDate,
} from "../../../utils/functions";
import { SalesInvoice } from "../types";

const toast = useToast();
const confirm = useConfirm();
const router = useRouter();
const store = useStore();
const sharedStore = useSharedDataStore();
const lifecycleStore = useLifecyclesStore();
const customersStore = useCustomersStore();
const invoiceStore = useSalesInvoiceStore();

const filter = ref({
  dates: undefined as Array<Date> | undefined,
  customerId: undefined as string | undefined,
});

onMounted(async () => {
  await customersStore.fetchCustomers();
  await sharedStore.fetchMasterData();
  await lifecycleStore.fetchOneByName("SalesInvoice");

  let startDate: Date = new Date();
  let endDate: Date = new Date();
  startDate.setDate(endDate.getDate() - 30);

  const strStartDate = formatDateForQueryParameter(startDate);
  const strEndDate = formatDateForQueryParameter(endDate);
  await invoiceStore.GetFiltered(strStartDate, strEndDate);

  store.setMenuItem({
    icon: PrimeIcons.MONEY_BILL,
    title: "Factures de venta",
  });
});

const filterInvoices = async () => {
  if (filter.value.dates) {
    const startTime = formatDateForQueryParameter(filter.value.dates[0]);
    const endTime = formatDateForQueryParameter(filter.value.dates[1]);

    await invoiceStore.GetFiltered(
      startTime,
      endTime,
      undefined,
      undefined,
      filter.value.customerId
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

const getSupplierNameById = (id: string) => {
  const supplier = customersStore.customers?.find((s) => s.id === id);
  if (supplier) return supplier.comercialName;
  else return "";
};

const getStatusNameById = (id: string) => {
  const status = lifecycleStore.lifecycle?.statuses.find((s) => s.id === id);
  if (status) return status.name;
  else return "";
};

const getLastDueDate = (invoice: SalesInvoice): string => {
  if (!invoice.salesInvoiceDueDates) {
    return "";
  } else if (invoice.salesInvoiceDueDates.length === 0) {
    return formatDate(invoice.invoiceDate);
  } else {
    return formatDate(
      invoice.salesInvoiceDueDates[invoice.salesInvoiceDueDates.length - 1]
        .dueDate
    );
  }
};

const createButtonClick = () => {
  router.push({ path: `/SalesInvoice/${uuidv4()}` });
};

const editSalesInvoice = (row: DataTableRowClickEvent) => {
  if (
    !(row.originalEvent.target as any).className.includes(
      "grid_delete_column_button"
    )
  ) {
    router.push({ path: `/SalesInvoice/${row.data.id}` });
  }
};

const deleteSalesInvoice = (event: any, invoice: SalesInvoice) => {
  confirm.require({
    target: event.currentTarget,
    message: `Està segur que vol eliminar la factura?`,
    icon: "pi pi-question-circle",
    acceptIcon: "pi pi-check",
    rejectIcon: "pi pi-times",
    accept: async () => {
      const deleted = await invoiceStore.Delete(invoice.id);
      if (deleted) {
        toast.add({
          severity: "success",
          summary: "Eliminada",
          life: 3000,
        });
        await filterInvoices();
      }
    },
  });
};
</script>
