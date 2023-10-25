<template>
    <DataTable
      :value="stockStore.stocks"
      tableStyle="min-width: 100%"      
    >
      <template #header>
        <div
          class="flex flex-wrap align-items-center justify-content-between gap-2"
        >
          <span class="text-xl text-900 font-bold">Estocs</span>
        </div>
      </template>      
      <Column header="Producte" style="width: 28%">
      <template #body="slotProps">
        {{ getReferenceNameById(slotProps.data.referenceId) }}
      </template>
    </Column>
      <Column field="quantity" header="Uds." style="width: 12%"></Column>
      <Column field="width" header="Ample (x) mm" style="width: 12%"></Column>
      <Column field="length" header="Llarg (y) mm" style="width: 12%"></Column>
      <Column field="height" header="Alt (z) mm" style="width: 12%"></Column>
      <Column field="diameter" header="Diàmetre mm" style="width: 12%"></Column>
      <Column field="thickness" header="Gruix mm" style="width: 12%"></Column>      
    </DataTable>
  </template>
  <script setup lang="ts">
  import { v4 as uuidv4 } from "uuid";
  import { useRouter } from "vue-router";
  import { useStore } from "../../../store";
  import { useStockStore } from "../store/stock";
  import { useReferenceStore } from "../../shared/store/reference";
  
  import { onMounted } from "vue";
  import { PrimeIcons } from "primevue/api";
  import { useToast } from "primevue/usetoast";
  import { useConfirm } from "primevue/useconfirm";
  import { DataTableRowClickEvent } from "primevue/datatable";
  import { Warehouse } from "../types";
  
  const store = useStore();

  const stockStore = useStockStore();
  const referenceStore = useReferenceStore();
  
  onMounted(async () => {
    await stockStore.fetchStocks();
    await referenceStore.fetchReferences();
    store.setMenuItem({
      icon: PrimeIcons.BOX,
      title: "Gestió de magatzems",
    });
  });

  const getReferenceNameById = (id: string) => {
  const reference = referenceStore.references?.find((s) => s.id === id);
  if (reference) return reference.description;
  else return "";
};
  </script>
  