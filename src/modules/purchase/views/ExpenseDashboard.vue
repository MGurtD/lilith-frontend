<template>
  <div class="dashboard-filter">
    <div class="dashboard-filter-field">
      <ExerciseDatePicker
        :exercises="sharedDataStore.exercises"
        @range-selected="filterDashboard(false)"
      />
    </div>
    <div class="dashboard-filter-field">
      <label>Tipus</label>
      <Dropdown
        :options="['Despesa', 'Compra']"
        v-model="filter.type"
        @change="filterDashboard(true)"
      />
    </div>
    <div class="dashboard-filter-field">
      <label>Detall</label>
      <Dropdown
        :options="pieChartData?.labels"
        v-model="filter.typeDetail"
        @change="filterDashboard(false)"
      />
    </div>
    <div class="dashboard-filter-field">
      <label class="block text-900">
        <i :class="PrimeIcons.WALLET"></i>
        &nbsp; Total despesa <b>{{ totalAmount.toFixed(2) }} € </b>
      </label>
    </div>
    <Button
      class="grid_add_row_button"
      :icon="PrimeIcons.FILTER_SLASH"
      @click="clearFilter"
    />
  </div>

  <TabView v-model:activeIndex="selectedTabIndex">
    <TabPanel>
      <template #header>
        <i :class="PrimeIcons.CHART_BAR" class="mr-2"></i>
        <span>Gràfics</span>
      </template>
      <div class="dashboard-container">
        <section class="dashboard-item">
          <header class="dashboard-item-header">
            Agrupat despeses mensual
          </header>
          <div class="dashboard-item-chart">
            <Chart
              v-if="chartData"
              type="bar"
              :data="chartData"
              :options="chartOptions"
            />
          </div>
        </section>
        <section class="dashboard-item">
          <header class="dashboard-item-header">
            Gràfic de despeses per tipologia
          </header>
          <div class="dashboard-item-chart">
            <Chart
              v-if="pieChartData"
              type="pie"
              :data="pieChartData"
              :options="pieChartOptions"
            />
          </div>
        </section>
      </div>
    </TabPanel>
    <TabPanel>
      <template #header>
        <i :class="PrimeIcons.LIST" class="mr-2"></i>
        <span>Llistat</span>
      </template>
      <TableConsolidatedExpenses
        scrollable
        scrollHeight="80vh"
        :expenses="consolidatedExpenses"
      />
    </TabPanel>
  </TabView>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import ExerciseDatePicker from "../../../components/ExerciseDatePicker.vue";
import Chart from "primevue/chart";
import { PrimeIcons } from "primevue/api";
import { useStore } from "../../../store";
import { useSharedDataStore } from "../../shared/store/masterData";
import _ from "lodash";
import { formatDateForQueryParameter } from "../../../utils/functions";
import ExpenseServices from "../services";
import { ConsolidatedExpense, ExpenseType } from "../types";
import TableConsolidatedExpenses from "../components/TableConsolidatedExpenses.vue";
import { ChartOptions } from "../../../types/component";

const store = useStore();
const sharedDataStore = useSharedDataStore();
const selectedTabIndex = ref(0);

const filter = ref({
  dates: undefined as Array<Date> | undefined,
  type: "" as string,
  typeDetail: "" as string,
});
const expenseTypes = ref(undefined as Array<ExpenseType> | undefined);
const consolidatedExpenses = ref([] as Array<ConsolidatedExpense>);

const clearFilter = () => {
  store.cleanExercisePicker();
  filter.value.type = "";
  filter.value.typeDetail = "";
};

onMounted(async () => {
  store.setMenuItem({
    icon: PrimeIcons.MONEY_BILL,
    title: "Dashboard despeses",
  });

  await sharedDataStore.fetchMasterData();
  expenseTypes.value = await ExpenseServices.ExpenseType.getAll();
});

const pieChartData = ref(undefined as undefined | ChartOptions);
const pieChartOptions = ref({
  plugins: {
    legend: {
      labels: {
        usePointStyle: true,
      },
    },
  },
});

