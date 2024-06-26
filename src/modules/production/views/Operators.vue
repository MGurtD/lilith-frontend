<template>
  <DataTable
    :value="plantmodelStore.operators"
    tableStyle="min-width: 100%"
    @row-click="editRow"
  >
    <template #header>
      <div
        class="flex flex-wrap align-items-center justify-content-between gap-2"
      >
        <span class="text-xl text-900 font-bold">Operaris</span>
        <Button
          :icon="PrimeIcons.PLUS"
          rounded
          raised
          @click="createButtonClick"
        />
      </div>
    </template>
    <Column field="code" header="Codi" style="width: 20%"></Column>
    <Column field="surname" header="Cognom" style="width: 25%"></Column>
    <Column field="name" header="Nom" style="width: 25%"></Column>
    <Column field="vatNumber" header="NIF" style="width: 20%"></Column>
    <Column header="Desactivat" style="width: 10%">
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
import { Operator } from "../types";

const router = useRouter();
const store = useStore();
const plantmodelStore = usePlantModelStore();
const toast = useToast();
const confirm = useConfirm();

onMounted(async () => {
  await plantmodelStore.fetchOperators();

  store.setMenuItem({
    icon: PrimeIcons.CALENDAR,
    title: "Gestió d'operaris",
  });
});

const createButtonClick = () => {
  router.push({ path: `/operator/${uuidv4()}` });
};

const editRow = (row: DataTableRowClickEvent) => {
  if (
    !(row.originalEvent.target as any).className.includes(
      "grid_delete_column_button"
    )
  ) {
    router.push({ path: `/operator/${row.data.id}` });
  }
};

const deleteButton = (event: any, operator: Operator) => {
  confirm.require({
    target: event.currentTarget,
    message: `Está segur que vol eliminar l'operari ${operator.surname}, ${operator.name}?`,
    icon: "pi pi-question-circle",
    acceptIcon: "pi pi-check",
    rejectIcon: "pi pi-times",
    accept: async () => {
      const deleted = await plantmodelStore.deleteOperator(operator.id);

      if (deleted) {
        toast.add({
          severity: "success",
          summary: "Eliminat",
          life: 3000,
        });
        await plantmodelStore.fetchOperators();
      }
    },
  });
};
</script>
