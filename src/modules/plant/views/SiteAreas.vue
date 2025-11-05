<template>
  <main class="plant-layout">
    <div v-for="area in plantStore.areas" :key="area.id" class="area-section">
      <header
        class="area__header"
        @click="toggleArea(area.id)"
        v-if="getAreaWorkcenters(area.id).length > 0"
      >
        <div class="area__header-content">
          <i class="pi pi-building area__icon"></i>
          <span class="area__name">{{ area.name }}</span>
          <span class="area__count"
            >{{ getAreaWorkcenters(area.id).length }} centres</span
          >
        </div>
        <i
          :class="
            isAreaVisible(area.id) ? 'pi pi-chevron-up' : 'pi pi-chevron-down'
          "
          class="area__toggle-icon"
        ></i>
      </header>

      <section v-show="isAreaVisible(area.id)" class="area__workcenters">
        <WorkcenterCard
          v-for="view in getAreaWorkcenters(area.id)"
          :key="view.config.id"
          :workcenter="view"
          @click="(id: string) => $router.push(`/plant/workcenter/${id}`)"
        />
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { usePlantStore } from "../store";
import { WorkcenterViewState } from "../types";
import WorkcenterCard from "../components/WorkcenterCard.vue";
import { useStore } from "../../../store";
import { PrimeIcons } from "primevue/api";
import {
  useWebSocketConnection,
  WS_ENDPOINTS,
} from "../composables/useWebSocketConnection";

const store = useStore();
const plantStore = usePlantStore();
const visibleAreas = ref<Set<string>>(new Set());
const { connect } = useWebSocketConnection();

// Show all areas by default
onMounted(async () => {
  // 1. Carregar dades mestres d'àrees i workcenters
  await plantStore.fetchAreasWithWorkcenters();

  // 2. Configurar header
  store.setMenuItem({
    icon: PrimeIcons.BUILDING,
    title: `Àrees de ${plantStore.site?.name || "Planta"}`,
  });

  // 3. Connectar WebSocket general i configurar handlers al store
  plantStore.connectToGeneral();
  connect(WS_ENDPOINTS.GENERAL, { debug: true });
});

// onUnmounted gestionat automàticament pel composable

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

// Obtener workcenters de un área usando el getter combinado
const getAreaWorkcenters = (areaId: string): WorkcenterViewState[] => {
  return plantStore.areasWorkcentersView.filter(
    (view) => view.config.areaId === areaId
  );
};
</script>

<style scoped>
.plant-layout {
  padding: 0.5rem;
  min-height: 100vh;
}

.area-section {
  margin-bottom: 1.5rem;
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
