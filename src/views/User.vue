<template>
  <FormUser
    :roles="roles"
    :user="user"
    @change-password="changePassword"
    @submit="submitForm"
  />
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { PrimeIcons } from "primevue/api";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "../store";
import { useToast } from "primevue/usetoast";
import { Role, UserLogin } from "../api/services/authentications.service";
import { AuthenticationService } from "../api/services/authentications.service";
import { UserService } from "../api/services/user.service";
import { RoleService } from "../api/services/role.service";
import { User } from "../types";
import FormUser from "../components/forms/FormUser.vue";

const router = useRouter();
const route = useRoute();
const store = useStore();
const user = ref(undefined as undefined | User);
const roles = ref<Role[]>();

const roleService = new RoleService();
const service = new UserService();

const loadView = async () => {
  user.value = await service.GetById(route.params.id as string);
  roles.value = await roleService.GetAll();

  if (user.value) {
    store.setMenuItem({
      icon: PrimeIcons.USER,
      title: `Usuari ${user.value.username}`,
      backButtonVisible: true,
    });
  }
};

onMounted(async () => {
  await loadView();
});

const toast = useToast();
const submitForm = async () => {
  const data = user.value as User;
  let message = "Usuari actualizat correctament";

  const updated = await service.Update(data);
  if (updated) {
    toast.add({
      severity: "success",
      summary: message,
      life: 5000,
    });
    router.back();
  }
};

const changePassword = async (request: UserLogin) => {
  const service = new AuthenticationService();
  const changed = await service.ChangePassword(request);

  if (changed) {
    toast.add({
      severity: "success",
      summary: "Canvi de contrasenya",
      detail: "Contrasenya actualitzada",
      life: 10000,
    });
  } else {
    toast.add({
      severity: "error",
      summary: "Canvi de contrasenya",
      detail: "Error al actualitzar contrasenya",
      life: 10000,
    });
  }
};
</script>
