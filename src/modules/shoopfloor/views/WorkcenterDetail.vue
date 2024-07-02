<template>
  <div class="container">
    <header class="header test">
      <div v-if="shopfloorStore.workcenter">
        <p class="header-text">
          {{ shopfloorStore.workcenter.workcenterName }} -
          {{ shopfloorStore.workcenter.workcenterDescription }} - Producció
        </p>
      </div>
    </header>

    <main class="main test">
      <section class="button-panel">
        <div>
          <Button
            v-tooltip="{
              value: 'Canviar estat',
              showDelay: 500,
              hideDelay: 500,
            }"
            severity="secondary"
            class="button-panel-button"
            :icon="PrimeIcons.COG"
          ></Button>
        </div>
        <div>
          <Button
            v-tooltip="{ value: 'Iniciar', showDelay: 500, hideDelay: 500 }"
            severity="secondary"
            class="button-panel-button"
            :icon="PrimeIcons.PLAY"
          ></Button>
        </div>
        <div>
          <Button
            v-tooltip="{ value: 'Parar', showDelay: 500, hideDelay: 500 }"
            severity="secondary"
            class="button-panel-button"
            :icon="PrimeIcons.STOP"
          ></Button>
        </div>
        <div>
          <Button
            v-tooltip="{
              value: 'Següent fase',
              showDelay: 500,
              hideDelay: 500,
            }"
            severity="secondary"
            class="button-panel-button"
            :icon="PrimeIcons.FORWARD"
          ></Button>
        </div>
      </section>
      <section class="test">
        <TabView v-model:activeIndex="activeTab">
          <TabPanel>
            <template #header>
              <div class="flex align-items-center gap-2">
                <i :class="PrimeIcons.CHEVRON_DOWN"></i>
                <span class="font-bold white-space-nowrap">Treball actual</span>
              </div>
            </template>
            <WorkcenterDetailCurrentWork v-if="activeTab === 0" />
          </TabPanel>
          <TabPanel>
            <template #header>
              <div class="flex align-items-center gap-2">
                <i :class="PrimeIcons.LIST"></i>
                <span class="font-bold white-space-nowrap"
                  >Treballs disponibles</span
                >
              </div>
            </template>
            <WorkcenterDetailPlanning v-if="activeTab === 1" />
          </TabPanel>
          <TabPanel>
            <template #header>
              <div class="flex align-items-center gap-2">
                <i :class="PrimeIcons.BOX"></i>
                <span class="font-bold white-space-nowrap"
                  >Consum materials</span
                >
              </div>
            </template>
          </TabPanel>
          <TabPanel>
            <template #header>
              <div class="flex align-items-center gap-2">
                <i :class="PrimeIcons.USERS"></i>
                <span class="font-bold white-space-nowrap">Operaris</span>
              </div>
            </template>
            <WorkcenterDetailOperators v-if="activeTab === 3" />
          </TabPanel>
        </TabView>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useStore } from "../../../store";
import { PrimeIcons } from "primevue/api";
import { useShoopfloorStore } from "../store";
import { usePlantModelStore } from "../../production/store/plantmodel";
import { Operator, Workcenter } from "../../production/types";
import { useRoute } from "vue-router";
import WorkcenterDetailPlanning from "../components/workcenter-detail/WorkcenterDetailPlanning.vue";
import WorkcenterDetailCurrentWork from "../components/workcenter-detail/WorkcenterDetailCurrentWork.vue";
import WorkcenterDetailOperators from "../components/workcenter-detail/WorkcenterDetailOperators.vue";
import { useReferenceStore } from "../../shared/store/reference";
import { useCustomersStore } from "../../sales/store/customers";

const store = useStore();
const route = useRoute();
const shopfloorStore = useShoopfloorStore();
const plantModelStore = usePlantModelStore();
const referenceStore = useReferenceStore();
const customersStore = useCustomersStore();
const workcenterId = ref("");

const activeTab = ref(0);

onMounted(async () => {
  workcenterId.value = route.params.id as string;
  await shopfloorStore.fetchWorkcenter(workcenterId.value);

  if (shopfloorStore.workcenter) {
    store.setMenuItem({
      icon: PrimeIcons.BUILDING,
      title: `Detall de centre de treball`,
      backButtonVisible: true,
    });

    shopfloorStore.getOperator();
  } else {
    store.setMenuItem({
      icon: PrimeIcons.BUILDING,
      title: "No s'ha trobat el centre de treball",
      backButtonVisible: true,
    });
  }

  if (!referenceStore.references || referenceStore.module !== "sales") {
    await referenceStore.fetchReferencesByModule("sales");
  }
  if (!customersStore.customers) {
    await customersStore.fetchCustomers();
  }
});
</script>

<style scoped>
.container {
  display: grid;
  grid-template-rows: 6vh 84vh;
}
.test {
  border: 1px solid black;
}
.header {
  background-color: var(--green-800);
}
.header-text {
  margin-left: 1rem;
  color: lightgray;
}

.main {
  display: grid;
  grid-template-columns: 5% 95%;
  grid-template-rows: 1fr;
  text-align: center;
}

.button-panel-button {
  height: calc(100% - 10px);
  margin: 5px;
  font-size: 1.5rem;
}
.p-button-icon {
  font-size: 2rem;
}
</style>
