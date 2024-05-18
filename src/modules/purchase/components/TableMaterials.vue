<template>
  <DataTable
    :value="filteredData"
    tableStyle="min-width: 100%"
    scrollable
    scrollHeight="80vh"
    paginator
    :rows="12"
    @row-click="editRow"
  >
    <template #header>
      <div
        class="flex flex-wrap align-items-center justify-content-between gap-2"
      >
        <div class="datatable-filter">
          <div class="filter-field">
            <label>Codi</label>
            <BaseInput v-model="filter.code" />
          </div>
          <div class="filter-field">
            <label>Tipus</label>
            <DropdownReferenceTypes label="" v-model="filter.referenceTypeId" />
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
            class="datatable-button mr-2"
            :icon="PrimeIcons.PLUS"
            rounded
            raised
            @click="createButtonClick"
          />
        </div>
      </div>
    </template>
    <Column field="code" header="Codi" style="width: 15%"></Column>
    <Column field="description" header="Descripció" style="width: 25%"></Column>
    <Column field="referenceTypeId" header="Tipus" style="width: 30%">
      <template #body="slotProps">
        <span>{{ getTypeDescription(slotProps.data.referenceTypeId) }}</span>
      </template>
    </Column>
    <Column header="Densitat (mm)" style="width: 10%">
      <template #body="slotProps">
        {{ getReferenceTypeDensity(slotProps.data.referenceTypeId) }}
      </template>
    </Column>
    <Column field="referenceFormatId" header="Format" style="width: 10%">
      <template #body="slotProps">
        <span>{{
          getFormatDescription(slotProps.data.referenceFormatId)
        }}</span>
      </template>
    </Column>
    <!-- <Column field="lastPurchaseCost" header="Última Compra" style="width: 10%">
      <template #body="slotProps">
        {{ formatCurrency(slotProps.data.lastPurchaseCost) }}
      </template>
    </Column> -->
    <Column header="Desc." style="width: 10%">
      <template #body="slotProps">
        <BooleanColumn :value="slotProps.data.disabled" />
      </template>
    </Column>
    <Column style="width: 10%">
      <template #body="slotProps">
        <i
          :class="PrimeIcons.TIMES"
          class="grid_delete_column_button"
          @click="onDeleteRow($event, slotProps.data)"
        />
      </template>
    </Column>
  </DataTable>
</template>

<script setup lang="ts">
import DropdownReferenceTypes from "../../../modules/shared/components/DropdownReferenceType.vue";
import BaseInput from "../../../components/BaseInput.vue";
import { computed, ref } from "vue";
import { useReferenceStore } from "../../shared/store/reference";
import { PrimeIcons } from "primevue/api";
import { DataTableRowClickEvent } from "primevue/datatable";
import { Reference } from "../../shared/types";
import { useReferenceTypeStore } from "../../shared/store/referenceType";

const referenceTypeStore = useReferenceTypeStore();
const referenceStore = useReferenceStore();
const filter = ref({
  code: "",
  referenceTypeId: "",
});

const cleanFilter = () => {
  filter.value.code = "";
  filter.value.referenceTypeId = "";
};

const props = defineProps<{
  references: Array<Reference> | undefined;
}>();

const emit = defineEmits<{
  (e: "add"): void;
  (e: "edit", reference: Reference): void;
  (e: "delete", reference: Reference): void;
}>();

const filteredData = computed(() => {
  if (!props.references) return [];
  let filteredReferences = props.references;

  // Customer filter
  if (filter.value.referenceTypeId!.length > 0) {
    filteredReferences = filteredReferences.filter(
      (r) => r.referenceTypeId === filter.value.referenceTypeId
    );
  }
  // Code filter
  if (filter.value.code.length > 0) {
    filteredReferences = filteredReferences.filter((r) =>
      r.code.toLowerCase().includes(filter.value.code.toLowerCase())
    );
  }

  return filteredReferences;
});

const createButtonClick = () => {
  emit("add");
};

const editRow = (row: DataTableRowClickEvent) => {
  if (
    !(row.originalEvent.target as any).className.includes(
      "grid_delete_column_button"
    )
  ) {
    emit("edit", row.data);
  }
};

const onDeleteRow = (event: any, reference: Reference) => {
  emit("delete", reference);
};

const getReferenceTypeDensity = (referenceTypeId: string) => {
  const referenceType =
    referenceTypeStore.getReferenceTypeById(referenceTypeId);
  return referenceType ? referenceType.density : 0;
};

const getFormatDescription = (formatId: string) => {
  const format = referenceStore.referenceFormats?.find(
    (f) => f.id === formatId
  );
  if (format) return format.description;
  else return "";
};

const getTypeDescription = (referenceTypeId: string) => {
  const referenceType =
    referenceTypeStore.getReferenceTypeById(referenceTypeId);
  return referenceType ? referenceType.description : "";
};
</script>
<style scoped>
.references-header {
  display: grid;
  grid-template-columns: 3fr 0.1fr;
}
.references-filter {
  display: grid;
  grid-template-columns: 0.2fr 0.8fr;
  align-items: center;
  width: 25vw;
}
</style>
