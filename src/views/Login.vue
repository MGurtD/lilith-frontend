<script setup lang="ts">
import { ref } from "vue";
import {
  UserLogin,
  AuthenticationService,
  UserRegister,
} from "../api/services/authentications.service";
import LoginForm from "../components/LoginForm.vue";
import RegisterForm from "../components/RegisterForm.vue";
import { useStore } from "../store";
import { useToast } from "primevue/usetoast";
import { ToastSeverity } from "primevue/api";
import { useRouter } from "vue-router";
import { AuthenticationResponse } from "../types";

const service = new AuthenticationService();
const store = useStore();
const router = useRouter();
const toast = useToast();

const showLogin = ref(true);

const loginHandler = async (userLogin: UserLogin) => {
  const response = await service.Login(userLogin);
  manageAuthorizationResponse(response);
};

const registerHandler = async (userRegister: UserRegister) => {
  const response = await service.Register(userRegister);
  manageAuthorizationResponse(response);
};

const manageAuthorizationResponse = (response: AuthenticationResponse) => {
  if (!response.result) {
    toast.add({
      severity: ToastSeverity.ERROR,
      summary: response.errors[0],
    });
    return;
  } else {
    store.setAuthorization(response);
    router.push("/");
  }
};

const navigateToRegister = () => (showLogin.value = false);
const navigateToLogin = () => (showLogin.value = true);
</script>

<template>
  <div class="container">
    <LoginForm
      v-if="showLogin"
      class="login-form"
      @login="loginHandler"
      @registerClick="navigateToRegister"
    />
    <RegisterForm
      v-else
      class="login-form"
      @register="registerHandler"
      @loginClick="navigateToLogin"
    />
  </div>
</template>

<style scoped>
body {
  display: block;
  margin: 0px !important;
  padding: 0px;
}
.container {
  height: calc(100vh - 16px);
  background-color: var(--blue-100);
}
.login-form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
