<template>
  <div class="dashboard-card">
    <Card>
      <template #title>
        {{ title }}
        <span class="relative group">
          <i class="pi pi-question-circle" v-tooltip="tooltip"></i>
        </span>
      </template>
      <template #content>
        <h1
          :class="isPositive ? 'text-green-500' : 'text-red-500'"
          class="text-4xl font-bold"
        >
          {{ indicatorValue }} {{ unit }}
        </h1>
        <section class="three-columns" v-if="text1 || text2 || text3">
          <h3 class="text-xs" v-if="text1">
            {{ text1 }}: {{ value1.toFixed(2) }} {{ unit }}
          </h3>
          <h3 class="text-xs" v-if="text2">
            {{ text2 }}: {{ value2.toFixed(2) }} {{ unit }}
          </h3>
          <h3 class="text-xs" v-if="text3">
            {{ text3 }}: {{ value3.toFixed(2) }} {{ unit }}
          </h3>
        </section>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  isPositive: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  tooltip: {
    type: String,
    required: false,
    default: "",
  },
  indicatorValue: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    required: false,
    default: "€",
  },
  text1: {
    type: String,
    required: false,
    default: "",
  },
  value1: {
    type: Number,
    required: false,
    default: 0,
  },
  text2: {
    type: String,
    required: false,
    default: "",
  },
  value2: {
    type: Number,
    required: false,
    default: 0,
  },
  text3: {
    type: String,
    required: false,
    default: "",
  },
  value3: {
    type: Number,
    required: false,
    default: 0,
  },
});
</script>

<style scoped>
.dashboard-card {
  /* Add your styles here */
}
.three-columns {
  display: flex;
  justify-content: space-between;
}
</style>
