<template>
  <SplitButton
    label="Guardar"
    @click="submitForm"
    :model="items"
    :size="'small'"
    class="grid_add_row_button"
  />

  <FormBudget class="mt-3 mb-3" ref="budgetForm" @submit="onSalesOrderSubmit" />

  <TabView>
    <TabPanel header="Detall">
      <TableBudgetDetails
        v-if="budget"
        :budget="budget"
        :details="budget?.details"
        @edit="(det: BudgetDetail) => openReferencesForm(FormActionMode.EDIT, det)"
        @delete="deleteSalesOrderDetails"
      >
        <template #header>
          <div
            class="flex flex-wrap align-items-center justify-content-between gap-2"
          >
            <span class="text-l text-900 font-bold">Linies del pressupost</span>
            <section>
              <Button
                :size="'small'"
                label="Afegir línea"
                @click="openReferencesForm(FormActionMode.CREATE, {} as any)"
                class="mr-2"
                :disabled="budgetStore.order !== undefined"
              />
            </section>
          </div>
        </template>
      </TableBudgetDetails>
    </TabPanel>
  </TabView>

  <Dialog
    :closable="true"
    v-model:visible="isDetailDialogVisible"
    :header="detailDialogTitle"
    :modal="true"
    v-if="budget"
  >
    <TabView v-model:activeIndex="formsActiveIndex">
      <TabPanel header="Línea">
        <FormBudgetDetail
          v-if="budget && budgetDetail"
          :formAction="formDetailMode"
          :budget="budget"
          :detail="budgetDetail"
          @submit="onFormSalesOrderReferenceSubmit"
        />
      </TabPanel>
      <TabPanel header="Referencia">
        <FormReference
          v-if="referenceStore.reference"
          :module="'sales'"
          :reference="referenceStore.reference"
          :default-customer-id="budget.customerId"
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
import { Budget, BudgetDetail } from "../types";
import { Reference } from "../../shared/types";
import { useStore } from "../../../store";
import {
  createBlobAndDownloadFile,
  formatDate,
  getNewUuid,
} from "../../../utils/functions";
import { useToast } from "primevue/usetoast";
import { FormActionMode } from "../../../types/component";
import { useReferenceStore } from "../../shared/store/reference";
import { useCustomersStore } from "../store/customers";
import { useExerciseStore } from "../../shared/store/exercise";
import { usePlantModelStore } from "../../production/store/plantmodel";
import { useLifecyclesStore } from "../../shared/store/lifecycle";
import { useTaxesStore } from "../../shared/store/tax";
import FormReference from "../../shared/components/FormReference.vue";
import { REPORTS, ReportService } from "../../../api/services/report.service";
import Services from "../services";
import { useWorkMasterStore } from "../../production/store/workmaster";
import { useBudgetStore } from "../store/budget";
import TableBudgetDetails from "../components/TableBudgetDetails.vue";
import FormBudget from "../components/FormBudget.vue";
import FormBudgetDetail from "../components/FormBudgetDetail.vue";
import { useSalesOrderStore } from "../store/order";

const budgetForm = ref();

const formMode = ref(FormActionMode.EDIT);
const route = useRoute();
const router = useRouter();
const store = useStore();
const toast = useToast();
const budgetStore = useBudgetStore();
const customerStore = useCustomersStore();
const plantModelStore = usePlantModelStore();
const exerciseStore = useExerciseStore();
const lifeCycleStore = useLifecyclesStore();
const referenceStore = useReferenceStore();
const workMasterStore = useWorkMasterStore();
const taxesStore = useTaxesStore();
const salesOrderStore = useSalesOrderStore();
const { budget } = storeToRefs(budgetStore);

const items = [
  {
    label: "Descarregar",
    icon: PrimeIcons.FILE_WORD,
    command: () => printInvoice(),
  },
  {
    label: "Crear comanda",
    icon: PrimeIcons.FLAG_FILL,
    command: () => createSalesOrder(),
  },
];

