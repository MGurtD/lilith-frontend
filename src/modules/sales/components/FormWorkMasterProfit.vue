<template>
  <DataTable :value="processedPhases">
    <Column field="code" header="Fase"></Column>
    <Column field="order" header="Pas"></Column>
    <Column field="workcenterTypeId" header="Màquina">
      <template #body="slotProps">
        {{ getWorkcenterType(slotProps.data.workcenterTypeId) }}
      </template>
    </Column>
    <Column field="machineStatusId" header="Estat">
      <template #body="slotProps">
        {{ getStatusName(slotProps.data.machineStatusId) }}
      </template>
    </Column>
    <Column field="estimatedTime" header="Temps total"></Column>
    <Column field="isCycleTime" header="Temps de cicle"></Column>
    <Column header="% de benefici">
      <template #body="slotProps">
        <BaseInput
          :type="BaseInputType.NUMERIC"
          :minFractionDigits="2"
          class="mb-2"
          id="profitPercentage"
          :modelValue="getWorkcenterTypeProfit(slotProps.data.workcenterTypeId)"
          suffix="%"
        ></BaseInput>
      </template>
    </Column>
  </DataTable>
</template>
<script setup lang="ts">
import { ref, watchEffect, computed, onMounted } from "vue";
import { useWorkMasterStore } from "../../production/store/workmaster";
import {
  MachineStatus,
  WorkMasterPhase,
  WorkcenterType,
} from "../../production/types";
import BaseInput from "../../../components/BaseInput.vue";
import { BaseInputType } from "../../../types/component";
import { usePlantModelStore } from "../../production/store/plantmodel";

interface ProcessedPhase {
  code: string;
  order: number;
  workcenterTypeId: string;
  machineStatusId: string;
  estimatedTime: number;
  isCycleTime: boolean;
}

const processPhases = (phases: WorkMasterPhase[]): ProcessedPhase[] => {
  return phases.flatMap((phase) =>
    phase.details!.map((detail) => ({
      //const totalEstimatedTime = detail.isCycleTime ? detail.estimatedTime * props.quantity : detail.estimatedTime;
      code: phase.code,
      order: detail.order,
      workcenterTypeId: phase.workcenterTypeId || "",
      machineStatusId: detail.machineStatusId || "",
      estimatedTime: detail.isCycleTime
        ? detail.estimatedTime * props.quantity
        : detail.estimatedTime,
      isCycleTime: detail.isCycleTime,
    }))
  );
};

const processedPhases = computed(() => processPhases(phases.value));

const props = defineProps<{
  workMasterId: string | null;
  quantity: number;
}>();
const workMasterStore = useWorkMasterStore();
const plantModelStore = usePlantModelStore();
const phases = ref<WorkMasterPhase[]>([]);
const workcenterTypes = ref<WorkcenterType[] | undefined>(undefined);
const machineStatuses = ref<MachineStatus[] | undefined>(undefined);

onMounted(async () => {
  await plantModelStore.fetchWorkcenterTypes();
  await plantModelStore.fetchMachineStatuses();
  workcenterTypes.value = plantModelStore.workcenterTypes || [];
  machineStatuses.value = plantModelStore.machineStatuses || [];
});

watchEffect(async () => {
  if (props.workMasterId) {
    await workMasterStore.fetchOne(props.workMasterId);
    phases.value = workMasterStore.workmaster?.phases || [];
  } else {
    phases.value = [];
  }
});

const getWorkcenterType = (workcenterTypeId: string | undefined) => {
  const workcenterType = workcenterTypes.value?.find(
    (p) => p.id === workcenterTypeId
  );
  //console.log("type: ", workcenterType);
  return workcenterType?.name || "No definit";
};

const getWorkcenterTypeProfit = (workcenterTypeId: string | undefined) => {
  const workcenterType = workcenterTypes.value?.find(
    (p) => p.id === workcenterTypeId
  );
  //console.log("marge: ", workcenterType);
  return workcenterType?.profitPercentage || 0;
};

const getStatusName = (machineStatusId: string | undefined) => {
  const machineStatus = machineStatuses.value?.find(
    (p) => p.id === machineStatusId
  );
  return machineStatus?.name || "No definit";
};
</script>
