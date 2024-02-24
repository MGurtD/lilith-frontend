<template>
  <DataTable
    :value="productionPartStore.productionParts"
    tableStyle="min-width: 100%"
    scrollable
    scrollHeight="80vh"
    paginator
    :rows="10"
  >
    <template #header>
      <div
        class="flex flex-wrap align-items-center justify-content-between gap-2"
      >
        <div class="datatable-filter">
          <div class="filter-field">
            <ExerciseDatePicker :exercises="exerciseStore.exercises" />
          </div>
        </div>
        <div class="datatable-buttons">
          <Button
            class="datatable-button mr-2"
            :icon="PrimeIcons.FILTER"
            rounded
            raised
            @click="filterData"
          />
          <Button
            :icon="PrimeIcons.PLUS"
            rounded
            raised
            @click="createButtonClick"
          />
        </div>
      </div>
    </template>
    <template #empty> No s'han trobat tiquets. </template>
    <template #loading> Carregant tiquets. Si us plau espera. </template>
    <Column field="operatorId" header="Operari" style="width: 15%">
      <template #body="slotProps">
        {{ plantModelStore.getOperatorNameById(slotProps.data.operatorId) }}
      </template>
    </Column>
    <Column field="workcenterId" header="Màquina" style="width: 20%">
      <template #body="slotProps">
        {{ plantModelStore.getWorkcenterNameById(slotProps.data.workcenterId) }}
      </template>
    </Column>
    <Column field="workOrderId" header="OF" style="width: 20%">
      <template #body="slotProps">
        {{ getWorkOrderDetailedName(slotProps.data) }}
      </template>
    </Column>
    <Column field="date" header="Data" style="width: 15%">
      <template #body="slotProps">
        {{ formatDateTime(slotProps.data.date) }}
      </template>
    </Column>
    <Column field="quantity" header="Quantitat" style="width: 15%"></Column>
    <Column field="time" header="Temps (min)" style="width: 15%"></Column>
  </DataTable>
  <Dialog
    v-model:visible="dialogOptions.visible"
    :header="dialogOptions.title"
    :closable="dialogOptions.closable"
    :modal="dialogOptions.modal"
  >
    <FormProductionPart
      :productionPart="productionPartRequest"
      @submit="createProductionPart"
    />
  </Dialog>
</template>
<script setup lang="ts">
import ExerciseDatePicker from "../../../components/ExerciseDatePicker.vue";
import { useRouter } from "vue-router";
import { useStore } from "../../../store";
import { onMounted, reactive, ref } from "vue";
import { PrimeIcons } from "primevue/api";
import { useToast } from "primevue/usetoast";
import { ProductionPart } from "../types";
import {
  formatDateForQueryParameter,
  formatDateTime,
  getNewUuid,
} from "../../../utils/functions";
import { DialogOptions } from "../../../types/component";
import { useExerciseStore } from "../../shared/store/exercise";
import { useProductionPartStore } from "../store/productionpart";
import { usePlantModelStore } from "../store/plantmodel";
import { useWorkOrderStore } from "../store/workorder";
import FormProductionPart from "../components/FormProductionPart.vue";

const router = useRouter();
const store = useStore();
const toast = useToast();
const productionPartStore = useProductionPartStore();
const exerciseStore = useExerciseStore();
const plantModelStore = usePlantModelStore();
const workOrderStore = useWorkOrderStore();

const setCurrentYear = () => {
  const year = new Date().getFullYear().toString();
  const currentExercise = exerciseStore.exercises?.find((e) => e.name === year);

  if (currentExercise) {
    store.exercisePicker.exercise = currentExercise;
    store.exercisePicker.dates = [
      new Date(store.exercisePicker.exercise.startDate),
      new Date(store.exercisePicker.exercise.endDate),
    ];
  }
};

const filterData = async () => {
  if (store.exercisePicker.dates) {
    const startTime = formatDateForQueryParameter(
      store.exercisePicker.dates[0]
    );
    const endTime = formatDateForQueryParameter(store.exercisePicker.dates[1]);

    await productionPartStore.fetchFiltered(startTime, endTime);
  } else {
    toast.add({
      severity: "info",
      summary: "Filtre invàlid",
      detail: "Seleccioni un període",
      life: 5000,
    });
  }
};

const dialogOptions = reactive({
  visible: false,
  title: "Crear tíquet de producció",
  closable: true,
  position: "center",
  modal: true,
} as DialogOptions);

onMounted(async () => {
  store.setMenuItem({
    icon: PrimeIcons.CLOUD,
    title: "Tíquets de producció",
  });

  workOrderStore.fetchAll();
  plantModelStore.fetchWorkcenters();
  plantModelStore.fetchOperators();
  plantModelStore.fetchMachineStatuses();

  await exerciseStore.fetchActive();
  setCurrentYear();

  filterData();
});

const productionPartRequest = ref({} as ProductionPart);
const generateNewRequest = (): ProductionPart => {
  return {
    id: getNewUuid(),
    operatorId: "",
    workCenterId: "",
    workOrderId: "",
    workOrderPhaseId: "",
    workOrderPhaseDetailId: "",
    time: 0,
    quantity: 0,
    date: new Date(),
  };
};

const getWorkOrderDetailedName = (productionPart: ProductionPart) => {
  if (
    productionPart.workOrder &&
    productionPart.workOrderPhase &&
    productionPart.workOrderPhaseDetail
  ) {
    const statusDesc = plantModelStore.getMachineStatusNameById(
      productionPart.workOrderPhaseDetail.machineStatusId
    );

    return `${productionPart.workOrder.code} - (${productionPart.workOrderPhase.code}) ${productionPart.workOrderPhase.description} - ${statusDesc}`;
  }
};

const createButtonClick = () => {
  productionPartRequest.value = generateNewRequest();
  dialogOptions.visible = true;
};

const createProductionPart = async () => {
  dialogOptions.visible = false;
  const created = await productionPartStore.create(productionPartRequest.value);
  if (created) {
    router.push({ path: `/productionpart` });
  }
};
</script>
