<template>
  <div class="realtime-panel-content">
    <!-- Workcenter Picture Section 
    <Panel
      v-if="workcenterStore.workcenterPictureUrl"
      header="Imatge del centre de treball"
      :toggleable="true"
      class="panel-section"
    >
      <div class="picture-container">
        <img
          :src="workcenterStore.workcenterPictureUrl"
          alt="Imatge del centre de treball"
          class="workcenter-picture"
        />
      </div>
    </Panel>
    -->

    <!-- Machine Status Section -->
    <Panel header="Estat actual" :toggleable="false" class="panel-section">
      <MachineStatusDetail
        :status="currentStatus"
        :reason="currentReason"
        :startTime="workcenter.realtime?.statusStartTime"
      />
    </Panel>

    <!-- Current Work Order Section -->
    <Panel
      header="Ordre de fabricació"
      :toggleable="false"
      class="panel-section"
    >
      <div v-if="currentWorkOrderData" class="info-grid">
        <div class="info-item">
          <label>OF:</label>
          <span class="info-value font-bold">{{
            currentWorkOrderData.workOrderCode
          }}</span>
        </div>
        <div v-if="currentWorkOrderData.customer" class="info-item">
          <label>Client:</label>
          <span class="info-value font-bold">{{
            currentWorkOrderData.customer
          }}</span>
        </div>
        <div class="info-item">
          <label>Referència:</label>
          <span class="info-value">{{ currentWorkOrderData.reference }}</span>
        </div>

        <div v-if="currentWorkOrderData.phaseCode" class="info-item">
          <label>Fase:</label>
          <span class="info-value">
            <span class="font-bold">{{ currentWorkOrderData.phaseCode }}</span>
            <span v-if="currentWorkOrderData.phaseDescription">
              - {{ currentWorkOrderData.phaseDescription }}</span
            >
          </span>
        </div>
        <div v-if="currentWorkOrderData.loadedStartTime" class="info-item">
          <label>Hora d'inici:</label>
          <span class="info-value">{{
            formatDateTime(currentWorkOrderData.loadedStartTime)
          }}</span>
        </div>

        <div
          v-if="currentWorkOrderData.counterOk !== undefined"
          class="info-item"
        >
          <label>Unitats OK:</label>
          <span class="info-value counter-ok">{{
            currentWorkOrderData.counterOk
          }}</span>
        </div>
        <div
          v-if="currentWorkOrderData.counterKo !== undefined"
          class="info-item"
        >
          <label>Unitats KO:</label>
          <span class="info-value counter-ko">{{
            currentWorkOrderData.counterKo
          }}</span>
        </div>
      </div>
      <div v-else class="no-data">
        <p>No hi ha cap ordre de fabricació carregada</p>
      </div>
    </Panel>

    <!-- Current Operators -->
    <Panel header="Operaris" :toggleable="false" class="panel-section">
      <div
        v-if="
          workcenter.realtime?.operators &&
          workcenter.realtime.operators.length > 0
        "
        class="operators-list"
      >
        <OperatorDetail
          v-for="operator in workcenter.realtime.operators"
          :key="operator.operatorId"
          :operator="operator"
        />
      </div>
      <div v-else class="no-data">
        <p>No hi ha operaris fitxats</p>
      </div>
    </Panel>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from "vue";
import { WorkcenterViewState } from "../../types";
import OperatorDetail from "./OperatorDetail.vue";
import MachineStatusDetail from "../MachineStatusDetail.vue";
import { usePlantWorkcenterStore, usePlantDataStore } from "../../store";
import { formatDateTime } from "@/utils/functions";

interface Props {
  workcenter: WorkcenterViewState;
}

const props = defineProps<Props>();
const workcenterStore = usePlantWorkcenterStore();
const dataStore = usePlantDataStore();

const currentStatus = computed(() => {
  if (!props.workcenter.realtime?.statusId) return undefined;
  return dataStore.machineStatuses.find(
    (s) => s.id === props.workcenter.realtime?.statusId
  );
});

const currentReason = computed(() => {
  if (!props.workcenter.realtime?.statusReasonId || !currentStatus.value)
    return undefined;
  return currentStatus.value.reasons?.find(
    (r) => r.id === props.workcenter.realtime?.statusReasonId
  );
});

// Computed para mostrar datos de la orden de fabricación cargada
const currentWorkOrderData = computed(() => {
  // Usar la primera orden de trabajo cargada desde el WebSocket
  if (
    workcenterStore.loadedWorkOrders &&
    workcenterStore.loadedWorkOrders.length > 0 &&
    props.workcenter.realtime?.Workorders &&
    props.workcenter.realtime.Workorders.length > 0
  ) {
    const wo = workcenterStore.loadedWorkOrders[0];
    const activeWorkOrder = props.workcenter.realtime.Workorders[0];
    // Find the current phase from the loaded work order
    const currentPhase = wo.phases.find(
      (p) => p.phaseId === activeWorkOrder.WorkOrderPhaseId
    );

    return {
      workOrderCode: wo.workOrderCode,
      customer: wo.customerName,
      reference: wo.salesReferenceDisplay,
      phaseCode: currentPhase?.phaseCode,
      phaseDescription: currentPhase?.phaseDescription,
      loadedStartTime: activeWorkOrder.StartTime,
      counterOk: undefined, // TODO: Obtener de ProductionParts si es necesario
      counterKo: undefined, // TODO: Obtener de ProductionParts si es necesario
    };
  }

  return null;
});

onMounted(() => {});
onUnmounted(() => {});
</script>

<style scoped>
.realtime-panel-content {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto;
}

.panel-section {
  margin-bottom: 0;
}

.panel-section :deep(.p-panel-header) {
  background: var(--surface-50);
  font-weight: 600;
  font-size: 0.95rem;
  padding: 0.75rem 1rem;
}

.panel-section :deep(.p-panel-content) {
  padding: 1rem;
}

.picture-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 120px;
  border-radius: 8px;
  overflow: hidden;
}

.workcenter-picture {
  max-width: 100%;
  max-height: 200px;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.info-item.full-width {
  grid-column: 1 / -1;
}

.info-item label {
  font-size: 0.85rem;
  color: var(--text-color-secondary);
  font-weight: 500;
}

.info-value {
  font-size: 0.95rem;
  color: var(--text-color);
}

.info-description {
  font-size: 0.9rem;
  color: var(--text-color-secondary);
  font-style: italic;
}

.counter-ok {
  color: var(--green-600);
  font-weight: 700;
  font-size: 1.1rem;
}

.counter-ko {
  color: var(--red-600);
  font-weight: 700;
  font-size: 1.1rem;
}

.operators-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.no-data {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  text-align: center;
  padding: 2rem 1rem;
  color: var(--text-color-secondary);
}

.no-data i {
  margin-bottom: 0.5rem;
}

.no-data p {
  margin: 0;
  font-size: 0.9rem;
}
</style>
