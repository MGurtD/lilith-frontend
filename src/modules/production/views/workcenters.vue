<template>
    <DataTable
      :value="plantmodelStore.workcenters"
      tableStyle="min-width: 100%"
      @row-click="editRow"
    >
      <template #header>
        <div
          class="flex flex-wrap align-items-center justify-content-between gap-2"
        >
          <span class="text-xl text-900 font-bold">Màquines</span>
          <Button
            :icon="PrimeIcons.PLUS"
            rounded
            raised
            @click="createButtonClick"
          />
        </div>
      </template>
      <Column field="name" header="Nom" style="width: 20%"></Column>
      <Column field="description" header="Descripció" style="width: 40%"></Column>
      <Column header="Tipus" style="width: 15%">
        <template #body="slotProps">
          {{ getWorkcenterTypeNameById(slotProps.data.workcenterTypeId) }}
        </template>
    </Column>
    <Column header="Area" style="width: 15%">
        <template #body="slotProps">
          {{ getAreaNameById(slotProps.data.areaId) }}
        </template>
    </Column>
      <Column header="Desactivat" style="width: 10%">
        <template #body="slotProps">
          <BooleanColumn :value="slotProps.data.disabled" />
        </template>
      </Column>
    </DataTable>
  </template>
  <script setup lang="ts">
  import { v4 as uuidv4 } from "uuid";
  import { useRouter } from "vue-router";
  import { useStore } from "../../../store";
  import { usePlantModelStore } from "../store/plantmodel";
  import { onMounted } from "vue";
  import { PrimeIcons } from "primevue/api";
  import { DataTableRowClickEvent } from "primevue/datatable";
  
  const router = useRouter();
  const store = useStore();
  const plantmodelStore = usePlantModelStore();
  
  onMounted(async () => {
    await plantmodelStore.fetchWorkcenters();
  
    store.setMenuItem({
      icon: PrimeIcons.CALENDAR,
      title: "Gestió de màquines",
    });
  });
  
  const createButtonClick = () => {
    router.push({ path: `/workcenter/${uuidv4()}` });
  };
  
  const editRow = (row: DataTableRowClickEvent) => {
    if (
      !(row.originalEvent.target as any).className.includes(
        "grid_delete_column_button"
      )
    ) {
      router.push({ path: `/workcenter/${row.data.id}` });
    }
  };
  
const getAreaNameById = (id: string) => {
  const type = plantmodelStore.areas?.find(
    (s) => s.id === id
  );
  if (type) return type.name;
  else return "";
};
const getWorkcenterTypeNameById = (id: string) => {
  const type = plantmodelStore.workcenterTypes?.find(
    (s) => s.id === id
  );
  if (type) return type.name;
  else return "";
};
  </script>
  