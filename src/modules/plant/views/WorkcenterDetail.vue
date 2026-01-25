<template>
  <div class="workcenter-detail">
    <!-- Main content -->
    <main class="workcenter-main" v-if="workcenter">
      <div class="content-layout">
        <!-- Left panel - Realtime data -->
        <aside class="realtime-panel">
          <WorkcenterRealtimePanel :workcenter="workcenter" />
        </aside>

        <!-- Right panel - Tabs -->
        <section class="tabs-panel">
          <TabView v-model:activeIndex="activeTab">
            <!-- Available Phases Tab -->
            <TabPanel>
              <template #header>
                <div class="flex align-items-center gap-2">
                  <i :class="PrimeIcons.CALENDAR"></i>
                  <span class="font-bold">Fases disponibles</span>
                </div>
              </template>
              <WorkcenterWorkOrderSelector
                :workcenterTypeId="workcenter.config.workcenterTypeId"
                @workorder-selected="handleWorkOrderSelected"
              />
            </TabPanel>

            <!-- Documentation Tab -->
            <TabPanel>
              <template #header>
                <div class="flex align-items-center gap-2">
                  <i :class="PrimeIcons.FILE"></i>
                  <span class="font-bold">Documentació</span>
                </div>
              </template>
              <WorkcenterDocumentation :workcenter="workcenter" />
            </TabPanel>
          </TabView>
        </section>
      </div>
    </main>

    <!-- Bottom panel - Touch device buttons -->
    <footer class="touch-panel">
      <div class="touch-buttons">
        <Button
          v-if="!isOperatorClockedIn"
          :icon="PrimeIcons.SIGN_IN"
          label="Fitxar entrada"
          severity="secondary"
          class="touch-button"
          @click="handleOperatorClockIn"
        />
        <Button
          v-if="isOperatorClockedIn"
          :icon="PrimeIcons.SIGN_OUT"
          label="Fitxar sortida"
          severity="secondary"
          class="touch-button"
          @click="handleOperatorClockOut"
        />
        <Button
          :icon="PrimeIcons.REFRESH"
          label="Canviar estat"
          severity="secondary"
          class="touch-button"
          @click="handleMachineStatusChange"
        />
        <Button
          v-if="hasLoadedPhase"
          :icon="PrimeIcons.STOP"
          label="Finalitzar fase"
          severity="secondary"
          class="touch-button"
          @click="handleWorkOrderPhaseClose"
        />
      </div>
    </footer>

    <!-- Machine Status Selector Dialog -->
    <MachineStatusSelector
      v-model:visible="statusSelectorVisible"
      :statuses="dataStore.machineStatuses"
      @status-changed="onStatusChanged"
    />

    <!-- Work Order Loader Dialog -->
    <WorkOrderLoader
      v-model:visible="workOrderLoaderVisible"
      :workOrderId="selectedWorkOrderData.workOrderId"
      :workOrderCode="selectedWorkOrderData.workOrderCode"
      :referenceCode="selectedWorkOrderData.referenceCode"
      :quantity="selectedWorkOrderData.quantity"
      :workcenterTypeId="workcenter?.config.workcenterTypeId || ''"
      @phase-detail-selected="handlePhaseDetailSelected"
    />

    <!-- Work Order Unloader Dialog -->
    <WorkOrderUnloader
      v-model:visible="workOrderUnloaderVisible"
      :workcenterId="id"
      :workOrderId="unloadWorkOrderData.workOrderId"
      :workOrderCode="unloadWorkOrderData.workOrderCode"
      :workOrderPhaseId="unloadWorkOrderData.workOrderPhaseId"
      :currentPhaseStatusId="unloadWorkOrderData.currentPhaseStatusId"
      :referenceCode="unloadWorkOrderData.referenceCode"
      :plannedQuantity="unloadWorkOrderData.plannedQuantity"
      :phaseDescription="unloadWorkOrderData.phaseDescription"
      :workcenterTypeId="workcenter?.config.workcenterTypeId || ''"
      @phase-unloaded="handlePhaseUnloaded"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { useToast } from "primevue/usetoast";
import { PrimeIcons } from "primevue/api";
import { useStore } from "../../../store";
import {
  usePlantWorkcenterStore,
  usePlantOperatorStore,
  usePlantDataStore,
} from "../store";
import WorkcenterRealtimePanel from "../components/workcenter-detail/WorkcenterRealtimePanel.vue";
import WorkcenterDocumentation from "../components/workcenter-detail/WorkcenterDocumentation.vue";
import WorkcenterWorkOrderSelector from "../components/workcenter-detail/WorkcenterWorkOrderSelector.vue";
import WorkOrderLoader from "../components/workcenter-detail/WorkOrderLoader.vue";
import WorkOrderUnloader from "../components/workcenter-detail/WorkOrderUnloader.vue";
import MachineStatusSelector from "../components/MachineStatusSelector.vue";
import { WorkOrderWithPhases } from "../../production/types";
import {
  useWebSocketConnection,
  WS_ENDPOINTS,
} from "../composables/useWebSocketConnection";
import {
  ChangeMachineStatusRequest,
  LoadWorkOrderPhaseRequest,
  UnloadWorkOrderPhaseRequest,
} from "../types";
import actionsService from "../services/actions.service";

