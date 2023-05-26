<template>
  <form v-if="user" @submit.prevent="submit">
    <BaseInput
      id="username"
      class="mb-2"
      label="Nom d'usuari"
      v-model="user.username"
      disabled="true"
      :class="{
        'p-invalid': validation.errors.email,
      }"
    ></BaseInput>
    <section class="two-columns">
      <BaseInput
        id="firstName"
        class="mb-2"
        label="Nom"
        v-model="user.firstName"
        :class="{
          'p-invalid': validation.errors.firstName,
        }"
      ></BaseInput>
      <BaseInput
        id="lastName"
        class="mb-2"
        label="Cognoms"
        v-model="user.lastName"
        :class="{
          'p-invalid': validation.errors.lastName,
        }"
      ></BaseInput>
    </section>

    <section
      class="form-user-changepassword"
      v-if="passwordChangeModeOn === true"
    >
      <BaseInput
        :type="BaseInputType.PASSWORD"
        id="passwordOne"
        class="mb-2 w-full"
        label="Contrasenya"
        v-model="passwordOne"
      ></BaseInput>
      <BaseInput
        :type="BaseInputType.PASSWORD"
        id="passwordTwo"
        class="mb-2"
        label="Repetir contrasenya"
        v-model="passwordTwo"
      ></BaseInput>
      <div>
        <label class="block mb-2" style="color: #fff">...</label>
        <Button label="Modificar" class="mr-2" @click="changePassword" />
      </div>
    </section>

    <div class="mt-2">
      <Button type="submit" label="Guardar" class="mr-2" />

      <Button
        v-if="user.disabled"
        severity="success"
        label="Activar"
        class="mr-2"
        @click="changeUserAvailability(false)"
      />
      <Button
        v-else
        label="Desactivar"
        severity="danger"
        class="mr-2"
        @click="changeUserAvailability(true)"
      />

      <Button
        severity="secondary"
        label="Canviar contrasenya"
        class="mr-2"
        @click="enablePasswordMode"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import * as Yup from "yup";
import {
  FormValidation,
  FormValidationResult,
} from "../../utils/form-validator";
import { useToast } from "primevue/usetoast";
import { User } from "../../api/services/user.service";
import { BaseInputType } from "../../types/component";
import { UserLogin } from "../../api/services/authentications.service";

const props = defineProps<{
  user: User | undefined;
}>();
const passwordChangeModeOn = ref(false);
const passwordOne = ref("");
const passwordTwo = ref("");

const emit = defineEmits<{
  (e: "submit", contact: User): void;
  (e: "change-password", password: UserLogin): void;
}>();

const toast = useToast();

const schema = Yup.object().shape({
  username: Yup.string()
    .required("El correu és obligatori")
    .max(250, "El nom d'usuari no pot superar els 250 carácters"),
  firstName: Yup.string()
    .required("El nom és obligatori")
    .max(250, "El nom no pot superar els 250 carácters"),
  lastName: Yup.string()
    .required("Els cognoms són obligatoris")
    .max(250, "Els cognoms no poden superar els 250 carácters"),
  disabled: Yup.boolean().required(),
});
const validation = ref({
  result: false,
  errors: {},
} as FormValidationResult);

const validate = () => {
  const formValidation = new FormValidation(schema);
  validation.value = formValidation.validate(props.user);
};

const changeUserAvailability = (isDisabled: boolean) => {
  const user = props.user as User;
  user.disabled = isDisabled;
  submit();
};

const submit = async () => {
  validate();
  if (validation.value.result) {
    emit("submit", props.user as User);
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

const enablePasswordMode = () => {
  passwordChangeModeOn.value = true;
};

const changePassword = () => {
  let isValid =
    passwordOne.value.length > 4 === passwordTwo.value.length > 4 &&
    passwordOne.value === passwordTwo.value;

  if (!isValid) {
    toast.add({
      severity: "warn",
      summary: "Contrasenya invàlida",
      detail: "Les contrasenyes han de coincidir i contenir més de 4 caràcters",
    });
    return;
  }

  emit("change-password", {
    username: props.user?.username,
    password: passwordOne.value,
  } as UserLogin);
};
</script>

<style scoped>
.form-user-changepassword {
  display: grid;
  gap: 1rem;
  grid-template-columns: 0.5fr 0.5fr 0.5fr;
}
</style>
