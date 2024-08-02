<template>
  <FormMaterial v-if="reference" :reference="reference" @submit="submitForm" />
</template>
<script setup lang="ts">
import FormMaterial from "../components/FormMaterial.vue";
import { onMounted, ref } from "vue";
import { FormActionMode } from "../../../types/component";
import { PrimeIcons } from "primevue/api";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "../../../store";
import { useToast } from "primevue/usetoast";
import { useReferenceStore } from "../../shared/store/reference";
import { Reference } from "../../shared/types";

const formMode = ref(FormActionMode.EDIT);
const route = useRoute();
const router = useRouter();
const store = useStore();
const referenceStore = useReferenceStore();

const { reference } = storeToRefs(referenceStore);
const id = ref("");

const loadView = async () => {
  await referenceStore.fetchReference(id.value);

  let pageTitle = "";
  if (!reference.value) {
    formMode.value = FormActionMode.CREATE;
    referenceStore.setNewReference(id.value, ReferenceCategory.MATERIAL);
    pageTitle = `Alta de material`;
  } else {
    formMode.value = FormActionMode.EDIT;
    pageTitle = `Material ${reference.value.code} - ${reference.value.description}`;
  }

  store.setMenuItem({
    icon: PrimeIcons.BUILDING,
    backButtonVisible: true,
    title: pageTitle,
  });
};

onMounted(async () => {
  id.value = route.params.id as string;
  await loadView();
});

const toast = useToast();
const submitForm = async () => {
  const data = reference.value as Reference;
  let result = false;
  let message = "";

  if (formMode.value === FormActionMode.CREATE) {
    result = await referenceStore.createReference(data);
    if (result) message = "Material creat correctament";
    else message = "El material ja existeix";
  } else {
    result = await referenceStore.updateReference(data.id, data);
    message = "Material actualizada correctament";
  }

  toast.add({
    severity: result ? "success" : "warn",
    summary: message,
    life: 5000,
  });

  if (result) router.back();
};
</script>