const route = useRoute();
const toast = useToast();
const appStore = useStore();
const workcenterStore = usePlantWorkcenterStore();
const operatorStore = usePlantOperatorStore();
const dataStore = usePlantDataStore();
const { connect } = useWebSocketConnection();

const id = route.params.id as string;
const activeTab = ref(0);
const statusSelectorVisible = ref(false);
const workOrderLoaderVisible = ref(false);
const workOrderUnloaderVisible = ref(false);
const selectedWorkOrderData = ref({
  workOrderId: "",
  workOrderCode: "",
  referenceCode: "",
  quantity: 0,
});
const unloadWorkOrderData = ref({
  workOrderId: "",
  workOrderCode: "",
  workOrderPhaseId: "",
  currentPhaseStatusId: "",
  referenceCode: "",
  plannedQuantity: 0,
  phaseDescription: "",
});

const workcenter = computed(() => workcenterStore.workcenterView);

// Computed para determinar si el operario está fichado
const isOperatorClockedIn = computed(() => {
  if (!workcenter.value?.realtime?.operators || !operatorStore.operator) {
    return false;
  }
  return workcenter.value.realtime.operators.some(
    (op) => op.operatorId === operatorStore.operator!.id,
  );
});

// Computed para determinar si hay una fase cargada
const hasLoadedPhase = computed(() => {
  return (
    workcenter.value?.realtime?.workorders &&
    workcenter.value.realtime.workorders.length > 0
  );
});

onMounted(async () => {
  // 1. Carregar dades del workcenter
  await workcenterStore.fetchWorkcenter(id);

  if (!workcenter.value) {
    toast.add({
      severity: "error",
      summary: "Centre de treball no trobat",
      life: 4000,
    });
    return;
  }

  // 2. Configurar header
  appStore.setMenuItem({
    icon: PrimeIcons.COG,
    backButtonVisible: true,
    title: workcenter.value.config.description,
  });

  // 3. Carregar estats de màquina
  await dataStore.fetchMachineStatuses();

  // 4. Establir pestanya activa segons si hi ha fase carregada
  // Si hi ha fase carregada -> Documentació (tab 1), si no -> Fases disponibles (tab 0)
  activeTab.value = hasLoadedPhase.value ? 1 : 0;

  // 5. Connectar WebSocket específic del workcenter
  workcenterStore.connectToWorkcenter(id);
  connect(WS_ENDPOINTS.WORKCENTER(id), { debug: true });
});

onUnmounted(() => {
  // Netejar informació del workcenter dels stores
  workcenterStore.clearWorkcenter();
});

const handleOperatorClockIn = async () => {
  const result = await workcenterStore.clockInOperator();
  if (result) {
    toast.add({
      severity: "success",
      summary: "Entrada registrada correctament",
      life: 4000,
    });
  } else {
    toast.add({
      severity: "error",
      summary: "Error al registrar l'entrada",
      life: 4000,
    });
  }
};

const handleOperatorClockOut = async () => {
  const result = await workcenterStore.clockOutOperator();
  if (result) {
    toast.add({
      severity: "success",
      summary: "Sortida registrada correctament",
      life: 4000,
    });
  } else {
    toast.add({
      severity: "error",
      summary: "Error al registrar la sortida",
      life: 4000,
    });
  }
};

const handleMachineStatusChange = async () => {
  statusSelectorVisible.value = true;
};

const onStatusChanged = async (request: ChangeMachineStatusRequest) => {
  const result = await workcenterStore.changeMachineStatus(
    request.statusId,
    request.statusReasonId,
  );

  if (result) {
    toast.add({
      severity: "success",
      summary: "Estat canviat correctament",
      life: 4000,
    });
  } else {
    toast.add({
      severity: "error",
      summary: "Error al canviar l'estat",
      life: 4000,
    });
  }
};

const handleWorkOrderSelected = (workOrder: WorkOrderWithPhases) => {
  selectedWorkOrderData.value = {
    workOrderId: workOrder.workOrderId,
    workOrderCode: workOrder.workOrderCode,
    referenceCode: workOrder.salesReferenceDisplay,
    quantity: workOrder.plannedQuantity,
  };
  workOrderLoaderVisible.value = true;
};

