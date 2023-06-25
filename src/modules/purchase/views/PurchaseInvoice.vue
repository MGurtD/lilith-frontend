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
  
  import { storeToRefs } from "pinia";
  import { PurchaseInvoice } from "../types"
  import { useStore } from "../../../store";
  
  import { useToast } from "primevue/usetoast";
  import { FormActionMode } from "../../../types/component";
  import router from "../../../router";
  import FormPurchaseInvoice from "../components/FormPurchaseInvoice.vue";

  import { usePurchaseStore } from "../store/invoices";

  const formMode = ref(FormActionMode.EDIT);
  const route = useRoute();
  const store = useStore();
  const purchaseStore = usePurchaseStore();
  const { purchaseInvoice } = storeToRefs(purchaseStore);

const loadView = async () => {
    //await exerciseStore.fetchOne(route.params.id as string);
  
    let pageTitle = "";
    if (!purchaseInvoice.value) {
      formMode.value = FormActionMode.CREATE;
      purchaseStore.setNewPurchaseInvoice(route.params.id as string)
      pageTitle = "Alta de factura de compra";
    } else {
      formMode.value = FormActionMode.EDIT;
      pageTitle = `Exercici ${purchaseInvoice.value.number}`;
    }
  
    store.setMenuItem({
      icon: PrimeIcons.MONEY_BILL,
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
  
    if (formMode.value === FormActionMode.CREATE){
      let res = await purchaseStore.create(data);
      if (res) {
        result = true;
      } else {
        result = false;
      }

      message = "Factura creada correctament";
    } else {
      message = "Pendent d'actualitzar";
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