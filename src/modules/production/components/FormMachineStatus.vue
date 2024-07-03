<template>
  <form v-if="machineStatus">
    <section class="four-columns">
      <BaseInput
        class="mb-2"
        label="Nom"
        id="name"
        v-model="machineStatus.name"
        :class="{
          'p-invalid': validation.errors.name,
        }"
      ></BaseInput>
      <BaseInput
        class="mb-2"
        label="Descripció"
        id="description"
        v-model="machineStatus.description"
        :class="{
          'p-invalid': validation.errors.description,
        }"
      ></BaseInput>
      <div>
        <label class="block text-900 mb-2">Color</label>
        <ColorPicker
          v-model="machineStatus.color"
          class="mb-2"
          label="Color"
          id="color"
          :class="{
            'p-invalid': validation.errors.color,
          }"
        ></ColorPicker>
      </div>
      <div>
        <label class="block text-900 mb-2">Desactivat</label>
        <Checkbox
          v-model="machineStatus.disabled"
          class="w-full"
          :binary="true"
        />
      </div>
    </section>
    <section class="five-columns">
      <div>
        <label class="block text-900 mb-2">Aturada</label>
        <Checkbox
          v-model="machineStatus.stoped"
          class="w-full"
          :binary="true"
        />
      </div>
      <div>
        <label class="block text-900 mb-2">Operaris</label>
        <Checkbox
          v-model="machineStatus.operatorsAllowed"
          class="w-full"
          :binary="true"
        />
      </div>
      <div>
        <label class="block text-900 mb-2">Tancada</label>
        <Checkbox
          v-model="machineStatus.closed"
          class="w-full"
          :binary="true"
        />
      </div>
      <div>
        <label class="block text-900 mb-2">Preferida</label>
        <Checkbox
          v-model="machineStatus.preferred"
          class="w-full"
          :binary="true"
        />
      </div>
      <div>
        <BaseInput
          class="mb-2"
          label="Icona"
          id="icon"
          v-model="machineStatus.icon"
        ></BaseInput>
      </div>
    </section>
    <div class="mt-2">
      <Button label="Guardar" class="mr-2" @click="submitForm" />
    </div>
  </form>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import BaseInput from "../../../components/BaseInput.vue";
import { MachineStatus } from "../types";
import * as Yup from "yup";
import {
  FormValidation,
  FormValidationResult,
} from "../../../utils/form-validator";
import { useToast } from "primevue/usetoast";
import { storeToRefs } from "pinia";
import { usePlantModelStore } from "../store/plantmodel";

const props = defineProps<{
  machineStatus: MachineStatus;
}>();

onMounted(async () => {
  await plantModelStore.fetchMachineStatuses();
});

const emit = defineEmits<{
  (e: "submit", machineStatus: MachineStatus): void;
  (e: "cancel"): void;
}>();

const toast = useToast();
const plantModelStore = usePlantModelStore();
const { machineStatus } = storeToRefs(plantModelStore);

const schema = Yup.object().shape({
  name: Yup.string()
    .required("El nom és obligatori")
    .max(250, "El nom no pot superar els 250 carácters"),
  description: Yup.string()
    .required("La descripció és obligatoria")
    .max(250, "La descripció pot superar els 250 carácters"),
  color: Yup.string().required("El color es obligatori"),
});
const validation = ref({
  result: false,
  errors: {},
} as FormValidationResult);

const validate = () => {
  const formValidation = new FormValidation(schema);
  validation.value = formValidation.validate(props.machineStatus);
};

const submitForm = async () => {
  validate();
  if (validation.value.result) {
    emit("submit", props.machineStatus);
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
