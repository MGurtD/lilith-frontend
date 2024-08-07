<template>
  <header>
    <FormWorkorder
      v-if="workorder"
      :workorder="workorder"
      @submit="onWorkorderSubmit"
    ></FormWorkorder>
  </header>
  <main class="main">
    <TabView>
      <TabPanel header="Fases">
        <TableWorkorderPhases
          v-if="workorder && workorder.phases"
          :workorder="workorder"
          :workorderPhases="workorder.phases"
          @add="addWorkOrderPhase"
          @edit="editWorkOrderPhase"
          @delete="deleteWorkOrderPhase"
        ></TableWorkorderPhases>
      </TabPanel>
      <TabPanel header="Hores">
        <TableProductionParts
          v-if="productionPartStore.productionParts"
          :productionParts="productionPartStore.productionParts"
          @delete="deleteProductionPart"
        >
          <template #header>
            <div
              class="flex flex-wrap align-items-center justify-content-between gap-2"
            >
              <span class="text-xl text-900 font-bold">Hores</span>
              <Button
                :icon="PrimeIcons.PLUS"
                rounded
                raised
                @click="onProductionPartAddClick"
              />
            </div>
          </template>
        </TableProductionParts>
      </TabPanel>
      <TabPanel header="Costs" v-if="workorder">
        <section class="four-columns">
          <div class="mt-1">
            <label class="block text-900 mb-2">Cost Operari</label>
            <span class="summary-field">{{
              formatCurrency(workorder.operatorCost)
            }}</span>
          </div>
          <div class="mt-1">
            <label class="block text-900 mb-2">Cost Máquina</label>
            <span class="summary-field">{{
              formatCurrency(workorder.machineCost)
            }}</span>
          </div>
          <div class="mt-1">
            <label class="block text-900 mb-2">Cost Material</label>
            <span class="summary-field">{{
              formatCurrency(workorder.materialCost)
            }}</span>
          </div>
          <div class="mt-1">
            <label class="block text-900 mb-2">Cost Total</label>
            <span class="summary-field">{{
              formatCurrency(
                workorder.machineCost +
                  workorder.materialCost +
                  workorder.operatorCost
              )
            }}</span>
          </div>
        </section>
        <section class="four-columns mt-4">
          <div class="mt-1">
            <label class="block text-900 mb-2">Temps Operari</label>
            <span class="summary-field"
              >{{ workorder.operatorTime }} mins.</span
            >
          </div>
          <div class="mt-1">
            <label class="block text-900 mb-2">Temps Màquina</label>
            <span class="summary-field">{{ workorder.machineTime }} mins.</span>
          </div>
          <div class="mt-1"></div>
        </section>
      </TabPanel>
    </TabView>
  </main>
  <Dialog
    v-model:visible="dialogOptions.visible"
    :header="dialogOptions.title"
    :closable="dialogOptions.closable"
    :modal="dialogOptions.modal"
  >
    <FormWorkOrderProductionPart
      :productionPart="productionPartRequest"
      :avoid-work-order-refresh="true"
      @submit="createProductionPart"
    />
  </Dialog>
</template>
<script setup lang="ts">
import FormWorkOrderProductionPart from "../components/FormWorkOrderProductionPart.vue";
import FormWorkorder from "../components/FormWorkorder.vue";
import TableWorkorderPhases from "../components/TableWorkorderPhases.vue";
import TableProductionParts from "../components/TableProductionParts.vue";

import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "../../../store";
import { useReferenceStore } from "../../shared/store/reference";
import { useWorkOrderStore } from "../store/workorder";
import { useProductionPartStore } from "../store/productionpart";
import { storeToRefs } from "pinia";
import { PrimeIcons } from "primevue/api";
import { ProductionPart, WorkOrder, WorkOrderPhase } from "../types";
import { usePlantModelStore } from "../store/plantmodel";
import { useLifecyclesStore } from "../../shared/store/lifecycle";
import {
  convertDateTimeToJSON,
  formatDate,
  formatCurrency,
  getNewUuid,
} from "../../../utils/functions";
import { useToast } from "primevue/usetoast";
import { DialogOptions } from "../../../types/component";

