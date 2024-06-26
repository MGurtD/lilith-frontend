<template>
  <Button label="Guardar" class="grid_add_row_button" @click="submitForm" />
  <TabView>
    <TabPanel header="Factura" v-if="purchaseInvoice">
      <FormPurchaseInvoice
        ref="purchaseInvoiceForm"
        :purchaseInvoice="purchaseInvoice"
        @submit="onInvoiceSubmit"
      />
      <TabView>
        <TabPanel header="Imports">
          <TablePurchaseInvoiceImports
            :purchase-invoice-imports="purchaseInvoice.purchaseInvoiceImports"
            @add="(imp: PurchaseInvoiceImport) => openInvoiceImportForm(FormActionMode.CREATE, imp)"
            @edit="(imp: PurchaseInvoiceImport) => openInvoiceImportForm(FormActionMode.EDIT, imp)"
            @delete="deleteInvoiceImport"
          />
        </TabPanel>
        <TabPanel header="Venciments">
          <DataTable
            :value="purchaseInvoice.purchaseInvoiceDueDates"
            tableStyle="min-width: 100%"
            scrollable
            scrollHeight="40vh"
            sortField="dueDate"
            :sortOrder="1"
          >
            <Column
              field="dueDate"
              header="Venciment"
              style="width: 50%"
              sortable
            >
              <template #body="slotProps">
                {{ formatDate(slotProps.data.dueDate) }}
              </template>
            </Column>
            <Column field="amount" header="Import" style="width: 50%">
              <template #body="slotProps">
                {{ slotProps.data.amount }} €
              </template>
            </Column>
          </DataTable>
        </TabPanel>
        <TabPanel header="Albarans">
          <TableReceipts
            :receipts="receiptsStore.receipts"
            @add="onReceiptAdd"
            @delete="onReceiptDelete"
          />
        </TabPanel>
      </TabView>
    </TabPanel>
    <TabPanel header="Fitxers">
      <FileEntityPicker
        v-if="purchaseInvoice"
        title="Factures"
        entity="PurchaseInvoice"
        :id="(route.params.id as string)"
      />
    </TabPanel>
  </TabView>

  <Dialog
    :closable="true"
    v-model:visible="isDialogVisible"
    :header="dialogTitle"
    position="bottom"
    :style="{ width: '40rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    @after-hide="afterDialogHide"
  >
    <FormPurchaseInvoiceImport
      v-if="selectedInvoiceImport"
      :formAction="formInvoiceMode"
      :invoiceImport="selectedInvoiceImport"
      @submit="onInvoiceImportSubmit"
    />
    <SelectorReceipts
      v-if="receiptsStore.selectorReceipts"
      :receipts="receiptsStore.selectorReceipts"
      @selected="onReceiptsSelected"
    />
  </Dialog>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "../../../store";
import { usePurchaseInvoiceStore } from "../store/purchaseInvoices";
import { storeToRefs } from "pinia";
import { PrimeIcons } from "primevue/api";
import { PurchaseInvoice, PurchaseInvoiceImport, Receipt } from "../types";
import { FormActionMode } from "../../../types/component";
import {
  convertDateTimeToJSON,
  formatDate,
  getNewUuid,
} from "../../../utils/functions";
import FileEntityPicker from "../../../components/FileEntityPicker.vue";
import FormPurchaseInvoice from "../components/FormPurchaseInvoice.vue";
import FormPurchaseInvoiceImport from "../components/FormPurchaseInvoiceImport.vue";
import TablePurchaseInvoiceImports from "../components/TablePurchaseInvoiceImports.vue";
import TableReceipts from "../components/TableReceipts.vue";
import SelectorReceipts from "../components/SelectorReceipts.vue";
import { usePurchaseMasterDataStore } from "../store/purchase";
import { useToast } from "primevue/usetoast";
import { useLifecyclesStore } from "../../shared/store/lifecycle";
import { useReceiptsStore } from "../store/receipt";

const purchaseInvoiceForm = ref();

const formMode = ref(FormActionMode.EDIT);
const route = useRoute();
const router = useRouter();
const store = useStore();
const lifecycleStore = useLifecyclesStore();
const purchaseMasterDataStore = usePurchaseMasterDataStore();
const purchaseInvoiceStore = usePurchaseInvoiceStore();
const receiptsStore = useReceiptsStore();
const { purchaseInvoice } = storeToRefs(purchaseInvoiceStore);

const dialogTitle = computed(() => {
  if (receiptsStore.selectorReceipts) {
    return "Selecció albarans";
  } else {
    return formInvoiceMode.value === FormActionMode.CREATE
      ? "Introducció import"
      : "Modificació import";
  }
});
const isDialogVisible = ref(false);
const formInvoiceMode = ref(FormActionMode.EDIT);
const selectedInvoiceImport = ref(
  undefined as undefined | PurchaseInvoiceImport
);

