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
      :optionLabel="(r: WorkMaster) => referenceStore.getShortNameById(r.referenceId) + ' (Base = ' + r.baseQuantity + ')'"
      class="w-full"
      v-bind="$attrs"
      v-bind:model-value="(modelValue as string)"
      @change="emit('update:modelValue', $event.value)"
    >
      <template #option="slotProps">
        <div v-if="slotProps.option" class="flex align-items-center">
          {{
            referenceStore.getShortNameById(slotProps.option.referenceId) +
            " (Base = " +
            slotProps.option.baseQuantity +
            " )"
          }}
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

defineProps<{
  label: string;
  modelValue: string | null | undefined;
  referenceId?: string;
}>();

const emit = defineEmits<{
  (event: "update:modelValue", payload: string): void;
}>();
</script>
