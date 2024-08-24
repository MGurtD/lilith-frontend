<template>
  <div class="dashboard-filter">
    <div class="dashboard-filter-field">
      <ExerciseDatePicker
        :exercises="sharedDataStore.exercises"
        @range-selected="filterDashboard(false)"
      />
    </div>
    <Button
      class="grid_add_row_button"
      :icon="PrimeIcons.FILTER_SLASH"
      @click="clearFilter"
    />
  </div>
  <TabView>
    <TabPanel header="Grafics">
      <div class="dashboard-container">
        <Chart
          type="bar"
          :data="chartData"
          :options="chartOptions"
          class="w-full h-[70rem]"
        />
      </div>
    </TabPanel>
    <TabPanel header="Data">
      <TableProductionCosts :costs="costs" />
    </TabPanel>
  </TabView>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useStore } from "../../../store";
import { useProductionCostDashboardStore } from "../store/productioncostdashboard";
import { formatDateForQueryParameter } from "../../../utils/functions";
import { useSharedDataStore } from "../../shared/store/masterData";
import { usePlantModelStore } from "../store/plantmodel";
import { PrimeIcons } from "primevue/api";
import ExerciseDatePicker from "../../../components/ExerciseDatePicker.vue";
import TableProductionCosts from "../components/TableProductionCosts.vue";
import { ProductionCostDashboardGrouped } from "../types";
import ProductionCostDashboardService from "../services/productioncostdashboard.service";

const store = useStore();
const productionCostStore = useProductionCostDashboardStore();
const plantModelStore = usePlantModelStore();
const sharedDataStore = useSharedDataStore();
const productionCostDashboardService = new ProductionCostDashboardService(
  "/ProductionCost"
);

const filter = ref({
  dates: undefined as Array<Date> | undefined,
});

const clearFilter = () => {
  store.cleanExercisePicker();
};

const costs = ref([] as Array<ProductionCostDashboardGrouped>);

onMounted(async () => {
  store.setMenuItem({
    icon: PrimeIcons.MONEY_BILL,
    title: "Dashboard costs producció",
  });
  await plantModelStore.fetchWorkcenterTypes();
  await sharedDataStore.fetchMasterData();
});

const filterDashboard = async (clearDetail: boolean) => {
  if (store.exercisePicker.dates) {
    const startTime = formatDateForQueryParameter(
      store.exercisePicker.dates[0]
    );
    const endTime = formatDateForQueryParameter(store.exercisePicker.dates[1]);
    await productionCostStore.fetchGroupedByType(startTime, endTime);
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
    const dataResponse =
      await productionCostDashboardService.GetGroupedByMonthAndWorkcenter(
        startTime,
        endTime
      );
    if (dataResponse) costs.value = dataResponse;
  }
};

const chartData = ref();
const chartOptions = ref();

const setChartData = () => {
  const documentStyle = getComputedStyle(document.documentElement);

  const workcenterTypes = plantModelStore.workcenterTypes!.map(
    (type) => type.name
  );
  const monthNames = [
    "Gener",
    "Febrer",
    "Març",
    "Abril",
    "Maig",
    "Juny",
    "Juliol",
    "Agost",
    "Setembre",
    "Octubre",
    "Novembre",
    "Desembre",
  ];
  interface GroupedData {
    [key: string]: { [key: string]: number };
  }

  const groupedByMonth: GroupedData = {};
  productionCostStore.productionCostDashboardGroupedByType!.forEach((item) => {
    const month = monthNames[item.month - 1];
    if (!groupedByMonth[month]) {
      groupedByMonth[month] = {};
    }
    groupedByMonth[month][item.workcenterTypeName] = item.totalCost;
  });

  const labels = Object.keys(groupedByMonth).sort(
    (a, b) => parseInt(a) - parseInt(b)
  );

  const datasets = workcenterTypes.map((type, index) => {
    return {
      type: "bar",
      label: type,
      backgroundColor: documentStyle.getPropertyValue(`--p-color-${index + 1}`),
      data: labels.map((month) => groupedByMonth[month][type] || 0),
    };
  });

  return {
    labels,
    datasets,
  };
};
const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--p-text-color");
  const textColorSecondary = documentStyle.getPropertyValue(
    "--p-text-muted-color"
  );
  const surfaceBorder = documentStyle.getPropertyValue(
    "--p-content-border-color"
  );

  return {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      datalabels: {},
      tooltips: {
        mode: "index",
        intersect: false,
      },
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y: {
        stacked: true,
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
    },
  };
};
</script>
<style scoped>
:root {
  --p-color-1: #ff5733;
  --p-color-2: #33ff57;
  --p-color-3: #3357ff;
  --p-color-4: #ff33a1;
  --p-color-5: #33ffa1;
  --p-color-6: #a133ff;
  --p-color-7: #ffd133;
  --p-color-8: #33d1ff;
  --p-color-9: #ff6f33;
  --p-color-10: #ff33d1;
  --p-color-11: #57ff33;
  --p-color-12: #5733ff;
  --p-color-13: #a1ff33;
  --p-color-14: #ff3333;
  --p-color-15: #33ffd1;
  --p-color-16: #d1ff33;
  --p-color-17: #33a1ff;
  --p-color-18: #ff33a1;
  --p-color-19: #a1ff57;
  --p-color-20: #ffa133;
  --p-color-21: #ff5733;
  --p-color-22: #33ff6f;
  --p-color-23: #6f33ff;
  --p-color-24: #ff33ff;
  --p-color-25: #33fff7;
  --p-color-26: #ff6fff;
  --p-color-27: #d133ff;
  --p-color-28: #ffd133;
  --p-color-29: #a1a1ff;
  --p-color-30: #ff336f;
  --p-color-31: #57ffa1;
  --p-color-32: #5733d1;
  --p-color-33: #a1336f;
  --p-color-34: #6fff33;
  --p-color-35: #ffd1a1;
  --p-color-36: #ffa157;
  --p-color-37: #33ff33;
  --p-color-38: #336fff;
  --p-color-39: #33ffa1;
  --p-color-40: #6f57ff;
  --p-color-41: #ff33a1;
  --p-color-42: #ff3357;
  --p-color-43: #a157ff;
  --p-color-44: #33ffd1;
  --p-color-45: #ff6f33;
  --p-color-46: #5733ff;
  --p-color-47: #33a1ff;
  --p-color-48: #ffd157;
  --p-color-49: #a1ff57;
  --p-color-50: #ff5733;
}
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
  grid-template-columns: repeat(1, 1fr);
  height: 70vh;
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
    height: 100vh;
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
