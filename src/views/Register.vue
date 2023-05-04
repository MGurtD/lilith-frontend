<script setup lang="ts">
import {
  AuthenticationService,
  UserRegister,
} from "../api/services/authentications.service";
import RegisterForm from "../components/RegisterForm.vue";
import { useStore } from "../store";

const service = new AuthenticationService();

const registerHandler = async (userRegister: UserRegister) => {
  console.log(userRegister);

  const decodedToken = await service.Register(userRegister);
  console.log(decodedToken);

  const store = useStore();
  store.isLoggedIn = true;
};
</script>

<template>
  <div class="container">
    <RegisterForm class="register-form" @register="registerHandler" />
  </div>
</template>

<style scoped>
.register-form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
