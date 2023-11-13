<template>
  <Button
    label="Guardar"
    class="grid_add_row_button"
    :size="'small'"
    @click="submitForm"
  />

  <FormDeliveryNote
    v-if="deliveryNote"
    class="mt-3 mb-3"
    ref="deliveryNoteForm"
    :deliveryNote="deliveryNote"
    @submit="onDeliveryNoteSubmit"
  />

  <TableDeliveryNoteDetails
    v-if="deliveryNote"
    :orders="salesOrderStore.salesOrders"
    :canDelete="true"
    @delete="deleteSalesOrder"
  >
    <template #header>
      <div
        class="flex flex-wrap align-items-center justify-content-between gap-2"
      >
        <span class="text-l text-900 font-bold">Linies de l'albarà</span>
        <div>
          <Button
            :size="'small'"
            label="Afegir comanda"
            @click="openSalesOrderSelector()"
          />
        </div>
      </div>
    </template>
  </TableDeliveryNoteDetails>

  <Dialog
    :closable="true"
    v-model:visible="isDialogVisible"
    :header="dialogTitle"
    :modal="true"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <SelectorOrders
      :orders="salesOrderStore.salesOrdersToDeliver"
      @selected="addSalesOrdersToDeliveryNote"
    />
  </Dialog>
</template>
<script setup lang="ts">
import SelectorOrders from "../components/SelectorOrders.vue";
import FormDeliveryNote from "../components/FormDeliveryNote.vue";
import TableDeliveryNoteDetails from "../components/TableDeliveryNoteDetails.vue";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { PrimeIcons } from "primevue/api";
import { useStore } from "../../../store";
import { useToast } from "primevue/usetoast";
import { FormActionMode } from "../../../types/component";
import { useReferenceStore } from "../../shared/store/reference";
import { useCustomersStore } from "../store/customers";
import { usePlantModelStore } from "../../production/store/plantmodel";
import { useDeliveryNoteStore } from "../store/deliveryNote";
import { DeliveryNote, DeliveryNoteDetail, SalesOrderHeader } from "../types";
import { formatDate } from "../../../utils/functions";
import { useSalesOrderStore } from "../store/salesOrder";

const deliveryNoteForm = ref();

const formMode = ref(FormActionMode.EDIT);
const route = useRoute();
const router = useRouter();
const store = useStore();
const deliveryNoteStore = useDeliveryNoteStore();
const salesOrderStore = useSalesOrderStore();
const customerStore = useCustomersStore();
const plantModelStore = usePlantModelStore();
const referenceStore = useReferenceStore();
const { deliveryNote } = storeToRefs(deliveryNoteStore);

const dialogTitle = "Selector de comandes";
const isDialogVisible = ref(false);

const loadView = async () => {
  const id = route.params.id as string;
  await deliveryNoteStore.GetById(id);
  await salesOrderStore.GetByDeliveryNote(id);
  referenceStore.fetchReferencesByModule("sales");
  plantModelStore.fetchSites();
  customerStore.fetchCustomers();

  let pageTitle = "";
  if (deliveryNote.value) {
    formMode.value = FormActionMode.EDIT;
    pageTitle = `Albará d'entrega ${deliveryNote.value.number}`;

    if (deliveryNote.value.deliveryDate) {
      deliveryNote.value.deliveryDate = formatDate(
        deliveryNote.value.deliveryDate
      );
    }
  }

  store.setMenuItem({
    icon: PrimeIcons.BUILDING,
    backButtonVisible: true,
    title: pageTitle,
  });
};

onMounted(async () => {
  await loadView();
});

const submitForm = () => {
  const form = deliveryNoteForm.value as any;
  form.submitForm();
};

const toast = useToast();

const onDeliveryNoteSubmit = async (deliveryNote: DeliveryNote) => {
  let result = false;
  let message = "";

  result = await deliveryNoteStore.Update(deliveryNote.id, deliveryNote);
  message = result ? "Albarà actualitzat" : "Error al actualitzar l'albarà";

  toast.add({
    life: 5000,
    severity: result ? "success" : "error",
    summary: message,
  });

  if (result) {
    router.back();
  }
};

const openSalesOrderSelector = async () => {
  if (deliveryNote.value)
    await salesOrderStore.GetToDeliver(deliveryNote.value.customerId);

  isDialogVisible.value = true;
};

const deleteSalesOrder = async (order: SalesOrderHeader) => {
  await deliveryNoteStore.DeleteOrder(deliveryNote.value!.id, order);
  loadView();
};

const addSalesOrdersToDeliveryNote = async (
  orders: Array<SalesOrderHeader>
) => {
  for (let index = 0; index < orders.length; index++) {
    const order = orders[index];
    await deliveryNoteStore.AddOrder(deliveryNote.value!.id, order);
  }

  isDialogVisible.value = false;
  loadView();
};
</script>
