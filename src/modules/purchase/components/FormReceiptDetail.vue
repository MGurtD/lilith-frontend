<template>
  <form v-if="detail">
    <section class="two-columns-7525">
      <div>
        <DropdownReference
          label="Referència de compra"
          v-model="detail.referenceId"
          :fullName="true"
          @update:modelValue="updateHandler"
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
    <section>
      <div>
        <BaseInput
          :type="BaseInputType.TEXT"
          label="Descripció"
          highlightOnFocus
          v-model="detail.description"
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
import { Receipt, ReceiptDetail } from "../types";
import * as Yup from "yup";
import {
  FormValidation,
  FormValidationResult,
} from "../../../utils/form-validator";
import { useToast } from "primevue/usetoast";
import BaseInput from "../../../components/BaseInput.vue";
import { BaseInputType } from "../../../types/component";
import { useReceiptsStore } from "../store/receipt";
import { useReferenceStore } from "../../shared/store/reference";

const props = defineProps<{
  detail: ReceiptDetail;
  receipt: Receipt;
}>();

const emit = defineEmits<{
  (e: "submit", detail: ReceiptDetail): void;
  (e: "cancel"): void;
}>();

const toast = useToast();
const receiptStore = useReceiptsStore();
const referenceStore = useReferenceStore();

const updateHandler = async (id: string) => {
  await getPrice(id);
  await getReferenceInfo(id);
};

const getPrice = async (id: string | null) => {
  if (id == null || props.receipt.supplierId == "") {
    return;
  }
  const price = await referenceStore.getPrice(id, props.receipt.supplierId);
  props.detail.kilogramPrice = price;
  //await calculateAmount();
};

const getReferenceInfo = async (id: string) => {
  if (props.detail.description == "" || props.detail.description == null) {
    const reference = await referenceStore.getFullNameById(id);
    props.detail.description = reference;
  }
};

/*const calculateAmount = async () => {
  props.detail.amount = props.detail.quantity * props.detail.unitPrice;
};*/

const calculate = async () => {
  const response = await receiptStore.calculateDetailWeightAndPrice(
    props.detail
  );
  if (response.result) {
    props.detail.unitWeight = response.content!.unitWeight;
    props.detail.totalWeight = response.content!.totalWeight;
    props.detail.unitPrice = response.content!.unitPrice;
    props.detail.amount = response.content!.amount;
  } else {
    toast.add({
      summary: "Calculadora de pes/preu",
      detail: response.errors[0],
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
