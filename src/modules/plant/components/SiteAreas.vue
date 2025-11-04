<template>
  <main class="plant-layout">
    <div v-for="area in plantStore.areas" :key="area.id" class="area-section">
      <header
        class="area__header"
        @click="toggleArea(area.id)"
        v-if="area.workcenters && area.workcenters.length > 0"
      >
        <div class="area__header-content">
          <i class="pi pi-building area__icon"></i>
          <span class="area__name">{{ area.name }}</span>
          <span class="area__count">{{ area.workcenters.length }} centres</span>
        </div>
        <i
          :class="
            isAreaVisible(area.id) ? 'pi pi-chevron-up' : 'pi pi-chevron-down'
          "
          class="area__toggle-icon"
        ></i>
      </header>

      <section v-show="isAreaVisible(area.id)" class="area__workcenters">
        <div
          v-for="workcenter in area.workcenters"
          :key="workcenter.id"
          class="workcenter-card"
          @click="() => $router.push(`/workcenter-detail/${workcenter.id}`)"
        >
          <div
            class="workcenter-card__status workcenter-card__status--active"
          ></div>

          <div class="workcenter-card__header">
            <div class="workcenter-card__title">
              <i :class="PrimeIcons.COG" class="workcenter-card__icon"></i>
              <h3>{{ workcenter.description }}</h3>
            </div>
            <span
              class="workcenter-card__badge workcenter-card__badge--running"
            >
              En marxa
            </span>
          </div>

          <div class="workcenter-card__content">
            <div class="workcenter-card__stat">
              <div class="stat__label">
                <i class="pi pi-hashtag"></i>
                <span>Ordre</span>
              </div>
              <div class="stat__value">24009</div>
            </div>

            <div class="workcenter-card__stat">
              <div class="stat__label">
                <i class="pi pi-tag"></i>
                <span>Referència</span>
              </div>
              <div class="stat__value">5760P - Rectificació</div>
            </div>

            <div class="workcenter-card__stat">
              <div class="stat__label">
                <i :class="PrimeIcons.CLOCK"></i>
                <span>Temps</span>
              </div>
              <div class="stat__value stat__value--time">01:30:52</div>
            </div>

            <div class="workcenter-card__stat">
              <div class="stat__label">
                <i :class="PrimeIcons.USERS"></i>
                <span>Operaris</span>
              </div>
              <div class="stat__value">2</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { PrimeIcons } from "primevue/api";
import { ref, onMounted } from "vue";
import { usePlantStore } from "../store";

const plantStore = usePlantStore();
const visibleAreas = ref<Set<string>>(new Set());

// Show all areas by default
onMounted(() => {
  plantStore.areas.forEach((area) => {
    if (area.workcenters && area.workcenters.length > 0) {
      visibleAreas.value.add(area.id);
    }
  });
});

const toggleArea = (areaId: string) => {
  if (visibleAreas.value.has(areaId)) {
    visibleAreas.value.delete(areaId);
  } else {
    visibleAreas.value.add(areaId);
  }
};

const isAreaVisible = (areaId: string): boolean => {
  return visibleAreas.value.has(areaId);
};
</script>

<style scoped>
.plant-layout {
  padding: 0.5rem;
  background: var(--surface-ground);
  min-height: 100vh;
}

.area-section {
  margin-bottom: 2.5rem;
}

/* Area Header */
.area__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(135deg, var(--primary-500), var(--primary-600));
  color: white;
  padding: 1.25rem 1.75rem;
  border-radius: 12px;
  cursor: pointer;
  user-select: none;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.area__header:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.area__header-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.area__icon {
  font-size: 1.75rem;
  opacity: 0.9;
}

.area__name {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.area__count {
  background: rgba(255, 255, 255, 0.25);
  padding: 0.35rem 0.85rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
}

.area__toggle-icon {
  font-size: 1.5rem;
  transition: transform 0.3s ease;
}

/* Workcenters Grid */
.area__workcenters {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  animation: fadeIn 0.4s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

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

/* Responsive */
@media (max-width: 1400px) {
  .area__workcenters {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
}

@media (max-width: 768px) {
  .plant-layout {
    padding: 1rem;
  }

  .area__header {
    padding: 1rem 1.25rem;
  }

  .area__name {
    font-size: 1.25rem;
  }

  .area__workcenters {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>
