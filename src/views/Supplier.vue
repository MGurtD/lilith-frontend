<template>
  <TabView>
    <TabPanel>
      <template #header>
        <i :class="PrimeIcons.BUILDING" class="mr-2"></i>
        <span>Proveïdor</span>
      </template>
      <SupplierForm @submit="submitForm" />
    </TabPanel>
    <TabPanel v-if="formMode === FormActionMode.EDIT">
      <template #header>
        <i :class="PrimeIcons.USERS" class="mr-2"></i>
        <span>Contactes</span>
      </template>
    </TabPanel>
  </TabView>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useSuppliersStore } from "../store/suppliers";
import { PrimeIcons, ToastSeverity } from "primevue/api";

import SupplierForm from "../components/forms/SupplierForm.vue";
import { storeToRefs } from "pinia";
import { Supplier } from "../types";
import { useStore } from "../store";

import { useToast } from "primevue/usetoast";
import { FormActionMode } from "../types/component";

const formMode = ref(FormActionMode.EDIT);
const route = useRoute();
const store = useStore();
const supplierStore = useSuppliersStore();
const { supplier } = storeToRefs(supplierStore);

const loadView = async () => {
  await supplierStore.fetchSupplier(route.params.id as string);
  supplierStore.fetchSupplierTypes();

  // Comprovar existencia del proveïdor
  let pageTitle = "";
  if (!supplier.value) {
    formMode.value = FormActionMode.CREATE;
    supplierStore.setNewSupplier(route.params.id as string);
    pageTitle = "Alta de proveïdor";
  } else {
    formMode.value = FormActionMode.EDIT;
    pageTitle = `Proveïdor ${supplier.value.comercialName}`;
  }

  store.setMenuItem({
    icon: PrimeIcons.BUILDING,
    route: "",
    text: pageTitle,
  });
};

onMounted(async () => {
  await loadView();
});

const toast = useToast();
const submitForm = async () => {
  const data = supplier.value as Supplier;
  let result = false;
  let message = "";

  if (formMode.value === FormActionMode.CREATE) {
    result = await supplierStore.createSupplier(data);
    message = "Proveïdor creat correctament";
  } else {
    result = await supplierStore.updateSupplier(data.id, data);
    message = "Proveïdor actualizat correctament";
  }

  if (result) {
    toast.add({
      severity: ToastSeverity.SUCCESS,
      summary: message,
      life: 5000,
    });
    await loadView();
  }
};
</script>
