<template>
  <DataTable
    :value="filteredData"
    tableStyle="min-width: 100%"
    scrollable
    scrollHeight="80vh"
    @row-click="editRow"
  >
    <template #header>
      <div class="references-header">
        <div class="references-filter">
          <label>Codi</label>
          <BaseInput v-model="filter.code" />
        </div>
        <Button
          style="float: right"
          :icon="PrimeIcons.PLUS"
          rounded
          raised
          @click="createButtonClick"
        />
      </div>
    </template>
    <Column field="code" header="Codi" style="width: 15%"></Column>
    <Column field="description" header="Descripció" style="width: 35%"></Column>
    <Column
      v-if="isSales"
      field="version"
      header="Versió"
      style="width: 15%"
    ></Column>
    <Column
      v-if="isSales"
      field="cost"
      header="Cost"
      style="width: 20%"
    ></Column>
    <Column
      v-if="isSales"
      field="price"
      header="Preu"
      style="width: 20%"
    ></Column>
    <Column
      v-if="isPurchase"
      field="referenceTypeId"
      header="Tipus"
      style="width: 10%"
    >
      <template #body="slotProps">
        <span>{{ getTypeDescription(slotProps.data.referenceTypeId) }}</span>
      </template>
    </Column>
    <Column
      v-if="isPurchase"
      field="referenceFormatId"
      header="Format"
      style="width: 10%"
    >
      <template #body="slotProps">
        <span>{{
          getFormatDescription(slotProps.data.referenceFormatId)
        }}</span>
      </template>
    </Column>
    <Column
      v-if="isPurchase"
      field="density"
      header="Densitat"
      style="width: 10%"
    ></Column>
    <Column
      v-if="isPurchase"
      field="lastPurchaseCost"
      header="Última Compra"
      style="width: 15%"
    ></Column>
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
import BaseInput from "../../../components/BaseInput.vue";
import { computed, ref } from "vue";
import { useReferenceStore } from "../store/reference";

import { PrimeIcons } from "primevue/api";
import { DataTableRowClickEvent } from "primevue/datatable";
import { Reference } from "../types";
import { useReferenceTypeStore } from "../store/referenceType";

const referenceTypeStore = useReferenceTypeStore();
const referenceStore = useReferenceStore();
const filter = ref({
  code: "",
});

const props = defineProps<{
  module: string;
  references: Array<Reference> | undefined;
}>();

const emit = defineEmits<{
  (e: "add"): void;
  (e: "edit", reference: Reference): void;
  (e: "delete", reference: Reference): void;
}>();

const isSales = computed(() => {
  return props.module === "sales";
});
const isPurchase = computed(() => {
  return props.module === "purchase";
});
const isProduction = computed(() => {
  return props.module === "production";
});

const filteredData = computed(() => {
  if (!props.references) return [];

  if (filter.value.code.length > 0) {
    return props.references.filter((r) => r.code.includes(filter.value.code));
  } else {
    return referenceStore.references;
  }
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

const getFormatDescription = (formatId: string) => {
  const format = referenceStore.referenceFormats?.find(
    (f) => f.id === formatId
  );
  if (format) return format.description;
  else return "";
};

const getTypeDescription = (typeId: string) => {
  const type = referenceTypeStore.referenceTypes?.find((f) => f.id === typeId);
  if (type) return type.name;
  else return "";
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