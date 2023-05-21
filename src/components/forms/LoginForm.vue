<script setup lang="ts">
import { ref } from "vue";
import { UserLogin } from "../../api/services/authentications.service";
import { useToast } from "primevue/usetoast";
import { ToastSeverity } from "primevue/api";

const emits = defineEmits(["login", "registerClick"]);

const userLogin = ref({
  username: "",
  password: "",
} as UserLogin);

const toast = useToast();
const login = () => {
  if (
    userLogin.value.username.length === 0 ||
    userLogin.value.password.length === 0
  ) {
    toast.add({
      severity: "error",
      summary: "Login incorrecte",
      detail: "El nom d'usuari i la contrasenya són obligatoris",
    });
    return;
  }

  emits("login", userLogin.value);
};

const registerClick = () => {
  emits("registerClick");
};
</script>

<template>
  <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
    <div class="text-center mb-5">
      <img
        src="../../assets/images/logo.png"
        alt="Image"
        height="50"
        class="mb-3"
      />
      <div class="text-blue-700 text-3xl font-medium mb-6">
        {{ $t("login.loginTitle") }}
      </div>
    </div>

    <div>
      <label for="email1" class="block text-900 font-medium mb-2">{{
        $t("login.username")
      }}</label>
      <span class="p-input-icon-left w-full mb-3">
        <i class="pi pi-user" />
        <InputText
          id="username"
          type="text"
          class="w-full"
          v-model="userLogin.username"
          @keyup.enter="login"
        />
      </span>

      <label for="password1" class="block text-900 font-medium mb-2">{{
        $t("login.password")
      }}</label>
      <span class="p-input-icon-left w-full mb-3">
        <i class="pi pi-key" />
        <InputText
          id="password1"
          type="password"
          class="w-full"
          v-model="userLogin.password"
          @keyup.enter="login"
        />
      </span>

      <Button
        :label="$t('login.btnSignIn')"
        class="w-full"
        @click="login"
      ></Button>

      <div class="flex align-items-center justify-content-between mb-4 mt-4">
        <a
          class="links-section font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer"
          @click="registerClick"
          >Registra't</a
        >
        <a
          class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer"
          >{{ $t("login.forgotPassword") }}</a
        >
      </div>
    </div>
  </div>
</template>
