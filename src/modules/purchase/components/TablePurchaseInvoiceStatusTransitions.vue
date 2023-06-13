<template>
  <DataTable
    v-if="purchaseInvoiceStatus"
    class="p-datatable-small"
    :value="purchaseInvoiceStatus.transitions"
  >
    <template #header>
      <div
        class="flex flex-wrap align-items-center justify-content-between gap-2"
      >
        <span class="text-xl text-900 font-bold">Transicions</span>
        <div>
          <Dropdown
            v-model="selectedTransition"
            :options="purchaseInvoiceStatuses"
            placeholder="Selecciona un estat"
            optionLabel="name"
          />
          <Button
            :icon="PrimeIcons.PLUS"
            rounded
            raised
            @click="addButtonClick"
          />
        </div>
      </div>
    </template>
    <Column field="name" header="Nom"></Column>
    <Column field="description" header="Descripció"></Column>
    <Column>
      <template #body="slotProps">
        <i
          :class="PrimeIcons.TIMES"
          class="grid_delete_column_button"
          @click="deleteButtonClick($event, slotProps.data)"
        />
      </template>
    </Column>
  </DataTable>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";
import { PurchaseInvoiceTransition } from "../types";
import { storeToRefs } from "pinia";
import { PrimeIcons } from "primevue/api";
import { useConfirm } from "primevue/useconfirm";
import { usePurchaseStore } from "../store/invoices";
import { PurchaseInvoiceStatus } from "../types";

const confirm = useConfirm();

const purchaseInvoiceStatusStore = usePurchaseStore();
const { purchaseInvoiceStatuses } = storeToRefs(purchaseInvoiceStatusStore);

const props = defineProps<{
  purchaseInvoiceStatus: PurchaseInvoiceStatus | undefined;
}>();

const emit = defineEmits<{
  (e: "add", transition: PurchaseInvoiceTransition): void;
  (e: "delete", transition: PurchaseInvoiceTransition): void;
}>();

const selectedTransition = ref(
  undefined as PurchaseInvoiceTransition | undefined
);

const addButtonClick = () => {
  const transition = {
    id: uuidv4(),
    fromStatusId: props.purchaseInvoiceStatus?.id,
    toStatusId: selectedTransition.value?.id,
  } as PurchaseInvoiceTransition;

  emit("add", transition);
};

const deleteButtonClick = (
  event: any,
  transition: PurchaseInvoiceTransition
) => {
  confirm.require({
    target: event.currentTarget,
    message: `Está segur que vol eliminar la transició?`,
    icon: "pi pi-question-circle",
    acceptIcon: "pi pi-check",
    rejectIcon: "pi pi-times",
    accept: () => {
      emit("delete", {
        id: selectedTransition.value?.id,
        fromStatusId: props.purchaseInvoiceStatus?.id,
        toStatusId: transition.id,
      } as PurchaseInvoiceTransition);
    },
  });
};
</script>
