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
              <ExerciseDatePicker
                :exercises="puchaseMasterDataStore.masterData.exercises"
                @range-selected="filterInvoices"
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
              class="datatable-button mr-2"
              :icon="PrimeIcons.FILTER"
              rounded
              raised
              @click="filterInvoices"
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
      <Column
        header="Data"
        field="purchaseInvoiceDate"
        sortable
        style="width: 10%"
      >
        <template #body="slotProps">
          {{ formatDate(slotProps.data.purchaseInvoiceDate) }}
        </template>
      </Column>
      <Column header="Proveïdor" style="width: 15%">
        <template #body="slotProps">
          {{ getSupplierNameById(slotProps.data.supplierId) }}
        </template>
      </Column>
      <Column
        header="Núm. Fra. Proveïdor"
        style="width: 15%"
        field="supplierNumber"
      ></Column>
      <Column header="Estat" style="width: 15%">
        <template #body="slotProps">
          {{ getStatusNameById(slotProps.data.purchaseInvoiceStatusId) }}
        </template>
      </Column>
      <Column header="Venciment" style="width: 10%">
        <template #body="slotProps">
          {{ getLastDueDate(slotProps.data) }}
        </template>
      </Column>
      <Column header="Import" style="width: 10%">
        <template #body="slotProps">
          {{ slotProps.data.netAmount }} €
        </template>
      </Column>
      <Column style="width: 5%">
        <template #body="slotProps">
          <i
            v-if="
              getStatusNameById(slotProps.data.purchaseInvoiceStatusId) ===
              'Nova'
            "
            :class="PrimeIcons.TIMES"
            class="grid_delete_column_button"
            @click="deletePurchaseInvoice($event, slotProps.data)"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script setup lang="ts">
import ExerciseDatePicker from "../../../components/ExerciseDatePicker.vue";
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
import { Exercise } from "../../shared/types";

const toast = useToast();
const confirm = useConfirm();
const router = useRouter();
const store = useStore();
const puchaseMasterDataStore = usePurchaseMasterDataStore();
const purchaseInvoiceStore = usePurchaseInvoiceStore();

const filter = ref({
  supplierId: undefined as string | undefined,
  exercise: undefined as Exercise | undefined,
});

onMounted(async () => {
  store.setMenuItem({
    icon: PrimeIcons.MONEY_BILL,
    title: "Factures de compra",
  });

  await puchaseMasterDataStore.fetchMasterData();
  setCurrentYear();

  await filterInvoices();
});

const setCurrentYear = () => {
  const year = new Date().getFullYear().toString();
  const currentExercise = puchaseMasterDataStore.masterData.exercises?.find(
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

const filterLocalStorageKey = "temges.purchaseinvoice.filter";
const filterInvoices = async () => {
  if (store.exercisePicker.dates) {
    const startTime = formatDateForQueryParameter(
      store.exercisePicker.dates[0]
    );
    const endTime = formatDateForQueryParameter(store.exercisePicker.dates[1]);

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
  if (
    !(row.originalEvent.target as any).className.includes(
      "grid_delete_column_button"
    )
  ) {
    router.push({ path: `/purchaseinvoice/${row.data.id}` });
  }
};

const deletePurchaseInvoice = (event: any, invoice: PurchaseInvoice) => {
  confirm.require({
    target: event.currentTarget,
    message: `Està segur que vol eliminar la factura ${invoice.number}?`,
    icon: "pi pi-question-circle",
    acceptIcon: "pi pi-check",
    rejectIcon: "pi pi-times",
    accept: async () => {
      const deleted = await purchaseInvoiceStore.Delete(invoice.id);
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
