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

const router = useRouter();
const route = useRoute();
const store = useStore();
const referenceStore = useReferenceStore();
const module = ref("");

onMounted(async () => {
  module.value = route.params.module as string;
  await referenceStore.fetchReferencesByModule(module.value);

  let title = "Referencies de ";
  if (module.value === "sales") title += "venta";
  else if (module.value === "purchase") title += "compra";
  else if (module.value === "production") title += "producció";

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

const deleteReference = async (reference: Reference) => {
  await referenceStore.deleteReference(reference.id);
  await referenceStore.fetchReferencesByModule(module.value);
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
