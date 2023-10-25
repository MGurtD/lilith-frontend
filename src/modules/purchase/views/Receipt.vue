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
              :disabled="hasToBlockDetailCreation"
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
      <TabView v-model:activeIndex="formsActiveIndex">
        <TabPanel header="Línea">
          <FormReceiptDetail
            :detail="selectedDetail"
            @submit="submitDetailForm"
          />
        </TabPanel>
        <TabPanel header="Referencia">
          <FormReference
            v-if="referenceStore.reference"
            :module="'purchase'"
            :reference="referenceStore.reference"
            @submit="onFormReferenceSubmit"
          />
        </TabPanel>
      </TabView>
    </Dialog>
  </main>
  <main v-else>Carregant albarà ...</main>
</template>
<script setup lang="ts">
import FormReceipt from "../components/FormReceipt.vue";
import TableReceiptDetails from "../components/TableReceiptDetails.vue";
import FormReceiptDetail from "../components/FormReceiptDetail.vue";
import FormReference from "../../shared/components/FormReference.vue";
import { computed, onMounted, reactive, ref } from "vue";
import { storeToRefs } from "pinia";
import { PrimeIcons } from "primevue/api";
import { useToast } from "primevue/usetoast";
import { useRoute } from "vue-router";
import { ReceiptDetail } from "../types";
import { useStore } from "../../../store";
import { useReceiptsStore } from "../store/receipt";
import { GenericResponse } from "../../../types";
import { formatDate, getNewUuid } from "../../../utils/functions";
import { DialogOptions, FormActionMode } from "../../../types/component";
import { useReferenceStore } from "../../shared/store/reference";
import { Reference } from "../../shared/types";
import router from "../../../router";
import { useLifecyclesStore } from "../../shared/store/lifecycle";

const route = useRoute();
const store = useStore();
const referenceStore = useReferenceStore();
const receiptStore = useReceiptsStore();
const lifecycleStore = useLifecyclesStore();
const { receipt } = storeToRefs(receiptStore);
const formsActiveIndex = ref(0);

const loadView = async () => {
  await receiptStore.fetchReceipt(route.params.id as string);
  lifecycleStore.fetchOneByName("Receipts");
  referenceStore.fetchReferencesByModule("purchase");
  if (receipt.value) {
    receipt.value.date = formatDate(receipt.value.date);
  }

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

const hasToBlockDetailCreation = computed(() => {
  if (!lifecycleStore.lifecycle) return false;

  const warehouseStatus = lifecycleStore.lifecycle!.statuses.find(
    (s) => s.name === "Recepcionat"
  );
  if (!warehouseStatus) return false;
  return receipt.value?.statusId === warehouseStatus.id;
});

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
      router.back();
    }
  }
};

const dialogOptions = reactive({
  visible: false,
  title: "Linea",
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
  referenceStore.setNewReference(getNewUuid());

  dialogOptions.title = "Crear línia";
  dialogOptions.visible = true;
};

const openEditDetailForm = (detail: ReceiptDetail) => {
  formAction.value = FormActionMode.EDIT;
  selectedDetail.value = detail;
  referenceStore.setNewReference(getNewUuid());

  dialogOptions.title = "Modificar línia";
  dialogOptions.visible = true;
};

// Receipt Detail
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
    closable: true,
  });
};

//
const onFormReferenceSubmit = async (reference: Reference) => {
  let result = false;
  let message = "";

  result = await referenceStore.createReference(reference);
  if (result) message = "Referència creada correctament";
  else message = "La referència + versió introduïda ja existeix";

  toast.add({
    severity: result ? "success" : "warn",
    summary: message,
    life: 5000,
  });

  if (result) {
    selectedDetail.value!.referenceId = reference.id;
    formsActiveIndex.value = 0;

    referenceStore.setNewReference(getNewUuid());
  }
};
</script>
