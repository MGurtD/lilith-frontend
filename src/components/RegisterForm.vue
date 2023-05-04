<script setup lang="ts">
import { ref } from "vue";
import { UserRegister } from "../api/services/authentications.service";

const emits = defineEmits(["register"]);

const userRegister = ref({
  username: "",
  password: "",
  email: "",
  name: "",
  phoneNumber: "",
} as UserRegister);

const register = () => {
  if (
    userRegister.value.username.length === 0 ||
    userRegister.value.password.length === 0
  ) {
    alert("El nom d'usuari i la contrasenya són obligatoris");
    return;
  }

  emits("register", userRegister.value);
};
</script>

<template>
  <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
    <div class="text-center mb-5">
      <img
        src="../assets/images/logo.png"
        alt="Image"
        height="50"
        class="mb-3"
      />
      <div class="text-900 text-3xl font-medium mb-3">Temges</div>
    </div>

    <div>
      <label for="email1" class="block text-900 font-medium mb-2">{{
        $t("login.username")
      }}</label>
      <InputText
        id="email1"
        type="text"
        class="w-full mb-3"
        v-model="userRegister.username"
      />

      <label for="password1" class="block text-900 font-medium mb-2">{{
        $t("login.password")
      }}</label>
      <InputText
        id="password1"
        type="password"
        class="w-full mb-3"
        v-model="userRegister.password"
      />

      <label for="password2" class="block text-900 font-medium mb-2">{{
        $t("login.password")
      }}</label>
      <InputText
        id="password2"
        type="password"
        class="w-full mb-3"
        v-model="userRegister.password"
      />

      <label for="name" class="block text-900 font-medium mb-2">Nom</label>
      <InputText
        id="name"
        type="text"
        class="w-full mb-3"
        v-model="userRegister.name"
      />

      <label for="email" class="block text-900 font-medium mb-2"
        >Correu electrònic</label
      >
      <InputText
        id="email"
        type="text"
        class="w-full mb-3"
        v-model="userRegister.email"
      />

      <Button
        :label="'Registre\'t'"
        icon="pi pi-user"
        class="w-full"
        @click="register"
      ></Button>
    </div>
  </div>
</template>
