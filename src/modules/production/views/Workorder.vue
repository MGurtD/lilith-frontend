<template>
  <header>
    <FormWorkorder
      v-if="workorder"
      :workorder="workorder"
      @submit="onWorkorderSubmit"
    ></FormWorkorder>
  </header>
  <main class="main">
    <TabView>
      <TabPanel header="Fases">
        <TableWorkorderPhases
          v-if="workorder && workorder.phases"
          :workorder="workorder"
          :workorderPhases="workorder.phases"
          @add="addWorkOrderPhase"
          @edit="editWorkOrderPhase"
          @delete="deleteWorkOrderPhase"
        ></TableWorkorderPhases>
      </TabPanel>
      <TabPanel header="Hores">
        <TableProductionParts
          v-if="productionPartStore.productionParts"
          :productionParts="productionPartStore.productionParts"
        >
          <template #header>
            <div
              class="flex flex-wrap align-items-center justify-content-between gap-2"
            >
              <span class="text-xl text-900 font-bold">Hores</span>
              <Button
                :icon="PrimeIcons.PLUS"
                rounded
                raised
                @click="onProductionPartAddClick"
              />
            </div>
          </template>
        </TableProductionParts>
      </TabPanel>
    </TabView>
  </main>
</template>
<script setup lang="ts">
import FormWorkorder from "../components/FormWorkorder.vue";
import TableWorkorderPhases from "../components/TableWorkorderPhases.vue";
import TableProductionParts from "../components/TableProductionParts.vue";

import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "../../../store";
import { useReferenceStore } from "../../shared/store/reference";
import { useWorkOrderStore } from "../store/workorder";
import { useProductionPartStore } from "../store/productionpart";
import { storeToRefs } from "pinia";
import { PrimeIcons } from "primevue/api";
import { WorkOrder, WorkOrderPhase } from "../types";
import { usePlantModelStore } from "../store/plantmodel";
import { useLifecyclesStore } from "../../shared/store/lifecycle";
import { convertDateTimeToJSON, formatDate } from "../../../utils/functions";
import { useToast } from "primevue/usetoast";

const route = useRoute();
const router = useRouter();
const store = useStore();
const toast = useToast();
const lifecycleStore = useLifecyclesStore();
const referenceStore = useReferenceStore();
const workorderStore = useWorkOrderStore();
const plantModelStore = usePlantModelStore();
const productionPartStore = useProductionPartStore();
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
  productionPartStore.fetchByWorkOrderId(id.value);

  if (workorderStore.workorder) {
    workorderStore.workorder.plannedDate = formatDate(
      workorderStore.workorder.plannedDate
    );
  }
};

const onWorkorderSubmit = async (workorder: WorkOrder) => {
  if (workorderStore.workorder) {
    workorderStore.workorder.plannedDate = convertDateTimeToJSON(
      workorderStore.workorder.plannedDate
    );
  }

  const updated = await workorderStore.update(id.value, workorder);
  if (updated) await loadViewData();
};

// Phases
const addWorkOrderPhase = async (phase: WorkOrderPhase) => {
  const created = await workorderStore.createPhase(phase);
  if (created) {
    router.push({ path: `/workorder/${id.value}/phase/${phase.id}` });
  } else {
    toast.add({
      severity: "error",
      summary: "Error al crear la fase",
      detail: "Revisi el log per a més informació",
    });
  }
};
const editWorkOrderPhase = (phase: WorkOrderPhase) => {
  router.push({ path: `/workorder/${id.value}/phase/${phase.id}` });
};
const deleteWorkOrderPhase = async (phase: WorkOrderPhase) => {
  await workorderStore.deletePhase(phase.id);
};

const onProductionPartAddClick = () => {};
</script>
<style scoped>
.main {
  margin-top: 1rem;
}
</style>
