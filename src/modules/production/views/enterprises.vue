<template>
  <DataTable
    :value="plantmodelStore.enterprises"
    tableStyle="min-width: 100%"
    @row-click="editEnterprise"
  >
    <template #header>
      <div
        class="flex flex-wrap align-items-center justify-content-between gap-2"
      >
        <span class="text-xl text-900 font-bold">Empresa</span>
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
  await plantmodelStore.fetchEnterprises();

  store.setMenuItem({
    icon: PrimeIcons.CALENDAR,
    title: "Gestió d'empreses",
  });
});

const createButtonClick = () => {
  router.push({ path: `/enterprise/${uuidv4()}` });
};

const editEnterprise = (row: DataTableRowClickEvent) => {
  if (
    !(row.originalEvent.target as any).className.includes(
      "grid_delete_column_button"
    )
  ) {
    router.push({ path: `/enterprise/${row.data.id}` });
  }
};
</script>
