<template>
  <form v-if="detail">
    <section class="two-columns-7525">
      <div>
        <label class="block text-900 mb-2">Referència</label>
        <Dropdown
          v-model="detail.referenceId"
          editable
          :options="referenceStore.references"
          optionValue="id"
          optionLabel="description"
          class="w-full"
          :class="{
            'p-invalid': validation.errors.referenceId,
          }"
        >
          <template #option="slotProps">
            <div v-if="slotProps.option" class="flex align-items-center">
              {{ slotProps.option.code }} ({{ slotProps.option.version }}) -
              {{ slotProps.option.description }}
            </div>
          </template>
        </Dropdown>
      </div>
      <div>
        <BaseInput
          :type="BaseInputType.NUMERIC"
          label="Quantitat"
          v-model="detail.quantity"
          @update:model-value="calcAmount"
        />
      </div>
    </section>

    <section class="four-columns">
      <div class="mt-2">
        <BaseInput
          :type="BaseInputType.NUMERIC"
          label="Amplada"
          v-model="detail.width"
        />
      </div>
      <div class="mt-2">
        <BaseInput
          :type="BaseInputType.NUMERIC"
          label="Alçada"
          v-model="detail.height"
        />
      </div>
      <div class="mt-2">
        <BaseInput
          :type="BaseInputType.NUMERIC"
          label="Longitud"
          v-model="detail.lenght"
        />
      </div>
      <div class="mt-2">
        <BaseInput
          :type="BaseInputType.NUMERIC"
          label="Diàmetre"
          v-model="detail.diameter"
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
  </form>
</template>

<script setup lang="ts">
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

const props = defineProps<{
  detail: ReceiptDetail;
}>();

const emit = defineEmits<{
  (e: "submit", detail: ReceiptDetail): void;
  (e: "cancel"): void;
}>();

const toast = useToast();
const referenceStore = useReferenceStore();

const calcAmount = () => {
  const detail = props.detail;
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
