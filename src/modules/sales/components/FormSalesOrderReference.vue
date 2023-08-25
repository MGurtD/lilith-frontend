<template>
  <form v-if="salesOrderDetail">
    <section class="four-columns">
      <div>
        <label class="block text-900 mb-2">Referència</label>
        <Dropdown
          v-model="salesOrderDetail.referenceId"
          editable
          :options="referenceStore.references"
          optionValue="id"
          optionLabel="description"
          class="w-full"
          :class="{
            'p-invalid': validation.errors.referenceId,
          }"
          @update:modelValue="getReferenceInfo()"
        />
      </div>
      <div>
        <BaseInput
          class="mb-2"
          label="Descripció"
          v-model="salesOrderDetail.description"
          :type="BaseInputType.TEXT"
          :class="{
            'p-invalid': validation.errors.description,
          }"
        ></BaseInput>
      </div>
      <div>
        <BaseInput
          class="mb-2"
          label="Quantitat"
          v-model="salesOrderDetail.quantity"
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
          v-model="salesOrderDetail.amount"
          :type="BaseInputType.NUMERIC"
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
import { computed, ref } from "vue";
import { SalesOrderDetail } from "../types";
import * as Yup from "yup";
import {
  FormValidation,
  FormValidationResult,
} from "../../../utils/form-validator";
import { useToast } from "primevue/usetoast";
import { useSalesOrderStore } from "../store/salesOrder";
import { BaseInputType, FormActionMode } from "../../../types/component";
import { ceil, isNumber, round, update } from "lodash";
import { useReferenceStore } from "../store/reference";

const salesOrder = useSalesOrderStore();
const referenceStore = useReferenceStore();
const toast = useToast();
const props = defineProps<{
  formAction: FormActionMode;
  salesOrderDetail: SalesOrderDetail;
}>();
const emit = defineEmits<{
  (e: "submit", salesOrderDetail: SalesOrderDetail): void;
}>();

const textActionButton = computed(() => {
  return props.formAction === FormActionMode.CREATE ? "Afegir" : "Modificar";
});

const getReferenceInfo = () => {
  const reference = referenceStore.references!.find(
    (r) => r.id === props.salesOrderDetail.referenceId
  );
  if (reference) {
    props.salesOrderDetail.description = reference?.description;
    props.salesOrderDetail.isInvoiced = false;
    props.salesOrderDetail.isServed = false;
    props.salesOrderDetail.unitCost = reference?.cost;
    props.salesOrderDetail.unitPrice = reference?.price;
    updateImports();
  }
};

const updateImports = () => {
  props.salesOrderDetail.amount =
    props.salesOrderDetail.unitPrice * props.salesOrderDetail.quantity;
  props.salesOrderDetail.totalCost =
    props.salesOrderDetail.unitCost * props.salesOrderDetail.quantity;
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
  validation.value = formValidation.validate(props.salesOrderDetail);
};

const submitForm = async () => {
  validate();
  if (validation.value.result) {
    emit("submit", props.salesOrderDetail);
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
