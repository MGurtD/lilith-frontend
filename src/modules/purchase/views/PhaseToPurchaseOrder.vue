<template>
  <DataTable
    :value="workOrderStore.workorderPhases"
    class="p-datatable-sm small-datatable"
    tableStyle="min-width: 100%"
    scrollable
    scrollHeight="79vh"
    :sort-order="1"
    sort-field="date"
    paginator
    :rows="25"
    dataKey="id"
    ><template #header>
      <div
        class="flex flex-wrap align-items-center justify-content-between gap-2"
      >
        <span class="text-xl text-900 font-bold">Seleccionar fases</span>
        <div class="datatable-filter-3">
          <div class="filter-field">
            <ExerciseDatePicker
              :exercises="sharedStore.exercises"
              @range-selected="fetchWorkOrderPhases"
            />
          </div>
        </div>
        <div class="datatable-buttons">
          <Button
            class="datatable-button mr-2"
            :icon="PrimeIcons.FILTER"
            rounded
            raised
            @click="fetchWorkOrderPhases"
          />
          <Button
            class="datatable-button mr-2"
            :icon="PrimeIcons.FILTER_SLASH"
            rounded
            raised
            @click="cleanFilter"
          />
          <Button
            :size="'small'"
            label="Crear comandes"
            rounded
            @click="sendData"
          />
        </div>
      </div>
      <div
        class="flex flex-wrap align-items-center justify-content-between gap-2"
      >
        <div></div>
      </div>
    </template>
    <!--    <Column selectionMode="multiple" headerStyle="width: 1rem"></Column>-->
    <Column field="workOrder.code" header="Ordre de fabricació"></Column>
    <Column field="description" header="Fase" style="width: 15%"></Column>
    <Column header="Referència">
      <template #body="slotProps">
        {{ getName(slotProps.data.serviceReferenceId) }}
      </template>
    </Column>
    <Column field="workOrder.plannedQuantity" header="Quantitat planificada">
    </Column>
    <Column header="Proveïdor">
      <template #body="slotProps">
        <Dropdown
          v-model="selectedSuppliers[slotProps.data.id]"
          :options="suppliersByReference[slotProps.data.id]"
          placeholder="Selecciona..."
          optionValue="id"
          optionLabel="comercialName"
          @change="(event) => selectPhase(slotProps.data, event.value)"
          showClear
        >
        </Dropdown>
      </template>
    </Column>
  </DataTable>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useStore } from "../../../store";
import { useToast } from "primevue/usetoast";
import { PrimeIcons } from "primevue/api";
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useWorkOrderStore } from "../../production/store/workorder";
import { SupplierService } from "../services/suppliers.service";
import { PurchaseOrderFromWO, Supplier } from "../types";
import { useReferenceStore } from "../../shared/store/reference";
import { useSharedDataStore } from "../../shared/store/masterData";
import {
  DetailedWorkOrder,
  WorkOrder,
  WorkOrderPhase,
} from "../../production/types";
import { DetailedWorkOrderService } from "../../production/services/workorder.service";
import { useOrderStore } from "../store/order";
import { useUserFilterStore } from "../../../store/userfilter";
import { formatDateForQueryParameter } from "../../../utils/functions";
import ExerciseDatePicker from "../../../components/ExerciseDatePicker.vue";
import WorkorderPhase from "../../production/views/WorkorderPhase.vue";

const router = useRouter();
const store = useStore();
const toast = useToast();
const workOrderStore = useWorkOrderStore();
const supplierService = new SupplierService("/supplier");
const referenceStore = useReferenceStore();
const sharedStore = useSharedDataStore();
const orderStore = useOrderStore();
const userFilterStore = useUserFilterStore();

const selectedPhases = ref<WorkOrderPhase[]>([]);
const suppliersByReference = ref<{ [key: string]: Supplier[] }>({});
const selectedSuppliers = ref<{ [key: string]: string }>({});
const purchaseOrders = ref<PurchaseOrderFromWO[]>([]);

const mostrarToastError = (summary: string, detail: string) => {
  toast.add({
    severity: "error",
    summary: summary,
    detail: detail,
    life: 5000,
  });
};

const mostrarToastInfo = (summary: string, detail: string) => {
  toast.add({
    severity: "info",
    summary: summary,
    detail: detail,
    life: 5000,
  });
};

const obtenirDates = () => {
  if (store.exercisePicker.dates) {
    const startTime = formatDateForQueryParameter(
      store.exercisePicker.dates[0]
    );
    const endTime = formatDateForQueryParameter(store.exercisePicker.dates[1]);
    return [startTime, endTime];
  }
  return ["", ""];
};
const supplierMapping = ref<{ [key: string]: string }>({});

const selectPhase = (phase: WorkOrderPhase, selectedSupplierId: string) => {
  //console.log(selectedSupplierId);
  updatePhase(phase.id, selectedSupplierId);
  if (selectedSupplierId) {
    //console.log("aqui");
    selectedPhases.value.push(phase);
  } else {
    //console.log("aqui no: ", phase);
    selectedPhases.value = selectedPhases.value.filter(
      (p, ind) => p.id !== phase.id
    );
  }
  //console.log("phases: ", selectedPhases.value);
};

