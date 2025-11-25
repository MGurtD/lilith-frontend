<template>
  <div>
    <DataTable
      class="p-datatable-sm small-datatable"
      dataKey="key"
      :value="headers"
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
      <Column field="key" header="Clau" sortable> </Column>
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
            dataKey="key"
          >
            <Column expander style="width: 5rem" />
            <Column field="key" header="Clau" sortable />
            <Column field="workcenter" header="Centre de treball" sortable />
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
            <Column field="operatorCost" header="Cost Operari">
              <template #body="slotProps">
                {{ formatCurrency(slotProps.data.operatorCost) }}
              </template>
            </Column>
            <Column field="workcenterCost" header="Cost Màquina">
              <template #body="slotProps">
                {{ formatCurrency(slotProps.data.workcenterCost) }}
              </template>
            </Column>
            <Column field="totalCost" header="Cost Total">
              <template #body="slotProps">
                {{ formatCurrency(slotProps.data.totalCost) }}
              </template>
            </Column>
            <Column field="totalHours" header="Hores">
              <template #body="slotProps">
                {{ slotProps.data.totalHours.toFixed(2) }}
              </template>
            </Column>
            <template #expansion="innerSlotProps">
              <div class="p-3 pl-5">
                <DataTable
                  :value="innerSlotProps.data.details"
                  class="p-datatable-sm small-datatable"
                  tableStyle="min-width: 100%"
                >
                  <Column field="machineStatus" header="Estat de màquina" />
                  <Column field="startTime" header="Inici">
                    <template #body="slotProps">
                      {{ formatDateTimeUTC(slotProps.data.startTime) }}
                    </template>
                  </Column>
                  <Column field="endTime" header="Fi">
                    <template #body="slotProps">
                      {{ formatDateTimeUTC(slotProps.data.endTime) }}
                    </template>
                  </Column>
                  <Column field="quantityOk" header="Quantitat OK" />
                  <Column field="quantityKo" header="Quantitat KO" />
                  <Column field="operatorCost" header="Cost Operari">
                    <template #body="slotProps">
                      {{ formatCurrency(slotProps.data.operatorCost) }}
                    </template>
                  </Column>
                  <Column field="workcenterCost" header="Cost Màquina">
                    <template #body="slotProps">
                      {{ formatCurrency(slotProps.data.workcenterCost) }}
                    </template>
                  </Column>
                </DataTable>
              </div>
            </template>
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
  startTime: "2025-10-01T00:00:00Z",
  endTime: "2025-10-10T23:59:59Z",
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
  startTime: "",
  endTime: "",
  workcenterId: undefined,
  operatorId: undefined,
  workorderPhaseId: undefined,
  groupBy: undefined,
});

onMounted(async () => {});

const filterData = async () => {
  let response = await workcenterShiftStore.query(filter.value);
  if (response) {
    console.log("1");
    workcenterShifts.value = response;
    console.log("2");
    groupData();
  }
};

const cleanFilter = async () => {
  filter.value.startTime = "";
  filter.value.endTime = "";
  filter.value.workcenterId = undefined;
  filter.value.operatorId = undefined;
  filter.value.workorderPhaseId = undefined;
  filter.value.groupBy = undefined;
  workcenterShifts.value = [];
};

interface GroupedDetail {
  key: string;
  workcenter: string;
  startTime: string;
  endTime: string;
  quantityOk: number;
  quantityKo: number;
  operatorCost: number;
  workcenterCost: number;
  totalCost: number;
  totalHours: number;
}

interface Header {
  key: string;
  startTime: string;
  endTime: string;
  totalQuantityOk: number;
  totalQuantityKo: number;
  totalOperatorCost: number;
  totalWorkcenterCost: number;
  totalCost: number;
  totalHours: number;
  details: GroupedDetail[];
}

const headers = ref<Header[]>([]);

const groupData = () => {
  const headersMap = new Map<string, Header>();

  workcenterShifts.value.forEach((detail: any) => {
    if (!headersMap.has(detail.key)) {
      headersMap.set(detail.key, {
        key: detail.key,
        startTime: detail.startTime,
        endTime: detail.endTime || detail.startTime,
        totalQuantityOk: 0,
        totalQuantityKo: 0,
        totalOperatorCost: 0,
        totalWorkcenterCost: 0,
        totalCost: 0,
        totalHours: 0,
        details: [],
      });
    }

    const header = headersMap.get(detail.key)!;

    // Actualitzar endTime si és posterior
    if (detail.endTime && detail.endTime > header.endTime) {
      header.endTime = detail.endTime;
    }

    // Afegir el detall directament (sense agrupar)
    header.details.push({
      key: detail.key,
      workcenter: detail.workcenter,
      startTime: detail.startTime,
      endTime: detail.endTime || detail.startTime,
      quantityOk: detail.quantityOk,
      quantityKo: detail.quantityKo,
      operatorCost: detail.operatorCost,
      workcenterCost: detail.workcenterCost,
      totalCost: detail.totalCost,
      totalHours: detail.totalHours,
    });

    // Acumular valors al Header (totalitzar)
    header.totalQuantityOk += detail.quantityOk;
    header.totalQuantityKo += detail.quantityKo;
    header.totalOperatorCost += detail.operatorCost;
    header.totalWorkcenterCost += detail.workcenterCost;
    header.totalCost += detail.totalCost;
    header.totalHours += detail.totalHours;
  });

  // Convertir el Map a array
  headers.value = Array.from(headersMap.values());
};
</script>
