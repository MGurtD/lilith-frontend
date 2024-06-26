<template>
  <div>
    <DataTable
      class="p-datatable-sm"
      tableStyle="min-width:100%"
      scrollable
      scrollHeight="80vh"
      sortField="movementDate"
      :sortOrder="1"
      :value="stockMovementStore.stockMovements"
    >
      <template #header>
        <div
          class="flex flex-wrap align-items-center justify-content-between gap-2"
        >
          <div class="datatable-filter">
            <div class="filter-field">
              <ExerciseDatePicker
                :exercises="exerciseStore.exercises"
                @range-selected="filterMovements"
              />
            </div>
          </div>
          <div class="datatable-buttons">
            <Button
              class="datatable-button mr-2"
              :icon="PrimeIcons.FILTER"
              rounded
              raised
              @click="filterMovements"
            />
            <Button
              class="datatable-button mr-2"
              :icon="PrimeIcons.FILTER_SLASH"
              rounded
              raised
              @click="cleanFilter"
            />
          </div>
        </div>
      </template>
      <Column header="Data" field="movementDate" sortable style="width: 15%">
        <template #body="slotProps">
          {{ formatDateTime(slotProps.data.movementDate) }}
        </template>
      </Column>
      <Column header="Referència" style="width: 20%">
        <template #body="slotProps">
          {{ referenceStore.getFullNameById(slotProps.data.referenceId) }}
        </template></Column
      >
      <Column field="width" header="Ample (x) mm" style="width: 5%"></Column>
      <Column field="length" header="Llarg (y) mm" style="width: 5%"></Column>
      <Column field="height" header="Alt (z) mm" style="width: 5%"></Column>
      <Column field="diameter" header="Diámetre mm" style="width: 5%"></Column>
      <Column field="thickness" header="Gruix mm" style="width: 5%"></Column>
      <Column
        field="description"
        header="Descripció"
        style="width: 25%"
      ></Column>
      <Column
        field="movementType"
        header="Tipus de moviment"
        style="width: 10%"
      ></Column>
      <Column field="quantity" header="Quantitat" style="width: 10%"></Column>
    </DataTable>
  </div>
</template>
<script setup lang="ts">
import ExerciseDatePicker from "../../../components/ExerciseDatePicker.vue";
import { useToast } from "primevue/usetoast";
import { useStore } from "../../../store";
import { useStockMovementStore } from "../store/stockMovement";
import { useReferenceStore } from "../../shared/store/reference";
import { useExerciseStore } from "../../shared/store/exercise";
import { onMounted, ref } from "vue";
import { PrimeIcons } from "primevue/api";
import { Exercise } from "../../shared/types";
import {
  formatDateForQueryParameter,
  formatDateTime,
} from "../../../utils/functions";

const toast = useToast();
const store = useStore();
const stockMovementStore = useStockMovementStore();
const referenceStore = useReferenceStore();
const exerciseStore = useExerciseStore();

const filter = ref({
  exercise: undefined as Exercise | undefined,
});

onMounted(async () => {
  store.setMenuItem({
    icon: PrimeIcons.MAP,
    title: "Moviments de magatzem",
  });
  await exerciseStore.fetchAll();
  await referenceStore.fetchReferences();
  setCurrentYear();
});

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

const cleanFilter = () => {
  store.cleanExercisePicker();
};

const filterLocalStorageKey = "temges.stockMovements.filter";
const filterMovements = async () => {
  if (store.exercisePicker.dates) {
    const startTime = formatDateForQueryParameter(
      store.exercisePicker.dates[0]
    );
    const endTime = formatDateForQueryParameter(store.exercisePicker.dates[1]);

    await stockMovementStore.GetBetweenDates(startTime, endTime);

    localStorage.setItem(filterLocalStorageKey, JSON.stringify(filter.value));
  } else {
    toast.add({
      severity: "info",
      summary: "Filtre invàlid",
      detail: "Seleccioni un període",
      life: 5000,
    });
  }
};

const getReferenceNameById = (id: string) => {
  const reference = referenceStore.references?.find((s) => s.id === id);
  if (reference) return reference.description;
  else return "";
};
</script>
