<template>
  <div class="workcenter-card" @click="handleClick">
    <div class="workcenter-card__status" :class="statusClass"></div>

    <div class="workcenter-card__header">
      <div class="workcenter-card__title">
        <i :class="PrimeIcons.COG" class="workcenter-card__icon"></i>
        <h3>{{ workcenter.config.description }}</h3>
      </div>
      <!-- <span class="workcenter-card__badge" :class="badgeClass">
        {{ workcenter.realtime?.statusName || "Sense dades" }}
      </span> -->
    </div>

    <div class="workcenter-card__content">
      <div class="workcenter-card__stat">
        <div class="stat__label">
          <i class="pi pi-hashtag"></i>
          <span>Ordre</span>
        </div>
        <div class="stat__value">
          {{ workcenter.realtime?.workOrderCode || "-" }}
        </div>
      </div>

      <div class="workcenter-card__stat">
        <div class="stat__label">
          <i class="pi pi-tag"></i>
          <span>Referència</span>
        </div>
        <div class="stat__value">
          {{ formattedReference }}
        </div>
      </div>

      <div class="workcenter-card__stat">
        <div class="stat__label">
          <i :class="PrimeIcons.CLOCK"></i>
          <span>Temps</span>
        </div>
        <div class="stat__value stat__value--time">
          {{ formattedTime }}
        </div>
      </div>

      <div class="workcenter-card__stat">
        <div class="stat__label">
          <i :class="PrimeIcons.USERS"></i>
          <span>Operaris</span>
        </div>
        <div class="stat__value">
          {{ workcenter.realtime?.operators.length || 0 }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PrimeIcons } from "primevue/api";
import { computed } from "vue";
import { WorkcenterViewState, WorkcenterRealtime } from "../types";

interface Props {
  workcenter: WorkcenterViewState;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "click", workcenterId: string): void;
}>();

// Formatear referencia con código y descripción
const formattedReference = computed((): string => {
  const snapshot = props.workcenter.realtime;
  if (!snapshot?.referenceCode) return "-";
  if (snapshot.phaseDescription) {
    return `${snapshot.referenceCode} - ${snapshot.phaseDescription}`;
  }
  return snapshot.referenceCode;
});

// Formatear tiempo desde statusStartTime
const formattedTime = computed((): string => {
  const startTime = props.workcenter.realtime?.statusStartTime;
  if (!startTime) return "--:--:--";

  const start = new Date(startTime);
  const now = new Date();
  const diff = Math.floor((now.getTime() - start.getTime()) / 1000); // segundos

  if (diff < 0) return "--:--:--";

  const hours = Math.floor(diff / 3600);
  const minutes = Math.floor((diff % 3600) / 60);
  const seconds = diff % 60;

  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
});

// Determinar clase de estado según snapshot
const statusClass = computed((): string => {
  const snapshot = props.workcenter.realtime;
  if (!snapshot) return "workcenter-card__status--idle";

  if (snapshot.statusStopped) return "workcenter-card__status--stopped";
  if (snapshot.statusClosed) return "workcenter-card__status--idle";

  return "workcenter-card__status--active";
});

// Determinar clase de badge según snapshot
const badgeClass = computed((): string => {
  const snapshot = props.workcenter.realtime;
  if (!snapshot) return "workcenter-card__badge--idle";

  if (snapshot.statusStopped) return "workcenter-card__badge--stopped";
  if (snapshot.statusClosed) return "workcenter-card__badge--idle";

  return "workcenter-card__badge--running";
});

const handleClick = () => {
  emit("click", props.workcenter.config.id);
};
</script>

<style scoped>
/* Workcenter Card */
.workcenter-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid var(--surface-border);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  position: relative;
}

.workcenter-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  border-color: var(--primary-400);
}

.workcenter-card__status {
  height: 6px;
  width: 100%;
}

.workcenter-card__status--active {
  background: linear-gradient(90deg, var(--green-500), var(--green-600));
}

.workcenter-card__status--stopped {
  background: linear-gradient(90deg, var(--red-500), var(--red-600));
}

.workcenter-card__status--idle {
  background: linear-gradient(90deg, var(--yellow-500), var(--yellow-600));
}

/* Card Header */
.workcenter-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem 1rem;
  border-bottom: 1px solid var(--surface-border);
}

.workcenter-card__title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.workcenter-card__icon {
  font-size: 1.5rem;
  color: var(--primary-600);
}

.workcenter-card__title h3 {
  margin: 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-color);
}

.workcenter-card__badge {
  padding: 0.4rem 0.9rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.workcenter-card__badge--running {
  background: var(--green-100);
  color: var(--green-700);
}

.workcenter-card__badge--stopped {
  background: var(--red-100);
  color: var(--red-700);
}

.workcenter-card__badge--idle {
  background: var(--yellow-100);
  color: var(--yellow-700);
}

/* Card Content */
.workcenter-card__content {
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.workcenter-card__stat {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: var(--surface-50);
  border-radius: 8px;
  transition: background 0.2s ease;
}

.workcenter-card__stat:hover {
  background: var(--surface-100);
}

.stat__label {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: var(--text-color-secondary);
  font-size: 0.9rem;
  font-weight: 500;
}

.stat__label i {
  font-size: 1.1rem;
  color: var(--primary-500);
}

.stat__value {
  font-weight: 700;
  font-size: 1rem;
  color: var(--text-color);
}

.stat__value--time {
  font-family: "Courier New", monospace;
  font-size: 1.1rem;
  color: var(--primary-600);
}
</style>
