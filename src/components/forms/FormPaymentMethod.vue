<template>
  <form v-if="paymentMethod">
    <div class="two-columns">
      <BaseInput
        class="mb-2"
        label="Nom"
        id="name"
        v-model="paymentMethod.name"
        :class="{
          'p-invalid': validation.errors.name,
        }"
      ></BaseInput>
      <BaseInput
        class="mb-2"
        label="Descripció"
        id="description"
        v-model="paymentMethod.description"
        :class="{
          'p-invalid': validation.errors.description,
        }"
      ></BaseInput>
    </div>
    <div class="two-columns">
      <div>
        <label class="block text-900 mb-2">Dies +</label>
        <InputNumber v-model="paymentMethod.daysToAdd" class="w-full" />
      </div>
      <div>
        <label class="block text-900 mb-2">Desactivat</label>
        <Checkbox
          v-model="paymentMethod.disabled"
          class="w-full"
          :binary="true"
        />
      </div>
    </div>
    <div class="mt-2">
      <Button label="Guardar" class="mr-2" @click="submitForm" />
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BaseInput from "../../components/BaseInput.vue";
import { PaymentMethod } from "../../types";
import * as Yup from "yup";
import {
  FormValidation,
  FormValidationResult,
} from "../../utils/form-validator";
import { useToast } from "primevue/usetoast";

const props = defineProps<{
  paymentMethod: PaymentMethod;
}>();

const emit = defineEmits<{
  (e: "submit", paymentMethod: PaymentMethod): void;
  (e: "cancel"): void;
}>();

const toast = useToast();

const schema = Yup.object().shape({
  name: Yup.string()
    .required("El nom és obligatori")
    .max(250, "El nom comercial no pot superar els 250 carácters"),
  description: Yup.string()
    .required("La descripció és obligatori")
    .max(250, "La descripció no pot superar els 250 carácters"),
  daysToAdd: Yup.number().required("El dies + són obligatoris"),
});
const validation = ref({
  result: false,
  errors: {},
} as FormValidationResult);

const validate = () => {
  const formValidation = new FormValidation(schema);
  validation.value = formValidation.validate(props.paymentMethod);
};

const submitForm = async () => {
  validate();
  if (validation.value.result) {
    emit("submit", props.paymentMethod);
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
