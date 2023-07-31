<template>
    <DataTable
        :value="referenceStore.references"
        tableStyle="min-width: 100%"
        @row-click="editRow"
        >
            <template #header>
            <div
            class="flex flex-wrap align-items-center justify-content-between gap-2"
            >
            <span class="text-xl text-900 font-bold">Referències</span>
            <Button
                :icon="PrimeIcons.PLUS"
                rounded
                raised
                @click="createButtonClick"
            />
            </div>
        </template>
            <Column field="code" header="Codi" style="width: 15%;"></Column>
            <Column field="description" header="Descripció" style="width: 35%;"></Column>
            <Column field="cost" header="Cost" style="width: 20%;"></Column>
            <Column field="price" header="Preu" style="width: 20%;"></Column>
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
  import { useReferenceStore } from "../store/reference";
  import { onMounted } from "vue";
  import { PrimeIcons } from "primevue/api";
  import { DataTableRowClickEvent } from "primevue/datatable";
  
  const router = useRouter();
  const store = useStore();
  const referenceStore = useReferenceStore();
  
  onMounted(async () => {
    await referenceStore.fetchReferences();
  
    store.setMenuItem({
      icon: PrimeIcons.SHOPPING_BAG,
      title: "Gestió de referencies",
    });
  });
  
  const createButtonClick = () => {
    router.push({ path: `/referencia/${uuidv4()}` });
  };
  
  const editRow = (row: DataTableRowClickEvent) => {
    if (
      !(row.originalEvent.target as any).className.includes(
        "grid_delete_column_button"
      )
    ) {
      router.push({ path: `/referencia/${row.data.id}` });
    }
  };

  </script>
  