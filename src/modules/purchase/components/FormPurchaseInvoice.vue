<template>
  <TabView>
    <TabPanel header="Factura">
      <form v-if="purchaseInvoice">
        <section class="four-columns">
          <div>
            <label class="block text-900 mb-2">Exercici</label>
            <Dropdown
              v-model="purchaseInvoice.exerciceId"
              editable
              :options="purchaseMasterData.masterData.exercises"
              optionValue="id"
              optionLabel="name"
              class="w-full"
              :class="{
                'p-invalid': validation.errors.exerciseId,
              }"
            />
          </div>
          <div>
            <label class="block text-900 mb-2">Sèrie</label>
            <Dropdown
              v-model="purchaseInvoice.purchaseInvoiceSerieId"
              editable
              :options="purchaseMasterData.masterData.series"
              optionValue="id"
              optionLabel="name"
              class="w-full"
              :class="{
                'p-invalid': validation.errors.purchaseInvoiceSerieId,
              }"
            />
          </div>
          <BaseInput
            label="Num. Fra. Intern"
            id="number"
            v-model="purchaseInvoice.number"
            disabled
          />
          <div>
            <label class="block text-900 mb-2">Estat</label>
            <Dropdown
              v-model="purchaseInvoice.purchaseInvoiceStatusId"
              editable
              :options="purchaseMasterData.masterData.statuses"
              optionValue="id"
              optionLabel="name"
              class="w-full"
              :class="{
                'p-invalid': validation.errors.purchaseInvoiceStatusId,
              }"
            />
          </div>
        </section>

        <section class="three-columns">
          <div class="mt-2">
            <label class="block text-900 mb-2">Proveïdor</label>
            <Dropdown
              v-model="purchaseInvoice.supplierId"
              editable
              :options="purchaseMasterData.masterData.suppliers"
              optionValue="id"
              optionLabel="comercialName"
              class="w-full"
              :class="{
                'p-invalid': validation.errors.supplierId,
              }"
            />
          </div>
          <div class="mt-2">
            <BaseInput
              label="Num. Fra. Proveïdor"
              id="supplierNumber"
              v-model="purchaseInvoice.supplierNumber"
            />
          </div>
          <div class="mt-2">
            <label class="block text-900 mb-2">Data Factura: </label>
            <Calendar
              id="purchaseInvoiceDate"
              v-model="purchaseInvoice.purchaseInvoiceDate"
            />
          </div>
        </section>

        <section class="four-columns">
          <div class="mt-2">
            <BaseInput
              label="Base"
              id="baseAmount"
              v-model="purchaseInvoice.baseAmount"
              @update:modelValue="calcAmounts()"
            />
          </div>
          <div class="mt-2">
            <BaseInput
              label="Ports"
              id="transportAmount"
              v-model="purchaseInvoice.transportAmount"
              @update:modelValue="calcAmounts()"
            />
          </div>
          <div class="mt-2">
            <label class="block text-900 mb-2">IVA</label>
            <Dropdown
              v-model="purchaseInvoice.taxId"
              editable
              :options="purchaseMasterData.masterData.taxes"
              optionValue="id"
              optionLabel="name"
              class="w-full"
              :class="{
                'p-invalid': validation.errors.taxId,
              }"
              @update:modelValue="calcAmounts()"
            />
          </div>
          <div class="mt-2">
            <BaseInput
              label="% Dto."
              id="discountPercentage"
              v-model="purchaseInvoice.discountPercentage"
              @update:modelValue="calcAmounts()"
            />
          </div>
        </section>

        <section class="two-columns">
          <div class="mt-2">
            <label class="block text-900 mb-2">Forma de pagament</label>
            <Dropdown
              v-model="purchaseInvoice.paymentMethodId"
              editable
              :options="purchaseMasterData.masterData.paymentMethods"
              optionValue="id"
              optionLabel="name"
              class="w-full"
              :class="{
                'p-invalid': validation.errors.paymentmethod,
              }"
              @update:modelValue="calcAmounts()"
            />
          </div>
          <div class="mt-2">
            <BaseInput
              label="Total"
              id="netAmount"
              v-model="purchaseInvoice.netAmount"
              disabled
            />
          </div>
        </section>
      </form>

      <div class="mt-3">
        <DataTable
          :value="purchaseInvoice.purchaseInvoiceDueDates"
          tableStyle="min-width: 100%"
        >
          <Column field="dueDate" header="Venciment" style="width: 50%">
            <template #body="slotProps">
              {{ formatDate(slotProps.data.dueDate) }}
            </template>
          </Column>
          <Column field="amount" header="Import" style="width: 50%"></Column>
        </DataTable>
      </div>

      <Button label="Guardar" class="mt-2" @click="submitForm" />
    </TabPanel>
    <TabPanel header="Fitxers">
      <FileEntityPicker
        title="Factures"
        entity="PurchaseInvoice"
        :id="purchaseInvoice.id"
      />
    </TabPanel>
  </TabView>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import BaseInput from "../../../components/BaseInput.vue";
