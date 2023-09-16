<template>
  <FormOperatorCost
    v-if="operatorCost"
    :operatorCost="operatorCost"
    @submit="submitForm"
  />
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { PrimeIcons } from "primevue/api";

import { storeToRefs } from "pinia";
import { Area, OperatorCost } from "../types";
import { useStore } from "../../../store";

import { useToast } from "primevue/usetoast";
import { FormActionMode } from "../../../types/component";
import router from "../../../router";
import FormOperatorCost from "../components/FormOperatorCost.vue";
import { usePlantModelStore } from "../store/plantmodel";

const formMode = ref(FormActionMode.EDIT);
const route = useRoute();
const store = useStore();
const plantmodelStore = usePlantModelStore();
const { operatorCost } = storeToRefs(plantmodelStore);

const loadView = async () => {
  await plantmodelStore.fetchOperatorCost(route.params.id as string);
  let pageTitle = "";
  if (!operatorCost.value) {
    formMode.value = FormActionMode.CREATE;
    plantmodelStore.setNewOperatorCost(route.params.id as string);
    pageTitle = "Alta de cost per tipus operari";
  } else {
    formMode.value = FormActionMode.EDIT;
    pageTitle = `Cost per tipus d'operari ${operatorCost.value.id}`;
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
  const data = operatorCost.value as OperatorCost;
  let result = false;
  let message = "";

  if (formMode.value === FormActionMode.CREATE) {
    result = await plantmodelStore.createOperatorCost(data);
    message = "Cost per tipus d'operari creat correctament";
  } else {
    result = await plantmodelStore.updateOperatorCost(data.id, data);
    message = "Cost per tipus d'operari actualizat correctament";
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