const handlePhaseDetailSelected = async (data: {
  workOrderId: string;
  workOrderPhaseId: string;
  machineStatusId: string;
}) => {
  const request: LoadWorkOrderPhaseRequest = {
    workcenterId: id,
    workOrderPhaseId: data.workOrderPhaseId,
    machineStatusId: data.machineStatusId,
  };

  const result =
    await actionsService.client.loadWorkOrderPhaseAndMachineStatus(request);

  if (result) {
    workOrderLoaderVisible.value = false;
    // Refresh available work orders list
    if (workcenter.value?.config.workcenterTypeId) {
      await workcenterStore.fetchAvailableWorkOrders(
        workcenter.value.config.workcenterTypeId,
      );
    }
    toast.add({
      severity: "success",
      summary: "Fase de fabricació carregada",
      detail: "L'activitat s'ha carregat correctament al centre de treball",
      life: 4000,
    });
  } else {
    toast.add({
      severity: "error",
      summary: "Error al carregar la fase",
      detail: "No s'ha pogut carregar l'activitat",
      life: 4000,
    });
  }
};

const handleWorkOrderPhaseClose = async () => {
  if (
    !workcenter.value?.realtime?.workorders ||
    workcenter.value.realtime.workorders.length === 0
  ) {
    toast.add({
      severity: "warn",
      summary: "No hi ha cap fase carregada",
      life: 4000,
    });
    return;
  }

  // Extract current phase data from realtime and loaded work orders
  const currentActivePhase = workcenter.value.realtime.workorders[0];
  const loadedWorkOrder = workcenterStore.loadedWorkOrdersPhases?.[0];

  if (!loadedWorkOrder) {
    toast.add({
      severity: "error",
      summary: "No s'han pogut carregar les dades de l'ordre",
      life: 4000,
    });
    return;
  }

  // Find the matching phase in the loaded work order
  const currentPhase = loadedWorkOrder.phases.find(
    (p) => p.phaseId === currentActivePhase.workOrderPhaseId,
  );

  if (!currentPhase) {
    toast.add({
      severity: "error",
      summary: "No s'ha pogut trobar la fase actual",
      life: 4000,
    });
    return;
  }

  // Populate unload dialog data
  unloadWorkOrderData.value = {
    workOrderId: loadedWorkOrder.workOrderId,
    workOrderCode: loadedWorkOrder.workOrderCode,
    workOrderPhaseId: currentActivePhase.workOrderPhaseId,
    currentPhaseStatusId: currentPhase.phaseStatusId,
    referenceCode: loadedWorkOrder.salesReferenceDisplay,
    plannedQuantity: loadedWorkOrder.plannedQuantity,
    phaseDescription: currentPhase.phaseDescription,
  };

  workOrderUnloaderVisible.value = true;
};

const handlePhaseUnloaded = async (data: UnloadWorkOrderPhaseRequest) => {
  const result = await actionsService.client.unloadWorkOrderPhase(data);

  if (result) {
    workOrderUnloaderVisible.value = false;
    // Refresh available work orders list
    if (workcenter.value?.config.workcenterTypeId) {
      await workcenterStore.fetchAvailableWorkOrders(
        workcenter.value.config.workcenterTypeId,
      );
    }
    toast.add({
      severity: "success",
      summary: "Fase finalitzada correctament",
      life: 4000,
    });
  } else {
    toast.add({
      severity: "error",
      summary: "Error al finalitzar la fase",
      life: 4000,
    });
  }
};
</script>

<style scoped>
.workcenter-detail {
  display: flex;
  flex-direction: column;
  height: calc(100vh - var(--top-panel-height) - 1rem);
  overflow: hidden;
}

.workcenter-main {
  flex: 1;
  overflow: hidden;
  padding-bottom: 1rem;
}

.content-layout {
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 1rem;
  height: 100%;
}

.realtime-panel {
  background: var(--surface-0);
  border: 1px solid var(--surface-border);
  border-radius: var(--border-radius);
  overflow-y: auto;
  height: 100%;
}

.tabs-panel {
  background: var(--surface-0);
  border: 1px solid var(--surface-border);
  border-radius: var(--border-radius);
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.tabs-panel :deep(.p-tabview) {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.tabs-panel :deep(.p-tabview-panels) {
  flex: 1;
  overflow-y: auto;
}

.touch-panel {
  background: var(--surface-50);
  border-top: 1px solid var(--surface-border);
  padding: 0.75rem 1.5rem;
}

.touch-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.touch-button {
  min-width: 150px;
  font-size: 1.1rem;
  padding: 0.75rem 1.5rem;
}

.touch-button :deep(.p-button-icon) {
  font-size: 1.3rem;
}

@media (max-width: 1200px) {
  .content-layout {
    grid-template-columns: 300px 1fr;
  }
}

@media (max-width: 768px) {
  .content-layout {
    grid-template-columns: 1fr;
  }

  .realtime-panel {
    display: none;
  }

  .touch-buttons {
    flex-wrap: wrap;
  }

  .touch-button {
    flex: 1 1 calc(50% - 0.5rem);
    min-width: 120px;
  }
}
</style>
