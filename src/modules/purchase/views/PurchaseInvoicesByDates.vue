<template>
  <DataTable
    class="small-datatable"
    v-model:selection="selectedInvoices"
    :value="purchaseInvoices"
    tableStyle="min-width: 100%"
    @row-click="editPurchaseInvoiceStatus"
  >
    <template #header>
      <div
        class="flex flex-wrap align-items-center justify-content-between gap-2"
      >
        <div class="datatable-filter">
          <div class="filter-field">
            <label class="block text-900 mb-2">Data inici</label>
            <Calendar v-model="filter.startDate" dateFormat="dd/mm/yy" />
          </div>
          <div class="filter-field">
            <label class="block text-900 mb-2">Data fi</label>
            <Calendar v-model="filter.endDate" dateFormat="dd/mm/yy" />
          </div>
          <div class="filter-field">
            <label class="block text-900 mb-2">Gestionades</label>
            <Checkbox v-model="filter.managed" :binary="true" />
          </div>
        </div>
        <div class="datatable-buttons">
          <Button
            class="datatable-button"
            :icon="PrimeIcons.FILTER"
            rounded
            raised
            @click="filterInvoices"
          />
          <Button
            :icon="PrimeIcons.CHECK"
            :disabled="selectedInvoices.length === 0"
            rounded
            raised
            severity="success"
            @click="filterInvoices"
          />
        </div>
      </div>
    </template>
    <Column selectionMode="multiple" style="width: 2%"></Column>
    <Column field="number" header="Número" style="width: 20%"></Column>
    <Column
      field="supplierNumber"
      header="Núm. Prov."
      style="width: 20%"
    ></Column>
    <Column header="Data" style="width: 20%">
      <template #body="slotProps">
        {{ formatDate(slotProps.data.purchaseInvoiceDate) }}
      </template>
    </Column>
    <Column field="grossAmount" header="Import" style="width: 20%"></Column>
  </DataTable>
</template>
<script setup lang="ts">
import { v4 as uuidv4 } from "uuid";
import { PrimeIcons } from "primevue/api";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import { usePurchaseStore } from "../store/invoices";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { DataTableRowClickEvent } from "primevue/datatable";
import { PurchaseInvoice, PurchaseInvoiceStatus } from "../types";
import { useStore } from "../../../store";
import { PurchaseInvoiceService } from "../services/purchase.service";
import { formatDate } from "../../../utils/functions";

const toast = useToast();
const confirm = useConfirm();
const router = useRouter();
const store = useStore();
const purchaseStore = usePurchaseStore();

const filter = ref({
  startDate: undefined,
  endDate: undefined,
  managed: false,
});
const purchaseInvoices = ref([] as Array<PurchaseInvoice> | undefined);
const selectedInvoices = ref([] as Array<PurchaseInvoice>);

const service = new PurchaseInvoiceService("/PurchaseInvoice");

onMounted(async () => {
  purchaseInvoices.value = await service.getAll();
  store.setMenuItem({
    icon: PrimeIcons.SERVER,
    text: "Gestió de factures",
  });
});
const createButtonClick = () => {
  router.push({ path: `/purchaseinvoicestatus/${uuidv4()}` });
};

const editPurchaseInvoiceStatus = (row: DataTableRowClickEvent) => {
  if (
    !(row.originalEvent.target as any).className.includes(
      "grid_delete_column_button"
    )
  ) {
    router.push({ path: `/purchaseinvoicestatus/${row.data.id}` });
  }
};

const filterInvoices = () => {
  console.log(filter.value);
};
</script>
<style scoped>
.datatable-filter {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.datatable-button {
  margin-right: 1rem;
}
</style>
