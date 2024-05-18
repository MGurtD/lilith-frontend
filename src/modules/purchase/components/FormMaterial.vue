<template>
  <div>
    <Button
      label="Guardar"
      class="grid_add_row_button"
      size="small"
      @click="submitForm"
    />
    <br />
  </div>
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
        <DropdownReferenceType
          label="Tipus de material"
          v-model="reference.referenceTypeId"
        />
      </div>
    </section>
    <section class="four-columns">
      <div class="mt-1">
        <label class="block text-900 mb-2">Format</label>
        <Dropdown
          v-model="reference.referenceFormatId"
          editable
          :options="referenceStore.referenceFormats"
          optionValue="id"
          optionLabel="description"
          class="w-full"
          :class="{
            'p-invalid': validation.errors.taxid,
          }"
        />
      </div>
      <div class="mt-1">
        <BaseInput
          :type="BaseInputType.CURRENCY"
          label="Últim cost de compra"
          id="lastCost"
          v-model="reference.lastCost"
          disabled
        />
      </div>
      <div class="mt-1">
        <label class="block text-900 mb-2">Impost</label>
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
      <div>
        <label class="block text-900 mb-2">Desactivada</label>
        <Checkbox v-model="reference.disabled" :binary="true" />
      </div>
    </section>
  </form>
</template>
<script setup lang="ts">
import { ref } from "vue";
import BaseInput from "../../../components/BaseInput.vue";
import { Reference } from "../../shared/types";
import * as Yup from "yup";
import {
  FormValidation,
  FormValidationResult,
} from "../../../utils/form-validator";
import { useToast } from "primevue/usetoast";
import { BaseInputType } from "../../../types/component";
import { useTaxesStore } from "../../shared/store/tax";
import { useReferenceStore } from "../../shared/store/reference";
import { useReferenceTypeStore } from "../../shared/store/referenceType";
import DropdownReferenceType from "../../shared/components/DropdownReferenceType.vue";

const props = defineProps<{
  reference: Reference;
}>();

const emit = defineEmits<{
  (e: "submit", reference: Reference): void;
  (e: "cancel"): void;
}>();

const toast = useToast();
const taxesStore = useTaxesStore();
const referenceStore = useReferenceStore();
const referenceTypeStore = useReferenceTypeStore();

const schema = Yup.object().shape({
  code: Yup.string()
    .required("El codi és obligatori")
    .max(50, "El codi no pot superar els 50 carácters"),
  description: Yup.string()
    .required("La descripció és obligatori")
    .max(250, "La descripció pot superar els 250 carácters"),
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
