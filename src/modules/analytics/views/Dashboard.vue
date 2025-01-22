<template>
  <section></section>
  <TabView>
    <TabPanel header="General">
      <section class="mt-2 dashboard-card-container">
        <DashboardCard
          v-if="revenue"
          :isPositive="revenue.revenueAmount > 0"
          title="Revenue"
          tooltip="Xifra de negoci. Entrades i sortides amb imposts i segons data de creació"
          :indicatorValue="revenue.revenueAmount"
          text1="Income"
          :value1="revenue.incomeAmount"
          text2="Expense"
          :value2="revenue.expenseAmount"
          text3="Outcome"
          :value3="revenue.outcomeAmount"
        >
        </DashboardCard>
        <DashboardCard
          title="Cash flow"
          :isPositive="currentMonthIncomes > currentMonthExpenses"
          tooltip="Flux de caixa. Entrades i sortides sense imposts i segons data de venciment"
          :indicatorValue="currentMonthIncomes - currentMonthExpenses"
          text1="Income"
          :value1="currentMonthIncomes"
          text2="Expense"
          :value2="currentMonthExpenses"
          text3="Past Month"
          :value3="pastMonthIncomes - pastMonthExpenses"
        />
        <DashboardCard
          title="Stock value"
          :isPositive="true"
          tooltip="Valor de l'estoc actual del magatzem"
          :indicatorValue="2560"
          text3="Past Month"
          :value3="2800"
        />
      </section>
    </TabPanel>
  </TabView>
  <TabView>
    <TabPanel header="Comercial">
      <section class="mt-2 dashboard-card-container">
        <DashboardCard
          title="% Budgets assertion"
          :isPositive="true"
          tooltip="Percentatge d'acceptació dels pressupostos enviats"
          unit="%"
          :indicatorValue="72"
          text3="Past Month"
          :value3="56"
        />
        <div class="dashboard-card">
          <Card>
            <template #title>
              Top 5 customers
              <span class="relative group">
                <i
                  class="pi pi-question-circle"
                  v-tooltip="'Los cinco clientes con más facturación del mes'"
                ></i>
              </span>
            </template>
            <template #content>
              <TopCustomers :customers="customers" />
            </template>
          </Card>
        </div>
      </section>
    </TabPanel>
  </TabView>
</template>
<script setup lang="ts">
import TabPanel from "primevue/tabpanel";
import TabView from "primevue/tabview";
import { onMounted, ref } from "vue";
import { PrimeIcons } from "primevue/api";
import { storeToRefs } from "pinia";
import { useStore } from "../../../store";
import { useRevenueStore } from "../../sales/store/revenue";
import { IncomeService } from "../../sales/services/income.service";
import { ExpenseService } from "../../purchase/services/expense.service";
import DashboardCard from "../components/DashboardCard.vue";
import TopCustomers from "../components/DashboardBarHoritzontalBar.vue";

const customers = ref([
  { name: "Customer A", value: 15000 },
  { name: "Customer B", value: 3500 },
  { name: "Customer C", value: 2000 },
  { name: "Customer D", value: 800 },
  { name: "Customer E", value: 1000 },
]);

const incomeService = new IncomeService("/income");
const expenseService = new ExpenseService("/expense");

const store = useStore();
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
  store.setMenuItem({
    icon: PrimeIcons.MONEY_BILL,
    title: "Dashboard global",
  });

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

<style lang="css" scoped>
/* Container styles */
.dashboard-card-container {
  display: flex;
  justify-content: space-around; /* Espacio uniforme entre las cajas */
  align-items: center; /* Centrado vertical de las cajas */
  width: 100%;
  height: 30vh;
  gap: 2rem; /* Espacio entre las cajas */
}

/* Box styles */
.dashboard-card {
  width: 33.33%; /* Un tercio del ancho */
  background-color: lightblue;
  box-sizing: border-box;
  vertical-align: middle;
}
</style>
