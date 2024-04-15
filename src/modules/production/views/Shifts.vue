<template>
  <main class="container">
    <section class="two-columns">
      <div>
        <DataTable
          :value="shiftStore.shifts"
          tableStyle="min-width: 100%"
          @row-click="selectShift"
        >
          <template #header>
            <div
              class="flex flex-wrap align-items-center justify-content-between gap-2"
            >
              <span class="text-xl text-900 font-bold">Torns</span>
              <Button
                :icon="PrimeIcons.PLUS"
                rounded
                raised
                @click="openShift"
              />
            </div>
          </template>
          <Column field="name" header="Nom"></Column>
          <Column field="disabled" header="Inactiu"></Column>
        </DataTable>
      </div>
      <div>
        <DataTable
          :value="shiftStore.shiftdetails"
          tableStyle="min-width: 100%"
        >
          <template #header>
            <div
              class="flex flex-wrap align-items-center justify-content-between gap-2"
            >
              <span class="text-xl text-900 font-bold">Horaris</span>
              <Button
                :icon="PrimeIcons.PLUS"
                rounded
                raised
                @click="openShiftDetail"
              />
            </div>
          </template>
          <Column field="startTime" header="Hora inici"></Column>
          <Column field="endTime" header="Hora fi"></Column>
          <Column field="isProductiveTime" header="Temps Productiu"></Column>
        </DataTable>
      </div>
    </section>
  </main>
  <Dialog
    v-model:visible="dialogOptions.visible"
    :header="dialogOptions.title"
    :closable="dialogOptions.closable"
    :modal="dialogOptions.modal"
  >
    <FormShift v-if="shift" :shift="shift" />
    <form v-if="shiftStore.shiftdetail">3</form>
  </Dialog>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { PrimeIcons } from "primevue/api";
import { useStore } from "../../../store";
import { Shift } from "../types";
import { useToast } from "primevue/usetoast";
import { useShiftStore } from "../store/shift";
import { DataTableRowClickEvent } from "primevue/datatable";
import { FormActionMode, DialogOptions } from "../../../types/component";
import FormShift from "../components/FormShift.vue";
import { storeToRefs } from "pinia";
import { getNewUuid } from "../../../utils/functions";

const store = useStore();
const shiftStore = useShiftStore();
const toast = useToast();

const { shift, shiftdetail } = storeToRefs(shiftStore);
let shiftDetail = false;

const openShift = () => {
  shiftStore.setNewShift(getNewUuid());
  shiftDetail = false;
  dialogOptions.visible = true;
  dialogOptions.title = "Alta de torns";
};

const openShiftDetail = () => {
  shiftDetail = true;
  dialogOptions.visible = true;
  dialogOptions.title = "Configuració de torns";
};

const dialogOptions = reactive({
  visible: false,
  title: "",
  closable: true,
  position: "center",
  modal: true,
} as DialogOptions);

const selectShift = async (row: DataTableRowClickEvent) => {
  await shiftStore.fetchShiftDetailsByShiftId(row.data.id);
  console.log(row.data);
};

onMounted(async () => {
  await shiftStore.fetchAllShifts();
});

const submitForm = async () => {
  const data = shift.value as Shift;
  let result = false;
  result = await shiftStore.createShift(data);
  if (result) {
    toast.add({
      severity: "success",
      summary: "Torn creat correctament",
      life: 5000,
    });
  }
};
</script>
