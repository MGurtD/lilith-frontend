<template>
  <form v-if="invoice">
    <header>
      <section class="four-columns">
        <div class="mt-2">
          <BaseInput
            v-model="invoice.invoiceNumber"
            label="Número"
            :disabled="true"
          />
        </div>
        <div class="mt-2">
          <label class="block text-900 mb-2">Data Factura</label>
          <Calendar v-model="invoice.invoiceDate" dateFormat="dd/mm/yy" />
        </div>
        <div class="mt-2">
          <label class="block text-900 mb-2">Estat</label>
          <Dropdown
            v-model="invoice.statusId"
            editable
            :options="lifecycleStore.lifecycle?.statuses"
            optionValue="id"
            optionLabel="name"
            class="w-full"
          />
        </div>
        <div class="mt-2">
          <label class="block text-900 mb-2">Métode Pagament</label>
          <Dropdown
            v-model="invoice.paymentMethodId"
            editable
            :options="sharedData.paymentMethods"
            optionValue="id"
            optionLabel="name"
            class="w-full"
          />
        </div>
      </section>
      <section class="three-columns">
        <div class="mt-1">
          <label class="block text-900 mb-2">Base</label>
          <span class="summary-field">{{ invoice.baseAmount }} €</span>
        </div>

        <div class="mt-1">
          <label class="block text-900 mb-2">Impostos</label>
          <span class="summary-field">{{ invoice.taxAmount }} €</span>
        </div>

        <div class="mt-1">
          <label class="block text-900 mb-2">Total</label>
          <span class="summary-field">{{ invoice.netAmount }} €</span>
        </div>
      </section>
    </header>
  </form>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { SalesInvoice } from "../types";
import * as Yup from "yup";
import {
  FormValidation,
  FormValidationResult,
} from "../../../utils/form-validator";
import { useToast } from "primevue/usetoast";
import { useSharedDataStore } from "../../shared/store/masterData";
import { useLifecyclesStore } from "../../shared/store/lifecycle";
import { pad, padStart } from "lodash";

const props = defineProps<{
  invoice: SalesInvoice;
}>();

const emit = defineEmits<{
  (e: "submit", invoice: SalesInvoice): void;
  (e: "cancel"): void;
}>();

const toast = useToast();
const sharedData = useSharedDataStore();
const lifecycleStore = useLifecyclesStore();

/* const invoiceNumber = computed(() => {
  const exercise = sharedData.exercises?.find(
    (t) => t.id === props.invoice.exerciseId
  );
  if (!exercise) return props.invoice.invoiceNumber;
  return `${exercise.name.substring(2, 4)}${padStart(
    props.invoice.invoiceNumber,
    3,
    "0"
  )}`;
}); */

const schema = Yup.object().shape({
  invoiceDate: Yup.string().required("La data és obligatoria"),
  paymentMethodId: Yup.string().required("El métode de pagament és obligatori"),
});
const validation = ref({
  result: false,
  errors: {},
} as FormValidationResult);

const validate = () => {
  const formValidation = new FormValidation(schema);
  validation.value = formValidation.validate(props.invoice);
};

const submitForm = async () => {
  validate();
  if (validation.value.result) {
    emit("submit", props.invoice);
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
