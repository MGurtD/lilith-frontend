<template>
  <form v-if="address">
    <section class="three-columns mb-2">
      <div>
        <label class="block text-900 mb-2">País</label>
        <Dropdown
          v-model="address.country"
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
          v-model="address.region"
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
          v-model="address.city"
          editable
          :options="spanishGeo.getTownsByRegionName(address.region)"
          optionValue="nm"
          optionLabel="nm"
          class="w-full"
          :class="{
            'p-invalid': validation.errors.city,
          }"
        />
      </div>
    </section>

    <section class="two-columns">
      <BaseInput
        id="name"
        class="mb-2"
        label="Nom"
        v-model="address.name"
        :class="{
          'p-invalid': validation.errors.name,
        }"
      ></BaseInput>
      <div>
        <label class="block text-900 mb-2">Predeterminat</label>
        <Checkbox v-model="address.default" class="w-full" :binary="true" />
      </div>
      <div>
        <label class="block text-900 mb-2">Desactivat</label>
        <Checkbox v-model="address.disabled" class="w-full" :binary="true" />
      </div>
    </section>

    <section class="three-columns mb-2">
      <BaseInput
        label="Codi Postal"
        id="postalCode"
        v-model="address.postalCode"
        :class="{
          'p-invalid': validation.errors.postalCode,
        }"
      ></BaseInput>
      <BaseInput
        label="Direcció"
        id="address"
        v-model="address.address"
        :class="{
          'p-invalid': validation.errors.address,
        }"
      ></BaseInput>
    </section>
    <div>
      <label class="block text-900 mb-2">Observacions</label>
      <Textarea v-model="address.observations" class="w-full" />
    </div>

    <div class="mt-2">
      <Button label="Guardar" class="mr-2" @click="submitForm" />
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BaseInput from "../../components/BaseInput.vue";
import { useSpanishGeography } from "../../store/geography";
import { Supplier, SupplierContact } from "../../types";
import * as Yup from "yup";
import {
  FormValidation,
  FormValidationResult,
} from "../../utils/form-validator";
import { useToast } from "primevue/usetoast";
import { CustomerAddress } from "../../types";

const props = defineProps<{
  address: CustomerAddress;
}>();

const emit = defineEmits<{
  (e: "submit", address: CustomerAddress): void;
  (e: "cancel"): void;
}>();

const spanishGeo = useSpanishGeography();
const toast = useToast();

const schema = Yup.object().shape({
  name: Yup.string()
    .required("El nom és obligatori")
    .max(250, "El nom no pot superar els 250 carácters"),
  vatNumber: Yup.string()
    .required("El CIF és obligatori")
    .max(15, "El CIF no pot superar els 15 carácters"),
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
  const address = props.address;
  address.address = "";
};

const validate = () => {
  const formValidation = new FormValidation(schema);
  validation.value = formValidation.validate(props.address);
};

const submitForm = async () => {
  validate();
  if (validation.value.result) {
    emit("submit", props.address);
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
