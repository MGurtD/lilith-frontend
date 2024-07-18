<template>
  <DataTable
    :value="expenseStore.expenses"
    class="p-datatable-sm small-datatable"
    tableStyle="min-width: 100%"
    scrollable
    scrollHeight="80vh"
    sortMode="multiple"
    @row-click="editExpense"
  >
    <template #header>
      <div
        class="flex flex-wrap align-items-center justify-content-between gap-2"
      >
        <div class="datatable-filter">
          <div class="filter-field">
            <label class="block text-900 mb-2">Tipus</label>
            <Dropdown
              v-model="filter.expenseTypeId"
              editable
              :options="expenseStore.expenseTypes"
              optionValue="id"
              optionLabel="name"
              class="w-full"
            />
          </div>
        </div>

        <div class="datatable-buttons">
          <Button
            class="datatable-button mr-2"
            :icon="PrimeIcons.FILTER"
            rounded
            raised
            @click="filterExpense"
          />
          <Button
            class="datatable-button mr-2"
            :icon="PrimeIcons.FILTER_SLASH"
            rounded
            raised
            @click="clearFilter"
          />
          <Button
            :icon="PrimeIcons.PLUS"
            rounded
            raised
            @click="createButtonClick"
          />
        </div>
      </div>
    </template>
    <Column
      field="description"
      header="Descripció"
      style="width: 40%"
      sortable
    ></Column>
    <Column field="amount" header="Import" style="width: 15%">
      <template #body="slotProps">
        {{ formatCurrency(slotProps.data.amount) }}
      </template>
    </Column>
    <Column
      field="paymentDate"
      header="Data pagament"
      style="width: 20%"
      sortable
    >
      <template #body="slotProps">
        {{ formatDate(slotProps.data.paymentDate) }}
      </template>
    </Column>
    <Column header="Tipus" style="width: 15%">
      <template #body="slotProps">
        {{ getExpenseTypeNameById(slotProps.data.expenseTypeId) }}
      </template>
    </Column>
    <Column header="Recurrent" style="width: 10%">
      <template #body="slotProps">
        <BooleanColumn :value="slotProps.data.recurring" :showColor="false" />
      </template>
    </Column>
    <Column>
      <template #body="slotProps">
        <i
          :class="PrimeIcons.TIMES"
          class="grid_delete_column_button"
          @click="deleteExpense($event, slotProps.data)"
        />
      </template>
    </Column>
    <template #footer>Total {{ formatCurrency(totalAmount) }} €</template>
  </DataTable>
</template>
<script setup lang="ts">
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "vue-router";
import { useStore } from "../../../store";
import { useExpenseStore } from "../store/expense";
import { computed, onMounted, ref } from "vue";
import { PrimeIcons } from "primevue/api";
import { DataTableRowClickEvent } from "primevue/datatable";
import { formatDate, formatCurrency } from "../../../utils/functions";
import { Expense } from "../types";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const router = useRouter();
const store = useStore();
const expenseStore = useExpenseStore();
const filter = ref({
  dates: undefined as Array<Date> | undefined,
  expenseTypeId: undefined as string | undefined,
});
const totalAmount = computed(() => {
  let total = 0;
  if (expenseStore.expenses) {
    expenseStore.expenses.forEach((e) => (total += e.amount));
  }
  return total;
});

onMounted(async () => {
  await expenseStore.fetchExpenseTypes();
  await expenseStore.fetchExpenses();

  store.setMenuItem({
    icon: PrimeIcons.WALLET,
    title: "Gestió de despeses",
  });
});

const filterExpense = async () => {
  if (filter.value.expenseTypeId) {
    await expenseStore.getFiltered(filter.value.expenseTypeId);
  }
};

const clearFilter = async () => {
  filter.value.expenseTypeId = "";

  await expenseStore.fetchExpenses();
};

const createButtonClick = () => {
  router.push({ path: `/expense/${uuidv4()}` });
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

const toast = useToast();
const confirm = useConfirm();
const deleteExpense = (event: any, expense: Expense) => {
  confirm.require({
    target: event.currentTarget,
    message: `Està segur que vol eliminar la despesa?`,
    icon: "pi pi-question-circle",
    acceptIcon: "pi pi-check",
    rejectIcon: "pi pi-times",
    accept: async () => {
      const deleted = await expenseStore.deleteExpense(expense.id);
      if (deleted) {
        toast.add({
          severity: "success",
          summary: "Eliminat",
          life: 3000,
        });
        await expenseStore.fetchExpenses();
      }
    },
  });
};

const getExpenseTypeNameById = (id: string) => {
  const type = expenseStore.expenseTypes?.find((s) => s.id === id);
  if (type) return type.name;
  else return "";
};
</script>