const loadView = async () => {
  const invoiceId = route.params.id as string;
  let pageTitle = "";

  await purchaseInvoiceStore.GetById(invoiceId);

  if (!purchaseInvoice.value) {
    formMode.value = FormActionMode.CREATE;
    purchaseInvoiceStore.setNewPurchaseInvoice(invoiceId);
    pageTitle = "Alta de factures de compra";

    setDefaultValues();
  } else {
    formMode.value = FormActionMode.EDIT;
    pageTitle = `Factura de compra: ${purchaseInvoice.value.number}`;

    purchaseInvoice.value.purchaseInvoiceDate = new Date(
      purchaseInvoice.value.purchaseInvoiceDate
    );
  }
  // Get associated receipts
  receiptsStore.fetchByInvoice(invoiceId);

  store.setMenuItem({
    icon: PrimeIcons.POUND,
    backButtonVisible: true,
    title: pageTitle,
  });
};

const setDefaultValues = () => {
  if (purchaseInvoice.value) {
    const currentExercice = purchaseMasterDataStore.masterData.exercises?.find(
      (e) => e.name === new Date().getFullYear().toString()
    );
    if (currentExercice) purchaseInvoice.value.exerciceId = currentExercice.id;

    const serie = purchaseMasterDataStore.masterData.series?.find(
      (s) => s.name === "Nacional"
    );
    if (serie) purchaseInvoice.value.purchaseInvoiceSerieId = serie.id;

    const status = lifecycleStore.lifecycle?.statuses?.find(
      (s) => s.name === "Nova"
    );
    if (status) purchaseInvoice.value.statusId = status.id;
  }
};

onMounted(async () => {
  await loadView();
});

const submitForm = () => {
  const form = purchaseInvoiceForm.value as any;
  form.submitForm();
};

// Invoice imports
const openInvoiceImportForm = (
  formMode: FormActionMode,
  invoiceImport: PurchaseInvoiceImport
) => {
  if (formMode === FormActionMode.CREATE) {
    invoiceImport.id = getNewUuid();
  }

  invoiceImport.purchaseInvoiceId = purchaseInvoice.value!.id;
  selectedInvoiceImport.value = invoiceImport;
  formInvoiceMode.value = formMode;
  isDialogVisible.value = true;
};

const toast = useToast();
const onInvoiceSubmit = async (invoice: PurchaseInvoice) => {
  let result = false;
  let message = "";

  invoice.purchaseInvoiceDate = convertDateTimeToJSON(
    invoice.purchaseInvoiceDate
  );

  if (formMode.value === FormActionMode.CREATE) {
    result = await purchaseInvoiceStore.Create(invoice);
    message = result ? "Factura creada" : "Error al crear la factura";
  } else {
    result = await purchaseInvoiceStore.Update(invoice);
    message = result ? "Factura actualizada" : "Error al actualizar la factura";
  }

  toast.add({
    life: 5000,
    severity: result ? "success" : "error",
    summary: message,
  });

  if (result) {
    router.back();
  }
};

const onInvoiceImportSubmit = async (invoiceImport: PurchaseInvoiceImport) => {
  // When is a new record, work in memory to send a composed object to the backend
  if (formInvoiceMode.value === FormActionMode.CREATE) {
    if (formMode.value === FormActionMode.EDIT) {
      await purchaseInvoiceStore.CreateInvoiceImport(invoiceImport);
    }

    purchaseInvoice.value?.purchaseInvoiceImports.push(invoiceImport);
  } else if (formInvoiceMode.value === FormActionMode.EDIT) {
    if (formMode.value === FormActionMode.EDIT) {
      await purchaseInvoiceStore.UpdateInvoiceImport(invoiceImport);
    }
  }

  closeDialogAndCalcAmounts();
};

const deleteInvoiceImport = async (invoiceImport: PurchaseInvoiceImport) => {
  if (formMode.value === FormActionMode.EDIT) {
    await purchaseInvoiceStore.DeleteInvoiceImport(invoiceImport);
  }

  const afterImports = purchaseInvoice.value!.purchaseInvoiceImports.filter(
    (i) => i.id !== invoiceImport.id
  );
  purchaseInvoice.value!.purchaseInvoiceImports = afterImports;

  closeDialogAndCalcAmounts();
};

const closeDialogAndCalcAmounts = () => {
  const form = purchaseInvoiceForm.value as any;
  form.calcAmounts();
  isDialogVisible.value = false;
};

const onReceiptAdd = async () => {
  if (!purchaseInvoice.value) return;

  await receiptsStore.fetchInvoiceableBySupplier(
    purchaseInvoice.value.supplierId
  );
  isDialogVisible.value = true;
};

const afterDialogHide = () => {
  selectedInvoiceImport.value = undefined;
  receiptsStore.selectorReceipts = undefined;
};

const onReceiptsSelected = async (receipts: Array<Receipt>) => {
  console.log("onReceiptsSelected", receipts);
  const promises = [] as Array<Promise<any>>;

  for (let i = 0; i < receipts.length; i++) {
    promises.push(
      receiptsStore.associateInvoice(receipts[i], purchaseInvoice.value!.id)
    );
  }

  await Promise.all(promises);
  await receiptsStore.fetchByInvoice(purchaseInvoice.value!.id);

  isDialogVisible.value = false;
  receiptsStore.selectorReceipts = undefined;
};

const onReceiptDelete = async (receipt: Receipt) => {
  receipt.purchaseInvoiceId = null;
  await receiptsStore.unassociateInvoice(receipt, purchaseInvoice.value!.id);
  await receiptsStore.fetchByInvoice(purchaseInvoice.value!.id);
};
</script>
