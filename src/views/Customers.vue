<template>
  <Button
    :icon="PrimeIcons.PLUS"
    class="grid_add_row_button"
    rounded
    @click="createButtonClick"
  />

<TabView v-model:activeIndex="selectedTabIndex">
</TabView>


</template>
<script setup lang="ts">
import { v4 as uuidv4 } from "uuid";
import { PrimeIcons, ToastSeverity } from "primevue/api";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import { useCustomersStore } from "../store/customers";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { DataTableRowClickEvent } from "primevue/datatable";
import { Customer, CustomerType } from "../types";
import { useStore } from "../store";

const selectedTabIndex = ref(0);
const toast = useToast();
const confirm = useConfirm();
const router = useRouter();
const store = useStore();
const customerStore = useCustomersStore();

onMounted(async () => {
  await customerStore.fetchCustomers();
  store.setMenuItem({
    text: "Gestió de clients",
    icon: PrimeIcons.HASHTAG,
  });
});

const deleteCustomer = (event: any, customer: Customer) => {
  confirm.require({
    target: event.currentTarget,
    message: `Está segur que vol eliminar el client ${customer.comercialName}?`,
    icon: "pi pi-question-circle",
    acceptIcon: "pi pi-check",
    rejectIcon: "pi pi-times",
    accept: async () => {
      const deleted = await customerStore.deleteCustomer(customer.id);

      if (deleted) {
        toast.add({
          severity: "success",
          summary: "Eliminat",
          life: 3000,
        });
        await customerStore.fetchCustomers();
      }
    },
  });
};

const createButtonClick = () => {
  if (selectedTabIndex.value === 0) {
    router.push({ path: `/customer/${uuidv4()}` });
  } else {
    router.push({ path: `/customer-types/${uuidv4()}` });
  }
};
</script>
