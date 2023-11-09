<template>
  <section class="two-columns">
    <div>
      <label class="block text-900 mb-2">Producte</label>
      <Dropdown
        :options="referenceStore.references"
        v-model="newStock.referenceId"
        optionValue="id"
        optionLabel="description"
      />
    </div>
    <div>Quantitat</div>
  </section>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useReferenceStore } from "../../shared/store/reference";
import { Inventory } from "../types";
const referenceStore = useReferenceStore();
const props = defineProps<{
  newStock: Inventory;
}>();
</script>
