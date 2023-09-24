<template>
  <DataTable
    :value="filteredData"
    tableStyle="min-width: 100%"
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
    <Column field="cost" header="Cost" style="width: 20%"></Column>
    <Column field="price" header="Preu" style="width: 20%"></Column>
    <Column header="Desactivada" style="width: 10%">
      <template #body="slotProps">
        <BooleanColumn :value="slotProps.data.disabled" />
      </template>
    </Column>
  </DataTable>
</template>
<script setup lang="ts">
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "vue-router";
import { useStore } from "../../../store";
import { useReferenceStore } from "../store/reference";
import { computed, onMounted, ref } from "vue";
import { PrimeIcons } from "primevue/api";
import { DataTableRowClickEvent } from "primevue/datatable";
import BaseInput from "../../../components/BaseInput.vue";

const router = useRouter();
const store = useStore();
const referenceStore = useReferenceStore();
const filter = ref({
  code: "",
});

const filteredData = computed(() => {
  if (!referenceStore.references) return [];

  if (filter.value.code.length > 0) {
    return referenceStore.references.filter((r) =>
      r.code.includes(filter.value.code)
    );
  } else {
    return referenceStore.references;
  }
});

onMounted(async () => {
  await referenceStore.fetchReferences();

  store.setMenuItem({
    icon: PrimeIcons.SHOPPING_BAG,
    title: "Gestió de referencies",
  });
});

const createButtonClick = () => {
  router.push({ path: `/referencia/${uuidv4()}` });
};

const editRow = (row: DataTableRowClickEvent) => {
  if (
    !(row.originalEvent.target as any).className.includes(
      "grid_delete_column_button"
    )
  ) {
    router.push({ path: `/referencia/${row.data.id}` });
  }
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
