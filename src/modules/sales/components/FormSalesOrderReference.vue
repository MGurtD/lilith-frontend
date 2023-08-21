<template>
    <form v-if="salesOrderDetail">
        <section class="two-columns">
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
                />
            </div>
            <div>
                <p id="description" />
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
import { computed, ref} from "vue";
import { SalesOrderDetail } from "../types";
import * as Yup from "yup";
import {
  FormValidation,
  FormValidationResult,
} from "../../../utils/form-validator";
import { useToast } from "primevue/usetoast";
import { useSalesOrderStore } from "../store/salesOrder";
import { BaseInputType, FormActionMode } from "../../../types/component";
import { ceil, isNumber, round } from "lodash";
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
const schema = Yup.object().shape({
  baseAmount: Yup.number()
    .required("L'import base és obligatori")
    .min(1, "L'import base ha de ser un número positiu"),
});
const validation = ref({
  result: false,
  errors: {},
} as FormValidationResult);

const validate = () => {
  const formValidation = new FormValidation(schema);
  validation.value = formValidation.validate(props.salesOrderDetail.referenceId);
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