<template>
  <FormPurchaseInvoiceStatus
    v-if="purchaseInvoiceStatus"
    :purchaseInvoiceStatus="purchaseInvoiceStatus"
    @submit="submitForm"
  />
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { PrimeIcons } from "primevue/api";

import { useStore } from "../../../store";
import { usePurchaseStore } from "../store/invoices";
import { storeToRefs } from "pinia";

import { useToast } from "primevue/usetoast";
import { FormActionMode } from "../../../types/component";
import router from "../../../router";
import FormPurchaseInvoiceStatus from "../components/FormPurchaseInvoiceStatus.vue";
import { PurchaseInvoiceStatus } from "../types";

const formMode = ref(FormActionMode.EDIT);
const route = useRoute();
const store = useStore();
const purchaseInvoiceStatusStore = usePurchaseStore();
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
</script>
