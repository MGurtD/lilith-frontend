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

    <TabView>
      <TabPanel header="Linies">
        <TableInvoiceDetails
          :header-visible="true"
          :details="invoice.salesInvoiceDetails"
          @edit="onEditInvoiceDetail"
          @delete="onDeleteInvoiceDetail"
        >
          <template #header>
            <Button :size="'small'" label="Afegir de comanda" /> &nbsp;&nbsp;
            <Button :size="'small'" label="Crear linia lliure" />
          </template>
        </TableInvoiceDetails>
      </TabPanel>
      <TabPanel header="Facturació"> </TabPanel>
    </TabView>
  </main>

  <Dialog
    v-model:visible="dialogOptions.visible"
    :header="dialogOptions.title"
    :closable="dialogOptions.closable"
    :modal="dialogOptions.modal"
  >
    <form>
      <footer class="mt-2">
        <Button
          label="Crear"
          @click="createInvoiceDetailsFromOrder"
          style="float: right"
        />
      </footer>
    </form>
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
  SalesInvoice,
  SalesInvoiceDetail,
} from "../types";
import { DialogOptions } from "../../../types/component";
import SplitButton from "primevue/splitbutton";
import FormSalesInvoice from "../components/FormSalesInvoice.vue";
import TableInvoiceDetails from "../components/TableInvoiceDetails.vue";

const items = [
  {
    label: "Generar factura",
    icon: PrimeIcons.FILE_PDF,
    command: () => printInvoice(),
  },
];
const printInvoice = () => {
  console.log(invoice.value);
};

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

const createInvoiceDetailsRequest = reactive(
  {} as CreateInvoiceDetailsFromOrderDetailsRequest
);

const createButtonClick = () => {
  if (invoiceStore.invoice) {
    createInvoiceDetailsRequest.invoiceId = invoiceStore.invoice.id;
    createInvoiceDetailsRequest.orderDetails = [];

    dialogOptions.title = "Selecció de linees de comanda";
    dialogOptions.visible = true;
  }
};

const createInvoiceDetailsFromOrder = async () => {
  const created = await invoiceStore.CreateInvoiceDetailsFromOrderDetails(
    createInvoiceDetailsRequest
  );
  if (created) {
    await invoiceStore.GetById(route.params.id as string);
  }
};

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

const onEditInvoiceDetail = (detail: SalesInvoiceDetail) => {
  // TODO : Obrir dialeg per editar
};
const onDeleteInvoiceDetail = (detail: SalesInvoiceDetail) => {
  // TODO : Demanar confirmació i eliminar
};
</script>
