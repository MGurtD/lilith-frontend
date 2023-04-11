<script setup lang="ts">
import { ref } from "vue";
import { UserLogin } from "../api/services/authentications.service";

const emits = defineEmits(["login"]);
const checked = ref(false);

const userLogin = ref({
  username: "",
  password: "",
} as UserLogin);

const login = () => {
  if (
    userLogin.value.username.length === 0 ||
    userLogin.value.password.length === 0
  ) {
    alert("El nom d'usuari i la contrasenya són obligatoris");
    return;
  }

  emits("login", userLogin.value);
};
</script>

<template>
  <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
    <div class="text-center mb-5">
      <img
        src="../assets/images/logo.png"
        alt="Image"
        height="100"
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
        v-model="userLogin.username"
      />

      <label for="password1" class="block text-900 font-medium mb-2">{{
        $t("login.password")
      }}</label>
      <InputText
        id="password1"
        type="password"
        class="w-full mb-3"
        v-model="userLogin.password"
      />

      <div class="flex align-items-center justify-content-between mb-6">
        <div class="flex align-items-center">
          <Checkbox
            id="rememberme1"
            :binary="true"
            v-model="checked"
            class="mr-2"
          ></Checkbox>
          <label for="rememberme1">{{ $t("login.rememberMe") }}</label>
        </div>
        <a
          class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer"
          >{{ $t("login.forgotPassword") }}</a
        >
      </div>

      <Button
        :label="$t('login.btnSignIn')"
        icon="pi pi-user"
        class="w-full"
        @click="login"
      ></Button>
    </div>
  </div>
</template>
