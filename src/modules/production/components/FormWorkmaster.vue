<template>
  <form v-if="workmaster">
    <div class="grid_add_row_button">
      <Button label="Calcular Cost" size="small" @click="calculateCost" />
      &nbsp;
      <Button label="Guardar" size="small" @click="submitForm" />
      <br />
    </div>
    <section class="three-columns">
      <div>
        <DropdownReference
          label="Referència"
          v-model="workmaster.referenceId"
          :fullName="true"
        ></DropdownReference>
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
    <section class="five-columns">
      <div>
        <BaseInput
          :type="BaseInputType.NUMERIC"
          label="Cost Operari"
          :decimals="2"
          v-model="workmaster.operatorCost"
          disabled
        />
      </div>
      <div>
        <BaseInput
          :type="BaseInputType.NUMERIC"
          label="Cost Màquina"
          :decimals="2"
          v-model="workmaster.machineCost"
          disabled
        />
      </div>
      <div>
        <BaseInput
          :type="BaseInputType.NUMERIC"
          label="Cost Material"
          :decimals="2"
          v-model="workmaster.materialCost"
          disabled
        />
      </div>
      <div>
        <BaseInput
          :type="BaseInputType.NUMERIC"
          label="Cost Extern"
          :decimals="2"
          v-model="workmaster.externalCost"
          disabled
        />
      </div>
      <div>
        <BaseInput
          :type="BaseInputType.NUMERIC"
          label="Cost Total"
          :decimals="2"
          v-model="totalCost"
          disabled
        />
      </div>
    </section>
  </form>
</template>

<script setup lang="ts">
import DropdownReference from "../../shared/components/DropdownReference.vue";
import { ref, computed } from "vue";
import { WorkMaster } from "../types";
import * as Yup from "yup";
import {
  FormValidation,
  FormValidationResult,
} from "../../../utils/form-validator";
import { useToast } from "primevue/usetoast";
import BaseInput from "../../../components/BaseInput.vue";
import { BaseInputType } from "../../../types/component";

const props = defineProps<{
  workmaster: WorkMaster;
}>();

const emit = defineEmits<{
  (e: "submit", workmaster: WorkMaster): void;
  (e: "calculateCost", workmaster: WorkMaster): void;
  (e: "cancel"): void;
}>();

const toast = useToast();

const totalCost = computed(() => {
  return (
    props.workmaster.operatorCost +
    props.workmaster.machineCost +
    props.workmaster.materialCost +
    props.workmaster.externalCost
  );
});

const schema = Yup.object().shape({
  baseQuantity: Yup.number()
    .min(1, "La quantitat base ha de ser superior a 0")
    .required("La quanitat base és obligatoria"),
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

const calculateCost = () => {
  validate();
  if (validation.value.result) {
    emit("calculateCost", props.workmaster);
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
