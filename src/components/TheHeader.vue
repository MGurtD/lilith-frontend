<template>
  <div class="title-bar" :class="{ collapsed: store.menuCollapsed }">
    <div class="title-bar__page">
      <i
        v-if="store.currentMenuItem.backButtonVisible"
        class="title-bar__back"
        :class="PrimeIcons.ARROW_LEFT"
        @click="goBack"
      ></i>
      <span class="title-bar__page__text">{{
        store.currentMenuItem.title
      }}</span>
    </div>
    <div v-if="shopfloorStore.operator" class="title-bar__user">
      <div class="title-bar__operator">
        <p class="header-text">
          {{ shopfloorStore.operator.name }}
          {{ shopfloorStore.operator.surname }}
        </p>
        <Button
          :icon="PrimeIcons.SIGN_OUT"
          size="small"
          severity="secondary"
          label="Sortir"
          @click="logoutOperator"
        />
      </div>
    </div>
    <div class="title-bar__user" v-else-if="store.user">
      <Avatar
        :label="store.user.username.substring(0, 1).toUpperCase()"
        class="title-bar__user__avatar"
        size="large"
        shape="circle"
        @click="showOverlayPanel"
      />
      <OverlayPanel ref="op">
        <p class="title-bar__user__overlaypanel__text">
          {{ store.user.firstName }} {{ store.user.lastName }}
        </p>
        <Button label="Tancar sessió" @click="logoutClick" />
      </OverlayPanel>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "../store";
import Avatar from "primevue/avatar";
import OverlayPanel from "primevue/overlaypanel";
import { PrimeIcons } from "primevue/api";
import { useRouter } from "vue-router";
import { useShoopfloorStore } from "../modules/shoopfloor/store";

const emits = defineEmits(["logoutClick", "logoutOperatorClick"]);
const shopfloorStore = useShoopfloorStore();

const store = useStore();
const op = ref();
const showOverlayPanel = (event: any) => {
  op.value.toggle(event);
};
const logoutClick = () => emits("logoutClick");
const logoutOperator = () => emits("logoutOperatorClick");

const router = useRouter();
const goBack = () => router.back();
</script>

<style scoped>
.title-bar {
  position: fixed;
  background-color: var(--blue-900);
  color: var(--bluegray-200);
  top: 0;
  left: var(--side-bar-width);
  height: var(--top-panel-height);
  display: grid;
  grid-template-columns: 0.7fr 0.3fr;
  padding-top: 0.5rem;
  padding-bottom: 1rem;
  width: calc(100vw - var(--side-bar-width));
  transition: all 0.3s ease-in-out;
}

.collapsed {
  left: 60px;
  width: calc(100vw - var(--side-bar-collapsed-width));
}

.title-bar__page {
  margin-left: 1vw;
  margin-top: 0.4rem;
  text-align: left;
}

.title-bar__page__text {
  font-size: 1.5rem;
}

.title-bar__back {
  font-size: 1.5rem;
  margin-right: 1rem;
  cursor: pointer;
}

.title-bar__back:hover {
  color: #fff;
}

.title-bar__user {
  margin-right: 2vw;
  font-size: 1rem;
  text-align: right;
}

.title-bar__user__avatar {
  background-color: var(--blue-100);
  color: black;
  cursor: pointer;
}

.title-bar__user__overlaypanel__text {
  text-align: center;
}

.title-bar__operator {
  display: grid;
  grid-template-columns: 1fr 0.4fr;
  align-items: center;
  gap: 1rem;
}
</style>
