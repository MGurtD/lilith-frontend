<template>
  <div class="card">
    <DataTable
      :value="users"
      removableSort
      tableStyle="min-width: 50rem"
      @row-click="openUser"
    >
      <template #header>
        <div
          class="flex flex-wrap align-items-center justify-content-between gap-2"
        >
          <span class="text-xl text-900 font-bold">Usuaris</span>
        </div>
      </template>
      <Column
        field="username"
        header="Nom d'usuari"
        sortable
        style="width: 20%"
      ></Column>
      <Column
        field="firstName"
        header="Nom"
        sortable
        style="width: 20%"
      ></Column>
      <Column
        field="lastName"
        header="Cognoms"
        sortable
        style="width: 20%"
      ></Column>
      <Column header="Desactivat" sortable style="width: 20%">
        <template #body="slotProps">
          <BooleanColumn :value="slotProps.data.disabled" :showColor="false" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { User, UserService } from "../api/services/user.service";
import { useStore } from "../store";
import { PrimeIcons } from "primevue/api";
import BooleanColumn from "../components/tables/BooleanColumn.vue";
import { useRouter } from "vue-router";
import { DataTableRowClickEvent } from "primevue/datatable";

const service = new UserService();
const users = ref(undefined as User[] | undefined);
const store = useStore();
const router = useRouter();

const fetchUsers = async () => {
  users.value = await service.GetAll();
};

const openUser = (row: DataTableRowClickEvent) => {
  router.push({ path: `/user/${row.data.id}` });
};

onMounted(async () => {
  store.setMenuItem({
    icon: PrimeIcons.USERS,
    title: "Gestió d'usuaris",
  });

  await fetchUsers();
});
</script>
