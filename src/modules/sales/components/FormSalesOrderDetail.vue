<template>
  <form v-if="salesOrderDetail">
    <div class="mb-2">
      <label class="block text-900 mb-2">Referència</label>
      <Dropdown
        v-model="salesOrderDetail.referenceId"
        editable
        :options="referenceStore.references"
        optionValue="id"
        optionLabel="code"
        class="w-full"
        :class="{
          'p-invalid': validation.errors.referenceId,
        }"
        @update:modelValue="getReferenceInfo()"
      >
        <template #value="slotProps">
          <div v-if="slotProps.value" class="flex align-items-center">
            {{ slotProps.value.code }} ({{ slotProps.value.version }}) -
            {{ slotProps.value.description }}
          </div>
        </template>
        <template #option="slotProps">
          <div v-if="slotProps.option" class="flex align-items-center">
            {{ slotProps.option.code }} ({{ slotProps.option.version }}) -
            {{ slotProps.option.description }}
          </div>
        </template>
      </Dropdown>
    </div>

    <section>
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
    </section>
    <section class="two-columns">
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
import { computed, ref } from "vue";
import { SalesOrderDetail } from "../types";
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
    props.salesOrderDetail.description = reference.description;
    props.salesOrderDetail.isInvoiced = false;
    props.salesOrderDetail.isDelivered = false;
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
