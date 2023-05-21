<template>
  <TabView>
    <TabPanel>
      <template #header>
        <i :class="PrimeIcons.BUILDING" class="mr-2"></i>
        <span>Proveïdor</span>
      </template>
      <FormSupplier @submit="submitForm" />
    </TabPanel>
    <TabPanel v-if="formMode === FormActionMode.EDIT">
      <template #header>
        <i :class="PrimeIcons.USERS" class="mr-2"></i>
        <span>Contactes</span>
      </template>
      <SupplierContacts
        @create="addContact"
        @update="editContact"
        @delete="removeContact"
      />
    </TabPanel>
  </TabView>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useSuppliersStore } from "../store/suppliers";
import { PrimeIcons, ToastSeverity } from "primevue/api";

import FormSupplier from "../components/forms/FormSupplier.vue";
import { storeToRefs } from "pinia";
import { Supplier, SupplierContact } from "../types";
import { useStore } from "../store";

import { useToast } from "primevue/usetoast";
import { FormActionMode } from "../types/component";
import SupplierContacts from "../components/tables/SupplierContacts.vue";

const formMode = ref(FormActionMode.EDIT);
const route = useRoute();
const store = useStore();
const supplierStore = useSuppliersStore();
const { supplier } = storeToRefs(supplierStore);

const loadView = async () => {
  await supplierStore.fetchSupplier(route.params.id as string);
  supplierStore.fetchSupplierTypes();

  // Comprovar existencia del proveïdor
  let pageTitle = "";
  if (!supplier.value) {
    formMode.value = FormActionMode.CREATE;
    supplierStore.setNewSupplier(route.params.id as string);
    pageTitle = "Alta de proveïdor";
  } else {
    formMode.value = FormActionMode.EDIT;
    pageTitle = `Proveïdor ${supplier.value.comercialName}`;
  }

  store.setMenuItem({
    icon: PrimeIcons.BUILDING,
    text: pageTitle,
    backButtonVisible: true,
  });
};

onMounted(async () => {
  await loadView();
});

const toast = useToast();
const submitForm = async () => {
  const data = supplier.value as Supplier;
  let result = false;
  let message = "";

  if (formMode.value === FormActionMode.CREATE) {
    result = await supplierStore.createSupplier(data);
    message = "Proveïdor creat correctament";
  } else {
    result = await supplierStore.updateSupplier(data.id, data);
    message = "Proveïdor actualizat correctament";
  }

  if (result) {
    toast.add({
      severity: "success",
      summary: message,
      life: 5000,
    });
    await loadView();
  }
};

const addContact = async (contact: SupplierContact) => {
  const result = await supplierStore.addContactToSupplier(contact);
  if (result) {
    toast.add({
      severity: "success",
      summary: "Contacte afegit",
      life: 5000,
    });
  }
};

const editContact = async (contact: SupplierContact) => {
  const result = await supplierStore.updateContactFromSupplier(contact);
  if (result) {
    toast.add({
      severity: "success",
      summary: "Contacte actualizat",
      life: 5000,
    });
  }
};

const removeContact = async (contact: SupplierContact) => {
  const result = await supplierStore.removeContactFromSupplier(contact);
  if (result) {
    toast.add({
      severity: "success",
      summary: "Contacte eliminat",
      life: 5000,
    });
  }
};
</script>
