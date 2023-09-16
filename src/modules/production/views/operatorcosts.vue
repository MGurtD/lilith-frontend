<template>
  <DataTable
    :value="plantmodelStore.operatorCosts"
    tableStyle="min-width: 100%"
    @row-click="editRow"
  >
    <template #header>
      <div
        class="flex flex-wrap align-items-center justify-content-between gap-2"
      >
        <span class="text-xl text-900 font-bold">Cost per tipus d'operari</span>
        <Button
          :icon="PrimeIcons.PLUS"
          rounded
          raised
          @click="createButtonClick"
        />
      </div>
    </template>
    <Column header="Tipus d'operari" style="width: 30%">
      <template #body="slotProps">
        <span>{{ getOperatorTypeById(slotProps.data.operatorTypeId) }}</span>
      </template>
    </Column>
    <Column header="Estat de màquina" style="width: 30%">
      <template #body="slotProps">
        <span>{{ getMachineStatusById(slotProps.data.machineStatusId) }}</span>
      </template>
    </Column>
    <Column field="cost" header="Cost" style="width: 30%"></Column>
    <Column header="Desactivada" style="width: 10%">
      <template #body="slotProps">
        <BooleanColumn :value="slotProps.data.disabled" />
      </template>
    </Column>
    <Column>
      <template #body="slotProps">
        <i
          :class="PrimeIcons.TIMES"
          class="grid_delete_column_button"
          @click="deleteButton($event, slotProps.data)"
        />
      </template>
    </Column>
  </DataTable>
</template>
<script setup lang="ts">
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "vue-router";
import { useStore } from "../../../store";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import { usePlantModelStore } from "../store/plantmodel";
import { onMounted } from "vue";
import { PrimeIcons } from "primevue/api";
import { DataTableRowClickEvent } from "primevue/datatable";
import { OperatorCost } from "../types";

const router = useRouter();
const store = useStore();
const plantmodelStore = usePlantModelStore();
const toast = useToast();
const confirm = useConfirm();

onMounted(async () => {
  await plantmodelStore.fetchOperatorCosts();
  await plantmodelStore.fetchOperatorTypes();
  await plantmodelStore.fetchMachineStatuses();

  store.setMenuItem({
    icon: PrimeIcons.CALENDAR,
    title: "Costs per tipus d'operari",
  });
});

const getOperatorTypeById = (id: string) => {
  const operatorType = plantmodelStore.operatorTypes?.find(
    (st) => st.id === id
  );
  if (operatorType) {
    return operatorType.name;
  }
};

const getMachineStatusById = (id: string) => {
  const machineStatus = plantmodelStore.machineStatuses?.find(
    (st) => st.id === id
  );
  if (machineStatus) {
    return machineStatus.name;
  }
};

const createButtonClick = () => {
  router.push({ path: `/operatorcost/${uuidv4()}` });
};

const editRow = (row: DataTableRowClickEvent) => {
  if (
    !(row.originalEvent.target as any).className.includes(
      "grid_delete_column_button"
    )
  ) {
    router.push({ path: `/operatorcost/${row.data.id}` });
  }
};

const deleteButton = (event: any, operatorcost: OperatorCost) => {
  confirm.require({
    target: event.currentTarget,
    message: `Está segur que vol eliminar el cost  ${operatorcost.id}?`,
    icon: "pi pi-question-circle",
    acceptIcon: "pi pi-check",
    rejectIcon: "pi pi-times",
    accept: async () => {
      const deleted = await plantmodelStore.deleteOperatorCost(operatorcost.id);

      if (deleted) {
        toast.add({
          severity: "success",
          summary: "Eliminat",
          life: 3000,
        });
        await plantmodelStore.fetchOperatorCosts();
      }
    },
  });
};
</script>
