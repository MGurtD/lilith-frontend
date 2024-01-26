<template>
  <header>
    <FormWorkorder
      v-if="workorder"
      :workorder="workorder"
      @submit="onWorkorderSubmit"
    ></FormWorkorder>
  </header>
  <main class="main">
    <TableWorkorderPhases
      v-if="workorder && workorder.phases"
      :workorder="workorder"
      :workorderPhases="workorder.phases"
      @add="addWorkOrderPhase"
      @edit="editWorkOrderPhase"
      @delete="deleteWorkOrderPhase"
    ></TableWorkorderPhases>
  </main>
</template>
<script setup lang="ts">
import FormWorkorder from "../components/FormWorkorder.vue";
import TableWorkorderPhases from "../components/TableWorkorderPhases.vue";

import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "../../../store";
import { useReferenceStore } from "../../shared/store/reference";
import { useWorkOrderStore } from "../store/workorder";
import { storeToRefs } from "pinia";
import { PrimeIcons } from "primevue/api";
import { WorkOrder, WorkOrderPhase } from "../types";
import { usePlantModelStore } from "../store/plantmodel";
import { useLifecyclesStore } from "../../shared/store/lifecycle";

const route = useRoute();
const router = useRouter();
const store = useStore();
const lifecycleStore = useLifecyclesStore();
const referenceStore = useReferenceStore();
const workorderStore = useWorkOrderStore();
const plantModelStore = usePlantModelStore();
const { workorder } = storeToRefs(workorderStore);
const id = ref("");

onMounted(async () => {
  id.value = route.params.id as string;
  await loadViewData();

  let pageTitle = "";
  pageTitle = `Ordre de fabricació`;
  if (workorder.value) {
    pageTitle = `${pageTitle} ${workorder.value.code}`;
  }

  store.setMenuItem({
    icon: PrimeIcons.BUILDING,
    backButtonVisible: true,
    title: pageTitle,
  });
});

const loadViewData = async () => {
  await referenceStore.fetchReferencesByModule("sales");
  await workorderStore.fetchOne(id.value);
  plantModelStore.fetchActiveModel();
  lifecycleStore.fetchOneByName("WorkOrder");
};

const onWorkorderSubmit = async (workorder: WorkOrder) => {
  const updated = await workorderStore.update(id.value, workorder);
  if (updated) await loadViewData();
};

// Phases
const addWorkOrderPhase = async (phase: WorkOrderPhase) => {
  const created = await workorderStore.createPhase(phase);
  if (created)
    router.push({ path: `/workorder/${id.value}/phase/${phase.id}` });
};
const editWorkOrderPhase = (phase: WorkOrderPhase) => {
  router.push({ path: `/workorder/${id.value}/phase/${phase.id}` });
};
const deleteWorkOrderPhase = async (phase: WorkOrderPhase) => {
  await workorderStore.deletePhase(phase.id);
};
</script>
<style scoped>
.main {
  margin-top: 1rem;
}
</style>
