<template>
  <Button
    label="Guardar"
    class="grid_add_row_button"
    :size="'small'"
    @click="submitForm"
  />

  <FormSalesOrder
    class="mt-3"
    ref="salesOrderForm"
    salesOrder="salesOrder"
    @submit="onSalesOrderSubmit"
  />

  <TabView>
    <TabPanel header="Referències">
      <TableSalesOrderReferences
        v-if="salesOrder"
        :salesOrderDetails="salesOrder.salesOrderDetails"
        @add="(det: SalesOrderDetail) => openReferencesForm(FormActionMode.CREATE, det)"
        @edit="(det: SalesOrderDetail) => openReferencesForm(FormActionMode.EDIT, det)"
        @delete="deleteSalesOrderDetails"
      />
    </TabPanel>
  </TabView>
  <Dialog
    :closable="true"
    v-model:visible="isDialogVisible"
    :header="dialogTitle"
    :modal="true"
  >
    <FormSalesOrderReference
      v-if="selectedSalesOrderDetail"
      :formAction="formDetailMode"
      :salesOrderDetail="selectedSalesOrderDetail"
      @submit="onSalesOrderReferenceSubmit"
    />
  </Dialog>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { PrimeIcons } from "primevue/api";

import { storeToRefs } from "pinia";
import { SalesOrderDetail, SalesOrderHeader } from "../types";
import { useStore } from "../../../store";
import {
  getNewUuid,
  convertDateTimeToJSON,
  convertDDMMYYYYToDate,
  formatDate,
} from "../../../utils/functions";
import { useToast } from "primevue/usetoast";
import { FormActionMode } from "../../../types/component";
import FormSalesOrder from "../components/FormSalesOrder.vue";
import { useSalesOrderStore } from "../store/salesOrder";
import FormSalesOrderReference from "../components/FormSalesOrderReference.vue";
import TableSalesOrderReferences from "../components/TableSalesOrderReferences.vue";

const salesOrderForm = ref();

const formMode = ref(FormActionMode.EDIT);
const route = useRoute();
const router = useRouter();
const store = useStore();
const salesOrderStore = useSalesOrderStore();
const { salesOrder } = storeToRefs(salesOrderStore);

const dialogTitle = computed(() => {
  return formDetailMode.value === FormActionMode.CREATE
    ? "Escull referència"
    : "Modifica referència";
});
const isDialogVisible = ref(false);
const formDetailMode = ref(FormActionMode.EDIT);

const selectedSalesOrderDetail = ref(undefined as undefined | SalesOrderDetail);

const loadView = async () => {
  await salesOrderStore.GetById(route.params.id as string);
  /*salesOrderStore.salesOrder!.salesOrderDate = formatDate(
    salesOrderStore.salesOrder!.salesOrderDate
  );*/
  let pageTitle = "";
  if (salesOrder.value) {
    formMode.value = FormActionMode.EDIT;
    pageTitle = `Comanda ${salesOrder.value.salesOrderNumber}`;
  }

  store.setMenuItem({
    icon: PrimeIcons.BUILDING,
    backButtonVisible: true,
    title: pageTitle,
  });
};

onMounted(async () => {
  await loadView();
});

const submitForm = () => {
  const form = salesOrderForm.value as any;
  form.submitForm();
};

const openReferencesForm = (
  formMode: FormActionMode,
  salesOrderDetail: SalesOrderDetail
) => {
  if (formMode === FormActionMode.CREATE) {
    salesOrderDetail.id = getNewUuid();
  }

  salesOrderDetail.salesOrderHeaderId = salesOrder.value!.id;
  selectedSalesOrderDetail.value = salesOrderDetail;
  formDetailMode.value = formMode;
  isDialogVisible.value = true;
};

const toast = useToast();

const onSalesOrderSubmit = async (salesOrder: SalesOrderHeader) => {
  let result = false;
  let message = "";

  //salesOrder!.salesOrderDate = convertDDMMYYYYToDate(
  //  salesOrder!.salesOrderDate
  //);
  console.log(salesOrder.salesOrderDate);
  result = await salesOrderStore.Update(salesOrder.id, salesOrder);
  console.log("guardar comanda de venda: ", result);
  message = result
    ? "Comanda actualitzada"
    : "Error a l'actualitzar la comanda";

  toast.add({
    life: 5000,
    severity: result ? "success" : "error",
    summary: message,
  });

  if (result) {
    router.back();
  }
};

const onSalesOrderReferenceSubmit = async (
  salesOrderDetail: SalesOrderDetail
) => {
  if (formDetailMode.value === FormActionMode.CREATE) {
    await salesOrderStore.CreateDetail(salesOrderDetail);
  } else if (formDetailMode.value === FormActionMode.EDIT) {
    await salesOrderStore.UpdateDetail(salesOrderDetail);
  }
  isDialogVisible.value = false;
};

const deleteSalesOrderDetails = async (detail: SalesOrderDetail) => {
  if (formMode.value === FormActionMode.EDIT) {
    await salesOrderStore.DeleteDetail(detail);
  }
  const afterDelete = salesOrder.value!.salesOrderDetails!.filter(
    (i) => i.id !== detail.id
  );
  salesOrder.value!.salesOrderDetails = afterDelete;
  isDialogVisible.value = false;
};
</script>
