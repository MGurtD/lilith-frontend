<template>
  <form v-if="detail">
    <section class="two-columns-7525">
      <div class="mb-2">
        <DropdownReference
          label="Referència"
          v-model="detail.referenceId"
          :customerId="header.customerId"
          :fullName="true"
          @update:modelValue="getReferenceInfo()"
        ></DropdownReference>
      </div>
      <div>
        <BaseInput
          class="mb-2"
          label="Preu"
          v-model="referencePrice"
          :type="BaseInputType.CURRENCY"
          disabled
        ></BaseInput>
      </div>
    </section>

    <section class="three-columns">
      <div class="mb-2">
        <DropdownWorkmasters
          label="Ruta de fabricació"
          v-model="detail.workMasterId"
          :referenceId="detail.referenceId"
          @update:modelValue="getWorkmasterCost()"
        ></DropdownWorkmasters>
      </div>
      <div>
        <BaseInput
          class="mb-2"
          label="Cost Unitari"
          v-model="detail.unitCost"
          :type="BaseInputType.CURRENCY"
          disabled
        ></BaseInput>
      </div>
      <div>
        <BaseInput
          class="mb-2"
          label="Cost Total"
          v-model="detail.totalCost"
          :type="BaseInputType.CURRENCY"
          disabled
        ></BaseInput>
      </div>
    </section>

    <section class="five-columns">
      <div>
        <BaseInput
          class="mb-2"
          label="Quantitat"
          v-model="detail.quantity"
          :type="BaseInputType.NUMERIC"
          :class="{
            'p-invalid': validation.errors.quantity,
          }"
          @update:modelValue="updateQuantity()"
        ></BaseInput>
      </div>
      <div>
        <BaseInput
          class="mb-2"
          label="% Benefici"
          v-model="detail.profit"
          :type="BaseInputType.NUMERIC"
          @update:modelValue="updateImports()"
          :class="{
            'p-invalid': validation.errors.profit,
          }"
        ></BaseInput>
      </div>
      <div>
        <BaseInput
          class="mb-2"
          label="% Descompte"
          v-model="detail.discount"
          :type="BaseInputType.NUMERIC"
          @update:modelValue="updateImports()"
          :class="{
            'p-invalid': validation.errors.discount,
          }"
        ></BaseInput>
      </div>
      <BaseInput
        class="mb-2"
        label="Preu Unitari"
        v-model="detail.unitPrice"
        :type="BaseInputType.CURRENCY"
        disabled
      ></BaseInput>
      <div>
        <BaseInput
          class="mb-2"
          label="Total"
          v-model="detail.amount"
          :type="BaseInputType.CURRENCY"
          :class="{
            'p-invalid': validation.errors.amount,
          }"
        ></BaseInput>
      </div>
    </section>

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
import {
  Budget,
  BudgetDetail,
  SalesOrderDetail,
  SalesOrderHeader,
} from "../types";
import * as Yup from "yup";
import {
  FormValidation,
  FormValidationResult,
} from "../../../utils/form-validator";
import { useToast } from "primevue/usetoast";
import { BaseInputType, FormActionMode } from "../../../types/component";
import { useReferenceStore } from "../../shared/store/reference";

import DropdownWorkmasters from "../../production/components/DropdownWorkmasters.vue";
import { useWorkMasterStore } from "../../production/store/workmaster";

const workmasterStore = useWorkMasterStore();
const referenceStore = useReferenceStore();
const toast = useToast();
const props = defineProps<{
  formAction: FormActionMode;
  header: Budget | SalesOrderHeader;
  detail: BudgetDetail | SalesOrderDetail;
}>();
const emit = defineEmits<{
  (e: "submit", detail: BudgetDetail | SalesOrderDetail): void;
}>();

const textActionButton = computed(() => {
  return props.formAction === FormActionMode.CREATE ? "Afegir" : "Modificar";
});

const referencePrice = ref(0);

const getReferenceInfo = () => {
  const reference = referenceStore.references!.find(
    (r) => r.id === props.detail.referenceId
  );
  if (reference) {
    props.detail.description = reference.description;
    referencePrice.value = reference.price;
    props.detail.unitPrice = reference.price;
    props.detail.workMasterId = null;
    props.detail.unitCost = reference.lastCost;
    updateImports();
  } else {
    referencePrice.value = 0;
    props.detail.description = "";
    props.detail.unitPrice = 0;
    props.detail.workMasterId = null;
    props.detail.unitCost = 0;
    props.detail.totalCost = 0;
    props.detail.amount = 0;
  }
};

const getWorkmasterCost = async () => {
  if (props.detail.workMasterId) {
    const costsResponse = await workmasterStore.calculate(
      props.detail.workMasterId,
      props.detail.quantity
    );
    props.detail.unitCost = costsResponse.content! / props.detail.quantity;
    props.detail.totalCost = costsResponse.content!;

    updateImports();
  } else {
    getReferenceInfo();
    props.detail.totalCost = 0;
  }
};

const updateQuantity = () => {
  if (!props.detail.quantity) {
    props.detail.quantity = 1;
  }

  if (props.detail.workMasterId) {
    getWorkmasterCost();
    props.detail.totalCost = props.detail.unitCost * props.detail.quantity;
  }

  updateImports();
};

const updateImports = () => {
  // apply profit
  if (props.detail.profit > 0) {
    props.detail.amount =
      props.detail.unitCost *
      props.detail.quantity *
      (1 + props.detail.profit / 100);
  } else {
    props.detail.amount = props.detail.unitCost * props.detail.quantity;
  }
  // apply discount
  if (props.detail.discount > 0) {
    props.detail.amount =
      props.detail.amount * (1 - props.detail.discount / 100);
  }

  // calculate unit price
  const reference = referenceStore.references!.find(
    (r) => r.id === props.detail.referenceId
  );
  if (props.detail.amount > 0 && props.detail.quantity > 0) {
    props.detail.unitPrice = props.detail.amount / props.detail.quantity;
  } else {
    props.detail.unitPrice = reference?.price || 0;
  }
};

const schema = Yup.object().shape({
  quantity: Yup.number()
    .required("La quantitat és obligatoria")
    .min(1, "La quantitat ha de ser un número positiu"),
  amount: Yup.number()
    .required("El total és obligatori")
    .min(1, "El total ha de ser un número positiu"),
  profit: Yup.number().required("El benefici és obligatori"),
  discount: Yup.number().required("El descompte és obligatori"),
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
