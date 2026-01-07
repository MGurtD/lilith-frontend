<template>
  <Dialog
    :visible="visible"
    modal
    :closable="true"
    :style="{ width: '90vw', height: '80vh' }"
    @update:visible="$emit('update:visible', $event)"
  >
    <template #header>
      <div class="header-info">
        <div class="header-details">
          <div class="detail-item">
            <span class="detail-label">Ordre:</span>
            <span class="detail-value">{{ workOrderCode }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Referència:</span>
            <span class="detail-value">{{ referenceCode }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Quantitat:</span>
            <span class="detail-value">{{ quantity }}</span>
          </div>
        </div>
      </div>
    </template>

    <div class="dialog-content">
      <DataTable
        :value="phases"
        :loading="loading"
        responsiveLayout="scroll"
        stripedRows
        :rowHover="true"
        :rowClass="getRowClass"
        class="p-datatable-sm clickable-rows"
        sortField="phaseCode"
        :sortOrder="1"
        @row-click="handleRowClick"
      >
        <!-- Phase Code -->
        <Column
          field="phaseCode"
          header="Codi Fase"
          :sortable="true"
          style="min-width: 120px"
        />

        <!-- Phase Description -->
        <Column
          field="phaseDescription"
          header="Descripció"
          :sortable="true"
          style="min-width: 200px"
        />

        <!-- Phase Status -->
        <Column header="Estat" :sortable="true" style="min-width: 150px">
          <template #body="slotProps">
            <Tag :value="slotProps.data.phaseStatus" severity="info" rounded />
          </template>
        </Column>

        <!-- Start Time -->
        <Column header="Inici" :sortable="true" style="min-width: 150px">
          <template #body="slotProps">
            <span v-if="slotProps.data.startTime">
              {{ formatDate(slotProps.data.startTime) }}
            </span>
          </template>
        </Column>

        <!-- End Time -->
        <Column header="Fi" :sortable="true" style="min-width: 150px">
          <template #body="slotProps">
            <span v-if="slotProps.data.endTime">
              {{ formatDate(slotProps.data.endTime) }}
            </span>
          </template>
        </Column>

        <!-- Preferred Workcenter -->
        <Column
          field="preferredWorkcenterName"
          header="Màquina Preferida"
          :sortable="true"
          style="min-width: 180px"
        />

        <template #empty>
          <div class="no-data">
            <i :class="PrimeIcons.INBOX" style="font-size: 2rem"></i>
            <p>No s'han trobat fases per aquesta ordre de fabricació</p>
          </div>
        </template>
      </DataTable>

      <!-- Bottom Panel with Dropdown and Button -->
      <div class="bottom-panel" v-if="hasValidPhases">
        <div class="panel-content">
          <div class="dropdown-container">
            <label for="activity-dropdown" class="dropdown-label">
              Activitat a carregar
            </label>
            <Dropdown
              id="activity-dropdown"
              v-model="selectedDetailId"
              :options="selectedPhase?.details || []"
              optionLabel="machineStatusName"
              optionValue="machineStatusId"
              placeholder="Selecciona una activitat..."
              class="activity-dropdown"
            >
              <template #value="slotProps">
                <div v-if="slotProps.value" class="selected-activity">
                  <i :class="PrimeIcons.CHECK" class="activity-check-icon"></i>
                  <span>{{ getSelectedActivityName(slotProps.value) }}</span>
                  <span class="time-badge">
                    <i :class="PrimeIcons.CLOCK"></i>
                    {{
                      getSelectedActivityDetail(slotProps.value)?.estimatedTime
                    }}
                    min
                  </span>
                  <span
                    class="operator-time-badge"
                    v-if="
                      (getSelectedActivityDetail(slotProps.value)
                        ?.estimatedOperatorTime ?? 0) > 0
                    "
                  >
                    <i :class="PrimeIcons.USER"></i>
                    {{
                      getSelectedActivityDetail(slotProps.value)
                        ?.estimatedOperatorTime
                    }}
                    min
                  </span>
                </div>
                <span v-else>{{ slotProps.placeholder }}</span>
              </template>
              <template #option="slotProps">
                <div class="activity-option">
                  <i :class="PrimeIcons.WRENCH" class="option-icon"></i>
                  <span class="status-name">{{
                    slotProps.option.machineStatusName
                  }}</span>
                  <span class="time-badge">
                    <i :class="PrimeIcons.CLOCK"></i>
                    {{ slotProps.option.estimatedTime }} min
                  </span>
                  <span
                    class="operator-time-badge"
                    v-if="(slotProps.option.estimatedOperatorTime ?? 0) > 0"
                  >
                    <i :class="PrimeIcons.USER"></i>
                    {{ slotProps.option.estimatedOperatorTime }} min
                  </span>
                </div>
              </template>
            </Dropdown>
          </div>
          <Button
            :icon="PrimeIcons.COG"
            label="Carregar"
            severity="success"
            :disabled="!selectedDetailId"
            @click="onLoadActivity"
            class="load-button"
          />
        </div>
      </div>

      <!-- No Valid Phases Message -->
      <div v-else-if="!loading && phases.length > 0" class="no-valid-phases">
        <i :class="PrimeIcons.EXCLAMATION_TRIANGLE" style="font-size: 2rem"></i>
        <p>
          No hi ha fases disponibles per carregar en aquest centre de treball
        </p>
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import { PrimeIcons } from "primevue/api";
import { WorkOrderPhaseDetailed } from "../../../production/types";
import { WorkOrderPhaseService } from "../../../production/services/workorder.service";
import { useToast } from "primevue/usetoast";
import { formatDate } from "../../../../utils/functions";

interface Props {
  visible: boolean;
  workOrderId: string;
  workOrderCode: string;
  referenceCode: string;
  quantity: number;
  workcenterTypeId: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "update:visible", value: boolean): void;
  (
    e: "phase-detail-selected",
    data: {
      workOrderId: string;
      workOrderPhaseId: string;
      machineStatusId: string;
    }
  ): void;
}>();

const toast = useToast();
const phaseService = new WorkOrderPhaseService("WorkOrderPhase");

const phases = ref<WorkOrderPhaseDetailed[]>([]);
const loading = ref(false);
const selectedDetailId = ref<string>("");
const selectedPhaseId = ref<string>("");

// Auto-select first phase with endTime = null and matching workcenterTypeId
// Important: Sort by phaseCode first to get the first one in order
const autoSelectedPhase = computed(() => {
  const validPhases = phases.value
    .filter(
      (phase) =>
        !phase.endTime && phase.workcenterTypeId === props.workcenterTypeId
    )
    .sort((a, b) => a.phaseCode.localeCompare(b.phaseCode));

  return validPhases[0];
});

// Get the phase selected by the user (or auto-selected if none chosen)
const selectedPhase = computed(() => {
  if (selectedPhaseId.value) {
    return phases.value.find((p) => p.phaseId === selectedPhaseId.value);
  }
  return autoSelectedPhase.value;
});

// Check if there are valid phases available
const hasValidPhases = computed(() => {
  return selectedPhase.value !== undefined;
});

const getSelectedActivityName = (machineStatusId: string): string => {
  const activity = selectedPhase.value?.details.find(
    (d) => d.machineStatusId === machineStatusId
  );
  return activity?.machineStatusName || "";
};

const getSelectedActivityDetail = (machineStatusId: string) => {
  return selectedPhase.value?.details.find(
    (d) => d.machineStatusId === machineStatusId
  );
};

const selectPhase = (phase: WorkOrderPhaseDetailed) => {
  selectedPhaseId.value = phase.phaseId;
  // Auto-select first detail when phase is selected
  if (phase.details && phase.details.length > 0) {
    selectedDetailId.value = phase.details[0].machineStatusId || "";
  } else {
    selectedDetailId.value = "";
  }
};

const handleRowClick = (event: any) => {
  const phase = event.data as WorkOrderPhaseDetailed;
  // Only allow selection if phase is valid (same criteria as button visibility)
  if (!phase.endTime && phase.workcenterTypeId === props.workcenterTypeId) {
    selectPhase(phase);
  }
};

const getRowClass = (data: WorkOrderPhaseDetailed) => {
  if (selectedPhaseId.value && data.phaseId === selectedPhaseId.value) {
    return "selected-phase-row";
  }
  return "";
};

const onLoadActivity = () => {
  if (!selectedPhase.value || !selectedDetailId.value) {
    toast.add({
      severity: "warn",
      summary: "Selecciona una fase i una activitat",
      life: 4000,
    });
    return;
  }

  emit("phase-detail-selected", {
    workOrderId: props.workOrderId,
    workOrderPhaseId: selectedPhase.value.phaseId,
    machineStatusId: selectedDetailId.value,
  });
};

const loadPhases = async () => {
  if (!props.workOrderId) return;

  loading.value = true;
  selectedDetailId.value = ""; // Reset selection
  selectedPhaseId.value = ""; // Reset phase selection
  try {
    const result = await phaseService.GetWorkOrderPhasesDetailed(
      props.workOrderId
    );
    if (result) {
      phases.value = result;
      // Auto-select first valid phase
      if (autoSelectedPhase.value) {
        selectPhase(autoSelectedPhase.value);
      }
    } else {
      phases.value = [];
    }
  } catch (error) {
    console.error("Error loading work order phases:", error);
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Error al carregar les fases de l'ordre de fabricació",
      life: 4000,
    });
    phases.value = [];
  } finally {
    loading.value = false;
  }
};

