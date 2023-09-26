<template>
    <FormRawMaterialType v-if="rawmaterialType" :rawmaterialtype="rawmaterialType" @submit="submitForm" />
  </template>
  <script setup lang="ts">
  import { onMounted, ref } from "vue";
  import { useRoute } from "vue-router";
  import { PrimeIcons } from "primevue/api";
  
  import { storeToRefs } from "pinia";
  import { RawMaterialType } from "../types";
  
  import { useStore } from "../../../store";
  
  import { useToast } from "primevue/usetoast";
  import { FormActionMode } from "../../../types/component";
  import router from "../../../router";
  import { useWarehouseStore } from "../store/warehouse";
import FormRawMaterialType from "../components/FormRawMaterialType.vue";
  
  const formMode = ref(FormActionMode.EDIT);
  const route = useRoute();
  const store = useStore();
  const warehouseStore = useWarehouseStore();
  const { rawmaterialType } = storeToRefs(warehouseStore);
  
  const loadView = async () => {
    await warehouseStore.fetchWarehouse(route.params.id as string);
    let pageTitle = "";
    if (!rawmaterialType.value) {
      formMode.value = FormActionMode.CREATE;
      warehouseStore.setNewRawMaterialType(route.params.id as string);
      pageTitle = "Alta de tipus de matèria prima";
    } else {
      formMode.value = FormActionMode.EDIT;
      pageTitle = `Magatzem ${rawmaterialType.value.name}`;
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
    const data = rawmaterialType.value as RawMaterialType;
    let result = false;
    let message = "";
  
    if (formMode.value === FormActionMode.CREATE) {
      result = await warehouseStore.createRawMaterialType(data);
      message = "MMPP creada correctament";
    } else {
      result = await warehouseStore.updateRawMaterialType(data.id, data);
      message = "MMPP actualizada correctament";
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
  