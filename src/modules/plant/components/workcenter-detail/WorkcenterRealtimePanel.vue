<template>
  <div class="realtime-panel-content">
<<<<<<< HEAD
    <!-- Workcenter Picture Section -->
    <Panel
      v-if="plantStore.workcenterPictureUrl"
      header="Imatge del centre de treball"
      :toggleable="true"
      class="panel-section"
    >
      <div class="picture-container">
        <img
          :src="plantStore.workcenterPictureUrl"
          alt="Imatge del centre de treball"
          class="workcenter-picture"
        />
      </div>
    </Panel>

=======
>>>>>>> origin/main
    <!-- Current Work Order Section -->
    <Panel
      header="Ordre de fabricació actual"
      :toggleable="false"
      class="panel-section"
    >
<<<<<<< HEAD
      <template #icons>
        <Button
          v-if="currentWorkOrderData"
          :icon="PrimeIcons.PENCIL"
          @click="openWorkOrderSelector"
          text
          rounded
          size="small"
          severity="secondary"
          v-tooltip.left="'Canviar ordre de fabricació'"
        />
      </template>
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
=======
      <div v-if="workcenter.workOrderCode" class="info-grid">
        <div class="info-item">
          <label>OF:</label>
          <span class="info-value font-bold">{{
            workcenter.workOrderCode
>>>>>>> origin/main
          }}</span>
        </div>
        <div class="info-item">
          <label>Referència:</label>
<<<<<<< HEAD
          <span class="info-value">{{
            referenceStore.getFullName(currentWorkOrderData.reference!)
          }}</span>
        </div>
        <!-- <div v-if="currentWorkOrderData.phaseCode" class="info-item">
          <label>Fase:</label>
          <span class="info-value"
            >{{ currentWorkOrderData.phaseCode }} -
            {{ currentWorkOrderData.phaseDescription }}</span
          >
        </div> -->
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
        <Button
          label="Seleccionar ordre de fabricació"
          :icon="PrimeIcons.PLUS"
          @click="openWorkOrderSelector"
          severity="secondary"
          outlined
        />
=======
          <span class="info-value">{{ workcenter.referenceCode }}</span>
        </div>
        <div class="info-item full-width">
          <span class="info-description">{{
            workcenter.referenceDescription
          }}</span>
        </div>
        <div class="info-item">
          <label>Fase:</label>
          <span class="info-value"
            >{{ workcenter.phaseCode }} -
            {{ workcenter.phaseDescription }}</span
          >
        </div>
      </div>
      <div v-else class="no-data">
        <p>No hi ha treball assignat</p>
      </div>
    </Panel>

    <!-- Production Counters -->
    <Panel header="Producció" :toggleable="false" class="panel-section">
      <div class="counters-grid">
        <div class="counter-card ok">
          <div class="counter-label">Unitats OK</div>
          <div class="counter-value">{{ workcenter.counterOk }}</div>
        </div>
        <div class="counter-card ko">
          <div class="counter-label">Unitats KO</div>
          <div class="counter-value">{{ workcenter.counterKo }}</div>
        </div>
      </div>
    </Panel>

    <!-- Time Information -->
    <Panel header="Temps" :toggleable="false" class="panel-section">
      <div class="info-grid">
        <div class="info-item">
          <label>Hora actual:</label>
          <span class="info-value font-bold">{{ workcenter.currentTime }}</span>
        </div>
        <div class="info-item" v-if="workcenter.phaseStartTime">
          <label>Inici fase:</label>
          <span class="info-value">{{
            formatDateTime(workcenter.phaseStartTime)
          }}</span>
        </div>
        <div class="info-item" v-if="workcenter.phaseEndTime">
          <label>Fi fase:</label>
          <span class="info-value">{{
            formatDateTime(workcenter.phaseEndTime)
          }}</span>
        </div>
        <div class="info-item">
          <label>Durada:</label>
          <span class="info-value" v-if="workcenter.phaseStartTime">{{
            calculateDuration(workcenter.phaseStartTime)
          }}</span>
          <span class="info-value" v-else>--:--:--</span>
        </div>
      </div>
    </Panel>

    <!-- Shift Information -->
    <Panel header="Torn" :toggleable="false" class="panel-section">
      <div class="info-grid">
        <div class="info-item">
          <label>Torn actual:</label>
          <span class="info-value font-bold">{{ workcenter.shiftName }}</span>
        </div>
        <div class="info-item">
          <label>Inici:</label>
          <span class="info-value">{{
            formatTime(workcenter.shiftDetailStartTime)
          }}</span>
        </div>
        <div class="info-item">
          <label>Fi:</label>
          <span class="info-value">{{
            formatTime(workcenter.shiftDetailEndTime)
          }}</span>
        </div>
