<template>
  <div class="realtime-panel-content">
    <!-- Current Work Order Section -->
    <Panel
      header="Ordre de fabricació actual"
      :toggleable="false"
      class="panel-section"
    >
      <div v-if="workcenter.workOrderCode" class="info-grid">
        <div class="info-item">
          <label>OF:</label>
          <span class="info-value font-bold">{{
            workcenter.workOrderCode
          }}</span>
        </div>
        <div class="info-item">
          <label>Referència:</label>
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
            formatDateTime(workcenter.phaseStartTime.toString())
          }}</span>
        </div>
        <div class="info-item" v-if="workcenter.phaseEndTime">
          <label>Fi fase:</label>
          <span class="info-value">{{
            formatDateTime(workcenter.phaseEndTime.toString())
          }}</span>
        </div>
        <div class="info-item">
          <label>Durada:</label>
          <span class="info-value">{{ calculateDuration() }}</span>
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
            formatTime(workcenter.shiftStartTime)
          }}</span>
        </div>
        <div class="info-item">
          <label>Fi:</label>
          <span class="info-value">{{
            formatTime(workcenter.shiftEndTime)
          }}</span>
        </div>
      </div>
    </Panel>

    <!-- Current Operators -->
    <Panel header="Operaris" :toggleable="false" class="panel-section">
      <div
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
            <small>{{ formatTime(operator.startTime) }}</small>
          </div>
        </div>
      </div>
      <div v-else class="no-data">
        <p>No hi ha operaris fitxats</p>
      </div>
    </Panel>

    <!-- Current Status -->
    <Panel header="Estat actual" :toggleable="false" class="panel-section">
      <div class="status-info">
        <Tag
          :value="workcenter.statusName"
          :severity="getStatusSeverity()"
          class="status-tag"
        />
        <div class="status-details">
          <p>{{ workcenter.statusDescription }}</p>
          <small v-if="workcenter.statusStartTime">
            Desde: {{ formatDateTime(workcenter.statusStartTime.toString()) }}
          </small>
        </div>
      </div>
    </Panel>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { WorkcenterRt } from "../../types";
import { formatDateTime } from "../../../../utils/functions";

interface Props {
  workcenter: WorkcenterRt;
}

const props = defineProps<Props>();

const formatTime = (date: Date | string): string => {
  if (!date) return "--:--";
  const d = new Date(date);
  return d.toLocaleTimeString("ca-ES", { hour: "2-digit", minute: "2-digit" });
};

const calculateDuration = (): string => {
  if (!props.workcenter.phaseStartTime) return "--";

  const start = new Date(props.workcenter.phaseStartTime);
  const now = new Date();
  const diff = now.getTime() - start.getTime();

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  return `${hours}h ${minutes}m`;
};

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
</script>

<style scoped>
.realtime-panel-content {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
}

.operators-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

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
}

.no-data p {
  margin: 0;
  font-size: 0.9rem;
}
</style>
