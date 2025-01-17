<template>
  <TabView>
    <TabPanel header="General">
      <section class="three-columns mt-2">
        <div>
          <Card v-if="revenue" class="w-full">
            <template #title
              >Revenue
              <span class="relative group">
                <i
                  class="pi pi-question-circle"
                  v-tooltip="
                    'Xifra de negoci. Entrades i sortides amb imposts i segons data de creació'
                  "
                ></i>
              </span>
            </template>
            <template #content>
              <h1
                :class="
                  revenue.revenueAmount > 0 ? 'text-green-500' : 'text-red-500'
                "
                class="text-4xl font-bold"
              >
                {{ revenue.revenueAmount }} €
              </h1>
              <section class="three-columns">
                <h3 class="text-xs">Income: {{ revenue.incomeAmount }} €</h3>
                <h3 class="text-xs">Expense: {{ revenue.expenseAmount }} €</h3>
                <h3 class="text-xs">Outcome: {{ revenue.outcomeAmount }} €</h3>
              </section>
            </template>
          </Card>
        </div>
        <div>
          <Card class="w-full">
            <template #title
              >Cash flow
              <span class="relative group">
                <i
                  class="pi pi-question-circle"
                  v-tooltip="
                    'Flux de caixa. Entrades i sortides sense imposts i segons data de venciment'
                  "
                ></i>
              </span>
            </template>
            <template #content>
              <h1
                :class="
                  currentMonthIncomes > currentMonthExpenses
                    ? 'text-green-500'
                    : 'text-red-500'
                "
                class="text-4xl font-bold"
              >
                {{ currentMonthIncomes - currentMonthExpenses }} €
              </h1>
              <section class="three-columns">
                <h3 class="text-xs">Income: {{ currentMonthIncomes }} €</h3>
                <h3 class="text-xs">Expense: {{ currentMonthExpenses }} €</h3>
                <h3 class="text-xs">
                  Past Month: {{ pastMonthIncomes - pastMonthExpenses }} €
                </h3>
              </section>
            </template>
          </Card>
        </div>
        <div></div>
      </section>
    </TabPanel>
    <TabPanel header="Magatzem"></TabPanel>
    <TabPanel header="Comercial"></TabPanel>
  </TabView>
</template>
<script setup lang="ts">
import TabPanel from "primevue/tabpanel";
import TabView from "primevue/tabview";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useRevenueStore } from "../../sales/store/revenue";
import { IncomeService } from "../../sales/services/income.service";
import { ExpenseService } from "../../purchase/services/expense.service";

const incomeService = new IncomeService("/income");
const expenseService = new ExpenseService("/expense");

const route = useRoute();
const router = useRouter();
const revenueStore = useRevenueStore();

const { revenue } = storeToRefs(revenueStore);
const currentYear = ref<number>(0);
const currentMonth = ref<number>(0);
const pastYear = ref<number>(0);
const pastMonth = ref<number>(0);
const currentMonthExpenses = ref<number>(0);
const currentMonthIncomes = ref<number>(0);
const pastMonthExpenses = ref<number>(0);
const pastMonthIncomes = ref<number>(0);

onMounted(async () => {
  currentYear.value = new Date().getFullYear();
  currentMonth.value = new Date().getMonth() + 1;
  if (currentMonth.value === 1) {
    pastYear.value = currentYear.value - 1;
    pastMonth.value = 12;
  } else {
    pastYear.value = currentYear.value;
    pastMonth.value = currentMonth.value - 1;
  }
  await revenueStore.GetByMonthAndYear(currentMonth.value, currentYear.value);
  currentMonthExpenses.value =
    (await expenseService.getMonthly(currentYear.value, currentMonth.value)) ??
    0;
  pastMonthExpenses.value =
    (await expenseService.getMonthly(pastYear.value, pastMonth.value)) ?? 0;
  currentMonthIncomes.value =
    (await incomeService.getMonthly(currentYear.value, currentMonth.value)) ??
    0;
  pastMonthIncomes.value =
    (await incomeService.getMonthly(pastYear.value, pastMonth.value)) ?? 0;
});
</script>
