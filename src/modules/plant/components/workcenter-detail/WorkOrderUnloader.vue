<template>
  <Dialog
    :visible="visible"
    modal
    :closable="true"
    :style="{ width: '60vw' }"
    @update:visible="$emit('update:visible', $event)"
  >
    <template #header>
      <div class="w-full flex align-items-center justify-content-between pr-4">
        <div class="flex align-items-center gap-3">
          <div
            class="flex align-items-center justify-content-center bg-red-100 border-circle p-2"
            style="width: 3rem; height: 3rem"
          >
            <i :class="PrimeIcons.STOP" class="text-red-500 text-xl"></i>
          </div>
          <div class="flex flex-column">
            <span class="font-bold text-lg text-900">Finalitzar Fase</span>
            <span class="text-sm text-500">{{ phaseDescription }}</span>
          </div>
        </div>
        <div class="flex gap-4 flex-wrap">
          <div class="flex flex-column align-items-end">
            <span class="text-xs text-500 uppercase font-semibold">Ordre</span>
            <span class="font-medium text-900 text-lg">{{
              workOrderCode
            }}</span>
          </div>
          <div class="flex flex-column align-items-end">
            <span class="text-xs text-500 uppercase font-semibold">Ref.</span>
            <span class="font-medium text-900 text-lg">{{
              referenceCode
            }}</span>
          </div>
          <div class="flex flex-column align-items-end">
            <span class="text-xs text-500 uppercase font-semibold"
              >Quantitat</span
            >
            <span class="font-medium text-900 text-lg">{{
              plannedQuantity
            }}</span>
          </div>
        </div>
      </div>
    </template>

    <div class="dialog-content">
      <!-- Status and Counters Section -->
      <div class="form-section">
        <div class="status-counters-row">
          <div class="counters-group">
            <div class="counter-field">
              <label class="block text-900 mb-2">Unitats OK</label>
              <InputNumber
                v-model="formData.counterOk"
                :min="0"
                :useGrouping="false"
                class="w-full"
              />
            </div>
            <div class="counter-field">
              <label class="block text-900 mb-2">Unitats KO</label>
              <InputNumber
                v-model="formData.counterKo"
                :min="0"
                :useGrouping="false"
                class="w-full"
              />
            </div>
          </div>
          <div class="status-field">
            <DropdownLifecycleStatusTransitions
              label="Estat de sortida de la fase"
              v-model="formData.workOrderStatusId"
              :statusId="currentPhaseStatusId"
              placeholder="Selecciona estat..."
            />
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="actions-panel">
        <Button
          :icon="PrimeIcons.TIMES"
          label="Cancel·lar"
          severity="secondary"
          @click="onCancel"
          class="action-button"
        />
        <Button
          :icon="PrimeIcons.STOP"
          label="Finalitzar"
          severity="danger"
          :disabled="!isFormValid"
          @click="onUnload"
          class="action-button"
        />
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { watch, computed, reactive } from "vue";
import { PrimeIcons } from "primevue/api";
import { useToast } from "primevue/usetoast";
import DropdownLifecycleStatusTransitions from "../../../shared/components/DropdownLifecycleStatusTransitions.vue";
import { UnloadWorkOrderPhaseRequest } from "../../types";

interface Props {
  visible: boolean;
  workcenterId: string;
  workOrderId: string;
  workOrderCode: string;
  workOrderPhaseId: string;
  currentPhaseStatusId: string;
  referenceCode: string;
  plannedQuantity: number;
  phaseDescription: string;
  workcenterTypeId: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (event: "update:visible", value: boolean): void;
  (event: "phase-unloaded", data: UnloadWorkOrderPhaseRequest): void;
}>();

const toast = useToast();

// Form state - Using reactive instance of UnloadWorkOrderPhaseRequest
const formData = reactive<UnloadWorkOrderPhaseRequest>({
  workcenterId: props.workcenterId,
  workOrderPhaseId: props.workOrderPhaseId,
  workOrderStatusId: "",
  counterOk: 0,
  counterKo: 0,
});

// Computed: Form validation
const isFormValid = computed(() => {
  // Status must be selected
  if (!formData.workOrderStatusId) return false;

  // Counters must be >= 0 (already enforced by InputNumber min)
  if (formData.counterOk < 0 || formData.counterKo < 0) return false;

  return true;
});

// Reset form when dialog opens
watch(
  () => props.visible,
  (newValue) => {
    if (newValue) {
      resetForm();
    }
  }
);

const resetForm = () => {
  formData.workcenterId = props.workcenterId;
  formData.workOrderPhaseId = props.workOrderPhaseId;
  formData.workOrderStatusId = "";
  formData.counterOk = 0;
  formData.counterKo = 0;
};

const onCancel = () => {
  emit("update:visible", false);
};

const onUnload = () => {
  if (!isFormValid.value) {
    toast.add({
      severity: "warn",
      summary: "Formulari incomplet",
      detail: "Si us plau, omple tots els camps obligatoris",
      life: 4000,
    });
    return;
  }

  emit("phase-unloaded", formData);
};
</script>

<style scoped>
.dialog-content {
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--surface-border);
  padding: 1rem;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.status-counters-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  align-items: start;
}

.counters-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding-bottom: 1.5rem;
}

.counter-field,
.status-field {
  display: flex;
  flex-direction: column;
}

.actions-panel {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  padding-top: 1.5rem;
  border-top: 1px solid var(--surface-border);
}

.action-button {
  min-width: 150px;
}

@media (max-width: 768px) {
  .status-counters-row {
    grid-template-columns: 1fr;
  }

  .counters-group {
    grid-template-columns: 1fr;
  }

  .header-details {
    flex-direction: column;
    gap: 0.5rem;
  }

  .actions-panel {
    flex-direction: column;
  }

  .action-button {
    width: 100%;
  }
}
</style>
