<template>
  <div class="realtime-panel-content">
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
import { onMounted, onUnmounted } from "vue";
import { PrimeIcons } from "primevue/api";
import { WorkcenterViewState } from "../../types";
import OperatorDetail from "./OperatorDetail.vue";
import { usePlantStore } from "../../store";

interface Props {
  workcenter: WorkcenterViewState;
}

const props = defineProps<Props>();
const plantStore = usePlantStore();

onMounted(() => {});

onUnmounted(() => {
  // Limpia el ObjectURL cuando el componente se desmonta
  plantStore.clearWorkcenterPicture();
});
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
  min-height: 200px;
}

.no-data i {
  margin-bottom: 0.5rem;
}

.no-data p {
  margin: 0;
  font-size: 0.9rem;
}
</style>
