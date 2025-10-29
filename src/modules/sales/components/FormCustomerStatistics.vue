<template>
  <div>
    <div class="three-columns mb-2">
      <Card>
        <template #header>
          <div class="card-title">Total Pressuposts</div>
        </template>
        <template #content>
          <div class="total-count">{{ totalBudgetCount }}</div>
        </template>
      </Card>
      <Card>
        <template #header>
          <div class="card-title">Pressuposts Acceptats</div>
        </template>
        <template #content>
          <div class="total-count-accepted">{{ acceptedBudgetCount }}</div>
        </template>
      </Card>
      <Card>
        <template #header>
          <div class="card-title">Pressuposts Rebutjats</div>
        </template>
        <template #content>
          <div class="total-count-refused">
            {{ totalBudgetCount - acceptedBudgetCount }}
          </div>
        </template>
      </Card>
    </div>
    <div class="two-columns mb-2">
      <Card>
        <template #header>
          <div class="card-title">Total Factures</div>
        </template>
        <template #content>
          <div class="total-count-accepted">{{ totalInvoicesCount }}</div>
        </template>
      </Card>

      <Card>
        <template #header>
          <div class="card-title">Total Facturat (s/ impostos)</div>
        </template>
        <template #content>
          <div class="total-count-accepted">
            {{ totalInvoicedAmount.toFixed(2) }} €
          </div>
        </template>
      </Card>
    </div>
    <div class="one-columns mb-2">
      <Card class="chart-card">
        <template #header>
          <div class="card-title">Facturació Mensual</div>
        </template>
        <template #content>
          <Chart type="line" :data="chartData" :options="chartOptions" />
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { Budget, SalesInvoice } from "../types";

const props = defineProps<{
  budgets: Budget[];
  salesInvoices: SalesInvoice[];
}>();

const totalBudgetCount = computed(() => props.budgets.length);
const acceptedBudgetCount = computed(
  () => props.budgets.filter((b) => b.acceptanceDate !== null).length
);

const totalInvoicesCount = computed(() => props.salesInvoices.length);
const totalInvoicedAmount = computed(() =>
  props.salesInvoices.reduce((sum, invoice) => sum + invoice.netAmount, 0)
);

const monthlyInvoicing = computed(() => {
  const monthlyTotals: Record<string, number> = {};
  props.salesInvoices.forEach((invoice) => {
    const month = invoice.invoiceDate.substring(0, 7); // 'YYYY-MM'
    monthlyTotals[month] = (monthlyTotals[month] || 0) + invoice.netAmount;
  });
  const months = Object.keys(monthlyTotals).sort();
  const amounts = months.map((m) => monthlyTotals[m]);

  return { months, amounts };
});

const chartData = computed(() => ({
  labels: monthlyInvoicing.value.months,
  datasets: [
    {
      label: "Facturació mensual (s/ impostos)",
      backgroundColor: "#42A5F5",
      data: monthlyInvoicing.value.amounts,
    },
  ],
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};
</script>

<style scoped>
.total-count {
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
}

.total-count-accepted {
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  color: green;
}

.total-count-refused {
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  color: rgb(155, 32, 32);
}

.card-title {
  font-size: 1.5rem;
  text-align: center;
  margin-top: 0.25rem;
  color: #555;
}

.chart-card {
  height: 250px;
  display: flex;
  flex-direction: column;
}

.chart-card .p-chart {
  height: 180px;
}
</style>
