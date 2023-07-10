<template>
    <DataTable
    :value="expenseStore.expenses"
    tableStyle="min-width: 100%"
    @row-click="editExpense"
    >
    <template #header>
      <div
        class="flex flex-wrap align-items-center justify-content-between gap-2"
      >
        <span class="text-xl text-900 font-bold">Despeses</span>
        <Button
          :icon="PrimeIcons.PLUS"
          rounded
          raised
          @click="createButtonClick"
        />
      </div>
    </template>    
    <Column field="description" header="Descripció" style="width: 40%"></Column>
    <Column field="amount" header="Import" style="width: 15%"></Column>
    <Column field="paymentDate" header="Data pagament" style="width: 20%"></Column>
    <Column header="Tipus" style="width: 15%">
        <template #body="slotProps">
          {{ getExpenseTypeNameById(slotProps.data.expensTypeId) }}
        </template>
    </Column>
    <Column header="Recurrent" style="width: 10%">
      <template #body="slotProps">
        <BooleanColumn :value="slotProps.data.recurring" />
      </template>
    </Column>
    </DataTable>
</template>
<script setup lang="ts">
import { v4 as uuidv4 } from "uuid";
import { useRouter } from 'vue-router';
import { useStore } from '../../../store';
import { useExpenseStore } from '../store/expense';
import { onMounted } from 'vue';
import { PrimeIcons } from 'primevue/api';
import { DataTableRowClickEvent } from "primevue/datatable";


const router = useRouter();
const store = useStore();
const expenseStore = useExpenseStore();

onMounted(async () => {
    await expenseStore.fetchExpenseTypes();
    await expenseStore.fetchExpenses();

    store.setMenuItem({
        icon: PrimeIcons.WALLET,
        text: "Gestió de despeses",
    });
});

const createButtonClick = () => {
    router.push({ path: `/expense/${uuidv4()}`});
};

const editExpense = (row: DataTableRowClickEvent) => {
  if (
    !(row.originalEvent.target as any).className.includes(
      "grid_delete_column_button"
    )
  ) {
    router.push({ path: `/expense/${row.data.id}` });
  }
};

const getExpenseTypeNameById = (id: string) => {
  const type = expenseStore.expenseTypes?.find(
    (s) => s.id === id
  );
  if (type) return type.name;
  else return "";
};
</script>