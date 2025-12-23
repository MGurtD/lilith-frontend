<template>
  <DataTable
    :value="workorders"
    tableStyle="min-width: 100%"
    class="p-datatable-sm small-datatable"
    sortField="order"
    :sortOrder="1"
    scrollable
    scrollHeight="76vh"
    @rowReorder="onRowReorder"
  >
    <template #header>
      <div
        class="flex flex-wrap align-items-center justify-content-between gap-2"
      >
        <div class="datatable-filter-1">
          <div class="filter-field">
            <Dropdown
              label=""
              v-model="filter.workcenterType"
              :options="plantModelStore.workcenterTypes"
              optionLabel="name"
              optionValue="id"
              placeholder="Tipus de center de treball"
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
          <Button :icon="PrimeIcons.SAVE" rounded raised @click="updateOrder" />
        </div>
      </div>
    </template>
    <Column rowReorder headerStyle="width: 3rem" :reorderableColumn="false" />
    <Column field="code" header="Codi"></Column>
    <Column header="Estat">
      <template #body="slotProps">
        {{ slotProps.data.status?.name }}
      </template>
    </Column>
    <Column header="Referència">
      <template #body="slotProps">
        {{
          slotProps.data.reference?.code +
          " - " +
          slotProps.data.reference?.description
        }}
      </template>
    </Column>
    <Column field="plannedDate" header="Data Prevista" style="width: 12%">
      <template #body="slotProps">
        {{ formatDate(slotProps.data.plannedDate) }}
      </template>
    </Column>
    <Column field="order" header="Prioritat"></Column>
    <Column field="plannedQuantity" header="Quantitat"></Column>
  </DataTable>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import { useWorkOrderStore } from "../store/workorder";
import { usePlantModelStore } from "../store/plantmodel";
import Dropdown from "primevue/dropdown";
import { PrimeIcons } from "primevue/api";
import { ref, computed } from "vue";
import { formatDate } from "../../../utils/functions";
import { WorkOrderOrder } from "../types";
import { useStore } from "@/store";

const store = useStore();
const plantModelStore = usePlantModelStore();
const workorderStore = useWorkOrderStore();

onMounted(async () => {
  store.setMenuItem({
    icon: PrimeIcons.BUILDING,
    backButtonVisible: false,
    title: "Priorització d'Ordres de Fabricació",
  });

  await plantModelStore.fetchActiveWorkcenterTypes();
});

const workorders = computed(() => {
  return Array.isArray(workorderStore.workorders)
    ? workorderStore.workorders
    : [];
});

const filter = ref({
  workcenterType: undefined,
});

const cleanFilter = () => {
  filter.value.workcenterType = undefined;
};

const filterData = async () => {
  if (filter.value.workcenterType) {
    await workorderStore.fetchByWorkcenterType(filter.value.workcenterType);
    console.log(workorderStore.workorders);
  }
};

const onRowReorder = async (event: any) => {
  workorderStore.workorders = event.value.map((item: any, index: number) => {
    item.order = index + 1;
    return item;
  });
};

const updateOrder = async () => {
  const payload: Array<WorkOrderOrder> = workorders.value.map((item: any) => {
    return {
      id: item.id,
      order: item.order,
    };
  });
  await workorderStore.updateOrder(payload);
};
</script>
