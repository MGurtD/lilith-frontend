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
      :header-visible="true"
      :details="invoice.salesInvoiceDetails"
      @edit="editInvoiceDetail"
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
              label="Afegir de comanda"
              @click="openAddFromOrderDetails"
            />
            &nbsp;&nbsp;
            <Button
              :size="'small'"
              label="Crear linia lliure"
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
    :maximizable="currentDialogType === dialogType.FromOrder"
  >
    <FormSalesInvoiceDetail
      v-if="currentDialogType === dialogType.Free"
      :invoiceDetail="currentInvoiceDetail"
      @submit="createInvoiceDetail"
    />
    <SelectorOrderDetails
      v-if="currentDialogType === dialogType.FromOrder"
      :headerVisible="true"
      :details="customerSelectableOrderDetails"
      @selected="createInvoiceDetailsFromOrder"
    >
      <template #header> </template>
    </SelectorOrderDetails>
  </Dialog>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useStore } from "../../../store";
import { useSalesInvoiceStore } from "../store/invoice";
import { useCustomersStore } from "../store/customers";
import { useSharedDataStore } from "../../shared/store/masterData";
import { useLifecyclesStore } from "../../shared/store/lifecycle";
import { PrimeIcons } from "primevue/api";
import { formatDate, getNewUuid } from "../../../utils/functions";
import {
  CreateInvoiceDetailsFromOrderDetailsRequest,
  InvoiceableOrderDetail,
  SalesInvoice,
  SalesInvoiceDetail,
  SalesOrderDetail,
} from "../types";
import { DialogOptions } from "../../../types/component";
import SplitButton from "primevue/splitbutton";
import FormSalesInvoice from "../components/FormSalesInvoice.vue";
import TableInvoiceDetails from "../components/TableInvoiceDetails.vue";
import FormSalesInvoiceDetail from "../components/FormSalesInvoiceDetail.vue";
import SelectorOrderDetails from "../components/SelectorOrderDetails.vue";
import services from "../services";

const items = [
  {
    label: "Generar factura",
    icon: PrimeIcons.FILE_PDF,
    command: () => printInvoice(),
  },
];
const printInvoice = () => {};

const toast = useToast();
const confirm = useConfirm();
const route = useRoute();
const router = useRouter();
const store = useStore();
const sharedData = useSharedDataStore();
const customersStore = useCustomersStore();
const lifecycleStore = useLifecyclesStore();
const invoiceStore = useSalesInvoiceStore();
const { invoice } = storeToRefs(invoiceStore);

const dialogType = {
  Free: 0,
  FromOrder: 1,
};
const currentDialogType = ref(0);
const dialogOptions = reactive({
  visible: false,
  title: "",
  closable: true,
  position: "center",
  modal: true,
} as DialogOptions);

onMounted(async () => {
  sharedData.fetchMasterData();
  customersStore.fetchCustomers();
  lifecycleStore.fetchOneByName("SalesInvoice");
  await invoiceStore.GetById(route.params.id as string);
  invoiceStore.invoice!.invoiceDate = formatDate(
    invoiceStore.invoice!.invoiceDate
  );

  store.setMenuItem({
    icon: PrimeIcons.WALLET,
    title: `Factura de venta ${invoiceStore.invoice?.invoiceNumber} - ${invoiceStore.invoice?.customerComercialName}`,
    backButtonVisible: true,
  });
});

const updateInvoice = async () => {
  const updated = await invoiceStore.Update(invoice.value!);
  if (updated) {
    toast.add({
      summary: "Factura de venta",
      detail: "Actualizada correctament",
      life: 5000,
    });

    router.back();
  }
};

const customerSelectableOrderDetails = ref(
  [] as Array<InvoiceableOrderDetail> | undefined
);
const createInvoiceDetailsRequest = reactive(
  {} as CreateInvoiceDetailsFromOrderDetailsRequest
);
const openAddFromOrderDetails = async () => {
  if (invoice.value) {
    customerSelectableOrderDetails.value =
      await services.SalesInvoice.GetInvoiceableOrderDetails(
        invoice.value!.customerId
      );

    createInvoiceDetailsRequest.invoiceId = invoice.value.id;

    currentDialogType.value = dialogType.FromOrder;
    dialogOptions.title = "Selecció de linees de comanda";
    dialogOptions.visible = true;
  }
};
const createInvoiceDetailsFromOrder = async (
  selectedOrderDetails: Array<SalesOrderDetail>
) => {
  createInvoiceDetailsRequest.orderDetails = selectedOrderDetails;
  const created = await invoiceStore.CreateInvoiceDetailsFromOrderDetails(
    createInvoiceDetailsRequest
  );
  if (created) await invoiceStore.GetById(route.params.id as string);
  dialogOptions.visible = false;
};

const currentInvoiceDetail = reactive({} as SalesInvoiceDetail);
const openAddDetail = () => {
  currentDialogType.value = dialogType.Free;
  if (invoice.value) {
    currentInvoiceDetail.salesInvoiceId = invoice.value.id;
    currentInvoiceDetail.quantity = 1;
    currentInvoiceDetail.description = "";
    currentInvoiceDetail.totalCost = 0;

    const tax = sharedData.taxes?.find((t) => t.name.includes("0"));
    if (tax) currentInvoiceDetail.taxId = tax.id;

    dialogOptions.title = "Introducció de línea lliure";
    dialogOptions.visible = true;
  }
};
const createInvoiceDetail = async () => {
  await invoiceStore.CreateInvoiceDetail(currentInvoiceDetail);
  dialogOptions.visible = false;
  invoiceStore.invoice!.invoiceDate = formatDate(
    invoiceStore.invoice!.invoiceDate
  );
};

const editInvoiceDetail = async (detail: SalesInvoiceDetail) => {
  await invoiceStore.UpdateInvoiceDetail(detail);
};

const deleteInvoiceDetail = async (detail: SalesInvoiceDetail) => {
  confirm.require({
    message: `Està segur que vol eliminar la línea ${detail.description}?`,
    icon: "pi pi-question-circle",
    acceptIcon: "pi pi-check",
    rejectIcon: "pi pi-times",
    accept: async () => {
      await invoiceStore.DeleteInvoiceDetail(detail);
      invoiceStore.invoice!.invoiceDate = formatDate(
        invoiceStore.invoice!.invoiceDate
      );
    },
  });
};
</script>