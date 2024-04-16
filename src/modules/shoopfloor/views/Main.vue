<template>
  <main class="shoopfloor__main">
    <section>
      <div class="shoopfloor__icons">
        <img
          src="../../../assets/images/logo.jpg"
          alt="Logo Temges"
          class="home__logo"
        />
      </div>

      <InputText
        class="touch__input"
        v-model="operatorCode"
        placeholder="Introdueix el codi d'operari/a"
        label="Nom"
      />
      <Button :icon="PrimeIcons.SIGN_IN" rounded size="large" label="Entrar" />
    </section>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "../../../store";
import { PrimeIcons } from "primevue/api";
import { useShoopfloorStore } from "../store";

const store = useStore();
const shopfloorStore = useShoopfloorStore();
const operatorCode = ref("");

onMounted(async () => {
  store.setMenuItem({
    icon: PrimeIcons.BUILDING,
    title: "Operativa de planta",
  });
});
</script>

<style scoped>
.shoopfloor__main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
}
.touch__input {
  display: block;
  width: 70vw;
  font-size: 48px;
  text-align: center;
  margin-bottom: 5vh;
}
.home__logo {
  height: 16vh;
  margin-bottom: 5vh;
}
.shoopfloor__icons {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
