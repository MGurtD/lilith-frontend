<template>
  <FormPurchaseInvoiceSerie
    v-if="purchaseInvoiceSerie"
    :purchaseInvoiceSerie="purchaseInvoiceSerie"
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
import FormPurchaseInvoiceSerie from "../components/FormPurchaseInvoiceSerie.vue";
import { PurchaseInvoiceSerie } from "../types";

const formMode = ref(FormActionMode.EDIT);
const route = useRoute();
const store = useStore();
const purchaseInvoiceSerieStore = usePurchaseStore();
const { purchaseInvoiceSerie } = storeToRefs(purchaseInvoiceSerieStore);

const loadView = async () => {
  await purchaseInvoiceSerieStore.fetchPurchaseInvoiceSerie(
    route.params.id as string
  );

  let pageTitle = "";
  if (!purchaseInvoiceSerie.value) {
    formMode.value = FormActionMode.CREATE;
    purchaseInvoiceSerieStore.setNewPurchaseInvoiceSerie(
      route.params.id as string
    );
    pageTitle = "Alta de sèrie de facturació";
  } else {
    formMode.value = FormActionMode.EDIT;
    pageTitle = `Sèrie de facturació: ${purchaseInvoiceSerie.value.name}`;
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
  const data = purchaseInvoiceSerie.value as PurchaseInvoiceSerie;
  let result = false;
  let message = "";

  if (formMode.value === FormActionMode.CREATE) {
    result = await purchaseInvoiceSerieStore.createPurchaseInvoiceSerie(data);
    message = "Sèrie de facturació creada correctament";
  } else {
    result = await purchaseInvoiceSerieStore.updatePurchaseInvoiceSerie(
      data.id,
      data
    );
    message = "Sèrie de facturació actualizada correctament";
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
