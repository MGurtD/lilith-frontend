<template>
  <DataTable
    :value="salesOrderStore.salesOrders"
    class="small-datatable"
    tableStyle="min-width: 100%"
    scrollable
    scrollHeight="75vh"
    sortMode="multiple"
    @row-click="editRow"
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
              :options="customerStore.customers"
              optionValue="id"
              optionLabel="comercialName"
              class="w-full"
            />
          </div>
          <!--<div class="filter-field">
            <label class="block text-900 mb-2">Referencia</label>
            <Dropdown
              v-model="filter.referenceId"
              editable
              :options="referenceStore.references"
              optionValue="id"
              optionLabel="description"
              class="w-full"
            />
          </div>-->
        </div>
        <div class="datatable-buttons">
          <Button
            class="datatable-button mr-2"
            :icon="PrimeIcons.FILTER"
            rounded
            raised
            @click="filterSalesOrder"
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
      field="customerComercialName"
      header="Client"
      style="width: 40%"
    ></Column>
    <Column
      field="salesOrderNumber"
      header="Num. Comanda"
      style="width: 20%"
    ></Column>
    <Column header="Data Comanda" style="width: 20%">
      <template #body="slotProps">
        {{ formatDate(slotProps.data.salesOrderDate) }}
      </template>
    </Column>
    <Column header="Estat Comanda" style="width: 20%">
      <template #body="slotProps">
        {{ getStatusNameById(slotProps.data.statusId) }}
      </template>
    </Column>
  </DataTable>
</template>
<script setup lang="ts">
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import { useStore } from "../../../store";
import { useSalesOrderStore } from "../store/salesOrder";
import { onMounted, ref } from "vue";
import { PrimeIcons } from "primevue/api";
import { DataTableRowClickEvent } from "primevue/datatable";
import {
  formatDateForQueryParameter,
  formatDate,
} from "../../../utils/functions";
import { useReferenceStore } from "../store/reference";
import { useCustomersStore } from "../store/customers";
import { useLifecyclesStore } from "../../shared/store/lifecycle";

const router = useRouter();
const toast = useToast();
const store = useStore();
const salesOrderStore = useSalesOrderStore();
const referenceStore = useReferenceStore();
const customerStore = useCustomersStore();
const lifeCycleStore = useLifecyclesStore();

const filter = ref({
  dates: undefined as Array<Date> | undefined,
  customerId: undefined as string | undefined,
  referenceId: undefined as string | undefined,
});

onMounted(async () => {
  await referenceStore.fetchReferences();
  await customerStore.fetchCustomers();
  await lifeCycleStore.fetchOneByName("SalesOrder");
  //Filtre
  const storageFilter = localStorage.getItem(filterLocalStorageKey);
  if (storageFilter !== null) {
    filter.value = JSON.parse(storageFilter);
    if (filter.value.dates) {
      filter.value.dates[0] = new Date(filter.value.dates[0]);
      filter.value.dates[1] = new Date(filter.value.dates[1]);
    }
    await filterSalesOrder();
  } else {
    let startDate: Date = new Date();
    let endDate: Date = new Date();
    startDate.setDate(endDate.getDate() - 30);
    const strStartDate = formatDateForQueryParameter(startDate);
    const strEndDate = formatDateForQueryParameter(endDate);
    await salesOrderStore.GetBetweenDates(strStartDate, strEndDate);
  }

  store.setMenuItem({
    icon: PrimeIcons.APPLE,
    title: "Comandes",
  });
});
const createButtonClick = () => {
  router.push({ path: `/salesorder/${uuidv4()}` });
};
const editRow = (row: DataTableRowClickEvent) => {
  if (
    !(row.originalEvent.target as any).className.includes(
      "grid_delete_column_button"
    )
  ) {
    router.push({ path: `/salesorder/${row.data.id}` });
  }
};

const filterLocalStorageKey = "temges.salesorder.filter";
const filterSalesOrder = async () => {
  if (filter.value.dates) {
    const startTime = formatDateForQueryParameter(filter.value.dates[0]);
    const endTime = formatDateForQueryParameter(filter.value.dates[1]);

    await salesOrderStore.GetBetweenDates(startTime, endTime);

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

const getStatusNameById = (id: string) => {
  const status = lifeCycleStore.lifecycle?.statuses?.find((s) => s.id === id);
  if (status) return status.name;
  else return "";
};
</script>
