<template>
  <form v-if="detail">
    <section class="two-columns-7525">
      <div>
        <DropdownReference
          label="Material"
          v-model="detail.referenceId"
          :fullName="true"
        ></DropdownReference>
      </div>
      <div>
        <BaseInput
          :type="BaseInputType.CURRENCY"
          label="Preu / Kilo"
          highlightOnFocus
          v-model="detail.kilogramPrice"
        />
      </div>
    </section>

    <section class="three-columns mt-2">
      <div>
        <BaseInput
          :type="BaseInputType.NUMERIC"
          highlightOnFocus
          label="Amplada (mm)"
          :decimals="2"
          v-model="detail.width"
        />
      </div>
      <div>
        <BaseInput
          :type="BaseInputType.NUMERIC"
          :decimals="2"
          label="Alçada (mm)"
          highlightOnFocus
          v-model="detail.height"
        />
      </div>
      <div>
        <BaseInput
          :type="BaseInputType.NUMERIC"
          :decimals="2"
          label="Longitud (mm)"
          highlightOnFocus
          v-model="detail.lenght"
        />
      </div>
    </section>

    <section class="three-columns mt-2">
      <div>
        <BaseInput
          :type="BaseInputType.NUMERIC"
          :decimals="2"
          label="Diàmetre (mm)"
          highlightOnFocus
          v-model="detail.diameter"
        />
      </div>
      <div>
        <BaseInput
          :type="BaseInputType.NUMERIC"
          :decimals="2"
          label="Gruix (mm)"
          highlightOnFocus
          v-model="detail.thickness"
        />
      </div>
      <div>
        <BaseInput
          :type="BaseInputType.NUMERIC"
          :decimals="2"
          label="Pes (kg)"
          v-model="detail.totalWeight"
        />
      </div>
    </section>

    <section class="two-columns mt-2">
      <div>
        <BaseInput
          :type="BaseInputType.NUMERIC"
          label="Quantitat"
          highlightOnFocus
          v-model="detail.quantity"
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
    <Button
      label="Calcular"
      @click="calculate"
      style="float: right"
      :size="'small'"
      class="mt-2 mr-2"
    />
  </form>
</template>

<script setup lang="ts">
import DropdownReference from "../../shared/components/DropdownReference.vue";
import { ref } from "vue";
import { ReceiptDetail } from "../types";
import * as Yup from "yup";
import {
  FormValidation,
  FormValidationResult,
} from "../../../utils/form-validator";
import { useToast } from "primevue/usetoast";
import BaseInput from "../../../components/BaseInput.vue";
import { BaseInputType } from "../../../types/component";
import { useReferenceStore } from "../../shared/store/reference";
import { useReceiptsStore } from "../store/receipt";

const props = defineProps<{
  detail: ReceiptDetail;
}>();

const emit = defineEmits<{
  (e: "submit", detail: ReceiptDetail): void;
  (e: "cancel"): void;
}>();

const toast = useToast();
const receiptStore = useReceiptsStore();

const calculate = async () => {
  const detail = await receiptStore.calculateDetailWeightAndPrice(props.detail);

  if (detail) {
    props.detail.unitWeight = detail.unitWeight;
    props.detail.totalWeight = detail.totalWeight;
    props.detail.unitPrice = detail.unitPrice;
    props.detail.amount = detail.amount;
  } else {
    toast.add({
      summary: "Calculadora de pes/preu",
      detail: "Hi ha hagut un problema al realitzar el cálcul",
      severity: "warn",
      life: 6000,
    });
  }
};

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