>>>>>>> origin/main
      </div>
    </Panel>

    <!-- Current Operators -->
    <Panel header="Operaris" :toggleable="false" class="panel-section">
      <div
<<<<<<< HEAD
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
=======
        v-if="workcenter.operators && workcenter.operators.length > 0"
        class="operators-list"
      >
        <div
          v-for="operator in workcenter.operators"
          :key="operator.operatorId"
          class="operator-item"
        >
          <div class="operator-info">
            <span class="operator-name">{{ operator.operatorName }}</span>
            <span class="operator-type">{{ operator.operatorTypeName }}</span>
          </div>
          <div class="operator-time">
            <small>TODO !</small>
          </div>
        </div>
>>>>>>> origin/main
      </div>
      <div v-else class="no-data">
        <p>No hi ha operaris fitxats</p>
      </div>
    </Panel>

<<<<<<< HEAD
    <!-- Dialog Work Order Selector -->
    <Dialog
      v-model:visible="workOrderSelectorVisible"
      modal
      header="Seleccionar ordre de fabricació"
      :style="{ width: '90vw', maxWidth: '1200px' }"
    >
      <WorkcenterWorkOrderSelector
        :workcenterId="workcenter.config.id"
        :excludeWorkOrderId="plantStore.selectedWorkOrder?.id"
        @workorder-selected="onWorkOrderSelected"
      />
    </Dialog>
=======
    <!-- Current Status -->
    <Panel header="Estat actual" :toggleable="false" class="panel-section">
      <div class="status-info">
        <Tag
          :value="workcenter.statusName"
          :severity="getStatusSeverity()"
          class="status-tag"
        />
        <div class="status-details">
          <p>{{ workcenter.statusName }}</p>
          <small v-if="workcenter.statusStartTime">
            Desde: {{ formatDateTime(workcenter.statusStartTime.toString()) }}
          </small>
        </div>
      </div>
    </Panel>
>>>>>>> origin/main
  </div>
</template>

<script setup lang="ts">
<<<<<<< HEAD
import { ref, computed, onMounted, onUnmounted } from "vue";
import { PrimeIcons } from "primevue/api";
import { WorkcenterViewState } from "../../types";
import { WorkOrder } from "../../../production/types";
import OperatorDetail from "./OperatorDetail.vue";
import WorkcenterWorkOrderSelector from "./WorkcenterWorkOrderSelector.vue";
import { usePlantStore } from "../../store";
import { useReferenceStore } from "../../../shared/store/reference";

interface Props {
  workcenter: WorkcenterViewState;
}

const props = defineProps<Props>();
const plantStore = usePlantStore();
const referenceStore = useReferenceStore();

const workOrderSelectorVisible = ref(false);

// Computed para decidir qué datos mostrar (prioridad: selectedWorkOrder > realtime)
const currentWorkOrderData = computed(() => {
  // Si hay una WorkOrder seleccionada manualmente, usar esa
  if (plantStore.selectedWorkOrder) {
    const wo = plantStore.selectedWorkOrder;
    // Obtener la primera fase si existe
    const firstPhase = wo.phases && wo.phases.length > 0 ? wo.phases[0] : null;

    return {
      workOrderCode: wo.code,
      reference: wo.reference,
      customer: wo.reference?.customer?.comercialName,
      phaseCode: firstPhase?.code,
      phaseDescription: firstPhase?.description,
      counterOk: undefined, // No disponible en WorkOrder manual
      counterKo: undefined, // No disponible en WorkOrder manual
    };
  }

  // Si no, usar datos del WebSocket
  if (props.workcenter.realtime?.workOrderCode) {
    return {
      workOrderCode: props.workcenter.realtime.workOrderCode,
      referenceCode: props.workcenter.realtime.referenceCode || "",
      referenceDescription:
        props.workcenter.realtime.referenceDescription || "",
      phaseCode: props.workcenter.realtime.phaseCode,
      phaseDescription: props.workcenter.realtime.phaseDescription,
      counterOk: props.workcenter.realtime.counterOk,
      counterKo: props.workcenter.realtime.counterKo,
    };
  }

  return null;
});

