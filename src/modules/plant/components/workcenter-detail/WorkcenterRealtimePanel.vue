<template>
  <div class="realtime-panel-content">
    <!-- Current Work Order Section -->
    <Panel
      header="Ordre de fabricació actual"
      :toggleable="false"
      class="panel-section"
    >
      <div v-if="workcenter.realtime?.workOrderCode" class="info-grid">
        <div class="info-item">
          <label>OF:</label>
          <span class="info-value font-bold">{{
            workcenter.realtime.workOrderCode
          }}</span>
        </div>
        <div class="info-item">
          <label>Referència:</label>
          <span class="info-value">{{
            workcenter.realtime.referenceCode
          }}</span>
        </div>
        <div class="info-item full-width">
          <span class="info-description">{{
            workcenter.realtime.referenceDescription
          }}</span>
        </div>
        <div class="info-item">
          <label>Fase:</label>
          <span class="info-value"
            >{{ workcenter.realtime.phaseCode }} -
            {{ workcenter.realtime.phaseDescription }}</span
          >
        </div>
        <div class="info-item">
          <label>Unitats OK:</label>
          <span class="info-value counter-ok">{{
            workcenter.realtime.counterOk
          }}</span>
        </div>
        <div class="info-item">
          <label>Unitats KO:</label>
          <span class="info-value counter-ko">{{
            workcenter.realtime.counterKo
          }}</span>
        </div>
      </div>
      <div v-else class="no-data">
        <p>No hi ha treball assignat</p>
      </div>
    </Panel>

    <!-- Time Information -->
    <Panel header="Temps" :toggleable="false" class="panel-section">
      <div class="info-grid">
        <div class="info-item" v-if="workcenter.realtime?.phaseStartTime">
          <label>Inici fase:</label>
          <span class="info-value">{{
            formatDateTime(workcenter.realtime.phaseStartTime)
          }}</span>
        </div>
        <div class="info-item" v-if="workcenter.realtime?.phaseEndTime">
          <label>Fi fase:</label>
          <span class="info-value">{{
            formatDateTime(workcenter.realtime.phaseEndTime)
          }}</span>
        </div>
        <div class="info-item">
          <label>Durada:</label>
          <span class="info-value" v-if="workcenter.realtime?.phaseStartTime">{{
            calculateDuration(workcenter.realtime.phaseStartTime)
          }}</span>
          <span class="info-value" v-else>--:--:--</span>
        </div>
      </div>
    </Panel>

    <!-- Shift Information -->
    <Panel header="Torn" :toggleable="false" class="panel-section">
      <div class="info-grid">
        <div class="info-item">
          <label>Inici:</label>
          <span class="info-value">{{
            workcenter.realtime?.shiftDetailStartTime
              ? workcenter.realtime.shiftDetailStartTime
              : "--:--"
          }}</span>
        </div>
        <div class="info-item">
          <label>Fi:</label>
          <span class="info-value">{{
            workcenter.realtime?.shiftDetailEndTime
              ? workcenter.realtime.shiftDetailEndTime
              : "--:--"
          }}</span>
        </div>
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
        <div
          v-for="operator in workcenter.realtime.operators"
          :key="operator.operatorId"
          class="operator-item"
        >
          <div class="operator-info">
            <span class="operator-name">{{ operator.operatorName }}</span>
            <span class="operator-type">{{ operator.operatorTypeName }}</span>
          </div>
          <div class="operator-time">
            <small>{{ formatDateTime(operator.operatorStartTime) }}</small>
          </div>
        </div>
      </div>
      <div v-else class="no-data">
        <p>No hi ha operaris fitxats</p>
      </div>
    </Panel>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { WorkcenterViewState } from "../../types";
import { formatDateTime, calculateDuration } from "../../../../utils/functions";

interface Props {
  workcenter: WorkcenterViewState;
}

const props = defineProps<Props>();

onMounted(() => {});

onUnmounted(() => {});
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
