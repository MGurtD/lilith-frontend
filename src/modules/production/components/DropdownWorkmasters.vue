<template>
  <div class="mb-2">
    <label v-if="label.length > 0" class="block text-900 mb-2">{{
      label
    }}</label>
    <Dropdown
      showClear
      filter
      :options="
        referenceId
          ? workmasterStore.getByReferenceId(referenceId)
          : workmasterStore.workmasters
      "
      optionValue="id"
      :optionLabel="formatWorkMasterLabel"
      class="w-full"
      v-bind="$attrs"
      v-bind:model-value="(modelValue as string)"
      @change="emit('update:modelValue', $event.value)"
    >
      <template #option="slotProps">
        <div v-if="slotProps.option" class="flex align-items-center">
          {{ formatWorkMasterLabel(slotProps.option) }}
        </div>
      </template>
    </Dropdown>
  </div>
</template>
<script setup lang="ts">
import { useReferenceStore } from "../../shared/store/reference";
import { useWorkMasterStore } from "../store/workmaster";
import { WorkMaster } from "../types";

const referenceStore = useReferenceStore();
const workmasterStore = useWorkMasterStore();

const formatWorkMasterLabel = (workMaster: WorkMaster) => {
  const referenceName = referenceStore.getShortNameById(workMaster.referenceId);
  let modeName = "";
  switch (workMaster.mode) {
    case 1:
      modeName = "Prototip";
      break;
    case 2:
      modeName = "Sèrie curta";
      break;
    case 3:
      modeName = "Sèrie llarga";
      break;
  }

  //const modeName = workMaster.mode;

  return `${referenceName}  (Base = ${workMaster.baseQuantity} )  ${modeName}`;
};

defineProps<{
  label: string;
  modelValue: string | null | undefined;
  referenceId?: string;
}>();

const emit = defineEmits<{
  (event: "update:modelValue", payload: string): void;
}>();
</script>
