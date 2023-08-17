<template>
  <TableInvoices
    :invoices="invoiceStore.invoices"
    :customers="customersStore.customers"
    @edit="editSalesInvoice"
    @delete="deleteSalesInvoice"
  >
    <template #filter>
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
  </TableInvoices>
</template>
<script setup lang="ts">
import TableInvoices from "../components/TableInvoices.vue";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";
import { useStore } from "../../../store";
import { useSalesInvoiceStore } from "../store/invoice";
import { useCustomersStore } from "../store/customers";
import { onMounted, ref } from "vue";
import { PrimeIcons } from "primevue/api";
import {
  formatDateForQueryParameter,
  getNewUuid,
} from "../../../utils/functions";
import { SalesInvoice } from "../types";

const toast = useToast();
const confirm = useConfirm();
const router = useRouter();
const store = useStore();
const customersStore = useCustomersStore();
const invoiceStore = useSalesInvoiceStore();

const filter = ref({
  dates: undefined as Array<Date> | undefined,
  customerId: undefined as string | undefined,
});

onMounted(async () => {
  await customersStore.fetchCustomers();

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

const createButtonClick = () => {
  router.push({ path: `/SalesInvoice/${getNewUuid()}` });
};

const editSalesInvoice = (invoice: SalesInvoice) => {
  router.push({ path: `/SalesInvoice/${invoice.id}` });
};

const deleteSalesInvoice = (invoice: SalesInvoice) => {
  confirm.require({
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
