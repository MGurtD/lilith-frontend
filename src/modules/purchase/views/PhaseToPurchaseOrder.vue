<template>
  <DataTable
    :value="purchaseOrders"
    v-model:selection="selectedPhases"
    class="p-datatable-sm small-datatable"
    tableStyle="min-width: 100%"
    scrollable
    scrollHeight="79vh"
    :sort-order="1"
    sort-field="date"
    paginator
    :rows="25"
    dataKey="phaseId"
  >
    <template #header>
      <div
        class="flex flex-wrap align-items-center justify-content-between gap-2"
      >
        <span class="text-xl text-900 font-bold">Seleccionar fases</span>
        <div>
          <Button
            :size="'small'"
            label="Crear comandes"
            rounded
            @click="sendData"
          />
        </div>
      </div>
    </template>
    <Column selectionMode="multiple" headerStyle="width: 1rem"></Column>
    <Column field="workorderDescription" header="Ordre de fabricació"> </Column>
    <Column field="phaseDescription" header="Fase" style="width: 15%"></Column>
    <Column header="Referència">
      <template #body="slotProps">
        {{ getName(slotProps.data.serviceReferenceId) }}
      </template>
    </Column>
    <Column field="quantity" header="Quantitat planificada"> </Column>
    <Column header="Proveïdor">
      <template #body="slotProps">
        <Dropdown
          v-model="selectedSuppliers[slotProps.data.phaseId]"
          :options="suppliersByReference[slotProps.data.phaseId]"
          placeholder="Selecciona..."
          optionValue="id"
          optionLabel="comercialName"
          @change="(event) => updatePhase(slotProps.data.phaseId, event.value)"
        >
        </Dropdown>
      </template>
    </Column>
  </DataTable>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useStore } from "../../../store";
import { useToast } from "primevue/usetoast";
import { PrimeIcons } from "primevue/api";
import { computed, onMounted, ref } from "vue";
import { useWorkOrderStore } from "../../production/store/workorder";
import { SupplierService } from "../services/suppliers.service";
import { PurchaseOrderFromWO, Supplier } from "../types";
import { useReferenceStore } from "../../shared/store/reference";
import { DetailedWorkOrder } from "../../production/types";
import { DetailedWorkOrderService } from "../../production/services/workorder.service";
import { useOrderStore } from "../store/order";

const router = useRouter();
const store = useStore();
const toast = useToast();
const workOrderStore = useWorkOrderStore();
const supplierService = new SupplierService("/supplier");
const referenceStore = useReferenceStore();
const orderStore = useOrderStore();

const selectedPhases = ref<PurchaseOrderFromWO[]>([]);
const suppliersByReference = ref<{ [key: string]: Supplier[] }>({});
const selectedSuppliers = ref<{ [key: string]: string }>({});
const purchaseOrders = ref<PurchaseOrderFromWO[]>([]);

const updatePhase = (phaseId: string, selectedSupplierId: string) => {
  const phaseIndex = selectedPhases.value.findIndex(
    (phase) => phase.phaseId === phaseId
  );

  if (phaseIndex !== -1) {
    selectedPhases.value[phaseIndex].supplierId = selectedSupplierId;
  } else {
    const selectedPhase = purchaseOrders.value.find(
      (phase) => phase.phaseId === phaseId
    );

    if (selectedPhase) {
      selectedPhase.supplierId = selectedSupplierId;
    }
  }
};

const fetchWorkOrderPhases = async () => {
  await workOrderStore.fetchExternalPhases();

  if (workOrderStore.workorderPhases) {
    for (const phase of workOrderStore.workorderPhases) {
      if (phase) {
        await workOrderStore.fetchOne(phase.workOrderId);
        if (workOrderStore.workorder) {
          const purchaseOrder: PurchaseOrderFromWO = {
            workorderId: phase.workOrderId,
            workorderDescription: workOrderStore.workorder.code || "",
            phaseId: phase.id,
            phaseDescription: phase.code + " - " + phase.description || "",
            serviceReferenceId: phase.serviceReferenceId ?? "",
            serviceReferenceName:
              getName(phase.serviceReferenceId ?? "") ?? "Desconeguda",
            supplierId: selectedSuppliers.value[phase.id],
            quantity: workOrderStore.workorder.plannedQuantity || 0,
          };
          purchaseOrders.value.push(purchaseOrder);
        }
      }
    }
  }
};

onMounted(async () => {
  store.setMenuItem({
    icon: PrimeIcons.SHOPPING_CART,
    title: "Generació de comandes de compra",
  });
  await workOrderStore.fetchExternalPhases();
  await referenceStore.fetchReferences();
  await fetchWorkOrderPhases();

  if (purchaseOrders.value && purchaseOrders.value.length > 0) {
    for (const phase of purchaseOrders.value) {
      if (phase && phase.serviceReferenceId != null) {
        const suppliers = await supplierService.getSuppliersReferenceById(
          phase.serviceReferenceId
        );
        suppliersByReference.value[phase.phaseId] = suppliers;
        if (suppliers.length == 0) {
          const allsuppliers = await supplierService.getAll();
          if (allsuppliers) {
            suppliersByReference.value[phase.phaseId] = allsuppliers;
          }
        }
      }
    }
  }
});
const getName = (id: string) => {
  return referenceStore.getFullNameById(id) || "Desconeguda";
};

const sendData = async () => {
  for (const phase of selectedPhases.value) {
    if (
      phase.supplierId == undefined ||
      !phase.supplierId ||
      phase.supplierId == ""
    ) {
      toast.add({
        severity: "error",
        summary: "Proveïdors buits",
        detail: "No poden haver-hi proveïdors buits",
        life: 5000,
      });
      return;
    }
  }
  const result = await orderStore.createFromWo(selectedPhases.value);
  if (!result.result) {
    toast.add({
      severity: "error",
      summary: "Error creació",
      detail: "Error al crear la comanda",
      life: 5000,
    });
  } else {
    toast.add({
      severity: "success",
      summary: "Creació comandes",
      detail: "Comandes creades correctament",
      life: 5000,
    });
    router.push("/purchase-orders");
  }
};
</script>
