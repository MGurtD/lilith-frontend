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


  const toast = useToast();
  const submitForm = async () => {
    const data = purchaseInvoice.value as PurchaseInvoice;
    let result = false;
    let message = "";
  
 
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