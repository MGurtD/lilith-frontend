<template>
  <div class="mb-2">
    <label v-if="label.length > 0" class="block text-900 mb-2">{{
      label
    }}</label>
    <Dropdown
      showClear
      filter
      :filter-fields="['comercialName']"
      editable
      :options="supplierStore.suppliers"
      placeholder="Selecciona..."
      optionValue="id"
      optionLabel="comercialName"
      class="w-full"
      v-bind="$attrs"
      v-bind:model-value="(modelValue as string)"
      @change="emit('update:modelValue', $event.value)"
    >
      <template #option="slotProps">
        <div v-if="slotProps.option" class="flex align-items-center">
          {{ `${slotProps.option.comercialName}` }}
        </div>
      </template>
    </Dropdown>
  </div>
</template>
<script setup lang="ts">
import { useSuppliersStore } from "../store/suppliers";

const props = defineProps<{
  label: string;
  modelValue: string | null | undefined;
}>();

const emit = defineEmits<{
  (event: "update:modelValue", payload: string): void;
}>();

const supplierStore = useSuppliersStore();
</script>
