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
    <Column field="estimatedTime" header="Temps total"> </Column>
    <Column field="isCycleTime" header="Temps de cicle"></Column>
    <Column header="% de benefici">
      <template #body="slotProps">
        <BaseInput
          :type="BaseInputType.NUMERIC"
          :minFractionDigits="2"
          class="mb-2"
          id="profitPercentage"
          :modelValue="getTableProfitPercentage(slotProps.data)"
          @input="(value:number) => updateProfitPercentage(slotProps.data, Number(value))"
        />
      </template>
    </Column>
    <template #footer>
      <div
        class="flex flex-wrap align-items-center justify-content-between gap-2"
      >
        <span class="text-l text-900 font-bold">Benefici ponderat</span>
        <BaseInput
          :type="BaseInputType.NUMERIC"
          :minFractionDigits="2"
          class="mb-2"
          id="profitAverage"
          :modelValue="profitAverage"
          suffix="%"
          readonly
        />
      </div>
    </template>
  </DataTable>
</template>

<script setup lang="ts">
import { ref, watchEffect, computed, onMounted, reactive } from "vue";
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

const props = defineProps<{
  workMasterId: string | null;
  quantity: number;
}>();

const workMasterStore = useWorkMasterStore();
const plantModelStore = usePlantModelStore();
const phases = ref<WorkMasterPhase[]>([]);
const workcenterTypes = ref<WorkcenterType[] | undefined>(undefined);
const machineStatuses = ref<MachineStatus[] | undefined>(undefined);

const tableProfitPercentages = reactive<{ [key: string]: number }>({});
const tableEstimatedTimes = reactive<{ [key: string]: number }>({});

const profitAverage = ref(0);

const processPhases = (phases: WorkMasterPhase[]): ProcessedPhase[] => {
  return phases.flatMap((phase) =>
    phase.details!.map((detail) => ({
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

onMounted(async () => {
  await plantModelStore.fetchWorkcenterTypes();
  await plantModelStore.fetchMachineStatuses();
  workcenterTypes.value = plantModelStore.workcenterTypes || [];
  machineStatuses.value = plantModelStore.machineStatuses || [];

  // Inicializar tableProfitPercentages y tableEstimatedTimes
  processedPhases.value.forEach((phase) => {
    const key = createUniqueKey(phase);
    if (!(phase.workcenterTypeId in tableProfitPercentages)) {
      tableProfitPercentages[key] = getWorkcenterTypeProfit(
        phase.workcenterTypeId
      );
    }
    if (!(phase.workcenterTypeId in tableEstimatedTimes)) {
      tableEstimatedTimes[key] = phase.estimatedTime;
    }
  });
  calculateWeightedProfit();
});

watchEffect(async () => {
  if (props.workMasterId) {
    await workMasterStore.fetchOne(props.workMasterId);
    phases.value = workMasterStore.workmaster?.phases || [];
  } else {
    phases.value = [];
  }
});

const createUniqueKey = (phase: ProcessedPhase) => {
  return `${phase.workcenterTypeId}-${phase.order}-${phase.code}`;
};

const getWorkcenterType = (workcenterTypeId: string | undefined) => {
  const workcenterType = workcenterTypes.value?.find(
    (p) => p.id === workcenterTypeId
  );
  return workcenterType?.name || "No definit";
};

const getWorkcenterTypeProfit = (
  workcenterTypeId: string | undefined
): number => {
  const workcenterType = workcenterTypes.value?.find(
    (p) => p.id === workcenterTypeId
  );
  return workcenterType?.profitPercentage || 0;
};

const getStatusName = (machineStatusId: string | undefined) => {
  const machineStatus = machineStatuses.value?.find(
    (p) => p.id === machineStatusId
  );
  return machineStatus?.name || "No definit";
};

const getTableProfitPercentage = (phase: ProcessedPhase) => {
  const key = createUniqueKey(phase);
  const profitPercentage = tableProfitPercentages[key];
  if (typeof profitPercentage === "number") {
    return profitPercentage;
  } else {
    console.error(
      "Unexpected type for profitPercentage:",
      typeof profitPercentage,
      profitPercentage
    );
    return profitPercentage; // Retornar un valor por defecto en caso de error
  }
};

/*const getTableEstimatedTime = (workcenterTypeId: string) => {
  return tableEstimatedTimes[workcenterTypeId] ?? 0;
};*/

const updateProfitPercentage = (phase: ProcessedPhase, value: number) => {
  if (typeof value === "number") {
    const key = createUniqueKey(phase);
    tableProfitPercentages[key] = value;
    calculateWeightedProfit();
  } else {
    console.error(
      "Attempted to set a non-number value for profit percentage:",
      value
    );
  }
};

/*const updateEstimatedTime = (workcenterTypeId: string, value: number) => {
  tableEstimatedTimes[workcenterTypeId] = value;
  calculateWeightedProfit();
};*/

const calculateWeightedProfit = () => {
  let totalTime = 0;
  let weightedSum = 0;

  processedPhases.value.forEach((phase) => {
    const key = createUniqueKey(phase);
    const profit = getTableProfitPercentage(phase);
    const time = tableEstimatedTimes[key] ?? phase.estimatedTime;

    totalTime += time;
    weightedSum += time * profit;
  });

  profitAverage.value =
    totalTime > 0 ? Number((weightedSum / totalTime).toFixed(2)) : 0;
};
</script>
