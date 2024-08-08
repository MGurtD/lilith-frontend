<template>
  <section class="three-columns">
    <div class="mt-1">
      <DropdownReferenceType
        label="Tipus de material"
        v-model="reference.referenceTypeId"
      />
    </div>
    <div class="mt-1">
      <label class="block text-900 mb-2">Format</label>
      <Dropdown
        v-model="reference.referenceFormatId"
        editable
        :options="referenceStore.referenceFormats"
        optionValue="id"
        optionLabel="description"
        class="w-full"
      />
    </div>
    <div class="mt-1">
      <label class="block text-900 mb-2">Impost</label>
      <Dropdown
        v-model="reference.taxId"
        editable
        :options="taxesStore.taxes"
        optionValue="id"
        optionLabel="name"
        class="w-full"
      />
    </div>
  </section>
  <section class="three-columns">
    <div class="mt-1">
      <BaseInput
        :type="BaseInputType.CURRENCY"
        label="Últim cost"
        id="lastCost"
        v-model="reference.lastCost"
        disabled
      />
    </div>
    <div>
      <label class="block text-900 mb-2">Desactivada</label>
      <Checkbox v-model="reference.disabled" :binary="true" />
    </div>
  </section>
</template>
<script setup lang="ts">
import BaseInput from "../../../components/BaseInput.vue";
import { Reference } from "../../shared/types";
import { BaseInputType } from "../../../types/component";
import { useTaxesStore } from "../../shared/store/tax";
import { useReferenceStore } from "../../shared/store/reference";
import DropdownReferenceType from "../../shared/components/DropdownReferenceType.vue";

defineProps<{
  reference: Reference;
}>();

const taxesStore = useTaxesStore();
const referenceStore = useReferenceStore();
</script>
