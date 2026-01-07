<template>
  <div class="phase-selector">
    <DataTable
      :value="workOrders"
      :loading="loading"
      responsiveLayout="scroll"
      stripedRows
      v-model:selectionKeys="selectedKey"
      selectionMode="single"
      @row-select="onRowSelect"
    >
      <!-- Code -->
      <Column field="workOrderCode" header="Codi" :sortable="true">
        <template #body="slotProps">
          <span class="font-bold">{{ slotProps.data.workOrderCode }}</span>
        </template>
      </Column>

      <!-- Customer Name -->
      <Column field="customerName" header="Client" :sortable="true">
        <template #body="slotProps">
          <span class="font-bold">{{ slotProps.data.customerName }}</span>
        </template>
      </Column>

      <!-- Reference -->
      <Column
        field="salesReferenceDisplay"
        header="Referència"
        :sortable="true"
      >
        <template #body="slotProps">
          <span class="font-bold">{{
            slotProps.data.salesReferenceDisplay
          }}</span>
        </template>
      </Column>

      <!-- Quantity -->
      <Column
        field="plannedQuantity"
        header="Quantitat"
        :sortable="true"
        style="min-width: 100px; text-align: right"
      />

      <!-- Planned Date -->
      <Column header="Data Planificada" :sortable="true">
        <template #body="slotProps">
          <span v-if="slotProps.data.plannedDate">
            {{ formatDate(slotProps.data.plannedDate) }}
          </span>
        </template>
      </Column>

      <!-- Start Time -->
      <Column header="Inici" :sortable="true">
        <template #body="slotProps">
          <span v-if="slotProps.data.startTime">
            {{ formatDate(slotProps.data.startTime) }}
          </span>
        </template>
      </Column>

      <!-- Work Order Status -->
      <Column header="Estat OF" :sortable="true">
        <template #body="slotProps">
          <Tag
            :value="slotProps.data.workOrderStatus"
            severity="secondary"
            rounded
          />
        </template>
      </Column>

      <!-- Priority -->
      <Column
        field="priority"
        header="Prioritat"
        :sortable="true"
        style="min-width: 100px; text-align: center"
      />

      <template #empty>
        <div class="no-data">
          <i :class="PrimeIcons.INBOX" style="font-size: 2rem"></i>
          <p>
            No s'han trobat ordres de fabricació planificades per aquest tipus
            de màquina
          </p>
        </div>
      </template>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { PrimeIcons } from "primevue/api";
import { WorkOrderWithPhases } from "../../../production/types";
import { WorkOrderPhaseService } from "../../../production/services/workorder.service";
import { useToast } from "primevue/usetoast";
import { formatDate } from "../../../../utils/functions";

interface Props {
  workcenterTypeId: string;
  excludePhaseId?: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "workorder-selected", workOrder: WorkOrderWithPhases): void;
}>();

const selectedKey = ref();
const toast = useToast();
const phaseService = new WorkOrderPhaseService("WorkOrderPhase");

const workOrders = ref<WorkOrderWithPhases[]>([]);
const loading = ref(false);

const onRowSelect = (event: any) => {
  emit("workorder-selected", event.data);
};

const loadPhases = async () => {
  loading.value = true;
  try {
    const result = await phaseService.GetPlannedPhasesByWorkcenterType(
      props.workcenterTypeId
    );
    if (result) {
      workOrders.value = result;
    } else {
      workOrders.value = [];
    }
  } catch (error) {
    console.error("Error loading planned phases:", error);
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Error al carregar les fases planificades",
      life: 4000,
    });
    workOrders.value = [];
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadPhases();
});
</script>

<style scoped>
.phase-selector {
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
</style>
