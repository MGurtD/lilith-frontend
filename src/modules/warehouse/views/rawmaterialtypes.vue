<template>
    <DataTable
      :value="warehouseStore.rawmaterialTypes"
      tableStyle="min-width: 100%"
      @row-click="editRow"
    >
      <template #header>
        <div
          class="flex flex-wrap align-items-center justify-content-between gap-2"
        >
          <span class="text-xl text-900 font-bold">Tipus de matèries primes</span>
          <Button
            :icon="PrimeIcons.PLUS"
            rounded
            raised
            @click="createButtonClick"
          />
        </div>
      </template>
      <Column field="name" header="Nom" style="width: 25%"></Column>
      <Column field="description" header="Descripció" style="width: 50%"></Column>
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
  import { useWarehouseStore } from "../store/warehouse";
  import { usePlantModelStore } from "../../production/store/plantmodel";
  import { onMounted } from "vue";
  import { PrimeIcons } from "primevue/api";
  import { useToast } from "primevue/usetoast";
  import { useConfirm } from "primevue/useconfirm";
  import { DataTableRowClickEvent } from "primevue/datatable";
  import { RawMaterialType } from "../types";
  
  const router = useRouter();
  const store = useStore();
  const toast = useToast();
  const confirm = useConfirm();
  const warehouseStore = useWarehouseStore();

  
  onMounted(async () => {
    await warehouseStore.fetchRawMaterialTypes();
  
    store.setMenuItem({
      icon: PrimeIcons.BOX,
      title: "Gestió de tipus de matèries primes",
    });
  });
  
  const createButtonClick = () => {
    router.push({ path: `/rawmaterialtype/${uuidv4()}` });
  };
  
  const editRow = (row: DataTableRowClickEvent) => {
    if (
      !(row.originalEvent.target as any).className.includes(
        "grid_delete_column_button"
      )
    ) {
      router.push({ path: `/rawmaterialtype/${row.data.id}` });
    }
  };
  
  const deleteButton = (event: any, rawmaterialtype: RawMaterialType) => {
    confirm.require({
      target: event.currentTarget,
      message: `Está segur que vol eliminar el tipus de materia prima ${rawmaterialtype.name}?`,
      icon: "pi pi-question-circle",
      acceptIcon: "pi pi-check",
      rejectIcon: "pi pi-times",
      accept: async () => {
        const deleted = await warehouseStore.deleteRawMaterialType(rawmaterialtype.id);
  
        if (deleted) {
          toast.add({
            severity: "success",
            summary: "Eliminat",
            life: 3000,
          });
          await warehouseStore.fetchRawMaterialTypes();
        }
      },
    });
  };
  </script>
  