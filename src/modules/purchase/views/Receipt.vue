<template>
  <FormReceipt @submit="submitForm" />
</template>
<script setup lang="ts">
import FormReceipt from "../components/FormReceipt.vue";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { PrimeIcons } from "primevue/api";
import { useToast } from "primevue/usetoast";
import { useRoute } from "vue-router";
import { ReceiptDetail } from "../types";
import { useStore } from "../../../store";
import { useReceiptsStore } from "../store/receipt";
import { GenericResponse } from "../../../types";

const route = useRoute();
const store = useStore();
const receiptStore = useReceiptsStore();
const { receipt } = storeToRefs(receiptStore);

const loadView = async () => {
  await receiptStore.fetchReceipt(route.params.id as string);

  store.setMenuItem({
    icon: PrimeIcons.BUILDING,
    title: `Albarà de compra ${receipt.value?.number}`,
    backButtonVisible: true,
  });
};

onMounted(async () => {
  await loadView();
});

const toast = useToast();
const submitForm = async () => {
  let result = false;
  let message = "";
  if (receipt.value) {
    result = await receiptStore.updateReceipt(receipt.value.id, receipt.value);
    message = "Albarà actualizat correctament";

    if (result) {
      toast.add({
        severity: "success",
        summary: message,
        life: 5000,
      });
      await loadView();
    }
  }
};

const addDetail = async (detail: ReceiptDetail) => {
  const response = await receiptStore.createReceiptDetail(detail);
  if (!response.result) showResponseErrorToast(response);
};

const editContact = async (detail: ReceiptDetail) => {
  const response = await receiptStore.updateReceiptDetail(detail.id, detail);
  if (!response.result) showResponseErrorToast(response);
};

const removeContact = async (detail: ReceiptDetail) => {
  const response = await receiptStore.deleteReceiptDetail(detail.id);
  if (!response.result) showResponseErrorToast(response);
};

const showResponseErrorToast = (response: GenericResponse<ReceiptDetail>) => {
  toast.add({
    severity: "error",
    summary: response.errors[0],
    life: 10000,
  });
};
</script>
