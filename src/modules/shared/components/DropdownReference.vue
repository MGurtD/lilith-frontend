<template>
  <div class="mb-2">
    <label class="block text-900 mb-2">{{ label }}</label>
    <Dropdown
      showClear
      filter
      :filter-fields="['code', 'description']"
      editable
      :options="referenceStore.references"
      placeholder="Selecciona..."
      optionValue="id"
      :optionLabel="(r) => referenceStore.getShortNameById(r.id)"
      class="w-full"
      v-bind="$attrs"
      v-bind:model-value="(modelValue as string)"
      @change="emit('update:modelValue', $event.value)"
    >
      <template #value="slotProps">
        <div v-if="slotProps.value" class="flex align-items-center">
          {{ getReferenceName(slotProps.value) }}
        </div>
        <span v-else>
          {{ slotProps.placeholder }}
        </span>
      </template>
      <template #option="slotProps">
        <div v-if="slotProps.option" class="flex align-items-center">
          {{ getReferenceName(slotProps.option) }}
        </div>
      </template>
    </Dropdown>
  </div>
</template>
<script setup lang="ts">
import { useReferenceStore } from "../store/reference";
import { Reference } from "../types";

const props = defineProps<{
  label: string;
  modelValue: string | undefined;
  fullName: boolean;
}>();

const emit = defineEmits<{
  (event: "update:modelValue", payload: string): void;
}>();

const referenceStore = useReferenceStore();

const getReferenceName = (reference: Reference) => {
  return props.fullName
    ? referenceStore.getFullName(reference)
    : referenceStore.getShortName(reference);
};
</script>
