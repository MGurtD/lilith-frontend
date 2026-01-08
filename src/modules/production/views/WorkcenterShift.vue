<template>
  <div>
    <DataTable
      class="p-datatable-sm small-datatable"
      dataKey="key"
      :value="workcenterShifts"
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
              <Calendar
                :modelValue="
                  filter.startTime ? new Date(filter.startTime) : null
                "
                @update:modelValue="
                  (val: Date | Date[] | (Date | null)[] | null | undefined) => {
                    if (val instanceof Date) {
                      filter.startTime = val.toISOString();
                    } else {
                      filter.startTime = '';
                    }
                  }
                "
                showIcon
              />
            </div>
            <div class="filter-field">
              <label>Fins a:</label>
              <Calendar
                :modelValue="filter.endTime ? new Date(filter.endTime) : null"
                @update:modelValue="
                  (val: Date | Date[] | (Date | null)[] | null | undefined) => {
                    if (val instanceof Date) {
                      filter.endTime = val.toISOString();
                    } else {
                      filter.endTime = '';
                    }
                  }
                "
                showIcon
              />
            </div>
            <div class="filter-field">
              <label>Grup</label>
              <Dropdown
                v-model="filter.groupBy"
                :options="groupByOptions"
                optionLabel="label"
                optionValue="value"
              />
            </div>
            <div class="filter-field">
              <label>Grup per temps</label>
              <Dropdown
                v-model="filter.timeGroupBy"
                :options="timeGroupByOptions"
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
      <Column field="workcenter" header="Centre de treball" sortable> </Column>
      <Column field="operator" header="Operari" sortable> </Column>
      <Column field="machineStatus" header="Estat del centre"></Column>

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
      <Column field="plannedQuantity" header="Quantitat Prevista" />
      <Column field="operatorCost" header="Cost Operari">
        <template #body="slotProps">
          {{ formatCurrency(slotProps.data.operatorCost) }}
        </template>
      </Column>
      <Column
        field="estimatedOperatorCost"
        header="Cost operari estimat (per OF)"
      >
        <template #body="slotProps">
          {{ formatCurrency(slotProps.data.estimatedOperatorCost) }}
        </template>
      </Column>
      <Column field="workcenterCost" header="Cost centre">
        <template #body="slotProps">
          {{ formatCurrency(slotProps.data.workcenterCost) }}
        </template>
      </Column>
      <Column
        field="estimatedMachineCost"
        header="Cost centre estimat (per OF)"
      >
        <template #body="slotProps">
          {{ formatCurrency(slotProps.data.estimatedMachineCost) }}
        </template>
      </Column>
      <Column field="totalCost" header="Cost Tall">
        <template #body="slotProps">
          {{ formatCurrency(slotProps.data.totalCost) }}
        </template>
      </Column>
      <Column field="totalHours" header="Hores">
        <template #body="slotProps">
          {{ slotProps.data.totalHours.toFixed(2) }}
        </template>
      </Column>
      <Column field="workOrderCode" header="Ordre de treball" sortable></Column>
      <Column field="workOrderPhaseCode" header="Fase" sortable></Column>
      <Column
        field="workOrderPhaseDescription"
        header="Descripcio fase"
      ></Column>
      <Column field="referenceCode" header="Referencia"></Column>
      <Column
        field="referenceDescription"
        header="Descripcio referencia"
      ></Column>
      <Column field="customerComercialName" header="Client"></Column>
    </DataTable>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useWorkcenterShiftStore } from "../store/workcentershift";
import type {
  WorkcenterShiftHistorical,
  WorkcenterShiftRequest,
} from "../types";
import { PrimeIcons } from "primevue/api";
import { formatCurrency, formatDateTimeUTC } from "../../../utils/functions";

const workcenterShifts = ref<WorkcenterShiftHistorical[]>([]);
const workcenterShiftStore = useWorkcenterShiftStore();

const groupByOptions = [
  { label: "Operari", value: "Operator" },
  { label: "Centre de treball", value: "Workcenter" },
  { label: "Ordre de treball", value: "Workorder" },
  { label: "Cap", value: "None" },
];

const timeGroupByOptions = [
  { label: "Dia", value: "Day" },
  { label: "Setmana", value: "Week" },
  { label: "Mes", value: "Month" },
  { label: "Any", value: "Year" },
  { label: "Cap", value: "None" },
];

const filter = ref<WorkcenterShiftRequest>({
  startTime: "",
  endTime: "",
  groupBy: "None",
  timeGroupBy: "None",
});

onMounted(async () => {});

const filterData = async () => {
  let response = await workcenterShiftStore.query(filter.value);
  if (response) {
    workcenterShifts.value = response;
  }
};

const cleanFilter = async () => {
  filter.value.startTime = "";
  filter.value.endTime = "";
  filter.value.groupBy = "None";
  filter.value.timeGroupBy = "None";
  workcenterShifts.value = [];
};
</script>
