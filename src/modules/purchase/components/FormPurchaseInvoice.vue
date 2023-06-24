<template>
    <form v-if="purchaseInvoice">
        <section class="four-columns">
            <div>
                <label class="block text-900 mb-2">Exercici</label>
                <Dropdown
                    v-model="purchaseInvoice.exerciseId"
                    editable
                    :options="exerciseStore.exercises"
                    optionValue="id"
                    optionLabel="name"
                    class="w-full"
                    :class="{
                        'p-invalid': validation.errors.exercise,
                    }"
                />
              </div>                
              <div>
                <label class="block text-900 mb-1">Sèrie</label>
                <Dropdown
                v-model="purchaseInvoice.purchaseInvoiceSerieId"
                editable
                :options="purchaseStore.purchaseInvoiceSeries"
                optionValue="id"
                optionLabel="name"
                class="w-full"
                :class="{
                    'p-invalid': validation.errors.purchaseinvoiceserie,
                }"
            />    
            </div>        
            <BaseInput label="Num. Fra. Intern" id="number" v-model="purchaseInvoice.number" disabled />
            <div>
              <label class="block text-900 mb-1">Estat</label>
              <Dropdown
                v-model="purchaseInvoice.purchaseInvoiceStatusId"
                editable
                :options="purchaseStore.purchaseInvoiceStatuses"
                optionValue="id"
                optionLabel="name"
                class="w-full"
                :class="{
                    'p-invalid': validation.errors.purchaseinvoicestatus,
                }"
            />   
            </div>
              </section>

              <section class="three-columns">
        <div>
          <label class="block text-900 mb-1">Proveïdor</label>
                <Dropdown
                v-model="purchaseInvoice.supplierId"
                editable
                :options="supplierStore.suppliers"
                optionValue="id"
                optionLabel="comercialName"
                class="w-full"
                :class="{
                    'p-invalid': validation.errors.supplierId,
                }"
                @change="showValues"
            />
            </div>
            <BaseInput label="Num. Fra. Proveïdor" id="supplierNumber" v-model="purchaseInvoice.supplierNumber"  />
            <div>
              <label class="block text-900 mb-2">Comptabilitzada</label>
              
            </div>
        </section>
        <section class="four-columns">
          <BaseInput label="Base" id="grossAmount" v-model="purchaseInvoice.grossAmount"  />
          <BaseInput label="Ports" id="transportAmount" v-model="purchaseInvoice.transportAmount"  />
          <div>
          <label class="block text-900 mb-1">IVA</label>
                
            </div>
          <BaseInput label="Dto." id="discountPercentage" v-model="purchaseInvoice.discountPercentage"  />
        </section>
        <div class="mt-2">
        <Button label="Guardar" class="mr-2" @click="submitForm" />
        </div>
    </form>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
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
import { storeToRefs } from "pinia";

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
const { purchaseInvoice } = storeToRefs(purchaseStore);
const toast = useToast();

onMounted(async () => {
    await exerciseStore.fetchAll();
    await paymentMethodStore.fetchAll();
    await supplierStore.fetchSuppliers();
    await purchaseStore.fetchPurchaseInvoiceSeries();
    await purchaseStore.fetchPurchaseInvoiceStatuses();
});

const validation = ref({
    result: false,
    errors: {},
  } as FormValidationResult);
  
  const schema = Yup.object().shape({
    //exercise: Yup.string()
     //       .required("L'exercici es obligatori"),
    supplierId: Yup.string()
            .required("El proveïdor es obligatori"),

  });

  const validate = () => {
    const formValidation = new FormValidation(schema);
    validation.value = formValidation.validate(props.purchaseInvoice);
  };

const submitForm = async () => {
  validate();
  if (validation.value.result) {
    emit("submit", purchaseInvoice.value as PurchaseInvoice);
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
const showValues = async () => {
  console.log(purchaseInvoice)
}
</script>