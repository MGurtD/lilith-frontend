<template>
  <div>
    <form v-if="salesOrder">
      <section class="four-columns">
        <div class="mt-1">
          <label class="block text-900 mb-2">Exercici</label>
          <Dropdown
            v-model="salesOrder.exerciseId"
            editable
            :options="exerciseStore.exercises"
            optionValue="id"
            optionLabel="name"
            class="w-full"
            :class="{
              'p-invalid': validation.errors.exerciseId,
            }"
          />
        </div>
        <div class="mt-1">
          <BaseInput
            :type="BaseInputType.TEXT"
            label="Num. Comanda"
            id="salesOrderNumber"
            v-model="salesOrder.salesOrderNumber"
            disabled
          />
        </div>
        <div class="mt-1">
          <label class="block text-900 mb-2">Data Comanda</label>
          <Calendar v-model="salesOrder.salesOrderDate" dateFormat="dd/mm/yy" />
        </div>
        <div class="mt-1">
          <label class="block text-900 mb-2">Estat</label>
          <Dropdown
            v-model="salesOrder.statusId"
            editable
            :options="lifeCycleStore.lifecycle?.statuses"
            optionValue="id"
            optionLabel="name"
            class="w-full"
            :class="{
              'p-invalid': validation.errors.statusId,
            }"
          />
        </div>
      </section>
      <section class="three-columns">
        <div class="mt-1">
          <label class="block text-900 mb-2">Origen</label>
          <Dropdown
            v-model="salesOrder.siteId"
            editable
            :options="plantModelStore.sites"
            optionValue="id"
            optionLabel="name"
            class="w-full"
            :class="{
              'p-invalid': validation.errors.siteId,
            }"
            @update:modelValue="updateSite()"
          />
        </div>
        <div class="mt-1">
          <label class="block text-900 mb-2">Client</label>
          <Dropdown
            v-model="salesOrder.customerId"
            editable
            :options="customerStore.customers"
            optionValue="id"
            optionLabel="comercialName"
            class="w-full"
            :class="{
              'p-invalid': validation.errors.customerId,
            }"
            @update:modelValue="updateCustomer()"
          />
        </div>
        <div class="mt-1">
          <BaseInput
            :type="BaseInputType.TEXT"
            label="Comanda Client"
            id="customerSalesOrderNumber"
            v-model="salesOrder.customerSalesOrderNumber"
          />
        </div>
      </section>
    </form>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import BaseInput from "../../../components/BaseInput.vue";
import { useSalesOrderStore } from "../store/salesOrder";
import { useCustomersStore } from "../store/customers";
import { useExerciseStore } from "../../shared/store/exercise";
import { usePlantModelStore } from "../../production/store/plantmodel";
import { useLifecyclesStore } from "../../shared/store/lifecycle";
import { useReferenceStore } from "../../shared/store/reference";
import { SalesOrderHeader } from "../types";
import * as Yup from "yup";
import {
  FormValidation,
  FormValidationResult,
} from "../../../utils/form-validator";
import { useToast } from "primevue/usetoast";
import { storeToRefs } from "pinia";
import { BaseInputType } from "../../../types/component";
import { convertDateTimeToJSON } from "../../../utils/functions";

const emit = defineEmits<{
  (e: "submit", salesOrder: SalesOrderHeader): void;
  (e: "cancel"): void;
}>();

const salesOrderStore = useSalesOrderStore();
const customerStore = useCustomersStore();
const plantModelStore = usePlantModelStore();
const exerciseStore = useExerciseStore();
const lifeCycleStore = useLifecyclesStore();
const referenceStore = useReferenceStore();
const toast = useToast();

const { salesOrder } = storeToRefs(salesOrderStore);

const schema = Yup.object().shape({
  siteId: Yup.string().required("L'origen es obligatori"),
  customerId: Yup.string().required("El client es obligatori"),
  statusId: Yup.string().required("L'estat es obligatori"),
  exerciseId: Yup.string().required("L'exercici es obligatori"),
});
const validation = ref({
  result: false,
  errors: {},
} as FormValidationResult);

const validate = () => {
  const formValidation = new FormValidation(schema);
  validation.value = formValidation.validate(salesOrder.value);
};

const submitForm = async () => {
  validate();
  if (validation.value.result) {
    salesOrder.value!.salesOrderDate = convertDateTimeToJSON(
      salesOrder.value!.salesOrderDate
    );
    emit("submit", salesOrder.value!);
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

defineExpose({
  submitForm,
});

const updateCustomer = () => {
  const customer = customerStore.customers?.find(
    (c) => c.id === salesOrder.value?.customerId
  );
  if (customer && salesOrder.value) {
    salesOrder.value.customerCode = customer.code;
    salesOrder.value.customerComercialName = customer.comercialName;
    salesOrder.value.customerTaxName = customer.taxName;
    salesOrder.value.customerVatNumber = customer.vatNumber;
    salesOrder.value.customerAccountNumber = customer.accountNumber;
  }
  console.log(salesOrder.value);
};

const updateSite = () => {
  const site = plantModelStore.sites?.find(
    (s) => s.id === salesOrder.value?.siteId
  );
  if (site && salesOrder.value) {
    salesOrder.value.name = site.name;
    salesOrder.value.address = site.address;
    salesOrder.value.city = site.city;
    salesOrder.value.postalCode = site.postalCode;
    salesOrder.value.region = site.region;
    salesOrder.value.country = site.country;
    salesOrder.value.vatNumber = site.vatNumber;
  }
};
</script>
<style scoped>
.save_button {
  position: absolute;
  top: 0;
  right: 1rem;
}

.summary-field {
  font-weight: bold;
  border-bottom: 1px solid black;
}
</style>
