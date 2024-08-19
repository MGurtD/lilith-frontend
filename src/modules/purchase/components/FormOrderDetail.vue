<template>
  <form v-if="detail">
    <section class="three-columns">
      <div>
        <DropdownReference
          label="Material"
          v-model="detail.referenceId"
          :fullName="true"
        ></DropdownReference>
      </div>
      <div>
        <DropdownLifecycle label="Estat" v-model="detail.statusId" />
      </div>
      <div>
        <label class="block text-900 mb-2">Data prevista</label>
        <Calendar
          label="Data prevista"
          v-model="detail.expectedReceiptDate"
          dateFormat="dd/mm/yy"
        />
      </div>
    </section>

    <section class="three-columns mt-2">
      <div>
        <BaseInput
          :type="BaseInputType.NUMERIC"
          label="Quantitat"
          v-model="detail.quantity"
        />
      </div>
      <div>
        <BaseInput
          :type="BaseInputType.NUMERIC"
          label="Quantitat rebuda"
          v-model="detail.receivedQuantity"
        />
      </div>
      <div>
        <BaseInput
          :type="BaseInputType.CURRENCY"
          label="Preu"
          v-model="detail.amount"
        />
      </div>
    </section>

    <Button
      label="Crear"
      @click="submitForm"
      style="float: right"
      :size="'small'"
      class="mt-2"
    />
  </form>
</template>

<script setup lang="ts">
import DropdownReference from "../../shared/components/DropdownReference.vue";
import DropdownLifecycle from "../../shared/components/DropdownLifecycle.vue";
import { ref } from "vue";
import { PurchaseOrderDetail } from "../types";
import * as Yup from "yup";
import {
  FormValidation,
  FormValidationResult,
} from "../../../utils/form-validator";
import { useToast } from "primevue/usetoast";
import BaseInput from "../../../components/BaseInput.vue";
import { BaseInputType } from "../../../types/component";

const props = defineProps<{
  detail: PurchaseOrderDetail;
}>();

const emit = defineEmits<{
  (e: "submit", detail: PurchaseOrderDetail): void;
  (e: "cancel"): void;
}>();

const toast = useToast();

const schema = Yup.object().shape({
  quantity: Yup.number().min(1).required("La quantitat ha de ser superior a 1"),
  referenceId: Yup.string().required("La referencia és obligatoria"),
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
