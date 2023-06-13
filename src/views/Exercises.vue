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
    <Column field="startDate" header="Data d'inici" style="width: 20%"></Column>
    <Column field="endDate" header="Dia de fi" style="width: 20%"></Column>
    <Column field="purchaseInvoiceCounter" header="Comptador factures de compra" style="width: 15%"></Column>
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
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { DataTableRowClickEvent } from "primevue/datatable";
import { useStore } from "../store";
import { useExerciseStore } from "../store/exercise";

const toast = useToast();
const confirm = useConfirm();
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
</script>