<template>
  <form v-if="workorder">
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
        <BaseInput label="Codi" v-model="workorder.code" />
      </div>
      <div>
        <DropdownReference
          label="Referència"
          v-model="workorder.referenceId"
          :fullName="true"
          disabled
        ></DropdownReference>
      </div>
      <div>
        <BaseInput
          :type="BaseInputType.NUMERIC"
          label="Quantitat"
          v-model="workorder.plannedQuantity"
        />
      </div>
      <div>
        <label class="block text-900 mb-2">Desactivat</label>
        <Checkbox v-model="workorder.disabled" class="w-full" :binary="true" />
      </div>
    </section>
  </form>
</template>

<script setup lang="ts">
import DropdownReference from "../../shared/components/DropdownReference.vue";
import { ref } from "vue";
import { WorkOrder } from "../types";
import * as Yup from "yup";
import {
  FormValidation,
  FormValidationResult,
} from "../../../utils/form-validator";
import { useToast } from "primevue/usetoast";
import BaseInput from "../../../components/BaseInput.vue";
import { BaseInputType } from "../../../types/component";

const props = defineProps<{
  workorder: WorkOrder;
}>();

const emit = defineEmits<{
  (e: "submit", workorder: WorkOrder): void;
  (e: "cancel"): void;
}>();

const toast = useToast();

const schema = Yup.object().shape({
  baseQuantity: Yup.number()
    .min(1, "La quantitat ha de ser superior a 0")
    .required("La quanitat és obligatoria"),
  referenceId: Yup.string().required("La referència és obligatoria"),
});
const validation = ref({
  result: false,
  errors: {},
} as FormValidationResult);

const validate = () => {
  const formValidation = new FormValidation(schema);
  validation.value = formValidation.validate(props.workorder);
};

const submitForm = async () => {
  validate();
  if (validation.value.result) {
    emit("submit", props.workorder);
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
