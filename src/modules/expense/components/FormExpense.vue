<template>    
        <form v-if="expense">
          <section class="four-columns">
           <div>
              <label class="block text-900 mb-2">Tipus:</label>
              <Dropdown
                v-model="expense.expenseTypeId"
                editable
                :options="expenseStore.expenseTypes"
                optionValue="id"
                optionLabel="name"
                class="w-full"
                :class="{
                  'p-invalid': validation.errors.expenseTypeId,
                }"
              />
            </div>
            <div class="mt-2">
                <label class="block text-900 mb-2">Data Alta: </label>
                <Calendar
                id="creationDate"
                v-model="expense.creationDate"
                :class="{
                'p-invalid': validation.errors.creationDate,
                }"
                />
            </div>
            <div class="mt-2">
                <label class="block text-900 mb-2">Data Pagament: </label>
                <Calendar
                id="paymentDate"
                v-model="expense.paymentDate"
                :class="{
                'p-invalid': validation.errors.paymentDate,
                }"
                />
            </div>
            <div class="mt-2">
            <BaseInput
              label="Import"
              id="amount"
              v-model="expense.amount"
              :class="{
                'p-invalid': validation.errors.amount,
                }"
            />
          </div>
        </section>
        <section class="four-columns">
            <div>
              <label class="block text-900 mb-2">Recurrent</label>
              <Checkbox
                v-model="expense.recurring"
                class="w-full"
                :binary="true"
              />
            </div>
            <div>
              <label class="block text-900 mb-2">Freqüència: </label>
              <Dropdown
                v-model="expense.frecuency"
                editable
                :options="frecuencies"
                optionValue="id"
                optionLabel="name"
                class="w-full"
                :class="{
                  'p-invalid': validation.errors.expenseTypeId,
                }"
              />
            </div>
            <div class="mt-2">
            <BaseInput
              label="Dia de pagament"
              id="paymentDay"
              v-model="expense.paymentDay"
            />
          </div>
          <div class="mt-2">
                <label class="block text-900 mb-2">Data fi: </label>
                <Calendar
                id="endDate"
                v-model="expense.endDate"
                />
            </div>
        </section>
        <section class="one-column">
            <Textarea
            id="description"
            v-model="expense.description"
            >

            </Textarea>
        </section>
        <div class="mt-2">
        <Button label="Guardar" class="mr-2" @click="submitForm" />
        </div>
    </form>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import BaseInput from "../../../components/BaseInput.vue";
import { useExpenseStore } from "../store/expense";
import { Expense, ExpenseType} from "../types";
import * as Yup from "yup";
import {
  FormValidation,
  FormValidationResult,
} from "../../../utils/form-validator";
import { useToast } from "primevue/usetoast";
import { storeToRefs } from "pinia";


const props = defineProps<{
    expense: Expense;
}>();

const emit = defineEmits<{
    (e: "submit", expense: Expense): void;
  (e: "cancel"): void;
}>();

const expenseStore = useExpenseStore();
const { expense } = storeToRefs(expenseStore);
const toast = useToast();

const schema = Yup.object().shape({
    expenseTypeId: Yup.string().required("El tipus de despesa es obligatori"),
    creationDate: Yup.string().required("La data de creació es obligatoria"),
    paymentDate: Yup.string().required("La data de pagament es obligatoria"),
    amount: Yup.string().required("L'import es obligatori"),
});

const frecuencies = ref([
    {id: 1, name: "Mensual"},
    {id: 2, name: "Bimensual"},
    {id: 3, name: "Trimestral"},
    {id: 6, name: "Semestral"},
    {id: 12, name: "Anual"},
])

const validation = ref({
  result: false,
  errors: {},
} as FormValidationResult);

const validate = () => {
  const formValidation = new FormValidation(schema);
  validation.value = formValidation.validate(props.expense);
};



const submitForm = async () => {
  validate();
  if (validation.value.result) {
    emit("submit", expense.value as Expense);
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