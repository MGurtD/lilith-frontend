<template>
  <SplitButton
    label="Guardar"
    @click="updateInvoice"
    :model="items"
    :size="'small'"
    class="grid_add_row_button"
  />
  <main v-if="invoice">
    <FormSalesInvoice class="mt-3 mr-3" :invoice="invoice" />

    <TableInvoiceDetails
      class="mt-3"
      :canDelete="true"
      :details="invoice.salesInvoiceDetails"
      :deliveryNotes="deliveryNoteStore.deliveryNotes"
      @deleteDeliveryNote="deleteDeliveryNote"
      @delete="deleteInvoiceDetail"
    >
      <template #header>
        <div
          class="flex flex-wrap align-items-center justify-content-between gap-2"
        >
          <span class="text-xl text-900 font-bold">Detall de la factura</span>
          <div>
            <Button
              :size="'small'"
              label="Afegir albarà"
              @click="openDeliveryNoteSelector"
            />
            &nbsp;&nbsp;
            <Button
              :size="'small'"
              label="Afegir linia lliure"
              @click="openAddDetail"
            />
          </div>
        </div>
      </template>
    </TableInvoiceDetails>
  </main>

  <Dialog
    v-model:visible="dialogOptions.visible"
    :header="dialogOptions.title"
    :closable="dialogOptions.closable"
    :modal="dialogOptions.modal"
    :style="{ width: currentDialogType === dialogType.Free ? '50vw' : '60vw' }"
    :maximizable="currentDialogType === dialogType.FromDeliveryNote"
  >
    <FormSalesInvoiceDetail
      v-if="currentDialogType === dialogType.Free"
      :invoiceDetail="currentInvoiceDetail"
      @submit="createInvoiceDetail"
    />
    <SelectorDeliveryNotes
      v-if="currentDialogType === dialogType.FromDeliveryNote"
      :headerVisible="true"
      :deliveryNotes="deliveryNoteStore.invoiceableDeliveryNotes"
      @selected="addDeliveryNotes"
    >
      <template #header> </template>
    </SelectorDeliveryNotes>
  </Dialog>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useStore } from "../../../store";
import { useSalesInvoiceStore } from "../store/invoice";
import { useCustomersStore } from "../store/customers";
import { useSharedDataStore } from "../../shared/store/masterData";
import { useLifecyclesStore } from "../../shared/store/lifecycle";
import { PrimeIcons } from "primevue/api";
import { formatDate } from "../../../utils/functions";
import { DeliveryNote, SalesInvoiceDetail } from "../types";
import { DialogOptions } from "../../../types/component";
import SplitButton from "primevue/splitbutton";
import FormSalesInvoice from "../components/FormSalesInvoice.vue";
import TableInvoiceDetails from "../components/TableInvoiceDetails.vue";
import FormSalesInvoiceDetail from "../components/FormSalesInvoiceDetail.vue";
import SelectorDeliveryNotes from "../components/SelectorDeliveryNotes.vue";
import { useDeliveryNoteStore } from "../store/deliveryNote";

const items = [
  {
    label: "Generar factura",
    icon: PrimeIcons.FILE_PDF,
    command: () => printInvoice(),
  },
];

const route = useRoute();
const router = useRouter();
const store = useStore();
const sharedData = useSharedDataStore();
const customersStore = useCustomersStore();
const lifecycleStore = useLifecyclesStore();
const invoiceStore = useSalesInvoiceStore();
const deliveryNoteStore = useDeliveryNoteStore();
const { invoice } = storeToRefs(invoiceStore);

const dialogType = {
  Free: 0,
  FromDeliveryNote: 1,
};
const currentDialogType = ref(0);
const dialogOptions = reactive({
  visible: false,
  title: "",
  closable: true,
  position: "center",
  modal: true,
} as DialogOptions);
const invoiceId = ref("");

onMounted(async () => {
  invoiceId.value = route.params.id as string;

  sharedData.fetchMasterData();
  customersStore.fetchCustomers();
  await loadView();

  store.setMenuItem({
    icon: PrimeIcons.WALLET,
    title: `Factura de venta ${invoice.value!.invoiceNumber} - ${
      invoice.value!.customerComercialName
    }`,
    backButtonVisible: true,
  });
});

const loadView = async () => {
  lifecycleStore.fetchOneByName("SalesInvoice");

  await invoiceStore.GetById(invoiceId.value);
  await deliveryNoteStore.GetByInvoiceId(invoiceId.value);

  if (invoice.value) {
    invoice.value!.invoiceDate = formatDate(invoice.value.invoiceDate);
  }
};

const updateInvoice = async () => {
  const updated = await invoiceStore.Update(invoice.value!);
  if (updated) {
    router.back();
  }
};

// Report print
const printInvoice = () => {};

// Invoice details
const openDeliveryNoteSelector = async () => {
  if (invoice.value) {
    await deliveryNoteStore.GetToInvoice(invoice.value.customerId);

    currentDialogType.value = dialogType.FromDeliveryNote;
    dialogOptions.title = "Selector d'albarans d'entrega";
    dialogOptions.visible = true;
  }
};
const addDeliveryNotes = async (deliveryNotes: Array<DeliveryNote>) => {
  for (let index = 0; index < deliveryNotes.length; index++) {
    const deliveryNote = deliveryNotes[index];
    await invoiceStore.AddDeliveryNote(invoice.value!.id, deliveryNote);
  }

  dialogOptions.visible = false;

  loadView();
};
const deleteDeliveryNote = async (deliveryNote: DeliveryNote) => {
  await invoiceStore.RemoveDeliveryNote(invoice.value!.id, deliveryNote);

  loadView();
};

const currentInvoiceDetail = reactive({} as SalesInvoiceDetail);
const openAddDetail = () => {
  currentDialogType.value = dialogType.Free;
  if (invoice.value) {
    currentInvoiceDetail.salesInvoiceId = invoice.value.id;
    currentInvoiceDetail.quantity = 1;
    currentInvoiceDetail.description = "";
    currentInvoiceDetail.totalCost = 0;

    const tax = sharedData.taxes?.find((t) => t.percentatge === 21);
    if (tax) currentInvoiceDetail.taxId = tax.id;

    dialogOptions.title = "Introducció de línea lliure";
    dialogOptions.visible = true;
  }
};
const createInvoiceDetail = async () => {
  const response = await invoiceStore.CreateInvoiceDetail(currentInvoiceDetail);
  dialogOptions.visible = false;
};
const deleteInvoiceDetail = async (detail: SalesInvoiceDetail) => {
  await invoiceStore.DeleteInvoiceDetail(detail);
  invoiceStore.invoice!.invoiceDate = formatDate(
    invoiceStore.invoice!.invoiceDate
  );
};
</script>
