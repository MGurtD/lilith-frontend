<template>
  <main class="home">
    <!--<img src="../assets/images/logo.jpg" alt="Logo Temges" class="home__logo" />-->
  </main>

  <FileEntityPicker
    entity="PurchaseInvoice"
    id="99dbce5c-0623-4921-8af4-442d626aa013"
  />
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import { useStore } from "../store";
import FileEntityPicker from "../components/FileEntityPicker.vue";

const store = useStore();

onMounted(() => {
  store.setMenuItem({
    text: "",
    icon: "",
  });
});
</script>

<style scoped>
.home__logo {
  height: 30vh;
  display: block;
  position: absolute;
  top: calc(50% - var(--top-panel-height));
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
