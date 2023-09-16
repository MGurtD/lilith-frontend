<template>
  <FormMachineStatus
    v-if="machineStatus"
    :machineStatus="machineStatus"
    @submit="submitForm"
  />
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { PrimeIcons } from "primevue/api";

import { storeToRefs } from "pinia";
import { MachineStatus } from "../types";
import { useStore } from "../../../store";

import { useToast } from "primevue/usetoast";
import { FormActionMode } from "../../../types/component";
import router from "../../../router";
import FormMachineStatus from "../components/FormMachineStatus.vue";
import { usePlantModelStore } from "../store/plantmodel";

const formMode = ref(FormActionMode.EDIT);
const route = useRoute();
const store = useStore();
const plantmodelStore = usePlantModelStore();
const { machineStatus } = storeToRefs(plantmodelStore);

const loadView = async () => {
  await plantmodelStore.fetchMachineStatus(route.params.id as string);
  let pageTitle = "";

  if (!machineStatus.value) {
    formMode.value = FormActionMode.CREATE;
    plantmodelStore.setNewMachineStatus(route.params.id as string);
    pageTitle = "Alta d'estat de màquina";
  } else {
    formMode.value = FormActionMode.EDIT;
    pageTitle = `Estat de màquina ${machineStatus.value.name}`;
  }

  store.setMenuItem({
    icon: PrimeIcons.BUILDING,
    backButtonVisible: true,
    title: pageTitle,
  });
};

onMounted(async () => {
  await loadView();
});

const toast = useToast();
const submitForm = async () => {
  const data = machineStatus.value as MachineStatus;
  let result = false;
  let message = "";

  if (formMode.value === FormActionMode.CREATE) {
    result = await plantmodelStore.createMachineStatus(data);
    message = "Estat de màquina creat correctament";
  } else {
    result = await plantmodelStore.updateMachineStatus(data.id, data);
    message = "Estat de màquina actualizat correctament";
  }

  if (result) {
    toast.add({
      severity: "success",
      summary: message,
      life: 5000,
    });
    router.back();
  }
};
</script>
