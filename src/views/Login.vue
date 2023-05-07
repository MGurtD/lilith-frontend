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

const service = new AuthenticationService();
const showLogin = ref(true);

const loginHandler = async (userLogin: UserLogin) => {
  const decodedToken = await service.Login(userLogin);
  console.log(decodedToken);

  const store = useStore();
  store.isLoggedIn = true;
};

const registerHandler = async (userRegister: UserRegister) => {
  console.log(userRegister);

  const decodedToken = await service.Register(userRegister);
  console.log(decodedToken);

  //showLogin.value = true;
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
