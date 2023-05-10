<template>
  <div class="container">
    <h1>Home</h1>
  </div>
</template>
<script setup lang="ts">
import { PrimeIcons } from "primevue/api";
import { useStore } from "../store";
import { MenuItem } from "../types";
import { onMounted } from "vue";
import jwtDecode from "jwt-decode";

const store = useStore();

store.setMenuItem({
  text: "general.menu.home",
  icon: PrimeIcons.HOME,
} as MenuItem);

onMounted(() => {
  const authorization = store.getAuthorization();
  if (authorization) {
    const decodedToken = jwtDecode(authorization.token) as any;
    console.log(decodedToken);

    if (decodedToken.id) {
      
    }
  }
});
</script>
