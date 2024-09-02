<template>
  <DataTable
    class="p-datatable-sm"
    tableStyle="min-width: 100%"
    scrollable
    scrollHeight="75vh"
    dataKey="id"
    v-model:expandedRows="expandedRows"
    :value="filteredOrders"
  >
    <template #header>
      <header class="selector-filter">
        <div class="selector-filter-field">
          <label for="">Buscar</label> &nbsp;
          <InputText
            style="width: 150px; height: 35px"
            v-model="filterReference"
            size="small"
          />
        </div>
        <div>
          <div>
            <Button
              @click="onSelectedClick"
              :size="'small'"
              :icon="PrimeIcons.CHECK_SQUARE"
              label="Afegir"
            ></Button>
          </div>
        </div>
      </header>
    </template>
    <Column expander style="width: 5%" />
    <Column header="" field="number" style="width: 80%">
      <template #body="slotProps">
        <b
          >Comanda {{ slotProps.data.number }} | Data prevista
          {{ formatDate(slotProps.data.date) }}
        </b>
      </template>
    </Column>
    <template #expansion="slotProps">
      <DataTable
        class="p-datatable-sm"
        :value="slotProps.data.details"
        v-model:selection="selectedOrderDetails"
      >
        <Column selectionMode="multiple" headerStyle="width: 2rem"></Column>
        <Column header="Referència" headerStyle="width: 50%">
          <template #body="{ data }">
            {{ referenceStore.getFullNameById(data.reference.id) }}
          </template>
        </Column>
        <Column header="Qtt. total" headerStyle="width: 20%">
          <template #body="{ data }">
            {{ data.quantity }}
          </template>
        </Column>
        <Column header="Qtt. rebuda" headerStyle="width: 20%">
          <template #body="{ data }">
            {{ data.receivedQuantity }}
          </template>
        </Column>
        <Column header="A recepcionar" headerStyle="width: 20%">
          <template #body="{ data }">
            <InputNumber
              size="small"
              v-model="data.pendingQuantity"
              :min="0"
              :max="data.pendingQuantity"
            />
          </template>
        </Column>
      </DataTable>
    </template>
  </DataTable>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import {
  AddReceptionsRequest,
  PurchaseOrder,
  PurchaseOrderDetail,
  PurchaseOrderDetailWithPendingQuantity,
  Receipt,
} from "../types";
import { PrimeIcons } from "primevue/api";
import { formatDate, getNewUuid } from "../../../utils/functions";
import { useReferenceStore } from "../../shared/store/reference";
import { useToast } from "primevue/usetoast";
import { useStore } from "../../../store";

const toast = useToast();
const store = useStore();
const referenceStore = useReferenceStore();
const localOrders = ref([] as Array<PurchaseOrder>);
const expandedRows = ref({});
const filterReference = ref("");
const selectedOrderDetails = ref(
  [] as Array<PurchaseOrderDetailWithPendingQuantity>
);

const props = defineProps<{
  receipt: Receipt;
  orders: Array<PurchaseOrder> | undefined;
}>();
const emits = defineEmits<{
  (e: "selected", receipts: AddReceptionsRequest): void;
}>();

const filteredOrders = computed(() => {
  var filtered = [] as Array<PurchaseOrder>;
  if (localOrders.value) {
    // Filter orders by reference full name
    filtered = localOrders.value.filter((o) =>
      o.details.some((d) => {
        const referenceFullName = referenceStore.getFullNameById(d.referenceId);
        return referenceFullName.includes(filterReference.value.toLowerCase());
      })
    );
  }
  return filtered;
});

const expandAll = () => {
  expandedRows.value = localOrders.value.reduce(
    (acc: { [key: string]: boolean }, p) => {
      acc[p.id] = true;
      return acc;
    },
    {}
  );
};

onMounted(() => {
  if (!props.orders) {
    console.error("No orders to show");
    return;
  }

  // Asignar `localOrders` con los valores de `props.orders` y añadir `pendingQuantity`
  localOrders.value = props.orders.map((o) => ({
    ...o,
    details: o.details.map((d) => ({
      ...d,
      pendingQuantity: d.quantity - d.receivedQuantity,
    })),
  }));

  expandAll();
});

const onSelectedClick = () => {
  if (selectedOrderDetails.value.length === 0) {
    toast.add({
      severity: "warn",
      summary: "Selecció inválida",
      detail: "Selecciona alguna línia per afegir-la a l'albarà",
      life: 6000,
    });

    return;
  }

  const addReceptionsRequest = {
    receiptId: props.receipt.id,
    receptions: selectedOrderDetails.value.map((d) => {
      return {
        receiptDetailId: getNewUuid(),
        purchaseOrderDetailId: d.id,
        quantity: d.pendingQuantity,
        user: store.user?.username,
      };
    }),
  } as AddReceptionsRequest;

  emits("selected", addReceptionsRequest);
};
</script>
<style scoped>
.selector-filter {
  display: grid;
  grid-template-columns: 1fr 0.1fr;
}
</style>
