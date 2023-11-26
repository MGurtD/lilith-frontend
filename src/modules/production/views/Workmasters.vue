<template>
  <DataTable
    :value="filteredData"
    tableStyle="min-width: 100%"
    @row-click="editRow"
  >
    <template #header>
      <div
        class="flex flex-wrap align-items-center justify-content-between gap-2"
      >
        <div class="datatable-filter">
          <div class="filter-field">
            <label class="block text-900 mb-2">Referència</label>
            <Dropdown
              v-model="filter.referenceId"
              showClear
              editable
              :options="referenceStore.references"
              optionValue="id"
              optionLabel="description"
              class="w-full"
            />
          </div>
        </div>
        <div class="datatable-buttons">
          <Button
            class="datatable-button mr-2"
            :icon="PrimeIcons.FILTER_SLASH"
            rounded
            raised
            @click="cleanFilter"
          />
          <Button
            :icon="PrimeIcons.PLUS"
            rounded
            raised
            @click="createButtonClick"
          />
        </div>
      </div>
    </template>
    <Column header="Referencia" style="width: 50%">
      <template #body="slotProps">
        {{ getReferenceDefinition(slotProps.data.reference) }}
      </template>
    </Column>
    <Column
      field="baseQuantity"
      header="Quantitat Base"
      style="width: 25%"
    ></Column>
    <Column header="Desactivada" style="width: 25%">
      <template #body="slotProps">
        <BooleanColumn :value="slotProps.data.disabled" />
      </template>
    </Column>
    <Column>
      <template #body="slotProps">
        <i
          :class="PrimeIcons.TIMES"
          class="grid_delete_column_button"
          @click="deleteButton($event, slotProps.data)"
        />
      </template>
    </Column>
  </DataTable>

  
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import { useStore } from "../../../store";
import { computed, onMounted, ref } from "vue";
import { PrimeIcons } from "primevue/api";
import { DataTableRowClickEvent } from "primevue/datatable";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import { useWorkMasterStore } from "../store/workmaster";
import { useReferenceStore } from "../../shared/store/reference";
import { WorkMaster } from "../types";
import { Reference } from "../../shared/types";
import { getNewUuid } from "../../../utils/functions";

const router = useRouter();
const store = useStore();
const toast = useToast();
const confirm = useConfirm();
const workMasterStore = useWorkMasterStore();
const referenceStore = useReferenceStore();

const filter = ref({
  referenceId: undefined,
});
const cleanFilter = () => {
  filter.value.referenceId = undefined;
};

const filteredData = computed(() => {
  if (!workMasterStore.workmasters) return [];
  if (!filter.value.referenceId) return workMasterStore.workmasters;

  return workMasterStore.workmasters!.filter(
    (w) => w.id === filter.value.referenceId
  );
});

const getReferenceDefinition = (reference: Reference) => {
  if (!reference) return "";

  return `${reference.code} - ${reference.description} (${reference.version})`;
};

onMounted(async () => {
  await workMasterStore.fetchAll();
  await referenceStore.fetchReferencesByModule("sales");

  store.setMenuItem({
    icon: PrimeIcons.CALENDAR,
    title: "Gestió de rutes de fabricació",
  });
});

const createButtonClick = () => {
  const newId = getNewUuid();
  workMasterStore.setNew(newId);

  router.push({ path: `/workmaster/${newId}` });
};

const editRow = (row: DataTableRowClickEvent) => {
  if (
    !(row.originalEvent.target as any).className.includes(
      "grid_delete_column_button"
    )
  ) {
    router.push({ path: `/workmaster/${row.data.id}` });
  }
};
const deleteButton = (event: any, workmaster: WorkMaster) => {
  confirm.require({
    target: event.currentTarget,
    message: `Está segur que vol eliminar la ruta ${
      workmaster.reference!.description
    }?`,
    icon: "pi pi-question-circle",
    acceptIcon: "pi pi-check",
    rejectIcon: "pi pi-times",
    accept: async () => {
      const deleted = await workMasterStore.delete(workmaster.id);

      if (deleted) {
        toast.add({
          severity: "success",
          summary: "Eliminada",
          life: 3000,
        });
        await workMasterStore.fetchAll();
      }
    },
  });
};
</script>