const chartData = ref(undefined as undefined | ChartOptions);
const chartOptions = ref({
  scales: {
    y: {
      beginAtZero: true,
    },
  },
});

const totalAmount = computed((): number => {
  let amount = 0;
  if (consolidatedExpenses.value.length > 0) {
    consolidatedExpenses.value.forEach((e) => (amount += e.amount));
  }
  return amount;
});

const filterDashboard = async (clearDetail: boolean) => {
  if (store.exercisePicker.dates) {
    const startTime = formatDateForQueryParameter(
      store.exercisePicker.dates[0]
    );
    const endTime = formatDateForQueryParameter(store.exercisePicker.dates[1]);

    if (clearDetail) filter.value.typeDetail = "";

    const dataResponse = await ExpenseServices.Expense.getConsolidated(
      startTime,
      endTime,
      filter.value.type,
      filter.value.typeDetail
    );
    if (dataResponse) consolidatedExpenses.value = dataResponse;

    chartData.value = transformConsolidatedExpensesToChartOptions(
      consolidatedExpenses.value,
      "monthPaymentKey"
    );
    pieChartData.value = transformConsolidatedExpensesToChartOptions(
      consolidatedExpenses.value,
      "typeDetail"
    );
  }
};

const transformConsolidatedExpensesToChartOptions = (
  expenses: Array<ConsolidatedExpense>,
  fieldToGroup: string
): ChartOptions => {
  const options = {} as ChartOptions;

  const groupedData = _.groupBy(expenses, fieldToGroup);
  options.labels = Object.keys(groupedData);

  const chartColors = getChartColors(options.labels.length);
  options.datasets = [
    {
      label: "Despeses",
      data: [],
      backgroundColor: chartColors,
      borderColor: chartColors,
      borderWidth: 1,
    },
  ];

  Object.keys(groupedData).forEach((key) => {
    let totalAmount = 0;
    groupedData[key].forEach((mov) => {
      totalAmount += mov.amount;
    });

    options.datasets![0].data.push(totalAmount);
  });

  return options;
};

const getChartColors = (numberOfColors: number): Array<string> => {
  const documentStyle = getComputedStyle(document.body);

  const colors = [
    documentStyle.getPropertyValue("--blue-400"),
    documentStyle.getPropertyValue("--green-400"),
    documentStyle.getPropertyValue("--yellow-400"),
    documentStyle.getPropertyValue("--cyan-400"),
    documentStyle.getPropertyValue("--pink-400"),
    documentStyle.getPropertyValue("--indigo-400"),
    documentStyle.getPropertyValue("--orange-400"),
    documentStyle.getPropertyValue("--purple-400"),
    documentStyle.getPropertyValue("--red-400"),
  ];

  const colorsToReturn = [];
  while (colorsToReturn.length < numberOfColors) {
    for (let i = 0; i < colors.length; i++) {
      colorsToReturn.push(colors[i]);
    }
  }
  return colorsToReturn;
};
</script>
<style scoped>
.dashboard-filter {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 1rem;
  color: black;
}

.dashboard-filter-field {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 1rem;
  align-items: center;
}

.dashboard-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.dashboard-item {
  display: grid;
  grid-template-rows: 0.1fr 0.9fr;
  gap: 1rem;
  align-items: center;
  justify-items: center;
  align-content: center;
  justify-content: center;
}

.dashboard-item-header {
  text-align: center;
}

.dashboard-item-chart {
  position: relative;
  height: 60vh;
  width: 30vw;
  align-self: center;
  justify-self: center;
}

/* phone */
@media only screen and (max-width: 767px) {
  .dashboard-container {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 2rem;
    height: 70vh;
    width: 100%;
  }

  .dashboard-filter {
    display: block;
  }

  .dashboard-filter-field {
    padding-bottom: 1rem;
  }

  .dashboard-item {
    display: grid;
    grid-template-rows: 0.1fr 0.9fr;
    gap: 1rem;
  }

  .dashboard-item-chart {
    display: block;
    height: 50%;
    width: 90%;
  }
}
</style>
