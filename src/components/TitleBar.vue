<template>
  <div class="title-bar" :class="{ collapsed: store.menuCollapsed }">
    <div class="title-bar__page">
      <!-- <i class="title-bar__page__icon" :class="store.currentMenuItem.icon"></i> -->
      <span class="title-bar__page__text">{{
        store.currentMenuItem.text
      }}</span>
    </div>
    <div class="title-bar__user" v-if="store.user">
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

const emits = defineEmits(["logoutClick"]);
const store = useStore();
const op = ref();
const showOverlayPanel = (event: any) => {
  op.value.toggle(event);
};
const logoutClick = () => emits("logoutClick");
</script>

<style scoped>
.title-bar {
  position: fixed;
  background-color: var(--blue-900);
  color: var(--bluegray-200);
  top: 0;
  left: 250px;
  height: var(--top-panel-height);
  display: grid;
  grid-template-columns: 0.7fr 0.3fr;
  padding-top: 1rem;
  padding-bottom: 1rem;
  width: calc(100vw - 250px);
  transition: all 0.3s ease-in-out;
}

.collapsed {
  left: 50px;
  width: calc(100vw - 50px);
}

.title-bar__page {
  margin-left: 1vw;
  margin-top: 0.4rem;
  text-align: left;
}

.title-bar__page__text {
  font-size: 1.5rem;
}

.title-bar__page__icon {
  font-size: 1.5rem;
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
</style>
