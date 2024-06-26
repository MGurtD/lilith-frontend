<template>
  <DataTable
    :value="inventoryStore.inventories"
    tableStyle="min-width: 100%"
    scrollable
    scrollHeight="80vh"
  >
    <template #header>
      <div
        class="flex flex-wrap align-items-center justify-content-between gap-2"
      >
        <span class="text-xl text-900 font-bold">Inventari</span>
        <div>
          <Button :icon="PrimeIcons.PLUS" rounded raised @click="newMovement" />
          &nbsp;
          <Button
            :icon="PrimeIcons.SAVE"
            rounded
            raised
            @click="saveMovement"
          />
        </div>
      </div>
    </template>
    <Column header="Producte" style="width: 28%">
      <template #body="slotProps">
        {{ referenceStore.getFullNameById(slotProps.data.referenceId) }}
      </template>
    </Column>
    <Column field="oldQuantity" header="Uds." style="width: 12%"></Column>
    <Column header="Recompte" style="width: 12%">
      <template #body="slotProps">
        <BaseInput
          class="mb-2"
          label=""
          id="newQuantity"
          v-model="slotProps.data.newQuantity"
        ></BaseInput>
      </template>
    </Column>
    <Column field="width" header="Ample (x) mm" style="width: 12%"></Column>
    <Column field="length" header="Llarg (y) mm" style="width: 12%"></Column>
    <Column field="height" header="Alt (z) mm" style="width: 12%"></Column>
    <Column field="diameter" header="Diàmetre mm" style="width: 12%"></Column>
    <Column field="thickness" header="Gruix mm" style="width: 12%"></Column>
  </DataTable>
  <Dialog :closable="true" v-model:visible="isDialogVisible" :modal="true">
    <FormInventoryNewMovements
      :newMovement="newStockMovement"
      @submit="submitDetailForm"
    />
  </Dialog>
</template>
<script setup lang="ts">
import { v4 as uuidv4 } from "uuid";
import BaseInput from "../../../components/BaseInput.vue";
import { useStore } from "../../../store";
import { useStockStore } from "../store/stock";
import { useInventoryStore } from "../store/inventory";
import { useReferenceStore } from "../../shared/store/reference";

import { onMounted, ref } from "vue";
import { PrimeIcons } from "primevue/api";
import { useToast } from "primevue/usetoast";
import { Inventory, StockMovement } from "../types";
import { useStockMovementStore } from "../store/stockMovement";
import FormInventoryNewMovements from "../components/FormInventoryNewMovements.vue";
import { getNewUuid } from "../../../utils/functions";

const store = useStore();

const stockStore = useStockStore();
const referenceStore = useReferenceStore();
const inventoryStore = useInventoryStore();
const stockMovementStore = useStockMovementStore();
const toast = useToast();

onMounted(async () => {
  store.setMenuItem({
    icon: PrimeIcons.BOX,
    title: "Inventari",
  });

  await refreshData();
});

const refreshData = async () => {
  await stockStore.fetchStocks();
  inventoryStore.inventories = [];
  stockStore.stocks?.forEach((stock) => {
    let invent = {
      id: uuidv4(),
      stockId: stock.id,
      movementType: "bal",
      locationId: stock.locationId,
      referenceId: stock.referenceId,
      oldQuantity: stock.quantity,
      newQuantity: stock.quantity,
      width: stock.width,
      length: stock.length,
      height: stock.height,
      diameter: stock.diameter,
      thickness: stock.thickness,
      movementDate: new Date(),
    } as Inventory;
    inventoryStore.inventories?.push(invent);
  });
  await referenceStore.fetchReferences();
};

const isDialogVisible = ref(false);
const newStockMovement = ref({} as Inventory);

const submitDetailForm = (inventory: Inventory) => {
  inventoryStore.inventories?.push(inventory);
  isDialogVisible.value = false;
};

const newMovement = () => {
  isDialogVisible.value = true;
  newStockMovement.value = {
    id: getNewUuid(),
    stockId: getNewUuid(),
    movementType: "",
    locationId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    referenceId: "",
    oldQuantity: 0,
    newQuantity: 0,
    width: 0,
    length: 0,
    height: 0,
    diameter: 0,
    thickness: 0,
    movementDate: new Date(),
  } as Inventory;
};

const saveMovement = async () => {
  let stock = {
    id: "",
    stockId: "",
    movementType: "",
    locationId: "",
    referenceId: "",
    quantity: 0,
    width: 0,
    length: 0,
    height: 0,
    diameter: 0,
    thickness: 0,
    movementDate: new Date(),
    description: "",
  } as StockMovement;
  let result = false;
  let promises = [] as Array<Promise<boolean>>;

  inventoryStore.inventories
    ?.filter((el) => el.newQuantity != el.oldQuantity)
    .forEach(async (m) => {
      if (m.newQuantity < m.oldQuantity) {
        stock = {
          id: m.id,
          stockId: m.stockId,
          movementType: "OUTPUT",
          locationId: m.locationId,
          referenceId: m.referenceId,
          quantity: m.newQuantity - m.oldQuantity,
          width: m.width,
          length: m.length,
          height: m.height,
          diameter: m.diameter,
          thickness: m.thickness,
          movementDate: m.movementDate,
          description: "Sortida per inventari",
        };
      } else if (m.newQuantity > m.oldQuantity) {
        stock = {
          id: m.id,
          stockId: m.stockId,
          movementType: "INPUT",
          locationId: m.locationId,
          referenceId: m.referenceId,
          quantity: m.newQuantity - m.oldQuantity,
          width: m.width,
          length: m.length,
          height: m.height,
          diameter: m.diameter,
          thickness: m.thickness,
          movementDate: m.movementDate,
          description: "Entrada per inventari",
        };
      }

      promises.push(stockMovementStore.Create(stock));
    });

  const results = await Promise.all(promises);
  console.log(results);
  if (results.filter((p) => p === true).length === promises.length) {
    toast.add({
      severity: "success",
      summary: "Inventari creat correctament",
      life: 5000,
    });

    refreshData();
  } else {
    toast.add({
      severity: "error",
      summary: "Error al crear el moviment d'inventari",
      life: 5000,
    });
  }
};
</script>
