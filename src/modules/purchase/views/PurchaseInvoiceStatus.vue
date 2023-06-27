<template>
  <FormPurchaseInvoiceStatus
    v-if="purchaseInvoiceStatus"
    :purchaseInvoiceStatus="purchaseInvoiceStatus"
    @submit="submitForm"
  />
  <br />
  <TablePurchaseInvoiceStatusTransitions
    :purchaseInvoiceStatus="purchaseInvoiceStatus"
    @add="addTransition"
    @delete="deleteTransition"
  />
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { PrimeIcons } from "primevue/api";

import { useStore } from "../../../store";
import { usePurchaseInvoiceStatusStore } from "../store/purchaseInvoiceStatus";
import { storeToRefs } from "pinia";

import { useToast } from "primevue/usetoast";
import { FormActionMode } from "../../../types/component";
import router from "../../../router";
import TablePurchaseInvoiceStatusTransitions from "../components/TablePurchaseInvoiceStatusTransitions.vue";
import FormPurchaseInvoiceStatus from "../components/FormPurchaseInvoiceStatus.vue";
import { PurchaseInvoiceStatus, PurchaseInvoiceTransition } from "../types";

const formMode = ref(FormActionMode.EDIT);
const route = useRoute();
const store = useStore();
const purchaseInvoiceStatusStore = usePurchaseInvoiceStatusStore();
const { purchaseInvoiceStatus } = storeToRefs(purchaseInvoiceStatusStore);

const loadView = async () => {
  await purchaseInvoiceStatusStore.fetchPurchaseInvoiceStatus(
    route.params.id as string
  );

  let pageTitle = "";
  if (!purchaseInvoiceStatus.value) {
    formMode.value = FormActionMode.CREATE;
    purchaseInvoiceStatusStore.setNewPurchaseInvoiceStatus(
      route.params.id as string
    );
    pageTitle = "Alta d'estat de factura'";
  } else {
    formMode.value = FormActionMode.EDIT;
    pageTitle = `Estat de factura: ${purchaseInvoiceStatus.value.name}`;
  }

  store.setMenuItem({
    icon: PrimeIcons.POUND,
    backButtonVisible: true,
    text: pageTitle,
  });
};

onMounted(async () => {
  await loadView();
});

const toast = useToast();
const submitForm = async () => {
  const data = purchaseInvoiceStatus.value as PurchaseInvoiceStatus;
  let result = false;
  let message = "";

  if (formMode.value === FormActionMode.CREATE) {
    result = await purchaseInvoiceStatusStore.createPurchaseInvoiceStatus(data);
    message = "Estat de factura creat correctament";
  } else {
    result = await purchaseInvoiceStatusStore.updatePurchaseInvoiceStatus(
      data.id,
      data
    );
    message = "Estat de factura actualitzat correctament";
  }

  if (result) {
    toast.add({
      severity: "success",
      summary: message,
      life: 5000,
    });
    router.back();
  }
};

const addTransition = async (transition: PurchaseInvoiceTransition) => {
  console.log(transition);
  const result =
    await purchaseInvoiceStatusStore.createPurchaseInvoiceStatusTransition(
      transition
    );
  if (!result) {
    toast.add({
      severity: "error",
      detail: "Error al crear la transició",
    });
  }
};
const deleteTransition = async (transition: PurchaseInvoiceTransition) => {
  const result =
    await purchaseInvoiceStatusStore.deletePurchaseInvoiceStatusTransition(
      transition
    );
  if (!result) {
    toast.add({
      severity: "error",
      detail: "Error al eliminar la transició",
    });
  }
};
</script>
