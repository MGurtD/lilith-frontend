<template>
  <section class="three-columns">
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
</template>
<script setup lang="ts">
import { Reference } from "../../shared/types";
import { useTaxesStore } from "../../shared/store/tax";
import { onMounted } from "vue";

const props = defineProps<{
  reference: Reference;
}>();

const taxesStore = useTaxesStore();

onMounted(async () => {
  if (!taxesStore.taxes) await taxesStore.fetchAll();
});
</script>
