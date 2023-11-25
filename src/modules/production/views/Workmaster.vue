<template>
  <header>
    <FormWorkmaster
      v-if="workmaster"
      :workmaster="workmaster"
      @submit="onWorkmasterSubmit"
    ></FormWorkmaster>
  </header>
  <main class="main">
    <TableWorkmasterPhases
      v-if="workmaster && workmaster.phases"
      :workmaster="workmaster"
      :workmasterPhases="workmaster.phases"
      @add="addWorkMasterPhase"
      @edit="editWorkMasterPhase"
      @delete="deleteWorkMasterPhase"
    ></TableWorkmasterPhases>
  </main>
</template>
<script setup lang="ts">
import FormWorkmaster from "../components/FormWorkmaster.vue";
import TableWorkmasterPhases from "../components/TableWorkmasterPhases.vue";

import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "../../../store";
import { useReferenceStore } from "../../shared/store/reference";
import { useWorkMasterStore } from "../store/workmaster";
import { storeToRefs } from "pinia";
import { PrimeIcons } from "primevue/api";
import { WorkMaster, WorkMasterPhase } from "../types";

const route = useRoute();
const router = useRouter();
const store = useStore();
const referenceStore = useReferenceStore();
const workmasterStore = useWorkMasterStore();
const { workmaster } = storeToRefs(workmasterStore);
const id = ref("");

onMounted(async () => {
  id.value = route.params.id as string;
  await loadViewData();

  let pageTitle = "";
  pageTitle = `Ruta de fabricació`;
  if (workmaster.value) {
    pageTitle = `${pageTitle} ${referenceStore.getFullName(
      workmaster.value.reference!
    )}`;
  }

  store.setMenuItem({
    icon: PrimeIcons.BUILDING,
    backButtonVisible: true,
    title: pageTitle,
  });
});

const loadViewData = async () => {
  await workmasterStore.fetchOne(id.value);
};

const onWorkmasterSubmit = async (workmaster: WorkMaster) => {
  const updated = await workmasterStore.update(id.value, workmaster);
  if (updated) await loadViewData();
};

// Phases
const addWorkMasterPhase = async (phase: WorkMasterPhase) => {
  const created = await workmasterStore.createPhase(phase);
  if (created)
    router.push({ path: `/workmaster/${id.value}/phase/${phase.id}` });
};
const editWorkMasterPhase = (phase: WorkMasterPhase) => {
  router.push({ path: `/workmaster/${id.value}/phase/${phase.id}` });
};
const deleteWorkMasterPhase = async (phase: WorkMasterPhase) => {
  await workmasterStore.deletePhase(phase.id);
};
</script>
<style scoped>
.main {
  margin-top: 1rem;
}
</style>
