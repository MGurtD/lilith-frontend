<template>
  <DataTable
    :value="exerciseStore.exercises"
    tableStyle="min-width: 100%"
    @row-click="editExercise"
  >
    <template #header>
      <div
        class="flex flex-wrap align-items-center justify-content-between gap-2"
      >
        <span class="text-xl text-900 font-bold">Exercicis</span>
        <Button
          :icon="PrimeIcons.PLUS"
          rounded
          raised
          @click="createButtonClick"
        />
      </div>
    </template>

    <Column field="name" header="Nom" style="width: 15%"></Column>
    <Column field="description" header="Descripció" style="width: 20%"></Column>
    <Column header="Data d'inici" style="width: 20%">
      <template #body="slotProps">
        {{ formatDate(slotProps.data.startDate) }}
      </template>
    </Column>
    <Column header="Dia de fi" style="width: 20%">
      <template #body="slotProps">
        {{ formatDate(slotProps.data.endDate) }}
      </template>
    </Column>
    <Column
      field="purchaseInvoiceCounter"
      header="Factures de compra"
      style="width: 15%"
    ></Column>
    <Column header="Desactivada" style="width: 10%">
      <template #body="slotProps">
        <BooleanColumn :value="slotProps.data.disabled" :showColor="false" />
      </template>
    </Column>
  </DataTable>
</template>
<script setup lang="ts">
import { v4 as uuidv4 } from "uuid";
import { PrimeIcons } from "primevue/api";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { DataTableRowClickEvent } from "primevue/datatable";
import { useStore } from "../store";
import { useExerciseStore } from "../store/exercise";
import { formatDate } from "../utils/functions";

const router = useRouter();
const store = useStore();
const exerciseStore = useExerciseStore();

onMounted(async () => {
  await exerciseStore.fetchAll();

  store.setMenuItem({
    icon: PrimeIcons.HASHTAG,
    title: "Gestió d'exercicis",
  });
});

const createButtonClick = () => {
  router.push({ path: `/exercise/${uuidv4()}` });
};

const editExercise = (row: DataTableRowClickEvent) => {
  if (
    !(row.originalEvent.target as any).className.includes(
      "grid_delete_column_button"
    )
  ) {
    router.push({ path: `/exercise/${row.data.id}` });
  }
};
</script>
