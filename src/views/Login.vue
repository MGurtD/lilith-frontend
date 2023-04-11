<script setup lang="ts">
import {
  UserLogin,
  AuthenticationService,
} from "../api/services/authentications.service";
import LoginForm from "../components/LoginForm.vue";
import { useStore } from "../store";

const service = new AuthenticationService();

const loginHandler = async (userLogin: UserLogin) => {
  console.log(userLogin);

  const decodedToken = await service.Login(userLogin);
  console.log(decodedToken);

  const store = useStore();
  store.isLoggedIn = true;
};
</script>

<template>
  <div class="container">
    <LoginForm class="login-form" @login="loginHandler" />
  </div>
</template>

<style scoped>
.login-form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
