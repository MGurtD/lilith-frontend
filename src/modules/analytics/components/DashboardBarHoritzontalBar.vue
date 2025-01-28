<template>
  <div class="top-customers">
    <div
      v-for="customer in sortedCustomers"
      :key="customer.name"
      class="customer-bar"
    >
      <span class="customer-name">{{ customer.name }}</span>
      <div class="bar-container">
        <div class="bar" :style="{ width: customer.percentage + '%' }"></div>
        <span class="revenue">{{ customer.value }} €</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";

interface Customer {
  name: string;
  value: number;
  percentage?: string; // Optional property for computed percentage
}

const props = defineProps<{
  customers: Customer[];
}>();

const totalRevenue = computed(() => {
  return props.customers.reduce((total, customer) => total + customer.value, 0);
});

const sortedCustomers = computed(() => {
  return props.customers
    .map((customer) => ({
      ...customer,
      percentage: ((customer.value / totalRevenue.value) * 100).toFixed(2),
    }))
    .sort((a, b) => b.value - a.value);
});
</script>

<style scoped>
.top-customers {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.customer-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.customer-name {
  width: 20%;
}

.bar-container {
  width: 75%;
  display: flex;
  align-items: center;
  position: relative;
  background-color: #f0f0f0; /* Background color for better visibility */
  border-radius: 4px; /* Rounded corners */
  overflow: hidden; /* Ensure the bar doesn't overflow */
  padding-right: 50px; /* Space for the revenue text */
}

.bar {
  height: 20px;
  background-color: #4caf50;
  transition: width 0.3s ease; /* Smooth transition for width changes */
}

.revenue {
  position: absolute;
  right: 0;
  padding-left: 5px;
  background-color: #f0f0f0; /* Match the background color of the bar container */
}
</style>
