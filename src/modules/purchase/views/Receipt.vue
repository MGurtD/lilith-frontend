<template>
  <main v-if="receipt">
    <FormReceipt @submit="submitForm" />
    <br />
    <TableReceiptDetails
      :details="receipt?.details"
      @edit="openEditDetailForm"
      @delete="removeDetail"
    >
      <template #header>
        <div
          class="flex flex-wrap align-items-center justify-content-between gap-2"
        >
          <span class="text-xl text-900 font-bold">Detall de l'albarà</span>
          <div>
            <Button
              :size="'small'"
              :icon="PrimeIcons.PLUS"
              rounded
              @click="openCreateDetailForm"
            />
          </div>
        </div>
      </template>
    </TableReceiptDetails>

    <Dialog
      v-model:visible="dialogOptions.visible"
      :header="dialogOptions.title"
      :closable="dialogOptions.closable"
      :modal="dialogOptions.modal"
    >
      <FormReceiptDetail :detail="selectedDetail" @submit="submitDetailForm" />
    </Dialog>
  </main>
  <main v-else>Carregant albarà ...</main>
</template>
<script setup lang="ts">
import FormReceipt from "../components/FormReceipt.vue";
import TableReceiptDetails from "../components/TableReceiptDetails.vue";
import FormReceiptDetail from "../components/FormReceiptDetail.vue";
import { onMounted, reactive, ref } from "vue";
import { storeToRefs } from "pinia";
import { PrimeIcons } from "primevue/api";
import { useToast } from "primevue/usetoast";
import { useRoute } from "vue-router";
import { ReceiptDetail } from "../types";
import { useStore } from "../../../store";
import { useReceiptsStore } from "../store/receipt";
import { GenericResponse } from "../../../types";
import {
  convertDDMMYYYYToDate,
  formatDate,
  getNewUuid,
} from "../../../utils/functions";
import { DialogOptions, FormActionMode } from "../../../types/component";
import { useReferenceStore } from "../../shared/store/reference";

const route = useRoute();
const store = useStore();
const referenceStore = useReferenceStore();
const receiptStore = useReceiptsStore();
const { receipt } = storeToRefs(receiptStore);

const loadView = async () => {
  await receiptStore.fetchReceipt(route.params.id as string);
  referenceStore.fetchReferencesByModule("purchase");
  receipt.value!.date = formatDate(receipt.value!.date);

  store.setMenuItem({
    icon: PrimeIcons.BUILDING,
    title: `Albarà de recepció ${receipt.value?.number}`,
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
    receipt.value.date = convertDDMMYYYYToDate(receipt.value.date);

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

const dialogOptions = reactive({
  visible: false,
  title: "Crear detall",
  closable: true,
  position: "center",
  modal: true,
} as DialogOptions);
const formAction = ref(FormActionMode.CREATE);
const selectedDetail = ref({} as ReceiptDetail);
const openCreateDetailForm = () => {
  formAction.value = FormActionMode.CREATE;
  selectedDetail.value = {
    id: getNewUuid(),
    receiptId: receipt.value!.id,
    amount: 0,
    diameter: 0,
    height: 0,
    kilogramPrice: 0,
    lenght: 0,
    quantity: 1,
    thickness: 0,
    totalWeight: 0,
    unitPrice: 0,
    unitWeight: 0,
    width: 0,
    disabled: false,
  } as ReceiptDetail;

  dialogOptions.title = "Crear detall";
  dialogOptions.visible = true;
};
const openEditDetailForm = (detail: ReceiptDetail) => {
  formAction.value = FormActionMode.EDIT;
  selectedDetail.value = detail;

  dialogOptions.title = "Modificar detall";
  dialogOptions.visible = true;
};

const submitDetailForm = (detail: ReceiptDetail) => {
  if (formAction.value === FormActionMode.CREATE) {
    addDetail(detail);
  } else if (formAction.value === FormActionMode.EDIT) {
    editDetail(detail);
  }

  dialogOptions.visible = false;
};

const addDetail = async (detail: ReceiptDetail) => {
  const response = await receiptStore.createReceiptDetail(detail);
  if (!response.result) showResponseErrorToast(response);
};

const editDetail = async (detail: ReceiptDetail) => {
  const response = await receiptStore.updateReceiptDetail(detail.id, detail);
  if (!response.result) showResponseErrorToast(response);
};

const removeDetail = async (detail: ReceiptDetail) => {
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
