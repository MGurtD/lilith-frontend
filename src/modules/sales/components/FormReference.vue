<template>
  <form v-if="reference">
    <section class="three-columns">
      <div class="mt-1">
        <BaseInput
          class="mb-2"
          label="Codi"
          id="code"
          v-model="reference.code"
          :class="{
            'p-invalid': validation.errors.code,
          }"
        ></BaseInput>
      </div>
      <div class="mt-1">
        <BaseInput
          class="mb-2"
          label="Descripció"
          id="description"
          v-model="reference.description"
          :class="{
            'p-invalid': validation.errors.description,
          }"
        ></BaseInput>
      </div>
      <div class="mt-1">
        <BaseInput
          :type="BaseInputType.TEXT"
          label="Versió"
          id="version"
          v-model="reference.version"
        />
      </div>
    </section>
    <section class="three-columns">
      <div class="mt-1">
        <BaseInput
          :type="BaseInputType.CURRENCY"
          label="Cost"
          id="cost"
          v-model="reference.cost"
        />
      </div>
      <div class="mt-1">
        <BaseInput
          :type="BaseInputType.CURRENCY"
          label="Preu"
          id="price"
          v-model="reference.price"
        />
      </div>
      <div class="mt-1">
        <label class="block text-900 mb-2">Imposts</label>
        <Dropdown
          v-model="reference.taxId"
          editable
          :options="taxesStore.taxes"
          optionValue="id"
          optionLabel="name"
          class="w-full"
          :class="{
            'p-invalid': validation.errors.taxid,
          }"
        />
      </div>
    </section>
    <section>
      <br />
      <FileEntityPicker
        v-if="reference"
        title="Planos"
        entity="referenceMaps"
        :id="reference.id"
      />
    </section>
    <div class="mt-2">
      <Button label="Guardar" class="mr-2" @click="submitForm" />
    </div>
  </form>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import BaseInput from "../../../components/BaseInput.vue";
import { Reference } from "../types";
import * as Yup from "yup";
import {
  FormValidation,
  FormValidationResult,
} from "../../../utils/form-validator";
import FileEntityPicker from "../../../components/FileEntityPicker.vue";
import { useToast } from "primevue/usetoast";
import { storeToRefs } from "pinia";
import { useReferenceStore } from "../store/reference";
import { BaseInputType } from "../../../types/component";
import { useTaxesStore } from "../../shared/store/tax";

const props = defineProps<{
  reference: Reference;
}>();

const emit = defineEmits<{
  (e: "submit", reference: Reference): void;
  (e: "cancel"): void;
}>();

const toast = useToast();
const referenceStore = useReferenceStore();
const taxesStore = useTaxesStore();
const { reference } = storeToRefs(referenceStore);

onMounted(async () => {
  await taxesStore.fetchAll();
});

const schema = Yup.object().shape({
  code: Yup.string()
    .required("El codi és obligatori")
    .max(50, "El codi no pot superar els 50 carácters"),
  description: Yup.string()
    .required("La descripció és obligatori")
    .max(250, "La descripció pot superar els 250 carácters"),
  version: Yup.string()
    .required("La versió és obligatoria")
    .max(20, "La versió pot superar els 20 carácters"),
  cost: Yup.string().required("El cost es obligatori"),
  price: Yup.string().required("El preu es obligatori"),
  taxId: Yup.string().required("El tipus d'iva es obligatori"),
});
const validation = ref({
  result: false,
  errors: {},
} as FormValidationResult);

const validate = () => {
  const formValidation = new FormValidation(schema);
  validation.value = formValidation.validate(props.reference);
};

const submitForm = async () => {
  validate();
  if (validation.value.result) {
    emit("submit", props.reference);
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