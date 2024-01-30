<template>
  <div class="mb-2">
    <label class="block text-900 mb-2">{{ label }}</label>
    <Dropdown
      showClear
      editable
      :options="lifecycleStore.lifecycle?.statuses"
      placeholder="Selecciona..."
      optionValue="id"
      optionLabel="name"
      class="w-full"
      v-bind="$attrs"
      v-bind:model-value="(modelValue as string)"
      @change="emit('update:modelValue', $event.value)"
    >
      <template #value="slotProps">
        <div v-if="slotProps.value" class="flex align-items-center">
          {{ slotProps.value.name }}
        </div>
        <span v-else>
          {{ slotProps.placeholder }}
        </span>
      </template>
      <template #option="slotProps">
        <div v-if="slotProps.option" class="flex align-items-center">
          {{ slotProps.option.name }}
        </div>
      </template>
    </Dropdown>
  </div>
</template>
<script setup lang="ts">
import { useLifecyclesStore } from "../store/lifecycle";

const props = defineProps<{
  label: string;
  modelValue: string | undefined;
}>();

const emit = defineEmits<{
  (event: "update:modelValue", payload: string): void;
}>();

const lifecycleStore = useLifecyclesStore();
</script>
