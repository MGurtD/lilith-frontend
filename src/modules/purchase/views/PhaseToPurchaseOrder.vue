<template>
  <DataTable
    :value="workOrderStore.workorderPhases"
    v-model:selection="selectedPhases"
    class="p-datatable-sm small-datatable"
    tableStyle="min-width: 100%"
    scrollable
    scrollHeight="79vh"
    :sort-order="1"
    sort-field="date"
    paginator
    :rows="25"
    dataKey="id"
  >
    <Column selectionMode="multiple" headerStyle="width: 1rem"></Column>
    <Column field="id" header="Codi" style="width: 15%"></Column>
    <Column field="code" header="Codi" style="width: 15%"></Column>
    <Column field="description" header="Descripció" style="width: 65%"></Column>
  </DataTable>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import { useStore } from "../../../store";
import { useToast } from "primevue/usetoast";
import { PrimeIcons } from "primevue/api";
import { computed, onMounted, onUnmounted, reactive, ref } from "vue";
import { WorkOrderPhase } from "../../production/types";
import { useWorkOrderStore } from "../../production/store/workorder";

const router = useRouter();
const store = useStore();
const toast = useToast();
const workOrderStore = useWorkOrderStore();

const selectedPhases = ref();

onMounted(async () => {
  store.setMenuItem({
    icon: PrimeIcons.SHOPPING_CART,
    title: "Generació de comandes de compra",
  });
  await workOrderStore.fetchExternalPhases();
});
</script>
