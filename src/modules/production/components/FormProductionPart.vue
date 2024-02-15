<template>
  <div>
    <Button
      label="Guardar"
      class="grid_add_row_button"
      size="small"
      @click="submitForm"
    />
    <br />
  </div>
  <form v-if="productionPart">
    <section class="three-columns">
      <div class="mt-1">
        <label class="block text-900 mb-2">Operari</label>
        <Dropdown
          v-model="productionPart.operatorId"
          editable
          :options="plantModelStore.operators"
          optionValue="id"
          optionLabel="name"
          class="w-full"
          :class="{
            'p-invalid': validation.errors.operatorid,
          }"
        />
      </div>
      <div class="mt-1">
        <label class="block text-900 mb-2">Màquina</label>
        <Dropdown
          v-model="productionPart.workCenterId"
          editable
          :options="plantModelStore.workcenters"
          optionValue="id"
          optionLabel="description"
          class="w-full"
          :class="{
            'p-invalid': validation.errors.workcenterid,
          }"
        />
      </div>
    </section>
    <section class="three-columns">
      <!--<div class="mt-1">
        <label class="block text-900 mb-2">Ordre Fabricació</label>
        <Dropdown
          v-model="workOrderStore.workorder?.id"
          editable
          :options="workOrderStore.workorders"
          optionValue="id"
          optionLabel="code"
          class="w-full"
          :class="{
            'p-invalid': validation.errors.workOrderPhaseDetailId,
          }"
        />
      </div>
      <div class="mt-1">
        <label class="block text-900 mb-2">Fase Ordre Fabricació</label>
        <Dropdown
          v-model="workOrderStore.workorderPhase?.id"
          editable
          :options="workOrderStore.workorderPhases"
          optionValue="id"
          optionLabel="workOrderPhaseId"
          class="w-full"
          :class="{
            'p-invalid': validation.errors.workOrderPhaseDetailId,
          }"
        />
      </div>-->
      <div class="mt-1">
        <label class="block text-900 mb-2">Pas Ordre Fabricació</label>
        <Dropdown
          v-model="productionPart.workOrderPhaseDetailId"
          editable
          :options="workOrderStore.workorderPhaseDetails"
          optionValue="id"
          optionLabel="workOrderPhaseId"
          class="w-full"
          :class="{
            'p-invalid': validation.errors.workOrderPhaseDetailId,
          }"
        />
      </div>
    </section>
    <section class="two-columns">
      <div class="mt-1">
        <BaseInput
          :type="BaseInputType.CURRENCY"
          label="Quantitat"
          id="quantity"
          v-model="productionPart.quantity"
        />
      </div>
      <div class="mt-1">
        <BaseInput
          :type="BaseInputType.CURRENCY"
          label="Temps"
          id="time"
          v-model="productionPart.time"
        />
      </div>
    </section>
  </form>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import {
  Operator,
  ProductionPart,
  WorkOrderPhaseDetail,
  Workcenter,
} from "../types";
import { useToast } from "primevue/usetoast";
import { BaseInputType } from "../../../types/component";
import { usePlantModelStore } from "../store/plantmodel";
import { useWorkOrderStore } from "../store/workorder";
import * as Yup from "yup";
import {
  FormValidation,
  FormValidationResult,
} from "../../../utils/form-validator";
import BaseInput from "../../../components/BaseInput.vue";

const props = defineProps<{
  productionPart: ProductionPart;
}>();
const emit = defineEmits<{
  (e: "submit", productionPart: ProductionPart): void;
  (e: "cancel"): void;
}>();

const toast = useToast();
const plantModelStore = usePlantModelStore();
const workOrderStore = useWorkOrderStore();

const schema = Yup.object().shape({
  operatorId: Yup.string().required("Escull un operari"),
  workcenterId: Yup.string().required("Escull una màquina"),
  workOrderPhaseDetailId: Yup.string().required("Escull un pas d'una fase"),
  quantity: Yup.number()
    .required("Has d'introduir una quantitat entera (pot ser 0)")
    .integer(),
  time: Yup.number()
    .required("Has d'introduir el temps i ha de ser major que 0")
    .moreThan(0),
});
const validation = ref({
  result: false,
  errors: {},
} as FormValidationResult);

const validate = () => {
  const formValidation = new FormValidation(schema);
  validation.value = formValidation.validate(props.productionPart);
};

const submitForm = async () => {
  validate();
  if (validation.value.result) {
    emit("submit", props.productionPart);
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
