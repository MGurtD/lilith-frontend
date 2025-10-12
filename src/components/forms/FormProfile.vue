<script setup lang="ts">
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import * as yup from "yup";
import { FormValidation } from "../../utils/form-validator";
import type { ProfileDetail } from "../../types/profile";

const props = defineProps<{
  modelValue: Partial<ProfileDetail>;
  submitting?: boolean;
  readonlySystem?: boolean;
}>();
const emit = defineEmits<{
  (e: "update:modelValue", value: Partial<ProfileDetail>): void;
  (e: "submit"): void;
}>();

const { t } = useI18n();

const schema = yup.object({
  name: yup.string().required(() => t("profiles.form.validation.nameRequired")),
});
const validator = new FormValidation(schema as any);

const form = ref<Partial<ProfileDetail>>({ ...props.modelValue });
const errors = ref<Record<string, string[]>>({});

watch(
  () => props.modelValue,
  (v) => {
    form.value = { ...v };
  }
);
watch(
  () => form.value,
  (v) => emit("update:modelValue", v),
  { deep: true }
);

const validate = () => {
  const r = validator.validate(form.value);
  errors.value = r.errors;
  return r.result;
};

const submit = () => {
  if (!validate()) return;
  emit("submit");
};
</script>
<template>
  <div class="form-profile">
    <div class="formgrid grid">
      <div class="field col-12 md:col-4">
        <label class="block mb-2">{{ t("profiles.form.name") }}</label>
        <InputText
          v-model="form.name"
          :disabled="props.readonlySystem"
          class="w-full"
        />
        <small class="p-error" v-if="errors.name">{{ errors.name[0] }}</small>
      </div>
      <div class="field col-12 md:col-8">
        <label class="block mb-2">{{ t("profiles.form.description") }}</label>
        <InputText v-model="form.description" class="w-full" />
      </div>
      <div class="field col-12 md:col-4">
        <label class="block mb-2">{{ t("profiles.system") }}</label>
        <InputSwitch v-model="form.isSystem" disabled />
      </div>
    </div>
    <div class="flex gap-2 mt-3">
      <Button
        :label="t('profiles.form.save')"
        icon="pi pi-save"
        :loading="submitting"
        @click="submit"
      />
    </div>
  </div>
</template>
