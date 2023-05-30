<template>
    <form v-if="customer">
      <section class="three-columns">
        <BaseInput
          name="comercialName"
          class="mb-2"
          label="Nom Comercial"
          id="comercialName"
          v-model="customer.comercialName"
          :class="{
            'p-invalid': validation.errors.comercialName,
          }"
        ></BaseInput>
        <BaseInput
          class="mb-2"
          label="Nom Fiscal"
          id="taxName"
          v-model="customer.taxName"
          :class="{
            'p-invalid': validation.errors.taxName,
          }"
        ></BaseInput>
        <div>
          <label class="block text-900 mb-2">Tipus Client</label>
          <Dropdown
            v-model="customer.customerTypeId"
            editable
            :options="customerStore.customerTypes"
            optionValue="id"
            optionLabel="name"
            class="w-full"
            :class="{
              'p-invalid': validation.errors.supplierTypeId,
            }"
          />
        </div>
      </section>
  
      <section class="two-columns mb-2">
        <BaseInput
          name="vatNumber"
          class="mb-2"
          label="CIF"
          id="vatNumber"
          v-model="customer.vatNumber"
          :class="{
            'p-invalid': validation.errors.vatNumber,
          }"
        ></BaseInput>
        <BaseInput
          name="web"
          class="mb-2"
          label="Web"
          id="web"
          v-model="customer.web"
          :class="{
            'p-invalid': validation.errors.web,
          }"
        ></BaseInput>       
      </section> 
      <div class="mt-2">
        <Button label="Guardar" class="mr-2" @click="submitForm" />
      </div>
    </form>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  import BaseInput from "../../components/BaseInput.vue";
  import { useCustomersStore } from "../../store/customers";
  import { useSpanishGeography } from "../../store/geography";
  import { storeToRefs } from "pinia";
  import { Customer } from "../../types";
  import * as Yup from "yup";
  import {
    FormValidation,
    FormValidationResult,
  } from "../../utils/form-validator";
  import { useToast } from "primevue/usetoast";
  import { ToastSeverity } from "primevue/api";
  
  const emit = defineEmits<{
    (e: "submit", customer: Customer): void;
  }>();
  
  const spanishGeo = useSpanishGeography();
  const customerStore = useCustomersStore();
  const { customer } = storeToRefs(customerStore);
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
  
/*  const onRegionChanged = () => {
    (customer.value as Customer).address = "";
  };
  */
  const validate = () => {
    const formValidation = new FormValidation(schema);
    validation.value = formValidation.validate(customer.value);
  };
  
  const submitForm = async () => {
    validate();
    if (validation.value.result) {
      emit("submit", customer.value as Customer);
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
  