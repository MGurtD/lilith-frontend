<template>
  <FormPurchaseInvoice
    v-if="purchaseInvoice"
    :purchaseInvoice="purchaseInvoice"
    @submit="submitForm"
  />
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "../../../store";
import { usePurchaseInvoiceStore } from "../store/purchaseInvoices";
import { storeToRefs } from "pinia";
import { PrimeIcons } from "primevue/api";
import { useToast } from "primevue/usetoast";
import { PurchaseInvoice } from "../types";
import { FormActionMode } from "../../../types/component";
import FormPurchaseInvoice from "../components/FormPurchaseInvoice.vue";

const formMode = ref(FormActionMode.EDIT);
const route = useRoute();
const router = useRouter();
const store = useStore();
const purchaseInvoiceStore = usePurchaseInvoiceStore();
const { purchaseInvoice } = storeToRefs(purchaseInvoiceStore);

const loadView = async () => {
  await purchaseInvoiceStore.GetById(route.params.id as string);

  let pageTitle = "";
  if (!purchaseInvoice.value) {
    formMode.value = FormActionMode.CREATE;
    purchaseInvoiceStore.setNewPurchaseInvoice(route.params.id as string);
    pageTitle = "Alta de factures de compra";
  } else {
    formMode.value = FormActionMode.EDIT;
    pageTitle = `Factura de compra: ${purchaseInvoice.value.number}`;
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
  const data = purchaseInvoice.value as PurchaseInvoice;
  let result = false;
  let message = "";

  if (formMode.value === FormActionMode.CREATE) {
    let res = await purchaseInvoiceStore.Create(data);
    if (res === true) {
      result = true;
      message = "Factura creada correctament";
    }
  } else {
    let res = await purchaseInvoiceStore.Update(data);
    if (res === true) {
      result = true;
      message = "Factura actualizada correctament";
    }
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