watch(
  () => props.workOrderId,
  () => {
    if (props.visible && props.workOrderId) {
      loadPhases();
    }
  }
);

watch(
  () => props.visible,
  (newValue) => {
    if (newValue && props.workOrderId) {
      loadPhases();
    }
  }
);

onMounted(() => {
  if (props.visible && props.workOrderId) {
    loadPhases();
  }
});
</script>

<style scoped>
.header-info {
  width: 100%;
}

.header-title {
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--primary-color);
}

.header-details {
  display: flex;
  gap: 2rem;
  padding: 0.75rem 1rem;
  background: var(--surface-100);
  border-radius: var(--border-radius);
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.detail-label {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-color-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detail-value {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-color);
}

.dialog-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 1rem;
}

.dialog-content :deep(.selected-phase-row) {
  background: var(--green-100) !important;
  border-left: 4px solid var(--green-600) !important;
}

.dialog-content :deep(.p-datatable-tbody > tr > td .p-button) {
  width: 100%;
}

.no-data {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 3rem 1rem;
  color: var(--text-color-secondary);
}

.no-data i {
  color: var(--text-color-secondary);
  opacity: 0.5;
}

.no-data p {
  margin: 0;
  font-size: 1rem;
}

.no-valid-phases {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 2rem 1rem;
  background: var(--yellow-50);
  border: 1px solid var(--yellow-200);
  border-radius: var(--border-radius);
  color: var(--yellow-900);
}

