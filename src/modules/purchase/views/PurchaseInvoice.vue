<template>
    <FormPurchaseInvoice 
    v-if="purchaseInvoice"
    :purchaseInvoice="purchaseInvoice"
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
import FormPurchaseInvoice from "../components/FormPurchaseInvoice.vue";

import { PurchaseInvoice } from "../types";

const formMode = ref(FormActionMode.EDIT);
const route = useRoute();
const store = useStore();
const purchaseInvoiceStore = usePurchaseStore();
const { purchaseInvoice } = storeToRefs(purchaseInvoiceStore);

const loadView = async () => {
  //await purchaseInvoiceStore(
  //  route.params.id as string
  //);

  let pageTitle = "";
  if (!purchaseInvoice.value) {
    formMode.value = FormActionMode.CREATE;
    purchaseInvoiceStore.setNewPurchaseInvoice(
      route.params.id as string
    );
    pageTitle = "Alta de factures de compra";
  } else {
    formMode.value = FormActionMode.EDIT;
    pageTitle = `Factura de compra: ${purchaseInvoice.value!.supplierNumber}`;
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
    let res = await purchaseInvoiceStore.create(data);
    if(res === true){
        result = true;
    }
    //result = await purchaseInvoiceSerieStore.createPurchaseInvoiceSerie(data);
    message = "Factura creada correctament";
  } else {
    /*result = await purchaseInvoiceSerieStore.updatePurchaseInvoiceSerie(
      data.id,
      data
    );
    message = "Sèrie de facturació actualizada correctament";*/
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