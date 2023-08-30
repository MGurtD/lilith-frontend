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
      field="salesOrderNumber"
      header="Número"
      style="width: 15%"
    ></Column>
    <Column header="Data" style="width: 15%">
      <template #body="slotProps">
        {{ formatDate(slotProps.data.salesOrderDate) }}
      </template>
    </Column>
    <Column
      field="customerComercialName"
      header="Client"
      style="width: 40%"
    ></Column>
    <Column header="Estat" style="width: 20%">
      <template #body="slotProps">
        {{ getStatusNameById(slotProps.data.statusId) }}
      </template>
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
          @click="deleteSalesInvoice($event, slotProps.data)"
        />
      </template>
    </Column>
  </DataTable>

  <Dialog
    v-model:visible="dialogOptions.visible"
    :header="dialogOptions.title"
    :closable="dialogOptions.closable"
    :modal="dialogOptions.modal"
  >
    <FormCreateOrderOrInvoice
      :create-request="createRequest"
      @submit="createOrder"
    />
  </Dialog>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import { useStore } from "../../../store";
import { useSalesOrderStore } from "../store/salesOrder";
import { useReferenceStore } from "../store/reference";
import { useCustomersStore } from "../store/customers";
import { useLifecyclesStore } from "../../shared/store/lifecycle";
import { PrimeIcons } from "primevue/api";
import { DataTableRowClickEvent } from "primevue/datatable";
import {
  formatDateForQueryParameter,
  formatDate,
  getNewUuid,
} from "../../../utils/functions";
import { DialogOptions } from "../../../types/component";
import { CreateSalesHeaderRequest, SalesOrderHeader } from "../types";
import FormCreateOrderOrInvoice from "../components/FormCreateOrderOrInvoice.vue";
import { useSharedDataStore } from "../../shared/store/masterData";
import { useConfirm } from "primevue/useconfirm";

const router = useRouter();
const toast = useToast();
const confirm = useConfirm();
const store = useStore();
const sharedStore = useSharedDataStore();
const salesOrderStore = useSalesOrderStore();
const referenceStore = useReferenceStore();
const customerStore = useCustomersStore();
const lifecycleStore = useLifecyclesStore();

const filter = ref({
  dates: undefined as Array<Date> | undefined,
  customerId: undefined as string | undefined,
  referenceId: undefined as string | undefined,
});
const dialogOptions = reactive({
  visible: false,
  title: "Crear comanda",
  closable: true,
  position: "center",
  modal: true,
} as DialogOptions);

onMounted(async () => {
  await referenceStore.fetchReferences();
  await customerStore.fetchCustomers();
  await lifecycleStore.fetchOneByName("SalesOrder");
  sharedStore.fetchMasterData();

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

const createRequest = ref({} as CreateSalesHeaderRequest);
const generateNewRequest = (): CreateSalesHeaderRequest => {
  return {
    id: getNewUuid(),
    customerId: "",
    exerciseId: "",
    date: new Date(),
  };
};

const createButtonClick = () => {
  createRequest.value = generateNewRequest();
  dialogOptions.visible = true;
};

const filterLocalStorageKey = "temges.salesorder.filter";
const filterSalesOrder = async () => {
  if (filter.value.dates) {
    const startTime = formatDateForQueryParameter(filter.value.dates[0]);
    const endTime = formatDateForQueryParameter(filter.value.dates[1]);

    await salesOrderStore.GetFiltered(
      startTime,
      endTime,
      filter.value.customerId
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

const getStatusNameById = (id: string) => {
  const status = lifecycleStore.lifecycle?.statuses?.find((s) => s.id === id);
  if (status) return status.name;
  else return "";
};

const createOrder = async () => {
  dialogOptions.visible = false;
  const created = await salesOrderStore.Create(createRequest.value);
  if (created) {
    router.push({ path: `/salesorder/${createRequest.value.id}` });
  }
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

const deleteSalesInvoice = (event: any, order: SalesOrderHeader) => {
  confirm.require({
    message: `Està segur que vol eliminar la comanda?`,
    icon: "pi pi-question-circle",
    acceptIcon: "pi pi-check",
    rejectIcon: "pi pi-times",
    accept: async () => {
      const deleted = await salesOrderStore.Delete(order.id);
      if (deleted) {
        toast.add({
          severity: "success",
          summary: "Eliminada",
          life: 3000,
        });

        await filterSalesOrder();
      }
    },
  });
};
</script>
