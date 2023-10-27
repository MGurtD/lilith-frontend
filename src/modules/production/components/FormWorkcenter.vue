<template>
  <form v-if="workcenter">
    <section class="two-columns">
      <BaseInput
        class="mb-2"
        label="Nom"
        id="name"
        v-model="workcenter.name"
        :class="{
          'p-invalid': validation.errors.name,
        }"
      ></BaseInput>
      <BaseInput
        class="mb-2"
        label="Descripció"
        id="description"
        v-model="workcenter.description"
        :class="{
          'p-invalid': validation.errors.description,
        }"
      ></BaseInput>
    </section>
    <section class="three-columns">
      <div>
        <label class="block text-900 mb-2">Tipus</label>
        <Dropdown
          v-model="workcenter.workcenterTypeId"
          editable
          :options="plantModelStore.workcenterTypes"
          optionValue="id"
          optionLabel="name"
          class="w-full"
          :class="{
            'p-invalid': validation.errors.workcenterTypeId,
          }"
        />
      </div>
      <div>
        <label class="block text-900 mb-2">Area</label>
        <Dropdown
          v-model="workcenter.areaId"
          editable
          :options="plantModelStore.areas"
          optionValue="id"
          optionLabel="name"
          class="w-full"
          :class="{
            'p-invalid': validation.errors.areaId,
          }"
        />
      </div>
      <div>
        <label class="block text-900 mb-2">Desactivat</label>
        <Checkbox v-model="workcenter.disabled" class="w-full" :binary="true" />
      </div>
    </section>

    <div class="mt-2">
      <Button label="Guardar" class="mr-2" @click="submitForm" />
    </div>
  </form>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import BaseInput from "../../../components/BaseInput.vue";
import { Workcenter } from "../types";
import * as Yup from "yup";
import {
  FormValidation,
  FormValidationResult,
} from "../../../utils/form-validator";
import { useToast } from "primevue/usetoast";
import { storeToRefs } from "pinia";
import { usePlantModelStore } from "../store/plantmodel";

const props = defineProps<{
  workcenter: Workcenter;
}>();

const emit = defineEmits<{
  (e: "submit", workcenter: Workcenter): void;
  (e: "cancel"): void;
}>();

const toast = useToast();
const plantModelStore = usePlantModelStore();
const { workcenter } = storeToRefs(plantModelStore);

const schema = Yup.object().shape({
  name: Yup.string()
    .required("El nom és obligatori")
    .max(250, "El nom no pot superar els 250 carácters"),
  description: Yup.string()
    .required("La descripció és obligatori")
    .max(250, "La descripció pot superar els 250 carácters"),
  workcenterTypeId: Yup.string().required("El tipus es obligatori"),
  areaId: Yup.string().required("L'area es obligatoria"),
});
const validation = ref({
  result: false,
  errors: {},
} as FormValidationResult);

const validate = () => {
  const formValidation = new FormValidation(schema);
  validation.value = formValidation.validate(props.workcenter);
};

const submitForm = async () => {
  validate();
  if (validation.value.result) {
    emit("submit", props.workcenter);
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
