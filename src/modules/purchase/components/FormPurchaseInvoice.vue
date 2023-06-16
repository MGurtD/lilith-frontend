<template>
    <form v-if="purchaseInvoice">
        <section class="four-columns mb-2">
            <Dropdown
                v-model="purchaseInvoice.exerciseId"
                editable
                :options="exerciseStore.exercises"
                optionValue="nm"
                optionLabel="nm"
                class="w-full"
                :class="{
                    'p-invalid': validation.errors.exercise,
                }"
            />
            <Dropdown
                v-model="purchaseInvoice.purchaseInvoiceSerieId"
                editable
                :options="purchaseStore.purchaseInvoiceSeries"
                optionValue="nm"
                optionLabel="nm"
                class="w-full"
                :class="{
                    'p-invalid': validation.errors.purchaseinvoiceserie,
                }"
            />
        </section>
    </form>
</template>
<script setup lang="ts">
import { ref } from "vue";
import BaseInput from "../../../components/BaseInput.vue";
import { usePaymentMethodStore } from "../../../store/paymentMethod";
import { useExerciseStore } from "../../../store/exercise";
import { useSuppliersStore } from "../store/suppliers";
import { usePurchaseStore } from "../store/invoices";
import { PurchaseInvoice } from '../types';
import * as Yup from "yup";
import {
    FormValidation,
    FormValidationResult,
  } from "../../../utils/form-validator";
  import { useToast } from "primevue/usetoast";

const props = defineProps<{
    purchaseInvoice: PurchaseInvoice;
}>();

const emit = defineEmits<{
    (e: "submit", purchaseInvoice: PurchaseInvoice): void;
    (e: "cancel"): void;
}>();

const exerciseStore = useExerciseStore();
const purchaseStore = usePurchaseStore();
const supplierStore = useSuppliersStore();
const paymentMethodStore = usePaymentMethodStore();
const toast = useToast();


const validation = ref({
    result: false,
    errors: {},
  } as FormValidationResult);
  
  const schema = Yup.object().shape({

  });

  const validate = () => {
    const formValidation = new FormValidation(schema);
    validation.value = formValidation.validate(props.purchaseInvoice);
  };

</script>