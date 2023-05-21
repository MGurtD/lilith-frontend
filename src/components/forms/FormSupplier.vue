<template>
  <form v-if="supplier">
    <section class="three-columns">
      <BaseInput
        name="comercialName"
        class="mb-2"
        label="Nom Comercial"
        id="comercialName"
        v-model="supplier.comercialName"
        :class="{
          'p-invalid': validation.errors.comercialName,
        }"
      ></BaseInput>
      <BaseInput
        class="mb-2"
        label="Nom Fiscal"
        id="taxName"
        v-model="supplier.taxName"
        :class="{
          'p-invalid': validation.errors.taxName,
        }"
      ></BaseInput>
      <div>
        <label class="block text-900 mb-2">Tipus Proveïdor</label>
        <Dropdown
          v-model="supplier.supplierTypeId"
          editable
          :options="supplierStore.supplierTypes"
          optionValue="id"
          optionLabel="name"
          class="w-full"
          :class="{
            'p-invalid': validation.errors.supplierTypeId,
          }"
        />
      </div>
    </section>

    <section class="three-columns mb-2">
      <div>
        <label class="block text-900 mb-2">País</label>
        <Dropdown
          v-model="supplier.country"
          editable
          :options="['Espanya']"
          class="w-full"
          :class="{
            'p-invalid': validation.errors.country,
          }"
        />
      </div>
      <div>
        <label class="block text-900 mb-2">Província</label>
        <Dropdown
          v-model="supplier.region"
          editable
          :options="spanishGeo.regions"
          optionValue="nm"
          optionLabel="nm"
          @change="onRegionChanged"
          class="w-full"
          :class="{
            'p-invalid': validation.errors.region,
          }"
        />
      </div>
      <div>
        <label class="block text-900 mb-2">Municipi</label>
        <Dropdown
          v-model="supplier.city"
          editable
          :options="spanishGeo.getTownsByRegionName(supplier.region)"
          optionValue="nm"
          optionLabel="nm"
          class="w-full"
          :class="{
            'p-invalid': validation.errors.city,
          }"
        />
      </div>
    </section>
    <section class="three-columns mb-2">
      <BaseInput
        label="Codi Postal"
        id="postalCode"
        v-model="supplier.postalCode"
        :class="{
          'p-invalid': validation.errors.postalCode,
        }"
      ></BaseInput>
      <BaseInput
        label="Direcció"
        id="address"
        v-model="supplier.address"
        :class="{
          'p-invalid': validation.errors.address,
        }"
      ></BaseInput>
      <BaseInput
        label="Telèfon"
        id="phone"
        v-model="supplier.phone"
        :class="{
          'p-invalid': validation.errors.phone,
        }"
      ></BaseInput>
    </section>
    <div>
      <label class="block text-900 mb-2">Observacions</label>
      <Textarea v-model="supplier.observations" class="w-full" />
    </div>

    <div class="mt-2">
      <Button label="Guardar" class="mr-2" @click="submitForm" />
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BaseInput from "../../components/BaseInput.vue";
import { useSuppliersStore } from "../../store/suppliers";
import { useSpanishGeography } from "../../store/geography";
import { storeToRefs } from "pinia";
import { Supplier } from "../../types";
import * as Yup from "yup";
import {
  FormValidation,
  FormValidationResult,
} from "../../utils/form-validator";
import { useToast } from "primevue/usetoast";
import { ToastSeverity } from "primevue/api";

const emit = defineEmits<{
  (e: "submit", supplier: Supplier): void;
}>();

const spanishGeo = useSpanishGeography();
const supplierStore = useSuppliersStore();
const { supplier } = storeToRefs(supplierStore);
const toast = useToast();

const schema = Yup.object().shape({
  comercialName: Yup.string()
    .required("El nom comercial és obligatori")
    .max(250, "El nom comercial no pot superar els 250 carácters"),
  taxName: Yup.string().required("El nom fiscal és obligatori"),
  region: Yup.string().required("La província és obligatoria"),
  city: Yup.string().required("El municipi és obligatori"),
  postalCode: Yup.string().required("El codi postal és obligatori"),
  address: Yup.string().required("La direcció és obligatoria"),
  phone: Yup.string().required("El telèfon és obligatori"),
  supplierTypeId: Yup.string().required("El tipus de proveïdor és obligatori"),
});
const validation = ref({
  result: false,
  errors: {},
} as FormValidationResult);

const onRegionChanged = () => {
  (supplier.value as Supplier).address = "";
};

const validate = () => {
  const formValidation = new FormValidation(schema);
  validation.value = formValidation.validate(supplier.value);
};

const submitForm = async () => {
  validate();
  if (validation.value.result) {
    emit("submit", supplier.value as Supplier);
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
