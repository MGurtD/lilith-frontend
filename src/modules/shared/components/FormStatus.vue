<template>
  <form>
    <section class="three-columns">
      <BaseInput
        class="mb-2"
        label="Nom"
        v-model="status.name"
        :class="{
          'p-invalid': validation.errors.baseAmount,
        }"
      ></BaseInput>
      <div class="mb-4">
        <label class="block text-900 mb-2">Color</label>
        <Dropdown
          v-model="status.color"
          editable
          :options="colors"
          optionValue="id"
          optionLabel="value"
          class="w-full"
          :class="{
            'p-invalid': validation.errors.statusId,
          }"
        />
      </div>
      <div class="mb-4">
        <label class="block text-900 mb-2">Deshabilitat</label>
        <Checkbox v-model="status.disabled" :binary="true" />
      </div>
    </section>

    <Button label="Confirmar" @click="submitForm" style="float: right" />
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Status } from "../types";
import * as Yup from "yup";
import {
  FormValidation,
  FormValidationResult,
} from "../../../utils/form-validator";
import { useToast } from "primevue/usetoast";
import { FormActionMode } from "../../../types/component";

const toast = useToast();

const props = defineProps<{
  formAction: FormActionMode;
  status: Status;
}>();
const emit = defineEmits<{
  (e: "submit", status: Status): void;
}>();

const schema = Yup.object().shape({
  name: Yup.string().required("El nom és obligatori"),
});
const validation = ref({
  result: false,
  errors: {},
} as FormValidationResult);

const validate = () => {
  const formValidation = new FormValidation(schema);
  validation.value = formValidation.validate(props.status);
};

const submitForm = async () => {
  validate();
  if (validation.value.result) {
    emit("submit", props.status);
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

type Color = {
  id: string;
  value: string;
};

const colors: Color[] = [
  { id: "", value: "Cap" },
  { id: "info", value: "Blau" },
  { id: "secondary", value: "Gris" },
  { id: "help", value: "Lila" },
  { id: "contrast", value: "Negre" },
  { id: "warn", value: "Taronja" },
  { id: "success", value: "Verd" },
  { id: "danger", value: "Vermell" },
];
</script>
