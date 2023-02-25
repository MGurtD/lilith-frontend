<script setup lang="ts">
//import { useRouter } from "vue-router";
//import { useStore } from "./store";
import MenuBar from "primevue/menubar";
import Toolbar from "primevue/toolbar";
import Button from "primevue/button";

//const store = useStore();
//const router = useRouter();

const items = [
  {
    label: "Inici",
    icon: "pi pi-home",
    to: "/",
  },
  {
    label: "Articles",
    items: [
      {
        label: "Articles",
        to: "/config/item",
      },
      {
        label: "Categories d'article",
        to: "/config/category",
      },
    ],
  },
  {
    label: "Operaris",
    items: [
      {
        label: "Categories d'operari",
        to: "/config/employeecategory",
      },
    ],
  },
  {
    label: "Events",
    items: [
      {
        label: "Estats",
        to: "/config/eventstatus",
      },
      {
        label: "Events",
        to: "/data/event",
      },
    ],
  },
];
</script>

<template>
  <Toolbar>
    <template #start>
      <img src="./assets/images/logo.png" class="logo" />
      <h3>Bacchus</h3>
    </template>

    <template #end>
      <i class="pi pi-user" /> &nbsp;&nbsp; Nom usuari &nbsp;&nbsp;
      <Button icon="pi pi-times" class="p-button-danger" />
    </template>
  </Toolbar>
  <MenuBar :model="items" class="navbar" />
  <RouterView />

  <Toast position="top-center" />
</template>

<style lang="scss">
@import "./assets/styles.scss";
</style>
