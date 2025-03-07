<template>
  <div>
    <form v-if="budget">
      <section class="four-columns mt-2">
        <div>
          <BaseInput
            :type="BaseInputType.TEXT"
            label="Pressupost"
            id="number"
            v-model="budget.number"
            disabled
          />
        </div>
        <div>
          <label class="block text-900 mb-2">Data Alta</label>
          <Calendar v-model="budget.date" dateFormat="dd/mm/yy" />
        </div>
        <div>
          <label class="block text-900 mb-2">Data Acceptació</label>
          <Calendar v-model="budget.acceptanceDate" dateFormat="dd/mm/yy" />
        </div>
        <div>
          <BaseInput
            :type="BaseInputType.TEXT"
            :disabled="true"
            label="Comanda"
            :value="budgetStore.order?.number"
          />
        </div>
      </section>
      <section class="three-columns mt-2">
        <div>
          <label class="block text-900 mb-2">Estat</label>
          <Dropdown
            v-model="budget.statusId"
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
        <div>
          <label class="block text-900 mb-2">Client</label>
          <Dropdown
            v-model="budget.customerId"
            editable
            :options="customerStore.customers"
            optionValue="id"
            optionLabel="comercialName"
            class="w-full"
            :class="{
              'p-invalid': validation.errors.customerId,
            }"
          />
        </div>
        <div>
          <BaseInput
            :type="BaseInputType.NUMERIC"
            label="Dies entrega"
            id="deliveryDays"
            v-model="budget.deliveryDays"
          />
        </div>
      </section>
      <section v-if="budget.notes && budget.notes.length > 0" class="mt-2">
        <div>
          <BaseInput
            :type="BaseInputType.TEXT"
            label="Notes"
            id="notes"
            v-model="budget.notes"
            disabled
          />
        </div>
      </section>
    </form>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import * as Yup from "yup";
import {
  FormValidation,
  FormValidationResult,
} from "../../../utils/form-validator";
import { useToast } from "primevue/usetoast";
import { useLifecyclesStore } from "../../shared/store/lifecycle";
import { useCustomersStore } from "../store/customers";
import { Budget } from "../types";
import { BaseInputType } from "../../../types/component";
import { convertDateTimeToJSON } from "../../../utils/functions";
import { useBudgetStore } from "../store/budget";

const emit = defineEmits<{
  (e: "submit", budget: Budget): void;
  (e: "cancel"): void;
}>();

const budgetStore = useBudgetStore();
const customerStore = useCustomersStore();
const lifeCycleStore = useLifecyclesStore();
const toast = useToast();

const { budget } = storeToRefs(budgetStore);

const schema = Yup.object().shape({
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
  validation.value = formValidation.validate(budget.value);
};

const submitForm = async () => {
  validate();
  if (validation.value.result) {
    parseEntityDates();
    emit("submit", budget.value!);
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

const parseEntityDates = () => {
  if (!budget.value) return;

  budget.value.date = convertDateTimeToJSON(budget.value.date);
  if (budget.value.acceptanceDate) {
    budget.value.acceptanceDate = convertDateTimeToJSON(
      budget.value.acceptanceDate
    );
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
