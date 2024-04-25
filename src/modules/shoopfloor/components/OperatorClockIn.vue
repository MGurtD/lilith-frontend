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
      <Button
        :icon="PrimeIcons.SIGN_IN"
        rounded
        size="large"
        label="Entrar"
        @click="onSubmit"
      />
    </section>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { PrimeIcons } from "primevue/api";
import { usePlantModelStore } from "../../production/store/plantmodel";
import { useToast } from "primevue/usetoast";
import { Operator } from "../../production/types";

const plantModelStore = usePlantModelStore();
const toast = useToast();
const operatorCode = ref("");

const emit = defineEmits<{
  (e: "submit", operator: Operator): void;
}>();

const onSubmit = () => {
  const operator = plantModelStore.operators?.find(
    (operator) => operator.code === operatorCode.value
  );

  if (operator) {
    emit("submit", operator);
  } else {
    toast.add({
      severity: "error",
      summary: "Operari/a inexistent",
      detail: "Introdueix un codi d'operari/a vàlid",
    });
  }
};
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
