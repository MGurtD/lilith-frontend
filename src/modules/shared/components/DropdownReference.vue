<template>
  <div class="mb-2">
    <label class="block text-900 mb-2">{{ label }}</label>
    <Dropdown
      showClear
      editable
      :options="referenceStore.references"
      optionValue="id"
      optionLabel="description"
      class="w-full"
      v-bind="$attrs"
      v-bind:model-value="(modelValue as string)"
      @change="emit('update:modelValue', $event.value)"
    >
      <template #value="slotProps">
        <div v-if="slotProps.value" class="flex align-items-center">
          {{ referenceStore.getFullName(slotProps.value) }}
        </div>
      </template>
      <template #option="slotProps">
        <div v-if="slotProps.option" class="flex align-items-center">
          {{ referenceStore.getFullName(slotProps.option) }}
        </div>
      </template>
    </Dropdown>
  </div>
</template>
<script setup lang="ts">
import { useReferenceStore } from "../store/reference";

defineProps<{
  label: string;
  modelValue: string | undefined;
}>();

const emit = defineEmits<{
  (event: "update:modelValue", payload: string): void;
}>();

const referenceStore = useReferenceStore();
</script>
