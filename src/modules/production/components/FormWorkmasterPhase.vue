<template>
  <form v-if="phase">
    <div>
      <Button
        label="Guardar Fase"
        class="grid_add_row_button"
        size="small"
        @click="submitForm"
      />
      <br />
    </div>
    <section class="three-columns">
      <div>
        <BaseInput label="Codi de la fase" v-model="phase.phaseCode" />
      </div>
      <div>
        <BaseInput label="Descripció" v-model="phase.phaseDescription" />
      </div>
    </section>
  </form>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { WorkMaster, WorkMasterPhase } from "../types";
import * as Yup from "yup";
import {
  FormValidation,
  FormValidationResult,
} from "../../../utils/form-validator";
import { useToast } from "primevue/usetoast";
import BaseInput from "../../../components/BaseInput.vue";

const props = defineProps<{
  workmaster: WorkMaster;
  phase: WorkMasterPhase;
}>();

const emit = defineEmits<{
  (e: "submit", phase: WorkMasterPhase): void;
  (e: "cancel"): void;
}>();

const toast = useToast();
const schema = Yup.object().shape({
  phaseCode: Yup.string().required("El codi és obligatori"),
});
const validation = ref({
  result: false,
  errors: {},
} as FormValidationResult);

const validate = () => {
  const formValidation = new FormValidation(schema);
  validation.value = formValidation.validate(props.phase);
};

const submitForm = async () => {
  validate();
  if (validation.value.result) {
    emit("submit", props.phase);
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
