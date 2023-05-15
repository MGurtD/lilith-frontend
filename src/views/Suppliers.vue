<template>
  <TabView>
    <TabPanel>
      <template #header>
        <i :class="PrimeIcons.LINK" class="mr-2"></i>
        <span>Proveïdors</span>
      </template>
      <DataTable
        :value="supplierStore.suppliers"
        tableStyle="min-width: calc(100vw - 300px)"
        @row-click="navigateToSupplier"
      >
        <Column field="comercialName" header="Nom Comercial"></Column>
        <Column field="taxName" header="Nom Fiscal"></Column>
        <Column field="cif" header="CIF"></Column>
        <Column field="phone" header="Telèfon"></Column>
        <Column header="Tipus">
          <template #body="slotProps">
            <span>{{
              getSupplierTypeName(slotProps.data.supplierTypeId)
            }}</span>
          </template>
        </Column>
      </DataTable>
    </TabPanel>
    <TabPanel>
      <template #header>
        <i class="pi pi-calendar mr-2"></i>
        <span>Tipus de Proveïdor</span>
      </template>
      <DataTable
        :value="supplierStore.supplierTypes"
        tableStyle="min-width: calc(100vw - 300px)"
      >
        <Column field="name" header="Nom" style="width: 50%"></Column>
        <Column
          field="description"
          header="Descripció"
          style="width: 50%"
        ></Column>
      </DataTable>
    </TabPanel>
  </TabView>
</template>
<script setup lang="ts">
import { PrimeIcons } from "primevue/api";
import { useSuppliersStore } from "../store/suppliers";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { DataTableRowClickEvent } from "primevue/datatable";

const router = useRouter();
const supplierStore = useSuppliersStore();

onMounted(async () => {
  await supplierStore.fetchSuppliers();
  await supplierStore.fetchSupplierTypes();
});

const getSupplierTypeName = (id: string) => {
  const supplierType = supplierStore.supplierTypes?.find((st) => st.id === id);
  if (supplierType) {
    return supplierType.name;
  }
};

const navigateToSupplier = (row: DataTableRowClickEvent) => {
  router.push({ path: `/suppliers/${row.data.id}` });
};
</script>
