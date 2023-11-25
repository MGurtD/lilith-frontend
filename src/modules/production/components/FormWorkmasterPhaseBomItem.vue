<template>
  <form v-if="bomItem">
    <section class="two-columns">
      <div>
        <label class="block text-900 mb-2">Material de consum</label>
        <Dropdown
          v-model="bomItem.referenceId"
          showClear
          editable
          :options="referenceStore.references"
          optionValue="id"
          optionLabel="code"
          class="w-full"
          :class="{
            'p-invalid': validation.errors.referenceId,
          }"
        />
      </div>
      <div>
        <BaseInput
          :type="BaseInputType.NUMERIC"
          label="Quantitat a consumir"
          v-model="bomItem.quantity"
          :class="{
            'p-invalid': validation.errors.quantity,
          }"
        />
      </div>
    </section>
    <section class="two-columns mt-2">
      <div>
        <label class="block text-900 mb-2">Material de rebuig</label>
        <Dropdown
          v-model="bomItem.wasteReferenceId"
          showClear
          editable
          :options="referenceStore.references"
          optionValue="id"
          optionLabel="code"
          class="w-full"
        />
      </div>
      <div>
        <BaseInput
          :type="BaseInputType.NUMERIC"
          label="Quantitat de rebuig"
          v-model="bomItem.waste"
          :class="{
            'p-invalid': validation.errors.waste,
          }"
        />
      </div>
    </section>

    <br />
    <div>
      <Button
        label="Guardar material"
        style="float: right"
        size="small"
        @click="submitForm"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { WorkMasterPhaseBillOfMaterials } from "../types";
import * as Yup from "yup";
import {
  FormValidation,
  FormValidationResult,
} from "../../../utils/form-validator";
import { useToast } from "primevue/usetoast";
import BaseInput from "../../../components/BaseInput.vue";
import { BaseInputType } from "../../../types/component";
import { useReferenceStore } from "../../shared/store/reference";

const props = defineProps<{
  bomItem: WorkMasterPhaseBillOfMaterials;
}>();

const emit = defineEmits<{
  (e: "submit", phase: WorkMasterPhaseBillOfMaterials): void;
  (e: "cancel"): void;
}>();

const referenceStore = useReferenceStore();

const toast = useToast();
const schema = Yup.object().shape({
  referenceId: Yup.string().required("El material de consum és obligatori"),
  quantity: Yup.number()
    .min(1, "La quantitat a consumir ha de ser positiva")
    .required("La quantitat a consumir és obligatoria"),
});
const validation = ref({
  result: false,
  errors: {},
} as FormValidationResult);

const validate = () => {
  const formValidation = new FormValidation(schema);
  validation.value = formValidation.validate(props.bomItem);
};

const submitForm = async () => {
  validate();
  if (validation.value.result) {
    emit("submit", props.bomItem);
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