.no-valid-phases i {
  color: var(--yellow-600);
}

.no-valid-phases p {
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
}

.bottom-panel {
  background: var(--surface-50);
  border-top: 2px solid var(--surface-border);
  padding: 1.25rem 1.5rem;
  border-radius: 0 0 var(--border-radius) var(--border-radius);
}

.panel-content {
  display: flex;
  align-items: flex-end;
  gap: 1.5rem;
}

.dropdown-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.dropdown-label {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--text-color);
}

.activity-dropdown {
  width: 100%;
}

.selected-activity {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
}

.activity-check-icon {
  color: var(--green-600);
  font-size: 1rem;
}

.activity-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.option-icon {
  color: var(--primary-color);
  font-size: 1rem;
}

.status-name {
  font-weight: 600;
  font-size: 1rem;
}

.time-badge,
.operator-time-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  background: var(--blue-100);
  color: var(--blue-700);
  border-radius: var(--border-radius);
  font-size: 0.85rem;
  font-weight: 500;
}

.operator-time-badge {
  background: var(--purple-100);
  color: var(--purple-700);
}

.time-badge i,
.operator-time-badge i {
  font-size: 0.8rem;
}

.load-button {
  min-width: 150px;
  font-size: 1.05rem;
  padding: 0.75rem 1.5rem;
}

.load-button :deep(.p-button-icon) {
  font-size: 1.2rem;
}
</style>
