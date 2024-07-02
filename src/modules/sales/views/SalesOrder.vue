<template>
  <SplitButton
    label="Guardar"
    @click="submitForm"
    :model="items"
    :size="'small'"
    class="grid_add_row_button"
  />

  <FormSalesOrder
    class="mt-3 mb-3"
    ref="salesOrderForm"
    salesOrder="salesOrder"
    @submit="onOrderSubmit"
  />

  <TabView>
    <TabPanel header="Detall">
      <TableSalesOrderDetails
        v-if="salesOrder"
        :salesOrder="salesOrder"
        :salesOrderDetails="salesOrder.salesOrderDetails"
        @edit="(det: SalesOrderDetail) => openOrderDetailDialog(FormActionMode.EDIT, det)"
        @delete="deleteOrderDetail"
        @createWorkOrder="createWorkOrder"
        @openWorkOrder="openWorkOrder"
      >
        <template #header>
          <div
            class="flex flex-wrap align-items-center justify-content-between gap-2"
          >
            <span class="text-l text-900 font-bold">Linies de la comanda</span>
            <section v-if="!deliveryNoteStore.deliveryNote">
              <Button
                :size="'small'"
                label="Afegir línea"
                @click="openOrderDetailDialog(FormActionMode.CREATE, {} as any)"
                class="mr-2"
              />
            </section>
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
    v-if="salesOrder"
    :closable="true"
    v-model:visible="isDetailDialogVisible"
    :header="detailDialogTitle"
    :modal="true"
  >
    <FormBudgetOrderDetail
      v-if="selectedSalesOrderDetail"
      :formAction="formDetailMode"
      :header="salesOrder"
      :detail="selectedSalesOrderDetail"
      @submit="onOrderDetailSubmit"
    />
  </Dialog>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { PrimeIcons } from "primevue/api";
import { storeToRefs } from "pinia";
import {
  BudgetDetail,
  CreateWorkOrderFromSalesOrderDto,
  SalesOrderDetail,
  SalesOrderHeader,
} from "../types";
import { useStore } from "../../../store";
import {
  createBlobAndDownloadFile,
  formatDate,
  getNewUuid,
} from "../../../utils/functions";
import { useToast } from "primevue/usetoast";
import { FormActionMode } from "../../../types/component";
import { useSalesOrderStore } from "../store/order";
import { useReferenceStore } from "../../shared/store/reference";
import { useCustomersStore } from "../store/customers";
import { useExerciseStore } from "../../shared/store/exercise";
import { usePlantModelStore } from "../../production/store/plantmodel";
import { useLifecyclesStore } from "../../shared/store/lifecycle";
import { useTaxesStore } from "../../shared/store/tax";
import FormSalesOrder from "../components/FormSalesOrder.vue";
import FormBudgetOrderDetail from "../components/FormBudgetOrderDetail.vue";
import TableSalesOrderDetails from "../components/TableSalesOrderDetails.vue";
import FileEntityPicker from "../../../components/FileEntityPicker.vue";
import { useDeliveryNoteStore } from "../store/deliveryNote";
import { REPORTS, ReportService } from "../../../api/services/report.service";
import services from "../services";
import { useWorkOrderStore } from "../../production/store/workorder";
import { useWorkMasterStore } from "../../production/store/workmaster";
import { useBudgetStore } from "../store/budget";

const salesOrderForm = ref();

const formMode = ref(FormActionMode.EDIT);
const route = useRoute();
const router = useRouter();
const store = useStore();
const toast = useToast();
const salesOrderStore = useSalesOrderStore();
const customerStore = useCustomersStore();
const plantModelStore = usePlantModelStore();
const exerciseStore = useExerciseStore();
const lifeCycleStore = useLifecyclesStore();
const referenceStore = useReferenceStore();
const deliveryNoteStore = useDeliveryNoteStore();
const workMasterStore = useWorkMasterStore();
const workOrderStore = useWorkOrderStore();
const taxesStore = useTaxesStore();
const budgetStore = useBudgetStore();
const { salesOrder } = storeToRefs(salesOrderStore);

const items = [
  {
    label: "Descarregar",
    icon: PrimeIcons.FILE_WORD,
    command: () => printInvoice(),
  },
];

const detailDialogTitle = "Línia de comanda";
const isDetailDialogVisible = ref(false);
const formDetailMode = ref(FormActionMode.EDIT);
const selectedSalesOrderDetail = ref(undefined as undefined | SalesOrderDetail);

