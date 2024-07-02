<template>
  <div class="" v-if="workOrderPhases">
    <DataTable
      :value="workOrderPhases"
      class="p-datatable"
      tableStyle="min-width: 100%"
      scrollable
      scrollHeight="72vh"
    >
      <Column field="workOrder.code" header="OF"></Column>
      <Column field="code" header="Fase">
        <template #body="slotProps">
          {{ slotProps.data.code + " - " + slotProps.data.description }}
        </template>
      </Column>
      <Column header="Client">
        <template #body="slotProps">
          {{
            customerStore.getCustomerNameById(
              slotProps.data.workOrder.reference.customerId
            )
          }}
        </template>
      </Column>
      <Column header="Referència">
        <template #body="slotProps">
          {{
            referenceStore.getFullNameById(slotProps.data.workOrder.referenceId)
          }}
        </template>
      </Column>
      <Column field="workOrder.plannedDate" header="Data">
        <template #body="slotProps">
          {{ formatDate(slotProps.data.workOrder.plannedDate) }} ({{
            slotProps.data.workOrder.order
          }})
        </template>
      </Column>
      <Column field="workOrder.order" header="Preferida">
        <template #body="slotProps">
          <i
            :class="
              slotProps.data.preferredWorkcenterId ===
              shopfloorStore.workcenter?.workcenterId
                ? PrimeIcons.STAR_FILL
                : PrimeIcons.STAR
            "
          ></i>
        </template>
      </Column>
      <Column header="">
        <template #body="slotProps">
          <Button
            :icon="PrimeIcons.SEARCH"
            severity="info"
            size="small"
            @click="openDetail(slotProps.data)"
          ></Button>
          &nbsp;
          <Button
            :icon="PrimeIcons.PLAY"
            severity="success"
            size="small"
            @click="openWorkOrderPhase(slotProps.data)"
          ></Button>
        </template>
      </Column>
    </DataTable>
  </div>

  <Dialog
    v-model:visible="dialogOptions.visible"
    :header="dialogOptions.title"
    :closable="dialogOptions.closable"
    :modal="dialogOptions.modal"
  >
  </Dialog>
</template>

<script setup lang="ts">
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { useShoopfloorStore } from "../../store";
import ProdServices from "../../../production/services";
import { WorkOrder, WorkOrderPhase } from "../../../production/types";
import { PrimeIcons } from "primevue/api";
import { useCustomersStore } from "../../../sales/store/customers";
import { formatDate } from "../../../../utils/functions";
import { useReferenceStore } from "../../../shared/store/reference";
import { DialogOptions } from "../../../../types/component";

const route = useRoute();
const shopfloorStore = useShoopfloorStore();
const referenceStore = useReferenceStore();
const customerStore = useCustomersStore();
const workOrderPhases = ref(undefined as WorkOrderPhase[] | undefined);

// Instancia para controlar el diálogo
const dialogOptions = reactive({
  visible: false,
  title: "Informació de la ordre de fabricació",
  closable: true,
  position: "center",
  modal: true,
} as DialogOptions);

onMounted(async () => {
  const id = route.params.id as string;
  if (!shopfloorStore.workcenter) {
    shopfloorStore.fetchWorkcenter(id);
  }

  workOrderPhases.value = await ProdServices.PlanningService.GetByWorkcenterId(
    id
  );
});

const openDetail = async (phase: WorkOrderPhase) => {
  dialogOptions.visible = true;
};

const openWorkOrderPhase = async (phase: WorkOrderPhase) => {
  await shopfloorStore.openWorkOrderPhase(phase.id);
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
