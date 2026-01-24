<template>
  <div :class="['info-panel', `info-panel--${severity}`]">
    <i :class="iconClass"></i>
    <p>{{ text }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { PrimeIcons } from "primevue/api";

type Severity = "info" | "success" | "warn" | "error";

interface Props {
  severity?: Severity;
  text: string;
}

const props = withDefaults(defineProps<Props>(), {
  severity: "info",
});

const iconClass = computed(() => {
  switch (props.severity) {
    case "success":
      return PrimeIcons.CHECK_CIRCLE;
    case "warn":
      return PrimeIcons.EXCLAMATION_TRIANGLE;
    case "error":
      return PrimeIcons.TIMES_CIRCLE;
    case "info":
    default:
      return PrimeIcons.INFO_CIRCLE;
  }
});
</script>

<style scoped>
.info-panel {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  border: 2px solid;
  border-radius: var(--border-radius);
  margin-bottom: 1rem;
}

.info-panel i {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.info-panel p {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 500;
  line-height: 1.5;
}

/* Info severity (default) */
.info-panel--info {
  background: var(--blue-50);
  border-color: var(--blue-300);
  color: var(--blue-900);
}

.info-panel--info i {
  color: var(--blue-600);
}

/* Success severity */
.info-panel--success {
  background: var(--green-50);
  border-color: var(--green-300);
  color: var(--green-900);
}

.info-panel--success i {
  color: var(--green-600);
}

/* Warn severity */
.info-panel--warn {
  background: var(--orange-50);
  border-color: var(--orange-300);
  color: var(--orange-900);
}

.info-panel--warn i {
  color: var(--orange-600);
}

/* Error severity */
.info-panel--error {
  background: var(--red-50);
  border-color: var(--red-300);
  color: var(--red-900);
}

.info-panel--error i {
  color: var(--red-600);
}
</style>