const openWorkOrderSelector = () => {
  workOrderSelectorVisible.value = true;
};

const onWorkOrderSelected = (workOrder: WorkOrder) => {
  plantStore.setSelectedWorkOrder(workOrder);
  workOrderSelectorVisible.value = false;

  // Opcional: cargar documentos de instrucciones de producción
  plantStore.fetchWorkInstructionDocuments(workOrder.reference?.id!);
};

onMounted(() => {});

onUnmounted(() => {
  // Limpia el ObjectURL cuando el componente se desmonta
  plantStore.clearWorkcenterPicture();
  // Opcionalmente limpiar la WorkOrder seleccionada
  // plantStore.clearSelectedWorkOrder();
});
=======
import { computed } from "vue";
import { WorkcenterRt } from "../../types";
import {
  formatDateTime,
  formatTime,
  calculateDuration,
} from "../../../../utils/functions";

interface Props {
  workcenter: WorkcenterRt;
}

const props = defineProps<Props>();

const getStatusSeverity = ():
  | "success"
  | "info"
  | "warning"
  | "danger"
  | "secondary"
  | "contrast"
  | undefined => {
  const statusName = props.workcenter.statusName?.toLowerCase() || "";

  if (statusName.includes("producció") || statusName.includes("activa")) {
    return "success";
  } else if (statusName.includes("parada") || statusName.includes("aturada")) {
    return "danger";
  } else if (
    statusName.includes("preparació") ||
    statusName.includes("setup")
  ) {
    return "warning";
  } else if (statusName.includes("manteniment")) {
    return "info";
  }

  return "secondary";
};
>>>>>>> origin/main
</script>

<style scoped>
.realtime-panel-content {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
<<<<<<< HEAD
  overflow-y: auto;
=======
>>>>>>> origin/main
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

<<<<<<< HEAD
.picture-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  border-radius: 8px;
  overflow: hidden;
}

.workcenter-picture {
  max-width: 100%;
  max-height: 400px;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

=======
>>>>>>> origin/main
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

<<<<<<< HEAD
.counter-ok {
  color: var(--green-600);
  font-weight: 700;
  font-size: 1.1rem;
}

.counter-ko {
  color: var(--red-600);
  font-weight: 700;
  font-size: 1.1rem;
=======
.counters-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.counter-card {
  padding: 1rem;
  border-radius: var(--border-radius);
  text-align: center;
  border: 2px solid;
}

.counter-card.ok {
  background: var(--green-50);
  border-color: var(--green-500);
}

.counter-card.ko {
  background: var(--red-50);
  border-color: var(--red-500);
}

.counter-label {
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

.counter-card.ok .counter-label {
  color: var(--green-700);
}

.counter-card.ko .counter-label {
  color: var(--red-700);
}

.counter-value {
  font-size: 2rem;
  font-weight: 700;
}

.counter-card.ok .counter-value {
  color: var(--green-600);
}

.counter-card.ko .counter-value {
  color: var(--red-600);
>>>>>>> origin/main
}

.operators-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

<<<<<<< HEAD
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
=======
.operator-item {
  padding: 0.75rem;
  background: var(--surface-50);
  border-radius: var(--border-radius);
  border-left: 3px solid var(--primary-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.operator-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.operator-name {
  font-weight: 600;
  font-size: 0.95rem;
}

.operator-type {
  font-size: 0.85rem;
  color: var(--text-color-secondary);
}

.operator-time {
  color: var(--text-color-secondary);
  font-size: 0.85rem;
}

.status-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.status-tag {
  font-size: 1rem;
  padding: 0.5rem 1rem;
}

.status-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.status-details p {
  margin: 0;
  font-size: 0.9rem;
}

.status-details small {
  color: var(--text-color-secondary);
  font-size: 0.85rem;
}

.no-data {
  text-align: center;
  padding: 1rem;
  color: var(--text-color-secondary);
>>>>>>> origin/main
}

.no-data p {
  margin: 0;
  font-size: 0.9rem;
}
</style>
