<template>
  <div>
    <DataTable
      class="p-datatable-sm small-datatable"
      dataKey="groupKey"
      :value="workcenterShifts"
      v-model:expandedRows="expandedRows"
      :paginator="true"
      :rows="20"
      tableStyle="min-width: 100%"
      scrollable
      scrollHeight="80vh"
      sortMode="multiple"
    >
      <template #header>
        <div
          class="flex flex-wrap align-items-center justify-content-between gap-2"
        >
          <div class="datatable-filter">
            <div class="filter-field">
              <label>Desde:</label>
              <Calendar v-model="filter.startDate" showIcon />
            </div>
            <div class="filter-field">
              <label>Fins a:</label>
              <Calendar v-model="filter.endDate" showIcon />
            </div>
            <div class="filter-field">
              <label>Agrupació</label>
              <Dropdown
                v-model="filter.groupBy"
                :options="groupByOptions"
                optionLabel="label"
                optionValue="value"
              />
            </div>
          </div>
          <div class="datatable-buttons">
            <Button
              class="datatable-button mr-2"
              :icon="PrimeIcons.FILTER"
              rounded
              raised
              @click="filterData"
            />
            <Button
              class="datatable-button mr-2"
              :icon="PrimeIcons.FILTER_SLASH"
              rounded
              raised
              @click="cleanFilter"
            />
          </div>
        </div>
      </template>
      <Column expander style="width: 5rem" />
      <Column field="groupKey" header="Clau" sortable> </Column>
      <Column field="totalQuantityOk" header="Quantitat OK"></Column>
      <Column field="totalQuantityKo" header="Quantitat KO"></Column>
      <Column field="totalCost" header="Cost">
        <template #body="slotProps">
          {{ formatCurrency(slotProps.data.totalCost) }}
        </template>
      </Column>
      <Column field="totalHours" header="Hores">
        <template #body="slotProps">
          {{ slotProps.data.totalHours.toFixed(2) }}
        </template>
      </Column>
      <template #expansion="slotProps">
        <div class="p-3">
          <DataTable
            :value="slotProps.data.details"
            class="p-datatable-sm small-datatable"
            tableStyle="min-width: 100%"
            scrollable
            scrollHeight="60vh"
            sortMode="multiple"
          >
            <Column
              field="workcenterName"
              header="Centre de treball"
              sortable
            />
            <Column field="machineStatusName" header="Estat de màquina" />
            <Column field="startTime" header="Inici" sortable>
              <template #body="slotProps">
                {{ formatDateTimeUTC(slotProps.data.startTime) }}
              </template>
            </Column>
            <Column field="endTime" header="Fi" sortable>
              <template #body="slotProps">
                {{ formatDateTimeUTC(slotProps.data.endTime) }}
              </template>
            </Column>
            <Column field="quantityOk" header="Quantitat OK" />
            <Column field="quantityKo" header="Quantitat KO" />
            <Column field="totalCost" header="Cost">
              <template #body="slotProps">
                {{ formatCurrency(slotProps.data.totalCost) }}
              </template>
            </Column>
            <Column field="totalHours" header="Hores">
              <template #body="slotProps">
                {{ slotProps.data.totalHours.toFixed(2) }}
              </template>
            </Column>
          </DataTable>
        </div>
      </template>
    </DataTable>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useWorkcenterShiftStore } from "../store/workcentershift";
import type { WorkcenterShiftGroup, WorkcenterShiftRequest } from "../types";
import { PrimeIcons } from "primevue/api";
import { formatCurrency, formatDateTimeUTC } from "../../../utils/functions";

const workcenterShifts = ref<WorkcenterShiftGroup[]>([]);
const workcenterShiftStore = useWorkcenterShiftStore();

const expandedRows = ref({});

const dummieRequest: WorkcenterShiftRequest = {
  startDate: "2025-10-01T00:00:00Z",
  endDate: "2025-10-10T23:59:59Z",
  groupBy: "Operator",
};

const groupByOptions = [
  { label: "Operari", value: "Operator" },
  { label: "Màquina", value: "Machine" },
  { label: "Centre de treball", value: "Workcenter" },
  { label: "Ordre de fabricació", value: "WorkorderPhase" },
  { label: "Cap", value: "None" },
];

const filter = ref<WorkcenterShiftRequest>({
  startDate: "",
  endDate: "",
  workcenterId: undefined,
  operatorId: undefined,
  workorderPhaseId: undefined,
  groupBy: undefined,
});

onMounted(async () => {});

const filterData = async () => {
  let response = await workcenterShiftStore.query(filter.value);
  if (response) {
    workcenterShifts.value = response;
  }
};

const cleanFilter = async () => {
  filter.value.startDate = "";
  filter.value.endDate = "";
  filter.value.workcenterId = undefined;
  filter.value.operatorId = undefined;
  filter.value.workorderPhaseId = undefined;
  filter.value.groupBy = undefined;
  workcenterShifts.value = [];
};
</script>