import { usePurchaseInvoiceStore } from "../store/purchaseInvoices";
import { usePurchaseMasterDataStore } from "../store/purchase";
import { PurchaseInvoice, PurchaseInvoiceDueDate } from "../types";
import * as Yup from "yup";
import {
  FormValidation,
  FormValidationResult,
} from "../../../utils/form-validator";
import { useToast } from "primevue/usetoast";
import { storeToRefs } from "pinia";
import FileEntityPicker from "../../../components/FileEntityPicker.vue";
import { formatDate } from "../../../utils/functions";

const props = defineProps<{
  purchaseInvoice: PurchaseInvoice;
}>();

const emit = defineEmits<{
  (e: "submit", purchaseInvoice: PurchaseInvoice): void;
  (e: "cancel"): void;
}>();

const purchaseStore = usePurchaseInvoiceStore();
const purchaseMasterData = usePurchaseMasterDataStore();
const { purchaseInvoice } = storeToRefs(purchaseStore);

const toast = useToast();

const schema = Yup.object().shape({
  exerciceId: Yup.string().required("L'exercici es obligatori"),
  supplierId: Yup.string().required("El proveïdor es obligatori"),
});

const validation = ref({
  result: false,
  errors: {},
} as FormValidationResult);

const validate = () => {
  const formValidation = new FormValidation(schema);
  validation.value = formValidation.validate(props.purchaseInvoice);
};

let hasBeenMounted = false;
onMounted(() => {
  setTimeout(() => (hasBeenMounted = true), 1000);
});

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

const calcAmounts = async () => {
  if (!hasBeenMounted) return;

  let base: number;
  let transport: number;
  let taxPercentage: number;
  let taxAmount: number;
  let netAmount: number;
  let discountAmount: number;
  let grossAmount: number;
  let DueDates: Array<PurchaseInvoiceDueDate> | undefined;

  base = checkValue(purchaseInvoice.value?.baseAmount);
  transport = checkValue(purchaseInvoice.value?.transportAmount);
  var tax = purchaseMasterData.masterData.taxes?.find(
    (item) => purchaseInvoice.value?.taxId === purchaseInvoice.value?.taxId
  );
  taxPercentage = checkValue(tax?.percentatge);
  taxAmount = (base * 1 + transport * 1) * (taxPercentage / 100);
  purchaseInvoice.value!.taxAmount = taxAmount;
  grossAmount = base * 1 + transport * 1 + taxAmount * 1;
  purchaseInvoice.value!.grossAmount = grossAmount;
  discountAmount =
    (grossAmount *
      (1 * checkValue(purchaseInvoice.value?.discountPercentage))) /
    100;
  purchaseInvoice.value!.discountAmount = discountAmount;
  netAmount = grossAmount - discountAmount;
  purchaseInvoice.value!.netAmount = parseFloat(netAmount.toFixed(2));
  console.log(purchaseInvoice.value);
  DueDates = await purchaseStore.GetDueDates(purchaseInvoice.value!);
  purchaseInvoice.value!.purchaseInvoiceDueDates = DueDates!;
  console.log(purchaseInvoice.value);
};

const checkValue = (val: number | undefined): number => {
  if (val) {
    return val;
  } else {
    return 0;
  }
};
</script>
