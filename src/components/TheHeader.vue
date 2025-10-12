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
        size="normal"
        shape="circle"
        @click="showOverlayPanel"
      />
      <OverlayPanel ref="op">
        <div class="user-menu">
          <div class="user-menu__header">
            <Avatar
              :label="store.user.username.substring(0, 1).toUpperCase()"
              class="user-menu__avatar"
              size="large"
              shape="circle"
            />
            <div class="user-menu__name">
              {{ store.user.firstName }} {{ store.user.lastName }}
            </div>
            <div class="user-menu__username">@{{ store.user.username }}</div>
          </div>

          <div class="divider" />

          <div class="user-menu__section">
            <label class="user-menu__label">Idioma</label>
            <LanguageSwitcher
              v-model="store.user.preferredLanguage"
              :changeAppLanguage="true"
            />
          </div>

          <div class="user-menu__actions">
            <Button
              :icon="PrimeIcons.SIGN_OUT"
              label="Tancar sessió"
              class="w-full p-button-lg"
              @click="logoutClick"
            />
          </div>
        </div>
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
import LanguageSwitcher from "./LanguageSwitcher.vue";

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
  padding-top: 0.3rem;
  padding-bottom: 0.5rem;
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
  font-size: 1.2rem;
}

.title-bar__back {
  font-size: 1.3rem;
  margin-right: 1rem;
  cursor: pointer;
}

.title-bar__back:hover {
  color: #fff;
}

.title-bar__user {
  padding-top: 0.2rem;
  margin-right: 1.5vw;
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

/* New user overlay menu styles */
.user-menu {
  min-width: 16rem;
  padding: 0.75rem;
}

.user-menu__header {
  display: grid;
  grid-template-columns: 3rem 1fr;
  grid-template-rows: auto auto;
  column-gap: 0.75rem;
  align-items: center;
}

.user-menu__avatar {
  grid-row: span 2;
}

.user-menu__name {
  font-weight: 600;
  color: var(--surface-900, #1f2937);
}

.user-menu__username {
  font-size: 0.85rem;
  color: var(--surface-500, #6b7280);
}

.divider {
  height: 1px;
  background: var(--surface-200, #e5e7eb);
  margin: 0.75rem 0;
}

.user-menu__section {
  display: grid;
  gap: 0.5rem;
}

.user-menu__label {
  font-size: 0.85rem;
  color: var(--surface-600, #4b5563);
}

.user-menu__actions {
  margin-top: 0.75rem;
}

.title-bar__operator {
  display: grid;
  grid-template-columns: 1fr 0.4fr;
  align-items: center;
  gap: 1rem;
}
</style>
