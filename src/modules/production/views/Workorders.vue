<template>
  <DataTable
    :value="workOrderStore.workorders"
    tableStyle="min-width: 100%"
    scrollable
    scrollHeight="80vh"
    @row-click="editRow"
  >
    <template #header>
      <div
        class="flex flex-wrap align-items-center justify-content-between gap-2"
      >
        <div class="datatable-filter">
          <div class="filter-field">
            <ExerciseDatePicker :exercises="exerciseStore.exercises" />
          </div>
          <div class="filter-field">
            <label class="block text-900 mb-2">Estat</label>
            <Dropdown
              v-model="filter.statusId"
              editable
              :options="lifecycleStore.lifecycle?.statuses"
              optionValue="id"
              optionLabel="name"
              class="w-full"
            />
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
            class="datatable-button mr-2"
            :icon="PrimeIcons.FILTER_SLASH"
            rounded
            raised
            @click="cleanFilter"
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
    <Column field="code" header="Codi" style="width: 15%"></Column>
    <Column header="Referencia" style="width: 40%">
      <template #body="slotProps">
        {{ referenceStore.getFullNameById(slotProps.data.referenceId) }}
      </template>
    </Column>
    <Column field="statusId" header="Estat" style="width: 10%">
      <template #body="slotProps">
        {{ lifecycleStore.getStatusName(slotProps.data.statusId) }}
      </template>
    </Column>
    <Column field="plannedDate" header="Data Prevista" style="width: 10%">
      <template #body="slotProps">
        {{ formatDateTime(slotProps.data.plannedDate) }}
      </template>
    </Column>
    <Column
      field="plannedQuantity"
      header="Quantitat"
      style="width: 10%"
    ></Column>
    <Column>
      <template #body="slotProps">
        <i
          :class="PrimeIcons.TIMES"
          class="grid_delete_column_button"
          @click="deleteButton($event, slotProps.data)"
        />
      </template>
    </Column>
  </DataTable>

  <Dialog
    v-model:visible="dialogOptions.visible"
    :header="dialogOptions.title"
    :closable="dialogOptions.closable"
    :modal="dialogOptions.modal"
  >
    <FormCreateWorkorder
      :createWorkOrderDto="createWorkOrderDto"
      @submit="createWorkOrder"
    ></FormCreateWorkorder>
  </Dialog>
</template>
<script setup lang="ts">
import ExerciseDatePicker from "../../../components/ExerciseDatePicker.vue";
import FormCreateWorkorder from "../components/FormCreateWorkorder.vue";
import { BaseInputType } from "../../../types/component";
import { useRouter } from "vue-router";
import { useStore } from "../../../store";
import { onMounted, reactive, ref } from "vue";
import { PrimeIcons } from "primevue/api";
import { DataTableRowClickEvent } from "primevue/datatable";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import { useReferenceStore } from "../../shared/store/reference";
import { CreateWorkOrderDto, WorkOrder } from "../types";
import {
  formatDateForQueryParameter,
  formatDateTime,
} from "../../../utils/functions";
import { DialogOptions } from "../../../types/component";
import { useExerciseStore } from "../../shared/store/exercise";
import { useLifecyclesStore } from "../../shared/store/lifecycle";
import { useWorkOrderStore } from "../store/workorder";
import { useWorkMasterStore } from "../store/workmaster";

const router = useRouter();
const store = useStore();
const toast = useToast();
const confirm = useConfirm();
const workMasterStore = useWorkMasterStore();
const workOrderStore = useWorkOrderStore();
const referenceStore = useReferenceStore();
const exerciseStore = useExerciseStore();
const lifecycleStore = useLifecyclesStore();

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

const filter = ref({
  referenceId: undefined,
  statusId: undefined,
});
const cleanFilter = () => {
  filter.value.referenceId = undefined;
  filter.value.statusId = undefined;
};
const filterData = async () => {
  if (store.exercisePicker.dates) {
    const startTime = formatDateForQueryParameter(
      store.exercisePicker.dates[0]
    );
    const endTime = formatDateForQueryParameter(store.exercisePicker.dates[1]);

    await workOrderStore.fetchFiltered(
      startTime,
      endTime,
      filter.value.statusId
    );
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
  title: "Crear ordre",
  closable: true,
  position: "center",
  modal: true,
} as DialogOptions);

const createWorkOrderDto = ref({
  workMasterId: "",
  plannedDate: "",
  plannedQuantity: 0,
  comment: "",
} as CreateWorkOrderDto);

onMounted(async () => {
  await referenceStore.fetchReferencesByModule("sales");
  await exerciseStore.fetchActive();
  lifecycleStore.fetchOneByName("WorkOrder");
  workMasterStore.fetchAllActives();

  store.setMenuItem({
    icon: PrimeIcons.CALENDAR,
    title: "Ordres de fabricació",
  });

  setCurrentYear();
  filterData();
});

const createButtonClick = () => {
  dialogOptions.visible = true;
};

const editRow = (row: DataTableRowClickEvent) => {
  if (
    !(row.originalEvent.target as any).className.includes(
      "grid_delete_column_button"
    )
  ) {
    router.push({ path: `/workorder/${row.data.id}` });
  }
};

const createWorkOrder = async () => {
  if (!createWorkOrderDto.value) return;

  const created = await workOrderStore.create(createWorkOrderDto.value);
  if (created && workOrderStore.workorder)
    router.push({ path: `/workorder/${workOrderStore.workorder.id}` });
};

const deleteButton = (event: any, workorder: WorkOrder) => {
  confirm.require({
    target: event.currentTarget,
    message: `Está segur que vol eliminar la ordre ${workorder.code}?`,
    icon: "pi pi-question-circle",
    acceptIcon: "pi pi-check",
    rejectIcon: "pi pi-times",
    accept: async () => {
      const deleted = await workOrderStore.delete(workorder.id);

      if (deleted) {
        toast.add({
          severity: "success",
          summary: "Eliminada",
          life: 3000,
        });
        await workOrderStore.fetchAll();
      }
    },
  });
};
</script>