<template>
  <TableReferences
    :module="module"
    :references="referenceStore.references"
    @add="addReference"
    @edit="editReference"
    @delete="deleteReference"
  ></TableReferences>
</template>
<script setup lang="ts">
import { v4 as uuidv4 } from "uuid";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "../../../store";
import { useReferenceStore } from "../store/reference";
import { onMounted, ref } from "vue";
import { PrimeIcons } from "primevue/api";
import TableReferences from "../components/TableReferences.vue";
import { Reference } from "../types";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { GenericResponse } from "../../../types";

const router = useRouter();
const route = useRoute();
const store = useStore();
const referenceStore = useReferenceStore();
const confirm = useConfirm();
const toast = useToast();
const module = ref("");

onMounted(async () => {
  module.value = route.params.module as string;
  await referenceStore.fetchReferencesByModule(module.value);

  let title = "";
  if (module.value === "sales") title = "Referencies de venta";
  else if (module.value === "purchase") title = "Materies primeres";
  else if (module.value === "production") title = "Referencies de producció";

  store.setMenuItem({
    icon: PrimeIcons.TICKET,
    title,
  });
});

const addReference = () => {
  router.push({ path: `/reference/${module.value}/${uuidv4()}` });
};

const editReference = (reference: Reference) => {
  router.push({ path: `/reference/${module.value}/${reference.id}` });
};

const deleteReference = (reference: Reference) => {
  confirm.require({
    message: `Está segur que vol eliminar el material ${reference.description}?`,
    icon: "pi pi-question-circle",
    acceptIcon: "pi pi-check",
    rejectIcon: "pi pi-times",
    accept: async () => {
      const response = await referenceStore.deleteReference(reference.id);
      console.log(response);
      if (!response.result) {
        ShowResponseErrorToast(response);
      } else {
        ShowToast();
      }
    },
  });
};

const ShowResponseErrorToast = (response: GenericResponse<Reference>) => {
  toast.add({
    severity: "error",
    summary: response.errors[0],
    life: 3000,
    closable: true,
  });
};

const ShowToast = () => {
  toast.add({
    severity: "success",
    summary: "Eliminat",
    life: 3000,
  });
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
