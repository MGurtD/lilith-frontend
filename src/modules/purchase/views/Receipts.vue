<template>
  <div>
    <DataTable
      class="small-datatable"
      tableStyle="min-width: 100%"
      scrollable
      scrollHeight="75vh"
      sortMode="multiple"
      :value="receiptsStore.receipts"
      @row-click="editReceipt"
    >
      <template #header>
        <div
          class="flex flex-wrap align-items-center justify-content-between gap-2"
        >
          <div class="datatable-filter">
            <div class="filter-field">
              <ExerciseDatePicker
                :exercises="sharedDataStore.exercises"
                @range-selected="filterReceipts"
              />
            </div>
            <div class="filter-field">
              <label class="block text-900 mb-2">Proveïdor</label>
              <Dropdown
                v-model="filter.supplierId"
                editable
                :options="suppliersStore.suppliers"
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
              @click="filterReceipts"
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
        field="number"
        header="Número"
        :sortable="true"
        style="width: 10%"
      ></Column>
      <Column header="Data" field="date" sortable style="width: 10%">
        <template #body="slotProps">
          {{ formatDate(slotProps.data.date) }}
        </template>
      </Column>
      <Column header="Proveïdor" style="width: 15%">
        <template #body="slotProps">
          {{ getSupplierNameById(slotProps.data.supplierId) }}
        </template>
      </Column>
      <Column
        header="Número Proveïdor"
        style="width: 15%"
        field="supplierNumber"
      ></Column>
      <Column header="Estat" style="width: 15%">
        <template #body="slotProps">
          {{ getStatusNameById(slotProps.data.statusId) }}
        </template>
      </Column>
      <Column style="width: 5%">
        <template #body="slotProps">
          <i
            v-if="getStatusNameById(slotProps.data.statusId) === 'Nou'"
            :class="PrimeIcons.TIMES"
            class="grid_delete_column_button"
            @click="deleteReceipt($event, slotProps.data)"
          />
        </template>
      </Column>
    </DataTable>
  </div>

  <Dialog
    v-model:visible="dialogOptions.visible"
    :header="dialogOptions.title"
    :closable="dialogOptions.closable"
    :modal="dialogOptions.modal"
  >
    <FormCreateReceipt
      :create-request="createRequest"
      @submit="createReceipt"
    />
  </Dialog>
</template>
<script setup lang="ts">
import FormCreateReceipt from "../components/FormCreateReceipt.vue";
import ExerciseDatePicker from "../../../components/ExerciseDatePicker.vue";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";
import { useStore } from "../../../store";
import { useSharedDataStore } from "../../shared/store/masterData";
import { useReceiptsStore } from "../store/receipt";
import { useSuppliersStore } from "../store/suppliers";
import { DataTableRowClickEvent } from "primevue/datatable";
import { onMounted, reactive, ref } from "vue";
import { PrimeIcons } from "primevue/api";
import { DialogOptions } from "../../../types/component";
import {
  formatDateForQueryParameter,
  formatDate,
  getNewUuid,
} from "../../../utils/functions";
import { CreateReceiptRequest, PurchaseInvoice } from "../types";
import { Exercise } from "../../shared/types";

const toast = useToast();
const confirm = useConfirm();
const router = useRouter();
const store = useStore();
const receiptsStore = useReceiptsStore();
const suppliersStore = useSuppliersStore();
const sharedDataStore = useSharedDataStore();

const filter = ref({
  supplierId: undefined as string | undefined,
  exercise: undefined as Exercise | undefined,
});
const dialogOptions = reactive({
  visible: false,
  title: "Crear albarà",
  closable: true,
  position: "center",
  modal: true,
} as DialogOptions);

onMounted(async () => {
  store.setMenuItem({
    icon: PrimeIcons.MONEY_BILL,
    title: "Albarans de compra",
  });

  suppliersStore.fetchSuppliers();
  await sharedDataStore.fetchMasterData();
  await receiptsStore.fetchReceipts();
  setCurrentYear();

  await filterReceipts();
});

const setCurrentYear = () => {
  const year = new Date().getFullYear().toString();
  const currentExercise = sharedDataStore.exercises?.find(
    (e) => e.name === year
  );

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
  filter.value.supplierId = undefined;
};

const filterReceipts = async () => {
  if (store.exercisePicker.dates) {
    const startTime = formatDateForQueryParameter(
      store.exercisePicker.dates[0]
    );
    const endTime = formatDateForQueryParameter(store.exercisePicker.dates[1]);

    await receiptsStore.fetchFiltered(
      startTime,
      endTime,
      filter.value.supplierId
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
  const supplier = suppliersStore.suppliers?.find((s) => s.id === id);
  if (supplier) return supplier.comercialName;
  else return "";
};
const getStatusNameById = (id: string) => {
  const lifecycle = sharedDataStore.lifecycles?.find(
    (s) => s.name === "Receipts"
  );
  if (lifecycle) {
    const status = lifecycle.statuses.find((s) => s.id === id);
    if (status) return status.name;
  }
  return "";
};
const createButtonClick = () => {
  createRequest.value = generateNewRequest();
  dialogOptions.visible = true;
};
const createRequest = ref({} as CreateReceiptRequest);
const generateNewRequest = (): CreateReceiptRequest => {
  return {
    id: getNewUuid(),
    supplierId: "",
    exerciseId: "",
    date: new Date(),
  };
};
const createReceipt = async () => {
  const created = await receiptsStore.createReceipt(createRequest.value);
  if (created) router.push({ path: `/receipts/${createRequest.value.id}` });
};

const editReceipt = (row: DataTableRowClickEvent) => {
  if (
    !(row.originalEvent.target as any).className.includes(
      "grid_delete_column_button"
    )
  ) {
    router.push({ path: `/receipts/${row.data.id}` });
  }
};

const deleteReceipt = (event: any, invoice: PurchaseInvoice) => {
  confirm.require({
    target: event.currentTarget,
    message: `Està segur que vol eliminar l'albarà ${invoice.number}?`,
    icon: "pi pi-question-circle",
    acceptIcon: "pi pi-check",
    rejectIcon: "pi pi-times",
    accept: async () => {
      const deleted = await receiptsStore.deleteReceipt(invoice.id);
      if (deleted) {
        toast.add({
          severity: "success",
          summary: "Eliminat",
          life: 3000,
        });
        await filterReceipts();
      }
    },
  });
};
</script>
