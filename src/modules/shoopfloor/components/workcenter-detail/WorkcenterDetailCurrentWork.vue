<template>
  <main class="current-work-container" v-if="shopfloorStore.workcenter">
    <div class="workcenter-picture-container"></div>
    <Panel header="Informació treball actual">
      <article class="current-work-information" v-if="phaseInformation">
        <h4>
          Ordre: {{ phaseInformation.workOrderPhase.workOrder?.code }} | Fase
          {{ phaseInformation.workOrderPhase.code }} -
          {{ phaseInformation.workOrderPhase.description }}
        </h4>
        <h4>
          Referencia:
          {{
            referenceStore.getFullNameById(
              phaseInformation.workOrderPhase.workOrder!.referenceId
            )
          }}
        </h4>
        <h4>
          Client:
          {{
            customersStore.getCustomerNameById(
              phaseInformation.workOrderPhase.workOrder!.reference!
                .customerId as string
            )
          }}
        </h4>
        <h4>
          Hora inici: {{ formatDateTime(firstPhase?.phaseStartTime as any) }}
        </h4>
        <h4>Quantitat OK: {{ firstPhase?.counterOk }}</h4>
        <h4>Quantitat KO: {{ firstPhase?.counterKo }}</h4>
        <div class="progress-bar">
          <ProgressBar :value="75"></ProgressBar>
        </div>
      </article>
      <article v-else>
        <p>No hi ha treball carregat al centre de treball</p>
      </article>
    </Panel>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useShoopfloorStore } from "../../store";
import { formatDateTime, loadImage } from "../../../../utils/functions";
import Panel from "primevue/panel";
import ProgressBar from "primevue/progressbar";
import ProductionServices from "../../../production/services";
import { WorkOrderPhaseShoopfloor } from "../../../production/types";
import { useReferenceStore } from "../../../shared/store/reference";
import { useCustomersStore } from "../../../sales/store/customers";

const route = useRoute();
const shopfloorStore = useShoopfloorStore();
const referenceStore = useReferenceStore();
const customersStore = useCustomersStore();
const phaseInformation = ref(undefined as undefined | WorkOrderPhaseShoopfloor);

onMounted(async () => {
  //if (!shopfloorStore.workcenter) {
  const id = route.params.id as string;
  await shopfloorStore.fetchWorkcenter(id, true);
  //}

  if (shopfloorStore.workcenterImageBlob) {
    const imageElement = await loadImage(shopfloorStore.workcenterImageBlob);
    imageElement.classList.add("workcenter-picture");
    imageElement.style.maxWidth = "400px";
    imageElement.style.maxHeight = "400px";
    document
      .querySelector(".workcenter-picture-container")
      ?.appendChild(imageElement);
  }

  if (firstPhase.value) {
    phaseInformation.value =
      await ProductionServices.PlanningService.GetWorkOrderPhaseById(
        firstPhase.value.phaseId
      );
  }
});

const firstPhase = computed(() => {
  if (!shopfloorStore.workcenter) return;

  if (
    shopfloorStore.workcenter.workOrderPhases &&
    shopfloorStore.workcenter.workOrderPhases.length > 0
  ) {
    return shopfloorStore.workcenter.workOrderPhases[0];
  }
});
</script>

<style scoped>
.current-work-container {
  display: grid;
  grid-template-columns: 1fr 3fr;
}

.current-work-information {
  text-align: left;
}

.workcenter-picture {
  max-width: 400px;
  max-height: 400px;
}

.progress-bar {
  width: 50%;
}
</style>
