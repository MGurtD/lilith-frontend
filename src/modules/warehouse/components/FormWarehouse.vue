<template>
  <form v-if="warehouse">
    <section class="two-columns">
      <BaseInput
        class="mb-2"
        label="Nom"
        id="name"
        v-model="warehouse.name"
        :class="{
          'p-invalid': validation.errors.name,
        }"
      ></BaseInput>
      <BaseInput
        class="mb-2"
        label="Descripció"
        id="description"
        v-model="warehouse.description"
        :class="{
          'p-invalid': validation.errors.description,
        }"
      ></BaseInput>
    </section>
    <section class="two-columns">
      <div>
        <label class="block text-900 mb-2">Local</label>
        <Dropdown
          v-model="warehouse.siteId"
          editable
          :options="plantmodelStore.sites"
          optionValue="id"
          optionLabel="name"
          class="w-full"
          :class="{
            'p-invalid': validation.errors.siteId,
          }"
        />
      </div>
      <div>
        <label class="block text-900 mb-2">Desactivat</label>
        <Checkbox v-model="warehouse.disabled" class="w-full" :binary="true" />
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
import { Warehouse } from "../types";
import * as Yup from "yup";
import {
  FormValidation,
  FormValidationResult,
} from "../../../utils/form-validator";
import { useToast } from "primevue/usetoast";
import { storeToRefs } from "pinia";
import { useWarehouseStore } from "../store/warehouse";
import { usePlantModelStore } from "../../production/store/plantmodel";

const toast = useToast();
const warehouseStore = useWarehouseStore();
const plantmodelStore = usePlantModelStore();
const { warehouse } = storeToRefs(warehouseStore);

const props = defineProps<{
  warehouse: Warehouse;
}>();

onMounted(async () => {
  await plantmodelStore.fetchSites();
});

const emit = defineEmits<{
  (e: "submit", warehouse: Warehouse): void;
  (e: "cancel"): void;
}>();

const schema = Yup.object().shape({
  name: Yup.string()
    .required("El nom és obligatori")
    .max(250, "El nom no pot superar els 250 carácters"),
  description: Yup.string()
    .required("La descripció és obligatori")
    .max(250, "La descripció pot superar els 250 carácters"),
  siteId: Yup.string().required("El local es obligatori"),
});
const validation = ref({
  result: false,
  errors: {},
} as FormValidationResult);

const validate = () => {
  const formValidation = new FormValidation(schema);
  validation.value = formValidation.validate(props.warehouse);
};

const submitForm = async () => {
  validate();
  if (validation.value.result) {
    emit("submit", props.warehouse);
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
