<template>
  <header>
    <FormWorkOrderPhase
      v-if="workorder && workorderPhase"
      :workorder="workorder"
      :phase="workorderPhase"
      @submit="onWorkOrderPhaseSubmit"
    ></FormWorkOrderPhase>
  </header>
  <main class="main" v-if="workorderPhase">
    <TabView>
      <TabPanel header="Pasos">
        <TableWorkOrderPhaseDetails
          :workorderPhase="workorderPhase"
          :details="workorderPhase.details!"
          @add="onAddDetail"
          @edit="onEditDetail"
          @delete="onDeleteDetail"
        ></TableWorkOrderPhaseDetails>
      </TabPanel>
      <TabPanel header="Materials">
        <TableWorkOrderPhaseBillOfMaterials
          :workorderPhase="workorderPhase"
          :billOfMaterials="workorderPhase.billOfMaterials!"
          @add="onAddBomItem"
          @edit="onEditBomItem"
          @delete="onDeleteBomItem"
        ></TableWorkOrderPhaseBillOfMaterials>
      </TabPanel>
    </TabView>
    <Dialog
      v-model:visible="dialogOptions.visible"
      :header="dialogOptions.title"
      :closable="dialogOptions.closable"
      :modal="dialogOptions.modal"
      @hide="cleanSelecteds"
    >
      <FormWorkOrderPhaseDetail
        v-if="selectedDetail"
        :detail="selectedDetail"
        @submit="onWorkOrderPhaseDetailSubmit"
      ></FormWorkOrderPhaseDetail>
      <FormWorkOrderPhaseBomItem
        v-if="selectedBomItem"
        :bomItem="selectedBomItem"
        @submit="onWorkmasterPhasBomItemSubmit"
      ></FormWorkOrderPhaseBomItem>
    </Dialog>
  </main>
</template>
<script setup lang="ts">
import FormWorkOrderPhase from "../components/FormWorkorderPhase.vue";
import TableWorkOrderPhaseDetails from "../components/TableWorkorderPhaseDetails.vue";
import FormWorkOrderPhaseDetail from "../components/FormWorkorderPhaseDetail.vue";
import TableWorkOrderPhaseBillOfMaterials from "../components/TableWorkorderPhaseBillOfMaterials.vue";
import FormWorkOrderPhaseBomItem from "../components/FormWorkorderPhaseBomItem.vue";

import { onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "../../../store";
import { useReferenceStore } from "../../shared/store/reference";
import { usePlantModelStore } from "../store/plantmodel";
import { storeToRefs } from "pinia";
import { PrimeIcons } from "primevue/api";
import {
  WorkOrderPhase,
  WorkOrderPhaseBillOfMaterials,
  WorkOrderPhaseDetail,
} from "../types";
import { DialogOptions, FormActionMode } from "../../../types/component";
import { useWorkOrderStore } from "../store/workorder";
import { useToast } from "primevue/usetoast";

const route = useRoute();
const toast = useToast();
const store = useStore();
const referenceStore = useReferenceStore();
const plantModelStore = usePlantModelStore();
const workorderStore = useWorkOrderStore();
const { workorder, workorderPhase } = storeToRefs(workorderStore);
const id = ref("");
const phaseId = ref("");

const dialogOptions = reactive({
  visible: false,
  title: "Fase",
  closable: true,
  position: "center",
  modal: true,
} as DialogOptions);

onMounted(async () => {
  id.value = route.params.id as string;
  phaseId.value = route.params.phaseid as string;
  await loadViewData();

  let pageTitle = "";
  pageTitle = `Ordre de fabricació`;
  if (workorder.value && workorderPhase.value) {
    pageTitle = `${pageTitle} ${workorder.value.code} - Fase ${workorderPhase.value.code}`;
  }

  store.setMenuItem({
    icon: PrimeIcons.BUILDING,
    backButtonVisible: true,
    title: pageTitle,
  });

  referenceStore.fetchReferencesByModule("purchase");
  plantModelStore.fetchActiveModel();
});

const loadViewData = async () => {
  await workorderStore.fetchPhaseById(phaseId.value);
};

const onWorkOrderPhaseSubmit = async (phase: WorkOrderPhase) => {
  const updated = await workorderStore.updatePhase(phaseId.value, phase);

  if (updated) {
    toast.add({
      severity: "success",
      summary: "Fase actualitzada",
      detail: `La fase ${phase.code} ha estat actualitzada correctament`,
      life: 10000,
    });
  }
};
const formAction = ref(FormActionMode.CREATE);
const selectedDetail = ref(undefined as WorkOrderPhaseDetail | undefined);
const selectedBomItem = ref(
  undefined as WorkOrderPhaseBillOfMaterials | undefined
);
const cleanSelecteds = () => {
  selectedDetail.value = undefined;
  selectedBomItem.value = undefined;
};

// Details
const onAddDetail = (detail: WorkOrderPhaseDetail) => {
  formAction.value = FormActionMode.CREATE;
  selectedDetail.value = detail;

  dialogOptions.title = "Afegir pas de fabricació";
  dialogOptions.visible = true;
};
const onEditDetail = (detail: WorkOrderPhaseDetail) => {
  formAction.value = FormActionMode.EDIT;
  selectedDetail.value = detail;

  dialogOptions.title = "Modificar pas de fabricació";
  dialogOptions.visible = true;
};
const onDeleteDetail = async (detail: WorkOrderPhaseDetail) => {
  await workorderStore.updatePhase(
    phaseId.value,
    workorderStore.workorderPhase!
  );
  await workorderStore.deletePhaseDetail(detail.id);
};

const onWorkOrderPhaseDetailSubmit = async (detail: WorkOrderPhaseDetail) => {
  let promise;
  if (formAction.value === FormActionMode.CREATE) {
    promise = workorderStore.createPhaseDetail(detail);
  } else if (formAction.value === FormActionMode.EDIT) {
    promise = workorderStore.updatePhaseDetail(detail.id, detail);
  }
  await workorderStore.updatePhase(
    phaseId.value,
    workorderStore.workorderPhase!
  );
  const result = await promise;

  if (result) {
    dialogOptions.visible = false;
  }
};

// Bill of materials
const onAddBomItem = (bomItem: WorkOrderPhaseBillOfMaterials) => {
  formAction.value = FormActionMode.CREATE;
  selectedBomItem.value = bomItem;

  dialogOptions.title = "Afegir material";
  dialogOptions.visible = true;
};
const onEditBomItem = (bomItem: WorkOrderPhaseBillOfMaterials) => {
  formAction.value = FormActionMode.EDIT;
  selectedBomItem.value = bomItem;

  dialogOptions.title = "Modificar material";
  dialogOptions.visible = true;
};
const onDeleteBomItem = async (bomItem: WorkOrderPhaseBillOfMaterials) => {
  await workorderStore.updatePhase(
    phaseId.value,
    workorderStore.workorderPhase!
  );
  await workorderStore.deletePhaseBomItem(bomItem.id);
};

const onWorkmasterPhasBomItemSubmit = async (
  bomItem: WorkOrderPhaseBillOfMaterials
) => {
  let promise;
  if (formAction.value === FormActionMode.CREATE) {
    promise = workorderStore.createPhaseBomItem(bomItem);
  } else if (formAction.value === FormActionMode.EDIT) {
    promise = workorderStore.updatePhaseBomItem(bomItem.id, bomItem);
  }
  await workorderStore.updatePhase(
    phaseId.value,
    workorderStore.workorderPhase!
  );
  const result = await promise;

  if (result) {
    dialogOptions.visible = false;
  }
};
</script>