const updatePhase = (phaseId: string, selectedSupplierId: string) => {
  const phaseIndex = workOrderStore.workorderPhases?.findIndex(
    (phase) => phase.id === phaseId
  );

  if (phaseIndex !== -1) {
    supplierMapping.value[phaseId] = selectedSupplierId;
  } else {
    const selectedPhase = purchaseOrders.value.find(
      (phase) => phase.phaseId === phaseId
    );

    if (selectedPhase) {
      supplierMapping.value[phaseId] = selectedSupplierId;
    }
  }
};

const fetchWorkOrderPhases = async () => {
  if (!store.exercisePicker.dates) {
    mostrarToastInfo("Filtre Invàlid", "Seleccioni un perióde");
    return;
  }
  const [startTime, endTime] = obtenirDates();
  if (endTime == "") {
    return;
  }

  await workOrderStore.fetchExternalPhases(startTime, endTime);
  await fetchSuppliersForPhases();
};

onMounted(async () => {
  store.setMenuItem({
    icon: PrimeIcons.SHOPPING_CART,
    title: "Generació de comandes de compra",
  });
  await sharedStore.fetchMasterData();
  await referenceStore.fetchReferences();
  setCurrentYear();
  getUserFilter();
});

const fetchSuppliersForPhases = async () => {
  const allsuppliers = await supplierService.getAll();
  if (
    workOrderStore.workorderPhases &&
    workOrderStore.workorderPhases.length > 0
  ) {
    for (const phase of workOrderStore.workorderPhases) {
      if (phase && phase.serviceReferenceId != null) {
        const suppliers = await supplierService.getSuppliersReferenceById(
          phase.serviceReferenceId
        );
        if (suppliers === null) {
          if (allsuppliers) {
            suppliersByReference.value[phase.id] = allsuppliers;
          }
        } else {
          suppliersByReference.value[phase.id] = suppliers;
        }
      }
      //console.log(suppliersByReference.value[phase.id]);
    }
  }
};

onUnmounted(() => {
  const savedFilter = {
    exercisePicker: store.exercisePicker,
  };

  userFilterStore.addFilter("ExternalPhasesToPurhcaseOrders", "", savedFilter);
});

const getUserFilter = () => {
  const userFilter = userFilterStore.getFilter(
    "ExternalPhasesToPurhcaseOrders",
    ""
  );
  if (userFilter) {
    if (userFilter.exercisePicker) {
      store.exercisePicker.exercise = userFilter.exercisePicker.exercise;
      store.exercisePicker.dates = [
        new Date(userFilter.exercisePicker.dates[0]),
        new Date(userFilter.exercisePicker.dates[1]),
      ];
    }
  }
};

const setCurrentYear = () => {
  const year = new Date().getFullYear().toString();
  const currentExercise = sharedStore.exercises?.find((e) => e.name === year);

  if (currentExercise) {
    store.exercisePicker.exercise = currentExercise;
    store.exercisePicker.dates = [
      new Date(store.exercisePicker.exercise.startDate),
      new Date(store.exercisePicker.exercise.endDate),
    ];
  }
};

const cleanFilter = () => {
  setCurrentYear();

  //filterPhases();
};

const getName = (id: string) => {
  return referenceStore.getFullNameById(id) || "Desconeguda";
};

const sendData = async () => {
  if (selectedPhases.value.length == 0) {
    mostrarToastInfo(
      "OFs no seleccionades",
      "Has de seleccionar una OF com a mínim"
    );
    return;
  }
  /*for (const phaseId of Object.keys(supplierMapping.value)) {
    const supplierId = supplierMapping.value[phaseId];
    if (!supplierId) {
      mostrarToastError(
        "Proveïdors buits",
        "No poden haver-hi proveïdors buits"
      );
      return;
    }
  }*/

  for (const phase of selectedPhases.value) {
    console.log(phase.workOrder?.id, " - ", supplierMapping.value[phase.id]);
    purchaseOrders.value.push({
      workorderId: phase.workOrder?.id || "",
      workorderDescription: phase.description || "",
      phaseId: phase.id,
      phaseDescription: phase.description,
      serviceReferenceId: phase.serviceReferenceId || "",
      serviceReferenceName: getName(phase.serviceReferenceId || ""),
      supplierId: supplierMapping.value[phase.id],
      quantity: phase.workOrder?.plannedQuantity || 0, // o l'atribut que estigui adequat
    });
  }

  //console.log("sendData: ", purchaseOrders.value);
  const result = await orderStore.createFromWo(purchaseOrders.value);
  if (!result.result) {
    toast.add({
      severity: "error",
      summary: "Error creació",
      detail: "Error al crear la comanda",
      life: 5000,
    });
  } else {
    toast.add({
      severity: "success",
      summary: "Creació comandes",
      detail: "Comandes creades correctament",
      life: 5000,
    });
    router.push("/purchase-orders");
  }
};
</script>
