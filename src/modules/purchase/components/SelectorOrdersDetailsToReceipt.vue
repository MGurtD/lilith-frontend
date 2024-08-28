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
            v-model="selectedReceipt"
            size="small"
          />
        </div>
        <div class="selector-filter-button">
          <Button
            @click="onSelectedClick"
            :size="'small'"
            :icon="PrimeIcons.CHECK_SQUARE"
          ></Button>
        </div>
      </header>
    </template>
    <Column expander style="width: 5%" />
    <Column header="" field="number" style="width: 80%">
      <template #body="slotProps">
        Comanda {{ slotProps.data.number }} | Data prevista
        {{ formatDate(slotProps.data.date) }}
      </template>
    </Column>
    <template #expansion="slotProps">
      <DataTable
        class="p-datatable-sm"
        :value="slotProps.data.details"
        v-model:selection="selectedOrderDetails"
      >
        <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
        <Column header="Referència">
          <template #body="slotProps">
            {{ referenceStore.getFullNameById(slotProps.data.reference.id) }}
          </template>
        </Column>
        <Column field="expectedReceiptDate" header="Data prevista">
          <template #body="slotProps">
            {{ formatDate(slotProps.data.expectedReceiptDate) }}
          </template>
        </Column>
        <Column header="Uds. totals">
          <template #body="slotProps">
            {{ slotProps.data.quantity }}
          </template>
        </Column>
        <Column header="Uds. a recepcionar">
          <template #body="{ data, field }">
            <InputNumber
              size="small"
              v-model="data[field]"
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
import { PurchaseOrder, PurchaseOrderDetail } from "../types";
import { PrimeIcons } from "primevue/api";
import { formatDate } from "../../../utils/functions";
import { useReferenceStore } from "../../shared/store/reference";
import { useLifecyclesStore } from "../../shared/store/lifecycle";

const referenceStore = useReferenceStore();
const lifecycleStore = useLifecyclesStore();
const selectedOrderDetails = ref([] as Array<PurchaseOrderDetail>);
const expandedRows = ref({});

const props = defineProps<{
  orders: Array<PurchaseOrder> | undefined;
}>();
const emits = defineEmits<{
  (e: "selected", receipts: Array<PurchaseOrderDetail>): void;
}>();
const selectedReceipt = ref("");
const filteredOrders = computed(() => {
  var filtered = [] as Array<PurchaseOrder>;

  if (props.orders) {
    filtered = props.orders.filter((o) =>
      o.number.toString().includes(selectedReceipt.value)
    );
  }

  return filtered;
});

const expandAll = () => {
  expandedRows.value = filteredOrders.value.reduce(
    (acc: { [key: string]: boolean }, p) => {
      acc[p.id] = true;
      return acc;
    },
    {}
  );
};

onMounted(() => {
  expandAll();
});

const onCellEditComplete = (event: any) => {
  let { data, newValue, field } = event;
};

const onSelectedClick = () => {
  if (selectedOrderDetails.value.length === 0) return;

  emits("selected", selectedOrderDetails.value);
};
</script>
<style scoped>
.selector-filter {
  display: grid;
  grid-template-columns: 1fr 0.1fr;
}
</style>
