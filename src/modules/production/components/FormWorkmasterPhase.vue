<template>
  <form v-if="phase">
    <div>
      <Button
        label="Guardar Fase"
        class="grid_add_row_button"
        size="small"
        @click="submitForm"
      />
      <br />
    </div>
    <section class="two-columns-2575 mb-2">
      <div>
        <BaseInput label="Codi de la fase" v-model="phase.code" />
      </div>
      <div>
        <BaseInput label="Descripció" v-model="phase.description" />
      </div>
    </section>
    <section class="three-columns mb-2">
      <div>
        <label class="block text-900 mb-2">Tipus de màquina</label>
        <Dropdown
          v-model="phase.workcenterTypeId"
          editable
          :options="plantModelStore.workcenterTypes"
          optionValue="id"
          optionLabel="name"
          class="w-full"
          :class="{
            'p-invalid': validation.errors.workcenterTypeId,
          }"
          @change="workcenterTypeUpdated"
        />
      </div>
      <div>
        <label class="block text-900 mb-2">Màquina preferida</label>
        <Dropdown
          v-model="phase.preferredWorkcenterId"
          editable
          :options="preferredWorkcenters"
          optionValue="id"
          optionLabel="description"
          class="w-full"
        />
      </div>
      <div>
        <label class="block text-900 mb-2">Tipus d'operari</label>
        <Dropdown
          v-model="phase.operatorTypeId"
          editable
          :options="plantModelStore.operatorTypes"
          optionValue="id"
          optionLabel="description"
          class="w-full"
          :class="{
            'p-invalid': validation.errors.operatorTypeId,
          }"
        />
      </div>
    </section>
    <section class="three-columns mb-2">
      <div>
        <label class="block text-900 mt-1 mb-1">Externa</label>
        <Checkbox
          v-model="phase.isExternalWork"
          class="w-full"
          :binary="true"
          @change="isExternalWorkChanged"
        />
      </div>
      <div>
        <BaseInput
          :type="BaseInputType.CURRENCY"
          label="Cost extern"
          v-model="phase.externalWorkCost"
          :disabled="!phase.isExternalWork"
          :class="{
            'p-invalid': validation.errors.externalWorkCost,
          }"
        />
      </div>
    </section>
  </form>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { WorkMaster, WorkMasterPhase } from "../types";
import * as Yup from "yup";
import {
  FormValidation,
  FormValidationResult,
} from "../../../utils/form-validator";
import { useToast } from "primevue/usetoast";
import BaseInput from "../../../components/BaseInput.vue";
import { BaseInputType } from "../../../types/component";
import { usePlantModelStore } from "../store/plantmodel";

const props = defineProps<{
  workmaster: WorkMaster;
  phase: WorkMasterPhase;
}>();

const emit = defineEmits<{
  (e: "submit", phase: WorkMasterPhase): void;
  (e: "cancel"): void;
}>();

const toast = useToast();
const plantModelStore = usePlantModelStore();

const preferredWorkcenters = computed(() => {
  return props.phase.workcenterTypeId
    ? plantModelStore.getWorkcentersByTypeId(props.phase.workcenterTypeId)
    : [];
});

const workcenterTypeUpdated = () => {
  props.phase.preferredWorkcenterId = null;
};
const isExternalWorkChanged = () => {
  if (props.phase.isExternalWork) {
    props.phase.operatorTypeId = null;
    props.phase.workcenterTypeId = null;
    props.phase.preferredWorkcenterId = null;
  }
};

const schema = Yup.object().shape({
  code: Yup.string().required("El codi és obligatori"),
});
const validation = ref({
  result: false,
  errors: {},
} as FormValidationResult);

const validate = () => {
  const formValidation = new FormValidation(schema);
  validation.value = formValidation.validate(props.phase);
};

const submitForm = async () => {
  validate();
  if (validation.value.result) {
    if (props.phase.preferredWorkcenterId === "") {
      props.phase.preferredWorkcenterId = null;
    }

    emit("submit", props.phase);
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
