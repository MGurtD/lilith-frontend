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
    <section class="four-columns">
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
      <div class="mt-1" v-if="isSales">
        <BaseInput
          :type="BaseInputType.TEXT"
          label="Versió"
          id="version"
          v-model="reference.version"
        />
      </div>
      <div class="mt-1" v-if="isSales">
        <DropdownCustomers label="Client" v-model="reference.customerId" />
      </div>
      <div class="mt-1" v-if="isPurchase">
        <label class="block text-900 mb-2">Tipus de material</label>
        <Dropdown
          v-model="reference.referenceTypeId"
          editable
          :options="referenceTypeStore.referenceTypes"
          optionValue="id"
          optionLabel="name"
          class="w-full"
          :class="{
            'p-invalid': validation.errors.taxid,
          }"
        />
      </div>
    </section>
    <section class="three-columns" v-if="isPurchase">
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
    </section>
    <section class="five-columns" v-if="isSales">
      <div class="mt-1">
        <BaseInput
          :type="BaseInputType.CURRENCY"
          label="Cost Teóric Fabricació"
          id="workMasterCost"
          v-model="reference.workMasterCost"
          disabled
        />
      </div>
      <div class="mt-1">
        <BaseInput
          :type="BaseInputType.CURRENCY"
          label="Cost Última Fabricació"
          id="lastCost"
          v-model="reference.lastCost"
          disabled
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
      <div class="mt-1">
        <label class="block text-900 mb-2">Servei</label>
        <Checkbox v-model="reference.isService" class="w-full" :binary="true" />
      </div>
    </section>
    <section>
      <br />
      <FileEntityPicker
        v-if="reference"
        title="Documentació"
        entity="referenceMaps"
        :id="(route.params.id as string)"
      />
    </section>
  </form>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import BaseInput from "../../../components/BaseInput.vue";
import { Reference } from "../types";
import * as Yup from "yup";
import {
  FormValidation,
  FormValidationResult,
} from "../../../utils/form-validator";
import DropdownCustomers from "../../sales/components/DropdownCustomers.vue";
import FileEntityPicker from "../../../components/FileEntityPicker.vue";
import { useToast } from "primevue/usetoast";
import { BaseInputType } from "../../../types/component";
import { useTaxesStore } from "../../shared/store/tax";
import { useReferenceStore } from "../../shared/store/reference";
import { useReferenceTypeStore } from "../store/referenceType";
import { DropdownChangeEvent } from "primevue/dropdown";

const props = defineProps<{
  module: string;
  reference: Reference;
}>();

const emit = defineEmits<{
  (e: "submit", reference: Reference): void;
  (e: "cancel"): void;
}>();

const route = useRoute();

const isSales = computed(() => {
  return props.module === "sales";
});
const isPurchase = computed(() => {
  return props.module === "purchase";
});
const isProduction = computed(() => {
  return props.module === "production";
});

const toast = useToast();
const taxesStore = useTaxesStore();
const referenceStore = useReferenceStore();
const referenceTypeStore = useReferenceTypeStore();

const updateReferenceCode = (event: DropdownChangeEvent) => {
  const referenceType = referenceTypeStore.referenceTypes?.find(
    (t) => t.id === event.value
  );
  if (referenceType && !props.reference.code.includes(referenceType.name)) {
    props.reference.code = `${props.reference.code} (${referenceType.name})`;
  }
};

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
  cost: Yup.number().required("El cost es obligatori"),
  price: Yup.number().required("El preu es obligatori"),
  //density: Yup.number().required("La densitat és obligatoria"),
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
