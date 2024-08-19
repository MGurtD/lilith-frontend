<template>
  <form>
    <div class="mt-2">
      <label class="block text-900 mb-2">Proveïdor</label>
      <Dropdown
        class="w-full"
        v-model="createRequest.supplierId"
        editable
        :options="suppliersStore.suppliers"
        optionValue="id"
        optionLabel="comercialName"
      />
    </div>
    <div class="mt-2">
      <label class="block text-900 mb-2">Exercici</label>
      <Dropdown
        class="w-full"
        v-model="createRequest.exerciseId"
        editable
        :options="sharedData.exercises"
        optionValue="id"
        optionLabel="name"
      />
    </div>
    <div class="mt-2">
      <label class="block text-900 mb-2">Data</label>
      <Calendar v-model="createRequest.date" />
    </div>

    <footer class="mt-2">
      <Button label="Crear" @click="onSubmit" style="float: right" />
    </footer>
  </form>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useSuppliersStore } from "../store/suppliers";
import { useSharedDataStore } from "../../shared/store/masterData";
import { useToast } from "primevue/usetoast";
import { CreatePurchaseDocumentRequest } from "../types";
import * as Yup from "yup";
import {
  FormValidation,
  FormValidationResult,
} from "../../../utils/form-validator";
import { convertDateTimeToJSON } from "../../../utils/functions";

const toast = useToast();
const sharedData = useSharedDataStore();
const suppliersStore = useSuppliersStore();

const props = defineProps<{
  createRequest: CreatePurchaseDocumentRequest;
}>();
const emit = defineEmits<{
  (e: "submit", createRequest: CreatePurchaseDocumentRequest): void;
}>();

const schema = Yup.object().shape({
  exerciseId: Yup.string().required("L'exercici és obligatori"),
  supplierId: Yup.string().required("El client és obligatori"),
  date: Yup.date().required("La data és obligatoria"),
});
const validation = ref({
  result: false,
  errors: {},
} as FormValidationResult);

const validate = () => {
  const formValidation = new FormValidation(schema);
  validation.value = formValidation.validate(props.createRequest);
};

const onSubmit = () => {
  validate();
  if (validation.value.result) {
    props.createRequest.date = convertDateTimeToJSON(props.createRequest.date);
    emit("submit", props.createRequest);
  } else {
    let errors = "";
    Object.entries(validation.value.errors).forEach((e) => {
      errors += `${e[1].map((e) => e)}.   `;
    });
    toast.add({
      severity: "warn",
      summary: "Formulari inválid",
      detail: errors,
      life: 5000,
    });
  }
};
</script>
