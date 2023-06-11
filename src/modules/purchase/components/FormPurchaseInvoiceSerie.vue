<template>
    <form v-if="purchaseInvoiceSerie">
        <div class="three-columns">
            <BaseInput
                name="name"
                class="mb-2"
                label="Nom de la sèrie"
                id="name"
                v-model="purchaseInvoiceSerie.name"
                :class="{
                'p-invalid': validation.errors.name,
                }"
            ></BaseInput>
            <BaseInput
                name="description"
                class="mb-2"
                label="Descripció"
                id="description"
                v-model="purchaseInvoiceSerie.description"
                :class="{
                'p-invalid': validation.errors.description,
                }"
            ></BaseInput>
            <div>
              <label class="block text-900 mb-2">Desactivada</label>
              <Checkbox
                v-model="purchaseInvoiceSerie.disabled"
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
import BaseInput from "../../../components/BaseInput.vue";
import { PurchaseInvoiceSerie } from "../types";
import * as Yup from "yup";
import {
  FormValidation,
  FormValidationResult,
} from "../../../utils/form-validator";
import { useToast } from "primevue/usetoast";

const props = defineProps<{
  purchaseInvoiceSerie: PurchaseInvoiceSerie;
}>();

const emit = defineEmits<{
    (e: "submit", purchaseInvoiceSerie: PurchaseInvoiceSerie): void;
    (e: "cancel"): void;
}>();

const toast = useToast();

const schema = Yup.object().shape({
    name: Yup.string()
        .required("El nom de la sèrie és obligatori")
        .max(50, "El nom de la sèrie no pot superar els 50 caràcters"),
    description: Yup.string()
        .required("La descripció de la sèrie és obligatòria")
        .max(250, "La descripció de la sèrie no pot superar els 50 caràcters"),
});
const validation = ref({
  result: false,
  errors: {},
} as FormValidationResult);

const validate = () => {
  const formValidation = new FormValidation(schema);
  validation.value = formValidation.validate(props.purchaseInvoiceSerie);
};

const submitForm = async () => {
  validate();
  if (validation.value.result) {
    emit("submit", props.purchaseInvoiceSerie);
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