<script setup lang="ts">
import { BaseInputType } from "../types/component";
import Password from "primevue/password";

defineProps<{
  type?: BaseInputType;
  id?: string;
  label?: string;
  icon?: string;
  decimals?: number;
  modelValue: string | number;
}>();

const emit = defineEmits<{
  (event: "update:modelValue", payload: string): void;
}>();
</script>
<template>
  <div class="base_input">
    <label
      v-if="label"
      :for="id"
      class="base_input__label block text-900 mb-2"
      >{{ label }}</label
    >
    <span :class="{ 'p-input-icon-left': icon !== undefined }" class="mb-2">
      <i v-if="icon" :class="icon" />
      <InputText
        v-if="!type || type === BaseInputType.TEXT"
        :id="id"
        class="w-full"
        v-bind="$attrs"
        v-bind:model-value="(modelValue as string)"
        @input="
          emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
      />
      <InputNumber
        v-else-if="type === BaseInputType.NUMERIC"
        :id="id"
        class="w-full"
        :minFractionDigits="decimals ?? 0"
        v-bind="$attrs"
        v-bind:model-value="(modelValue as number)"
        @input="emit('update:modelValue', $event.value)"
      />
      <InputNumber
        v-else-if="type === BaseInputType.CURRENCY"
        :id="id"
        class="w-full"
        :minFractionDigits="2"
        suffix=" €"
        locale="en-US"
        v-bind="$attrs"
        v-bind:model-value="(modelValue as number)"
        @input="emit('update:modelValue', $event.value)"
      />
      <Password
        v-else-if="type === BaseInputType.PASSWORD"
        :id="id"
        class="w-full"
        v-bind="$attrs"
        v-bind:model-value="(modelValue as string)"
        @input="
          emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
      />
    </span>
  </div>
</template>
<style scoped>
.base_input__label {
  text-align: left;
}
</style>
