<script setup lang="ts">
import { ref } from "vue";
import { UserLogin } from "../../api/services/authentications.service";
import { useToast } from "primevue/usetoast";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";

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
        src="../../assets/images/logo.jpg"
        alt="Image"
        height="100"
        class="mb-3"
      />
    </div>

    <div>
      <div class="input">
        <label for="username" class="block text-900 font-medium mb-2">{{
          $t("login.username")
        }}</label>
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-user"></i>
          </InputGroupAddon>
          <InputText
            id="username"
            type="text"
            class="w-full"
            v-model="userLogin.username"
            @keyup.enter="login"
          />
        </InputGroup>
      </div>

      <div class="input">
        <label for="password" class="block text-900 font-medium mb-2">{{
          $t("login.password")
        }}</label>
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-key"></i>
          </InputGroupAddon>
          <InputText
            id="password"
            type="password"
            class="w-full"
            v-model="userLogin.password"
            @keyup.enter="login"
          />
        </InputGroup>
      </div>

      <Button
        :label="$t('login.btnSignIn')"
        class="w-full"
        @click="login"
      ></Button>
    </div>
  </div>
</template>
<style lang="css" scoped>
.input {
  margin-bottom: 1.5rem;
}
</style>
