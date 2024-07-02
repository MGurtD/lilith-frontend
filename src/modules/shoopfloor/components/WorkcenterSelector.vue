<template>
  <main class="">
    <div v-for="area in plantModelStore.areas" :key="area.id">
      <div v-if="areaHasWorkcenters(area.id)">
        <header class="area__header">
          <span>{{ area.name }}</span>
          <i class="pi pi-chevron-down area__header__icon"></i>
        </header>

        <section class="area__workcenters">
          <Card
            v-for="workcenter in workcentersByArea(area.id)"
            :key="workcenter.id"
            class="workcenter"
            @click="() => $router.push(`/workcenter-detail/${workcenter.id}`)"
          >
            <template #header>
              <div class="workcenter__color"></div>
            </template>
            <template #title>
              <span class="workcenter__name">{{
                workcenter.description.substring(0, 25)
              }}</span>
            </template>
            <template #content>
              <div class="workcenter__field">
                <span class="workcenter__field__icon"
                  ><i :class="PrimeIcons.COG"></i
                ></span>
                <span class="workcenter__field__value">24009</span>
              </div>
              <div class="workcenter__field">
                <span class="workcenter__field__icon"
                  ><i class="pi pi-barcode"></i
                ></span>
                <span class="workcenter__field__value"
                  >5760P - Rectificació</span
                >
              </div>
              <div class="workcenter__field">
                <span class="workcenter__field__icon"
                  ><i :class="PrimeIcons.CLOCK"></i
                ></span>
                <span class="workcenter__field__value">01:30:52</span>
              </div>
              <div class="workcenter__field">
                <span class="workcenter__field__icon"
                  ><i :class="PrimeIcons.USERS"></i
                ></span>
                <span class="workcenter__field__value">2</span>
              </div>
            </template>
          </Card>
        </section>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import Card from "primevue/card";
import { PrimeIcons } from "primevue/api";
import { computed } from "vue";
import { usePlantModelStore } from "../../production/store/plantmodel";
import { Workcenter } from "../../production/types";

const plantModelStore = usePlantModelStore();

const areaHasWorkcenters = (areaId: string): boolean => {
  if (!plantModelStore.workcenters) {
    return false;
  }

  return (
    plantModelStore.workcenters.filter((w) => w.areaId === areaId).length > 0
  );
};

const workcentersByArea = (areaId: string): Array<Workcenter> => {
  if (!plantModelStore.workcenters) return [];
  return plantModelStore.workcenters.filter((w) => w.areaId === areaId);
};
</script>

<style scoped>
.area__header {
  font-size: 1.5rem;
  color: var(--bluegray-600);
  font-weight: bold;
  padding-left: 1rem;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid var(--bluegray-600);
}
.area__header__icon {
  float: right;
  margin-right: 1rem;
  font-size: 2rem;
}
.area__workcenters {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(
    auto-fill,
    minmax(20vw, calc(25vw - var(--side-bar-collapsed-width)))
  );
  margin-bottom: 1rem;
}
.workcenter {
  cursor: pointer;
}
.workcenter__name {
  font-size: 1.15rem;
  font-weight: bold;
}
.workcenter__color {
  width: 100%;
  height: 1rem;
  background-color: var(--green-800);
}
.workcenter__field__icon > i {
  color: var(--blue-800);
}
.workcenter__field {
  display: grid;
  grid-template-columns: 1fr 5fr;
  padding-bottom: 0.5rem;
}
</style>
