<template>
  <form v-if="workmaster">
    <div>
      <Button
        label="Guardar Ruta"
        class="grid_add_row_button"
        size="small"
        @click="submitForm"
      />
      <br />
    </div>
    <section class="three-columns">
      <div>
        <label class="block text-900 mb-2">Referència</label>
        <Dropdown
          v-model="workmaster.referenceId"
          editable
          :options="referenceStore.references"
          optionValue="id"
          optionLabel="description"
          class="w-full"
          :class="{
            'p-invalid': validation.errors.referenceId,
          }"
        >
          <template #option="slotProps">
            <div v-if="slotProps.option" class="flex align-items-center">
              {{ referenceStore.getFullName(slotProps.option) }}
            </div>
          </template>
        </Dropdown>
      </div>
      <div>
        <BaseInput
          :type="BaseInputType.NUMERIC"
          label="Quantitat Base"
          :decimals="2"
          v-model="workmaster.baseQuantity"
        />
      </div>
      <div>
        <label class="block text-900 mb-2">Desactivat</label>
        <Checkbox v-model="workmaster.disabled" class="w-full" :binary="true" />
      </div>
    </section>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { WorkMaster } from "../types";
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
  workmaster: WorkMaster;
}>();

const emit = defineEmits<{
  (e: "submit", workmaster: WorkMaster): void;
  (e: "cancel"): void;
}>();

const toast = useToast();
const referenceStore = useReferenceStore();

const schema = Yup.object().shape({
  baseQuantity: Yup.number()
    .min(1)
    .required("La quantitat base ha de ser superior a 1"),
  referenceId: Yup.string().required("La referència és obligatoria"),
});
const validation = ref({
  result: false,
  errors: {},
} as FormValidationResult);

const validate = () => {
  const formValidation = new FormValidation(schema);
  validation.value = formValidation.validate(props.workmaster);
};

const submitForm = async () => {
  validate();
  if (validation.value.result) {
    emit("submit", props.workmaster);
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
