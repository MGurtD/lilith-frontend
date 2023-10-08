<template>
  <FormReferenceType
    v-if="referenceType"
    :reference-type="referenceType"
    @submit="submitForm"
  />
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { PrimeIcons } from "primevue/api";

import { storeToRefs } from "pinia";
import { ReferenceType } from "../types";

import { useStore } from "../../../store";

import { useToast } from "primevue/usetoast";
import { FormActionMode } from "../../../types/component";
import router from "../../../router";
import { useWarehouseStore } from "../store/warehouse";
import FormReferenceType from "../components/FormReferenceType.vue";
import { useReferenceTypeStore } from "../store/referenceType";

const formMode = ref(FormActionMode.EDIT);
const route = useRoute();
const store = useStore();
const referenceTypeStore = useReferenceTypeStore();
const { referenceType } = storeToRefs(referenceTypeStore);

const loadView = async () => {
  await referenceTypeStore.fetchRawMaterialType(route.params.id as string);
  let pageTitle = "";
  if (!referenceType.value) {
    formMode.value = FormActionMode.CREATE;
    referenceTypeStore.setNewRawMaterialType(route.params.id as string);
    pageTitle = "Alta de tipus de matèria prima";
  } else {
    formMode.value = FormActionMode.EDIT;
    pageTitle = `Magatzem ${referenceType.value.name}`;
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
  const data = referenceType.value as ReferenceType;
  let result = false;
  let message = "";

  if (formMode.value === FormActionMode.CREATE) {
    result = await referenceTypeStore.createRawMaterialType(data);
    message = "MMPP creada correctament";
  } else {
    result = await referenceTypeStore.updateRawMaterialType(data.id, data);
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