const printInvoice = async () => {
  const budgetReport = await Services.Budget.GetReportDataById(
    budget.value!.id
  );

  if (budgetReport) {
    const fileName = `Pressupost_${budget.value?.number}.docx`;

    const reportService = new ReportService();
    const report = await reportService.Download(
      budgetReport,
      REPORTS.Budget,
      fileName
    );

    if (report) {
      createBlobAndDownloadFile(fileName, report);
    } else {
      toast.add({
        severity: "warn",
        summary: "Error",
        detail: "No s'ha pugut generar fulla del pressupost",
      });
    }
  }
};

const detailDialogTitle = "Línia del pressupost";
const isDetailDialogVisible = ref(false);
const formDetailMode = ref(FormActionMode.EDIT);
const budgetDetail = ref(undefined as undefined | BudgetDetail);
const formsActiveIndex = ref(0);

const loadView = async () => {
  const budgetId = route.params.id as string;
  await budgetStore.GetById(budgetId);
  await budgetStore.GetAssociatedSalesOrders(budgetId);

  referenceStore.fetchReferencesByModule("sales");
  lifeCycleStore.fetchOneByName("Budget");
  plantModelStore.fetchSites();
  exerciseStore.fetchAll();
  customerStore.fetchCustomers();
  taxesStore.fetchAll();

  if (!workMasterStore.workmasters) {
    workMasterStore.fetchAllActives();
  }

  let pageTitle = "";
  if (budget.value) {
    formMode.value = FormActionMode.EDIT;
    pageTitle = `Pressupost ${budget.value.number}`;
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
  const form = budgetForm.value as any;
  form.submitForm();
};

const openReferencesForm = (formMode: FormActionMode, detail: BudgetDetail) => {
  referenceStore.setNewReference(getNewUuid());

  if (formMode === FormActionMode.CREATE) {
    detail = {
      id: getNewUuid(),
      referenceId: "",
      quantity: 0,
      unitCost: 0,
      unitPrice: 0,
      totalCost: 0,
      amount: 0,
      budgetId: budget.value!.id,
      description: "",
    } as BudgetDetail;
  }

  budgetDetail.value = detail;
  formDetailMode.value = formMode;
  isDetailDialogVisible.value = true;
};

const onSalesOrderSubmit = async (budget: Budget) => {
  let result = false;
  let message = "";

  result = await budgetStore.Update(budget.id, budget);
  message = result
    ? "Pressupost actualitzat correctament"
    : "Error a l'actualitzar el pressupost";

  toast.add({
    life: 5000,
    severity: result ? "success" : "error",
    summary: message,
  });

  if (result) {
    router.back();
  }
};

const onFormSalesOrderReferenceSubmit = async (detail: BudgetDetail) => {
  if (formDetailMode.value === FormActionMode.CREATE) {
    await budgetStore.CreateDetail(detail);
  } else if (formDetailMode.value === FormActionMode.EDIT) {
    await budgetStore.UpdateDetail(detail);
  }
  isDetailDialogVisible.value = false;
};

const deleteSalesOrderDetails = async (detail: BudgetDetail) => {
  if (formMode.value === FormActionMode.EDIT) {
    await budgetStore.DeleteDetail(detail);
  }
  const afterDelete = budget.value!.details!.filter((i) => i.id !== detail.id);
  budget.value!.details = afterDelete;
  isDetailDialogVisible.value = false;
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
    referenceStore.reference = undefined;
    referenceStore.setNewReference(getNewUuid());
    // Go to details tab
    formsActiveIndex.value = 0;
  }
};

const createSalesOrder = async () => {
  if (budgetStore.order) {
    toast.add({
      severity: "warn",
      summary: "Aquest pressupost ja té una comanda associada",
      life: 5000,
    });
    return;
  }

  if (budget.value) {
    const response = await salesOrderStore.CreateFromBudget(budget.value);

    if (response.result) {
      toast.add({
        severity: "success",
        summary: `Comanda ${response.content?.number} creada correctament`,
        life: 5000,
      });

      router.push(`/salesorder/${response.content?.id}`);
    } else {
      toast.add({
        severity: "error",
        summary: "Error al crear la comanda ",
        detail: response.errors[0],
        life: 5000,
      });
    }
  }
};
</script>
