<template>
    <FormWorkcenter
      v-if="workcenter"
      :workcenter="workcenter"
      @submit="submitForm"
    />
  </template>
  <script setup lang="ts">
  import { onMounted, ref } from "vue";
  import { useRoute } from "vue-router";
  import { PrimeIcons } from "primevue/api";
  
  import { storeToRefs } from "pinia";
  import { Workcenter } from "../types";
  import { useStore } from "../../../store";
  
  import { useToast } from "primevue/usetoast";
  import { FormActionMode } from "../../../types/component";
  import router from "../../../router";
  import FormWorkcenter from "../components/FormWorkcenter.vue";
  import { usePlantModelStore } from "../store/plantmodel";
  
  const formMode = ref(FormActionMode.EDIT);
  const route = useRoute();
  const store = useStore();
  const plantmodelStore = usePlantModelStore();
  const { workcenter } = storeToRefs(plantmodelStore);
  
  const loadView = async () => {
    await plantmodelStore.fetchWorkcenter(route.params.id as string);    
    let pageTitle = "";
    if (!workcenter.value) {
      formMode.value = FormActionMode.CREATE;
      plantmodelStore.setNewWorkcenter(route.params.id as string);
      pageTitle = "Alta de màquina";
    } else {
      formMode.value = FormActionMode.EDIT;
      pageTitle = `Màquina: ${workcenter.value.name}`;
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
    const data = workcenter.value as Workcenter;
    let result = false;
    let message = "";
  
    if (formMode.value === FormActionMode.CREATE) {
      result = await plantmodelStore.createWorkcenter(data);
      message = "Màquina creada correctament";
    } else {
      result = await plantmodelStore.updateWorkcenter(data.id, data);
      message = "Màquina actualizada correctament";
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
  