const loadView = async () => {
  const workOrderId = route.params.id as string;
  await salesOrderStore.GetById(workOrderId);
  referenceStore.fetchReferencesByModule("sales");
  lifeCycleStore.fetchOneByName("SalesOrder");
  plantModelStore.fetchSites();
  exerciseStore.fetchAll();
  customerStore.fetchCustomers();
  taxesStore.fetchAll();
  workOrderStore.fetchBySalesOrder(workOrderId);

  if (!workMasterStore.workmasters) {
    workMasterStore.fetchAllActives();
  }

  let pageTitle = "";
  if (salesOrder.value) {
    formMode.value = FormActionMode.EDIT;
    pageTitle = `Comanda ${salesOrder.value.number}`;

    // Parse date on the form
    salesOrder.value.date = formatDate(salesOrder.value.date);
    if (salesOrder.value.expectedDate) {
      salesOrder.value.expectedDate = formatDate(salesOrder.value.expectedDate);
    }

    // Get the related DeliveryNote info
    if (salesOrder.value.deliveryNoteId) {
      deliveryNoteStore.GetById(salesOrder.value.deliveryNoteId);
    } else if (deliveryNoteStore.deliveryNote) {
      deliveryNoteStore.deliveryNote = undefined;
    }

    // Get related budget
    if (salesOrder.value.budgetId) {
      await budgetStore.GetById(salesOrder.value.budgetId);
    } else {
      budgetStore.budget = undefined;
    }
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

const openReferenceDetail = () => {
  router.push(`/sales/reference/${getNewUuid()}`);
  setTimeout(() => {
    referenceStore.reference!.customerId = salesOrder.value!.customerId;
  }, 200);
};

const openOrderDetailDialog = (
  formMode: FormActionMode,
  salesOrderDetail: SalesOrderDetail
) => {
  if (formMode === FormActionMode.CREATE) {
    salesOrderDetail = {
      id: getNewUuid(),
      referenceId: "",
      quantity: 1,
      profit: 0,
      discount: 0,
      unitCost: 0,
      unitPrice: 0,
      totalCost: 0,
      amount: 0,
      salesOrderHeaderId: "",
      lastCost: 0,
      workMasterCost: 0,
      description: "",
      estimatedDeliveryDate: new Date(),
      isDelivered: false,
      isInvoiced: false,
      workMasterId: null,
      workOrderId: null,
    } as SalesOrderDetail;
  }

  salesOrderDetail.salesOrderHeaderId = salesOrder.value!.id;
  selectedSalesOrderDetail.value = salesOrderDetail;
  formDetailMode.value = formMode;
  isDetailDialogVisible.value = true;
};

const onOrderSubmit = async (salesOrder: SalesOrderHeader) => {
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

const onOrderDetailSubmit = async (detail: BudgetDetail | SalesOrderDetail) => {
  detail = detail as SalesOrderDetail;

  if (formDetailMode.value === FormActionMode.CREATE) {
    await salesOrderStore.CreateDetail(detail);
  } else if (formDetailMode.value === FormActionMode.EDIT) {
    await salesOrderStore.UpdateDetail(detail);
  }
  isDetailDialogVisible.value = false;

  if (salesOrder.value) {
    salesOrder.value.date = formatDate(salesOrder.value.date);
    if (salesOrder.value.expectedDate) {
      salesOrder.value.expectedDate = formatDate(salesOrder.value.expectedDate);
    }
  }
};

const deleteOrderDetail = async (detail: SalesOrderDetail) => {
  if (formMode.value === FormActionMode.EDIT) {
    await salesOrderStore.DeleteDetail(detail);
  }
  const afterDelete = salesOrder.value!.salesOrderDetails!.filter(
    (i) => i.id !== detail.id
  );
  salesOrder.value!.salesOrderDetails = afterDelete;
  isDetailDialogVisible.value = false;

  salesOrder.value!.date = formatDate(salesOrder.value!.date);
};

const createWorkOrder = async (dto: CreateWorkOrderFromSalesOrderDto) => {
  const response = await workOrderStore.create(dto.workOrderDto);
  if (response.result) {
    dto.orderDetail.workOrderId = response.content!.id;

    const updated = await salesOrderStore.UpdateDetail(dto.orderDetail);
    if (updated) {
      toast.add({
        severity: "success",
        summary: "Generació OF",
        detail: `Ordre de fabricació ${response.content!.code} generada`,
        life: 5000,
      });

      workOrderStore.fetchBySalesOrder(salesOrder.value!.id);
    }
  } else {
    toast.add({
      severity: "error",
      summary: "Generació OF",
      detail: `Error al generar la ordre de fabricació`,
      life: 5000,
    });
  }
};

const openWorkOrder = (workorderid: string) => {
  router.push({ path: `/workorder/${workorderid}` });
};

const printInvoice = async () => {
  const orderReport = await services.SalesOrder.GetReportDataById(
    salesOrder.value!.id
  );

  if (orderReport) {
    const fileName = `Comanda_${salesOrder.value?.number}.docx`;

    const reportService = new ReportService();
    const report = await reportService.Download(
      orderReport,
      REPORTS.Order,
      fileName
    );

    if (report) {
      createBlobAndDownloadFile(fileName, report);
    } else {
      toast.add({
        severity: "warn",
        summary: "Error",
        detail: "No s'ha pugut generar fulla de la comanda",
      });
    }
  }
};
</script>
