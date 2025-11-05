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

            <!-- Production Tab -->
            <TabPanel>
              <template #header>
                <div class="flex align-items-center gap-2">
                  <i :class="PrimeIcons.COG"></i>
                  <span class="font-bold">Producció</span>
                </div>
              </template>
              <WorkcenterProduction :workcenter="workcenter" />
            </TabPanel>
          </TabView>
        </section>
      </div>
    </main>

    <!-- Bottom panel - Touch device buttons -->
    <footer class="touch-panel">
      <div class="touch-buttons">
        <Button
          :icon="PrimeIcons.SIGN_IN"
          label="Fitxar entrada"
          severity="secondary"
          class="touch-button"
          :disabled="disableClockIn"
          @click="handleOperatorClockIn"
        />
        <Button
          :icon="PrimeIcons.SIGN_OUT"
          label="Fitxar sortida"
          severity="secondary"
          class="touch-button"
          :disabled="disableClockOut"
          @click="handleOperatorClockOut"
        />
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useToast } from "primevue/usetoast";
import { PrimeIcons } from "primevue/api";
import { useStore } from "../../../store";
import { usePlantStore } from "../store";
import WorkcenterRealtimePanel from "../components/workcenter-detail/WorkcenterRealtimePanel.vue";
import WorkcenterProduction from "../components/workcenter-detail/WorkcenterProduction.vue";
import WorkcenterDocumentation from "../components/workcenter-detail/WorkcenterDocumentation.vue";
import {
  useWebSocketConnection,
  WS_ENDPOINTS,
} from "../composables/useWebSocketConnection";

const route = useRoute();
const toast = useToast();
const appStore = useStore();
const plantStore = usePlantStore();
const { connect } = useWebSocketConnection();

const id = route.params.id as string;
const activeTab = ref(0);

const workcenter = computed(() => plantStore.workcenterView);

// Computed para determinar si el operario está fichado
const isOperatorClockedIn = computed(() => {
  if (!workcenter.value?.realtime?.operators || !plantStore.operator) {
    return false;
  }
  return workcenter.value.realtime.operators.some(
    (op) => op.operatorId === plantStore.operator!.id
  );
});

// Deshabilitar botones según estado
const disableClockIn = computed(() => {
  return !workcenter.value?.realtime || isOperatorClockedIn.value;
});

const disableClockOut = computed(() => {
  return !workcenter.value?.realtime || !isOperatorClockedIn.value;
});

onMounted(async () => {
  // 1. Carregar dades del workcenter
  await plantStore.fetchWorkcenter(id);

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

  // 3. Connectar WebSocket específic del workcenter
  plantStore.connectToWorkcenter(id);
  connect(WS_ENDPOINTS.WORKCENTER(id), { debug: true });
});

// onUnmounted gestionat automàticament pel composable

const handleOperatorClockIn = async () => {
  const result = await plantStore.clockInOperator();
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
  const result = await plantStore.clockOutOperator();
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
  height: 90%;
}

.realtime-panel {
  background: var(--surface-0);
  border: 1px solid var(--surface-border);
  border-radius: var(--border-radius);
  overflow-y: auto;
  max-height: 100%;
}

.tabs-panel {
  background: var(--surface-0);
  border: 1px solid var(--surface-border);
  border-radius: var(--border-radius);
  display: flex;
  flex-direction: column;
  max-height: 100%;
}

.tabs-panel :deep(.p-tabview) {
  height: 100%;
  display: flex;
  flex-direction: column;
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
