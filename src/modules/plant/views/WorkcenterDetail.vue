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
          @click="handleOperatorClockIn"
        />
        <Button
          :icon="PrimeIcons.SIGN_OUT"
          label="Fitxar sortida"
          severity="secondary"
          class="touch-button"
          @click="handleOperatorClockOut"
        />
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { useToast } from "primevue/usetoast";
import { PrimeIcons } from "primevue/api";
import { useStore } from "../../../store";
import { usePlantStore } from "../store";
import WorkcenterRealtimePanel from "../components/workcenter-detail/WorkcenterRealtimePanel.vue";
import WorkcenterProduction from "../components/workcenter-detail/WorkcenterProduction.vue";
import WorkcenterDocumentation from "../components/workcenter-detail/WorkcenterDocumentation.vue";

const route = useRoute();
const toast = useToast();
const appStore = useStore();
const plantStore = usePlantStore();

const id = route.params.id as string;
const activeTab = ref(0);

const workcenter = computed(() => plantStore.workcenterRt);

let pollingInterval: ReturnType<typeof setInterval> | null = null;

onMounted(async () => {
  // Fetch workcenter data
  await fetchWorkcenterData(id);

  if (!workcenter.value) {
    toast.add({
      severity: "error",
      summary: "Centre de treball no trobat",
      life: 4000,
    });
    return;
  }

  // Set header menu
  appStore.setMenuItem({
    icon: PrimeIcons.COG,
    backButtonVisible: true,
    title: `${workcenter.value.workcenterName} - ${workcenter.value.workcenterDescription}`,
  });
});

onUnmounted(() => {
  stopPolling();
});

const fetchWorkcenterData = async (id: string) => {
  // TODO: Replace with actual API call
  // This should fetch the workcenter data from the API
  await plantStore.fetchWorkcenter(id);
};

const stopPolling = () => {
  if (pollingInterval) {
    clearInterval(pollingInterval);
    pollingInterval = null;
  }
};

const getStatusSeverity = (
  statusName: string
):
  | "success"
  | "info"
  | "warning"
  | "danger"
  | "secondary"
  | "contrast"
  | undefined => {
  const lowerStatus = statusName?.toLowerCase() || "";

  if (lowerStatus.includes("producció") || lowerStatus.includes("activa")) {
    return "success";
  } else if (
    lowerStatus.includes("parada") ||
    lowerStatus.includes("aturada")
  ) {
    return "danger";
  } else if (
    lowerStatus.includes("preparació") ||
    lowerStatus.includes("setup")
  ) {
    return "warning";
  } else if (lowerStatus.includes("manteniment")) {
    return "info";
  }

  return "secondary";
};

const handleOperatorClockIn = async () => {
  await plantStore.clockInOperator();
};

const handleOperatorClockOut = async () => {
  await plantStore.clockOutOperator();
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
}

.tabs-panel {
  background: var(--surface-0);
  border: 1px solid var(--surface-border);
  border-radius: var(--border-radius);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.tabs-panel :deep(.p-tabview) {
  height: 100%;
  display: flex;
  flex-direction: column;
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
