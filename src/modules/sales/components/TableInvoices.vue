<template>
  <DataTable
    class="small-datatable"
    tableStyle="min-width: 100%"
    scrollable
    scrollHeight="80vh"
    sortMode="multiple"
    :value="invoices"
    @row-click="editButtonClick"
  >
    <template #header>
      <slot name="filter"></slot>
    </template>
    <Column
      field="invoiceNumber"
      header="Número"
      :sortable="true"
      style="width: 10%"
    ></Column>
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
    <Column header="Client" style="width: 15%">
      <template #body="slotProps">
        {{ getCustomerNameById(slotProps.data.customerId) }}
      </template>
    </Column>
    <Column header="Estat" style="width: 15%">
      <template #body="slotProps">
        {{ getStatusNameById(slotProps.data.statusId) }}
      </template>
    </Column>
    <Column header="Venciment" style="width: 15%">
      <template #body="slotProps">
        {{ getLastDueDate(slotProps.data) }}
      </template>
    </Column>
    <Column header="Import" style="width: 15%">
      <template #body="slotProps"> {{ slotProps.data.netAmount }} € </template>
    </Column>
    <Column style="width: 5%">
      <template #body="slotProps">
        <i
          v-if="
            slotProps.data.statusId ===
            lifecycleStore.lifecycle?.initialStatusId
          "
          :class="PrimeIcons.TIMES"
          class="grid_delete_column_button"
          @click="deleteButtonClick($event, slotProps.data)"
        />
      </template>
    </Column>
  </DataTable>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import { Customer, SalesInvoice } from "../types";
import { PrimeIcons } from "primevue/api";
import { useLifecyclesStore } from "../../shared/store/lifecycle";
import { formatDate } from "../../../utils/functions";
import { DataTableRowClickEvent } from "primevue/datatable";

const lifecycleStore = useLifecyclesStore();

const props = defineProps<{
  invoices: Array<SalesInvoice> | undefined;
  customers: Array<Customer> | undefined;
}>();

onMounted(async () => {
  await lifecycleStore.fetchOneByName("SalesInvoice");
});

const emit = defineEmits<{
  (e: "edit", invoice: SalesInvoice): void;
  (e: "delete", invoice: SalesInvoice): void;
}>();

const getCustomerNameById = (id: string) => {
  const supplier = props.customers?.find((s) => s.id === id);
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

const editButtonClick = (row: DataTableRowClickEvent) => {
  if (
    !(row.originalEvent.target as any).className.includes(
      "grid_delete_column_button"
    )
  ) {
    emit("edit", row.data);
  }
};

const deleteButtonClick = (event: any, invoice: SalesInvoice) => {
  emit("delete", invoice);
};
</script>
