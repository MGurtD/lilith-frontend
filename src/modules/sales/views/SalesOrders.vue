<template>
  <DataTable
    :value="salesOrderStore.salesOrders"
    class="small-datatable"
    tableStyle="min-width: 100%"
    scrollable
    scrollHeight="80vh"
    sortMode="multiple"
    @row-click="editRow"
  >
    <template #header>
      <div
        class="flex flex-wrap align-items-center justify-content-between gap-2"
      >
        <div class="datatable-filter">
          <div class="filter-field">
            <ExerciseDatePicker
              :exercises="sharedStore.exercises"
              @range-selected="filterSalesOrder"
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
            class="datatable-button mr-2"
            :icon="PrimeIcons.FILTER_SLASH"
            rounded
            raised
            @click="cleanFilter"
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
import ExerciseDatePicker from "../../../components/ExerciseDatePicker.vue";
import FormCreateOrderOrInvoice from "../components/FormCreateOrderOrInvoice.vue";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import { useStore } from "../../../store";
import { useSalesOrderStore } from "../store/salesOrder";
import { useReferenceStore } from "../../shared/store/reference";
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
  lifecycleStore.fetchOneByName("SalesOrder");
  referenceStore.fetchReferences();
  customerStore.fetchCustomers();
  await sharedStore.fetchMasterData();

  setCurrentYear();
  await filterSalesOrder();

  store.setMenuItem({
    icon: PrimeIcons.APPLE,
    title: "Comandes",
  });
});

const setCurrentYear = () => {
  const year = new Date().getFullYear().toString();
  const currentExercise = sharedStore.exercises?.find((e) => e.name === year);

  if (currentExercise) {
    store.exercisePicker.exercise = currentExercise;
    store.exercisePicker.dates = [
      new Date(store.exercisePicker.exercise.startDate),
      new Date(store.exercisePicker.exercise.endDate),
    ];
  }
};

const cleanFilter = () => {
  store.cleanExercisePicker();
  filter.value.customerId = undefined;
};

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

const filterSalesOrder = async () => {
  if (store.exercisePicker.dates) {
    const startTime = formatDateForQueryParameter(
      store.exercisePicker.dates[0]
    );
    const endTime = formatDateForQueryParameter(store.exercisePicker.dates[1]);

    await salesOrderStore.GetFiltered(
      startTime,
      endTime,
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
