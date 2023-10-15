<template>
  <FormReference
    v-if="reference"
    :module="module"
    :reference="reference"
    @submit="submitForm"
  />
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { PrimeIcons } from "primevue/api";

import { storeToRefs } from "pinia";
import { Reference } from "../types";
import { useStore } from "../../../store";

import { useToast } from "primevue/usetoast";
import { FormActionMode } from "../../../types/component";
import router from "../../../router";
import FormReference from "../components/FormReference.vue";
import { useReferenceStore } from "../store/reference";

const formMode = ref(FormActionMode.EDIT);
const route = useRoute();
const store = useStore();
const referenceStore = useReferenceStore();
const { reference } = storeToRefs(referenceStore);
const module = ref("");

const loadView = async () => {
  await referenceStore.fetchReference(route.params.id as string);
  let pageTitle = "";
  if (!reference.value) {
    formMode.value = FormActionMode.CREATE;
    referenceStore.setNewReference(route.params.id as string);
    pageTitle = "Alta de referència";
  } else {
    formMode.value = FormActionMode.EDIT;
    pageTitle = `Referència ${reference.value.description}`;
  }

  store.setMenuItem({
    icon: PrimeIcons.BUILDING,
    backButtonVisible: true,
    title: pageTitle,
  });
};

onMounted(async () => {
  module.value = route.params.module as string;
  await loadView();
});

const toast = useToast();
const submitForm = async () => {
  const data = reference.value as Reference;
  let result = false;
  let message = "";

  if (formMode.value === FormActionMode.CREATE) {
    result = await referenceStore.createReference(data);
    if (result) message = "Referència creada correctament";
    else message = "La referència + versió introduïda ja existeix";
  } else {
    result = await referenceStore.updateReference(data.id, data);
    message = "Referència actualizada correctament";
  }

  toast.add({
    severity: result ? "success" : "warn",
    summary: message,
    life: 5000,
  });

  if (result) router.back();
};
</script>
