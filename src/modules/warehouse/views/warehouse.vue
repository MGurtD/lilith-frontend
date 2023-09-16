<template>
  <FormWarehouse v-if="Warehouse" :warehouse="Warehouse" @submit="submitForm" />
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { PrimeIcons } from "primevue/api";

import { storeToRefs } from "pinia";
import { Warehouse } from "../types";
import { useStore } from "../../../store";

import { useToast } from "primevue/usetoast";
import { FormActionMode } from "../../../types/component";
import router from "../../../router";
import FormWarehouse from "../components/FormWarehouse.vue";
import { useWarehouseStore } from "../store/warehouse";

const formMode = ref(FormActionMode.EDIT);
const route = useRoute();
const store = useStore();
const warehouseStore = useWarehouseStore();
const { warehouse } = storeToRefs(warehouseStore);

const loadView = async () => {
  await warehouseStore.fetchWarehouse(route.params.id as string);
  let pageTitle = "";
  if (!warehouse.value) {
    formMode.value = FormActionMode.CREATE;
    warehouseStore.setNewWarehouse(route.params.id as string);
    pageTitle = "Alta de magatzem";
  } else {
    formMode.value = FormActionMode.EDIT;
    pageTitle = `Magatzem ${warehouse.value.name}`;
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
  const data = warehouse.value as Warehouse;
  let result = false;
  let message = "";

  if (formMode.value === FormActionMode.CREATE) {
    result = await warehouseStore.createWarehouse(data);
    message = "Magatzem creat correctament";
  } else {
    result = await warehouseStore.updateWarehouse(data.id, data);
    message = "Magatzem actualizat correctament";
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
