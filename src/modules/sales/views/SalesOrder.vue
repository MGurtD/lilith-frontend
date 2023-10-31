<template>
  <Button
    label="Guardar"
    class="grid_add_row_button"
    :size="'small'"
    @click="submitForm"
  />

  <FormSalesOrder
    class="mt-3 mb-3"
    ref="salesOrderForm"
    salesOrder="salesOrder"
    @submit="onSalesOrderSubmit"
  />

  <TabView>
    <TabPanel header="Detall">
      <TableSalesOrderDetails
        v-if="salesOrder"
        :salesOrderDetails="salesOrder.salesOrderDetails"
        @edit="(det: SalesOrderDetail) => openReferencesForm(FormActionMode.EDIT, det)"
        @delete="deleteSalesOrderDetails"
      >
        <template #header>
          <div
            class="flex flex-wrap align-items-center justify-content-between gap-2"
          >
            <span class="text-l text-900 font-bold">Linies de la comanda</span>
            <div>
              <Button
                :size="'small'"
                label="Afegir línea"
                @click="openReferencesForm(FormActionMode.CREATE, {} as any)"
              />
            </div>
          </div>
        </template>
      </TableSalesOrderDetails>
    </TabPanel>
    <TabPanel header="Fitxers">
      <FileEntityPicker
        v-if="salesOrder"
        entity="SalesOrder"
        :id="salesOrder.id"
        title=""
      />
    </TabPanel>
  </TabView>

  <Dialog
    :closable="true"
    v-model:visible="isDialogVisible"
    :header="dialogTitle"
    :modal="true"
  >
    <TabView v-model:activeIndex="formsActiveIndex">
      <TabPanel header="Línea">
        <FormSalesOrderDetail
          v-if="selectedSalesOrderDetail"
          :formAction="formDetailMode"
          :salesOrderDetail="selectedSalesOrderDetail"
          @submit="onFormSalesOrderReferenceSubmit"
        />
      </TabPanel>
      <TabPanel header="Referencia">
        <FormReference
          v-if="referenceStore.reference"
          :module="'sales'"
          :reference="referenceStore.reference"
          @submit="onFormReferenceSubmit"
        />
      </TabPanel>
    </TabView>
  </Dialog>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { PrimeIcons } from "primevue/api";
import { storeToRefs } from "pinia";
import { SalesOrderDetail, SalesOrderHeader } from "../types";
import { Reference } from "../../shared/types";
import { useStore } from "../../../store";
import { formatDate, getNewUuid } from "../../../utils/functions";
import { useToast } from "primevue/usetoast";
import { FormActionMode } from "../../../types/component";
import { useSalesOrderStore } from "../store/salesOrder";
import { useReferenceStore } from "../../shared/store/reference";
import { useCustomersStore } from "../store/customers";
import { useExerciseStore } from "../../shared/store/exercise";
import { usePlantModelStore } from "../../production/store/plantmodel";
import { useLifecyclesStore } from "../../shared/store/lifecycle";
import FormSalesOrder from "../components/FormSalesOrder.vue";
import FormSalesOrderDetail from "../components/FormSalesOrderDetail.vue";
import TableSalesOrderDetails from "../components/TableSalesOrderDetails.vue";
import FormReference from "../../shared/components/FormReference.vue";
import FileEntityPicker from "../../../components/FileEntityPicker.vue";

const salesOrderForm = ref();

const formMode = ref(FormActionMode.EDIT);
const route = useRoute();
const router = useRouter();
const store = useStore();
const salesOrderStore = useSalesOrderStore();
const customerStore = useCustomersStore();
const plantModelStore = usePlantModelStore();
const exerciseStore = useExerciseStore();
const lifeCycleStore = useLifecyclesStore();
const referenceStore = useReferenceStore();
const { salesOrder } = storeToRefs(salesOrderStore);

const dialogTitle = "Línia de comanda";
const isDialogVisible = ref(false);
const formDetailMode = ref(FormActionMode.EDIT);

const selectedSalesOrderDetail = ref(undefined as undefined | SalesOrderDetail);
const formsActiveIndex = ref(0);

const loadView = async () => {
  await salesOrderStore.GetById(route.params.id as string);
  referenceStore.fetchReferencesByModule("sales");
  lifeCycleStore.fetchOneByName("SalesOrder");
  plantModelStore.fetchSites();
  exerciseStore.fetchAll();
  customerStore.fetchCustomers();

  let pageTitle = "";
  if (salesOrder.value) {
    formMode.value = FormActionMode.EDIT;
    pageTitle = `Comanda ${salesOrder.value.salesOrderNumber}`;

    salesOrder.value.salesOrderDate = formatDate(
      salesOrder.value.salesOrderDate
    );
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
    salesOrderDetail = {
      id: getNewUuid(),
      referenceId: "",
      quantity: 0,
      unitCost: 0,
      unitPrice: 0,
      totalCost: 0,
      amount: 0,
      salesOrderHeaderId: "",
      description: "",
      estimatedDeliveryDate: new Date(),
      isServerd: false,
      isInvoiced: false,
    } as SalesOrderDetail;

    referenceStore.setNewReference(getNewUuid());
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

  result = await salesOrderStore.Update(salesOrder.id, salesOrder);
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

const onFormSalesOrderReferenceSubmit = async (
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
    // Clean reference form
    referenceStore.setNewReference(getNewUuid());
    // Go to details tab
    formsActiveIndex.value = 0;
  }
};
</script>