const route = useRoute();
const router = useRouter();
const store = useStore();
const toast = useToast();
const lifecycleStore = useLifecyclesStore();
const referenceStore = useReferenceStore();
const workorderStore = useWorkOrderStore();
const plantModelStore = usePlantModelStore();
const productionPartStore = useProductionPartStore();
const { workorder } = storeToRefs(workorderStore);
const id = ref("");

const dialogOptions = reactive({
  visible: false,
  title: "Crear tíquet de producció",
  closable: true,
  position: "center",
  modal: true,
} as DialogOptions);

onMounted(async () => {
  id.value = route.params.id as string;
  workorderStore.detailedWorkOrders = undefined;
  await loadViewData();

  let pageTitle = "";
  pageTitle = `Ordre de fabricació`;
  if (workorder.value) {
    pageTitle = `${pageTitle} ${workorder.value.code}`;
  }

  store.setMenuItem({
    icon: PrimeIcons.BUILDING,
    backButtonVisible: true,
    title: pageTitle,
  });
});

const fetchWorkOrder = async () => {
  await workorderStore.fetchOne(id.value);
  if (workorderStore.workorder) {
    workorderStore.workorder.plannedDate = formatDate(
      workorderStore.workorder.plannedDate
    );
  }
};

const loadViewData = async () => {
  referenceStore.fetchReferencesByModule("sales");
  plantModelStore.fetchActiveModel();
  lifecycleStore.fetchOneByName("WorkOrder");
  productionPartStore.fetchByWorkOrderId(id.value);

  await fetchWorkOrder();
};

const onWorkorderSubmit = async (workorder: WorkOrder) => {
  if (workorderStore.workorder) {
    workorderStore.workorder.plannedDate = convertDateTimeToJSON(
      workorderStore.workorder.plannedDate
    );
  }

  const updated = await workorderStore.update(id.value, workorder);
  if (updated) await loadViewData();
};

// Phases
const addWorkOrderPhase = async (phase: WorkOrderPhase) => {
  const created = await workorderStore.createPhase(phase);
  if (created) {
    router.push({ path: `/workorder/${id.value}/phase/${phase.id}` });
  } else {
    toast.add({
      severity: "error",
      summary: "Error al crear la fase",
      detail: "Revisi el log per a més informació",
      life: 10000,
    });
  }
};
const editWorkOrderPhase = (phase: WorkOrderPhase) => {
  router.push({ path: `/workorder/${id.value}/phase/${phase.id}` });
};
const deleteWorkOrderPhase = async (phase: WorkOrderPhase) => {
  await workorderStore.deletePhase(phase.id);
};

const productionPartRequest = ref({} as ProductionPart);
const onProductionPartAddClick = () => {
  productionPartRequest.value = {
    id: getNewUuid(),
    workOrderId: id.value,
    workOrderPhaseId: "",
    workOrderPhaseDetailId: "",
    operatorId: "",
    workcenterId: "",
    operatorTime: 0,
    workcenterTime: 0,
    quantity: 0,
    date: new Date(),
    machineHourCost: 0,
    operatorHourCost: 0,
  };
  if (workorder.value) workorderStore.fetchByWorkOrderId(workorder.value.id);

  dialogOptions.visible = true;
};

const createProductionPart = async () => {
  dialogOptions.visible = false;
  const created = await productionPartStore.create(productionPartRequest.value);
  if (created) {
    productionPartStore.fetchByWorkOrderId(id.value);
    fetchWorkOrder();
  }
};

const deleteProductionPart = async (productionPart: ProductionPart) => {
  await productionPartStore.delete(productionPart.id);
  productionPartStore.fetchByWorkOrderId(id.value);
  fetchWorkOrder();
};
</script>
<style scoped>
.main {
  margin-top: 1rem;
}
</style>
