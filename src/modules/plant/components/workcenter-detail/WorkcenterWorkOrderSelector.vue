<template>
  <div class="workorder-selector">
    <DataTable
      :value="workOrders"
      :loading="loading"
      selectionMode="single"
      @row-select="onRowSelect"
      dataKey="id"
      :paginator="true"
      :rows="10"
      responsiveLayout="scroll"
      stripedRows
    >
      <Column field="code" header="Codi OF" :sortable="true">
        <template #body="slotProps">
          <span class="font-bold">{{ slotProps.data.code }}</span>
        </template>
      </Column>
      <Column header="Client">
        <template #body="slotProps">
          <span class="font-bold">{{
            slotProps.data.reference.customer.comercialName
          }}</span>
        </template>
      </Column>
      <Column header="Referència" :sortable="true">
        <template #body="slotProps">
          <div class="reference-column">
            <span class="font-bold">{{
              referenceStore.getFullName(slotProps.data.reference)
            }}</span>
          </div>
        </template>
      </Column>
      <Column field="plannedDate" header="Data planificada" :sortable="true">
        <template #body="slotProps">
          {{ formatDate(slotProps.data.plannedDate) }}
        </template>
      </Column>
      <Column
        field="plannedQuantity"
        header="Quantitat"
        style="min-width: 100px; text-align: right"
      >
        <template #body="slotProps">
          {{ slotProps.data.plannedQuantity }}
        </template>
      </Column>
      <Column header="Fases" style="min-width: 80px; text-align: center">
        <template #body="slotProps">
          <Tag
            :value="slotProps.data.phases?.length || 0"
            severity="info"
            rounded
          />
        </template>
      </Column>

      <template #empty>
        <div class="no-data">
          <i :class="PrimeIcons.INBOX" style="font-size: 2rem"></i>
          <p>No s'han trobat ordres de fabricació en producció</p>
        </div>
      </template>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { PrimeIcons } from "primevue/api";
import { WorkOrder } from "../../../production/types";
import { WorkOrderService } from "../../../production/services/workorder.service";
import { useToast } from "primevue/usetoast";
import { formatDate } from "../../../../utils/functions";
import { useReferenceStore } from "../../../shared/store/reference";

interface Props {
  workcenterId: string;
  excludeWorkOrderId?: string;
}

const referenceStore = useReferenceStore();

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "workorder-selected", workOrder: WorkOrder): void;
}>();

const toast = useToast();
const workOrderService = new WorkOrderService("WorkOrder");

const allWorkOrders = ref<WorkOrder[]>([]);
const loading = ref(false);

// Computed para filtrar la orden de fabricación actual si existe
const workOrders = computed(() => {
  if (!props.excludeWorkOrderId) {
    return allWorkOrders.value;
  }
  return allWorkOrders.value.filter((wo) => wo.id !== props.excludeWorkOrderId);
});

const onRowSelect = (event: any) => {
  emit("workorder-selected", event.data);
};

const loadWorkOrders = async () => {
  loading.value = true;
  try {
    const result = await workOrderService.GetByWorkcenterIdInProduction(
      props.workcenterId
    );
    if (result) {
      allWorkOrders.value = result;
    } else {
      allWorkOrders.value = [];
    }
  } catch (error) {
    console.error("Error loading work orders:", error);
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Error al carregar les ordres de fabricació",
      life: 4000,
    });
    allWorkOrders.value = [];
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadWorkOrders();
});
</script>

<style scoped>
.workorder-selector {
  width: 100%;
}

.reference-column {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.text-secondary {
  color: var(--text-color-secondary);
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

:deep(.p-datatable .p-datatable-tbody > tr) {
  cursor: pointer;
}

:deep(.p-datatable .p-datatable-tbody > tr:hover) {
  background-color: var(--surface-hover);
}
</style>
