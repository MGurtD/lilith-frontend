<script setup lang="ts">
import { ref } from "vue";
import { UserRegister } from "../api/services/authentications.service";

const emits = defineEmits(["register", "loginClick"]);

const userRegister = ref({
  firstName: "",
  lastName: "",
  mail: "",
  username: "",
  password: "",
  repeatPassword: "",
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

const loginClick = () => emits("loginClick");
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
      <div class="text-blue-700 text-3xl font-medium mb-3">
        {{ $t("login.register") }}
      </div>
    </div>

    <form>
      <section class="two-columns">
        <div>
          <label for="firstName" class="block text-900 font-medium mb-2">{{ $t("login.firstName") }}</label
          >
          <span class="p-input-icon-left w-full mb-3">
            <i class="pi pi-user" />
            <InputText
              id="firstName"
              type="text"
              class="w-full"
              v-model="userRegister.firstName"
            />
          </span>
        </div>

        <div>
          <label for="lastName" class="block text-900 font-medium mb-2">{{ $t("login.lastName") }}</label
          >
          <span class="p-input-icon-left w-full mb-3">
            <i class="pi pi-user" />
            <InputText
              id="lastName"
              type="text"
              class="w-full"
              v-model="userRegister.lastName"
            />
          </span>
        </div>
      </section>

      <section class="two-columns">
        <div>
          <label for="username" class="block text-900 font-medium mb-2">{{
            $t("login.username")
          }}</label>
          <span class="p-input-icon-left w-full mb-3">
            <i class="pi pi-user" />
            <InputText
              id="username"
              type="text"
              class="w-full"
              v-model="userRegister.username"
            />
          </span>
        </div>

        <div>
          <label for="email" class="block text-900 font-medium mb-2">{{
            $t("login.mail")
          }}</label>
          <span class="p-input-icon-left w-full mb-3">
            <i class="pi pi-envelope" />
            <InputText
              id="email"
              type="text"
              class="w-full"
              v-model="userRegister.mail"
            />
          </span>
        </div>
      </section>

      <section class="two-columns mb-6">
        <div>
          <label for="password1" class="block text-900 font-medium mb-2">
            {{ $t("login.password") }}
          </label>
          <span class="p-input-icon-left w-full mb-3">
            <i class="pi pi-key" />

            <InputText
              id="password1"
              type="password"
              class="w-full"
              v-model="userRegister.password"
            />
          </span>
        </div>
        <div>
          <label for="password2" class="block text-900 font-medium mb-2">
            {{ $t("login.repeatPassword") }}</label
          >
          <span class="p-input-icon-left w-full mb-3">
            <i class="pi pi-verified" />
            <InputText
              id="password2"
              type="password"
              class="w-full"
              v-model="userRegister.repeatPassword"
            />
          </span>
        </div>
      </section>

      <Button
        :label="$t('login.register')"
        class="w-full"
        @click="register"
      ></Button>
    </form>
    <div class="flex align-items-center justify-content-between mb-4 mt-4">
      <a
        class="links-section font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer"
        @click="loginClick"
        >Si tens usuari, inicia sessió</a
      >
    </div>
  </div>
</template>

<style scoped>
.two-columns {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}
</style>
