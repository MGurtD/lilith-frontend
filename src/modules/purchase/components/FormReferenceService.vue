<template>

    <section class="three-columns">
      <div class="mt-1">
        <BaseInput
          :type="BaseInputType.CURRENCY"
          label="Preu servei"
          v-model="reference.price"
        />
      </div>
      <div class="mt-1">
        <BaseInput
          :type="BaseInputType.CURRENCY"
          label="Preu transport"
          v-model="reference.transportAmount"
        />
      </div>
      <div>
        <label class="block text-900 mb-2">Desactivada</label>
        <Checkbox v-model="reference.disabled" :binary="true" />
      </div>
    </section>
</template>
<script setup lang="ts">
import { ref } from "vue";
import FormMaterial from "./FormMaterial.vue";
import BaseInput from "../../../components/BaseInput.vue";
import { Reference } from "../../shared/types";
import * as Yup from "yup";
import {
  FormValidation,
  FormValidationResult,
} from "../../../utils/form-validator";
import { useToast } from "primevue/usetoast";
import { BaseInputType } from "../../../types/component";

const props = defineProps<{
  reference: Reference;
}>();

const emit = defineEmits<{
  (e: "submit", reference: Reference): void;
  (e: "cancel"): void;
}>();

const toast = useToast();

const schema = Yup.object().shape({
  code: Yup.string()
    .required("El codi és obligatori")
    .max(50, "El codi no pot superar els 50 carácters"),
  description: Yup.string()
    .required("La descripció és obligatori")
    .max(250, "La descripció pot superar els 250 carácters"),
  price: Yup.number().required("El preu és obligatori"),
  transportAmount: Yup.number().required("El preu de transport és obligatori"),
});
</script>
