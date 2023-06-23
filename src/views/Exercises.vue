<template>
  <Button
    :icon="PrimeIcons.PLUS"
    class="grid_add_row_button"
    rounded
    @click="createButtonClick"
  />
  <DataTable
    :value="exerciseStore.exercises"
    tableStyle="min-width: 100%"
    @row-click="editExercise"
  >
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
        <BooleanColumn :value="slotProps.data.disabled" />
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

const router = useRouter();
const store = useStore();
const exerciseStore = useExerciseStore();

onMounted(async () => {
  await exerciseStore.fetchAll();

  store.setMenuItem({
    icon: PrimeIcons.HASHTAG,
    text: "Exercicis",
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

const formatDate = (date: string) => {
  const formatter = new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "Europe/Madrid",
  });

  return formatter.format(new Date(date));
};

const formatDateTime = (dateTime: string) => {
  const formatter = new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "Europe/Madrid",
  });

  return formatter.format(new Date(dateTime));
};
</script>
