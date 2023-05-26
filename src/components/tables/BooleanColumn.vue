<template>
  <i
    class="pi"
    :class="{
      'true-icon': showColor && value,
      'false-icon': showColor && !value,
      'pi-check-circle': value,
      'pi-times-circle': !value,
    }"
  ></i>
</template>

<script setup lang="ts">
defineProps<{
  value: boolean;
  showColor: boolean;
}>();
</script>

<style scoped>
.true-icon {
  color: var(--green-700);
}
.false-icon {
  color: var(--red-700);
}
</style>
