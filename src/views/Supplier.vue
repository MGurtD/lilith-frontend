<template>
  <TabView>
    <TabPanel>
      <template #header>
        <i :class="PrimeIcons.BUILDING" class="mr-2"></i>
        <span>Proveïdor</span>
      </template>
      <pre>
        {{ supplierStore.supplier }}
      </pre>
    </TabPanel>
    <TabPanel>
      <template #header>
        <i :class="PrimeIcons.USERS" class="mr-2"></i>
        <span>Contactes</span>
      </template>
      <pre>
        {{ supplierStore.supplier?.contacts }}
      </pre>
    </TabPanel>
  </TabView>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useSuppliersStore } from "../store/suppliers";
import { PrimeIcons } from "primevue/api";
import { useSpanishGeography } from "../store/geography";
import { Region } from "../types";

const route = useRoute();
const supplierStore = useSuppliersStore();
const spanishGeography = useSpanishGeography();

onMounted(() => {
  supplierStore.fetchSupplier(route.params.id as string);
  spanishGeography.fetch();

  console.log(spanishGeography.regions);
  console.log(spanishGeography.towns);

  let region = (spanishGeography.regions as Array<Region>)[31];
  console.log(spanishGeography.getTownsByRegion(region));
});
</script>
