<template>
  <div class="container">
    <h1>Home</h1>
  </div>
</template>
<script setup lang="ts">
import { PrimeIcons } from "primevue/api";
import { useStore } from "../store";
import { MenuItem } from "../types";

const store = useStore();

store.setMenuItem({
  text: "general.menu.home",
  icon: PrimeIcons.HOME,
} as MenuItem);
</script>
