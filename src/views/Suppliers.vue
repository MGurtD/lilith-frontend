<template>
  <Button
    class="grid_action_button"
    :icon="PrimeIcons.PLUS"
    @click="createSupplier"
  />
  <TabView>
    <TabPanel>
      <template #header>
        <i :class="PrimeIcons.LINK" class="mr-2"></i>
        <span>Proveïdors</span>
      </template>
      <DataTable
        :value="supplierStore.suppliers"
        tableStyle="min-width: calc(100vw - 300px)"
        @row-click="editSupplier"
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
        <Column>
          <template #body="slotProps">
            <i
              :class="PrimeIcons.TIMES"
              class="grid_column_button"
              @click="deleteSupplier($event, slotProps.data)"
            />
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
import { v4 as uuidv4 } from "uuid";
import { PrimeIcons, ToastSeverity } from "primevue/api";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import { useSuppliersStore } from "../store/suppliers";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { DataTableRowClickEvent } from "primevue/datatable";
import { Supplier, SupplierType } from "../types";

const toast = useToast();
const confirm = useConfirm();
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

const createSupplier = () => {
  router.push({ path: `/suppliers/${uuidv4()}` });
};

const editSupplier = (row: DataTableRowClickEvent) => {
  if (
    !(row.originalEvent.target as any).className.includes("grid_column_button")
  ) {
    router.push({ path: `/suppliers/${row.data.id}` });
  }
};

const deleteSupplier = (event: any, supplier: Supplier) => {
  confirm.require({
    target: event.currentTarget,
    message: `Está segur que vol eliminar el proveïdor ${supplier.comercialName}?`,
    icon: "pi pi-question-circle",
    acceptIcon: "pi pi-check",
    rejectIcon: "pi pi-times",
    accept: async () => {
      const deleted = await supplierStore.deleteSupplier(supplier.id);

      if (deleted) {
        toast.add({
          severity: ToastSeverity.SUCCESS,
          summary: "Eliminat",
          detail: "Proveïdor eliminat correctament",
          life: 3000,
        });
        await supplierStore.fetchSuppliers();
      }
    },
  });
};
</script>
<style>
.grid_action_button {
  position: fixed;
  right: 1rem;
  z-index: 1;
}
.grid_column_button {
  color: var(--red-600);
  cursor: pointer;
}
</style>
