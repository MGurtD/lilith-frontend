<template>
  <form v-if="detail">
    <div class="mb-2">
      <DropdownReference
        label="Referència"
        v-model="detail.referenceId"
        :customerId="budget.customerId"
        :fullName="true"
        @update:modelValue="getReferenceInfo()"
      ></DropdownReference>
    </div>

    <section>
      <div>
        <BaseInput
          class="mb-2"
          label="Descripció"
          v-model="detail.description"
          :type="BaseInputType.TEXT"
          :class="{
            'p-invalid': validation.errors.description,
          }"
        ></BaseInput>
      </div>
    </section>
    <section class="two-columns">
      <div>
        <BaseInput
          class="mb-2"
          label="Quantitat"
          v-model="detail.quantity"
          :type="BaseInputType.NUMERIC"
          :class="{
            'p-invalid': validation.errors.quantity,
          }"
          @update:modelValue="updateImports()"
        ></BaseInput>
      </div>
      <div>
        <BaseInput
          class="mb-2"
          label="Total"
          v-model="detail.amount"
          :type="BaseInputType.CURRENCY"
          :class="{
            'p-invalid': validation.errors.amount,
          }"
          disabled
        ></BaseInput>
      </div>
    </section>
    <Button
      :label="textActionButton"
      @click="submitForm"
      style="float: right"
    />
  </form>
</template>
<script setup lang="ts">
import DropdownReference from "../../shared/components/DropdownReference.vue";
import { computed, ref } from "vue";
import { Budget, BudgetDetail } from "../types";
import * as Yup from "yup";
import {
  FormValidation,
  FormValidationResult,
} from "../../../utils/form-validator";
import { useToast } from "primevue/usetoast";
import { BaseInputType, FormActionMode } from "../../../types/component";
import { useReferenceStore } from "../../shared/store/reference";

const referenceStore = useReferenceStore();
const toast = useToast();
const props = defineProps<{
  formAction: FormActionMode;
  budget: Budget;
  detail: BudgetDetail;
}>();
const emit = defineEmits<{
  (e: "submit", detail: BudgetDetail): void;
}>();

const textActionButton = computed(() => {
  return props.formAction === FormActionMode.CREATE ? "Afegir" : "Modificar";
});

const getReferenceInfo = () => {
  const reference = referenceStore.references!.find(
    (r) => r.id === props.detail.referenceId
  );
  if (reference) {
    props.detail.description = reference.description;
    props.detail.unitCost = reference?.cost;
    props.detail.unitPrice = reference?.price;
    updateImports();
  }
};

const updateImports = () => {
  props.detail.amount = props.detail.unitPrice * props.detail.quantity;
  props.detail.totalCost = props.detail.unitCost * props.detail.quantity;
};
const schema = Yup.object().shape({
  quantity: Yup.number()
    .required("La quantitat és obligatoria")
    .min(1, "La quantitat ha de ser un número positiu"),
});
const validation = ref({
  result: false,
  errors: {},
} as FormValidationResult);

const validate = () => {
  const formValidation = new FormValidation(schema);
  validation.value = formValidation.validate(props.detail);
};

const submitForm = async () => {
  validate();
  if (validation.value.result) {
    emit("submit", props.detail);
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
