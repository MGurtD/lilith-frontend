<template>
  <TableMaterials
    :references="referenceStore.references"
    @add="addReference"
    @edit="editReference"
    @delete="deleteReference"
  ></TableMaterials>
</template>
<script setup lang="ts">
import TableMaterials from "../components/TableMaterials.vue";
import { useRouter } from "vue-router";
import { useStore } from "../../../store";
import { onMounted } from "vue";
import { PrimeIcons } from "primevue/api";
import { Reference } from "../../../modules/shared/types";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { getNewUuid } from "../../../utils/functions";
import { useReferenceStore } from "../../../modules/shared/store/reference";
import { useTaxesStore } from "../../shared/store/tax";
import { useReferenceTypeStore } from "../../shared/store/referenceType";

const router = useRouter();
const store = useStore();
const referenceStore = useReferenceStore();
const taxesStore = useTaxesStore();
const referenceTypeStore = useReferenceTypeStore();
const confirm = useConfirm();
const toast = useToast();

onMounted(async () => {
  let title = "Materials de compra";
  store.setMenuItem({
    icon: PrimeIcons.TICKET,
    title,
  });

  await referenceStore.fetchReferencesByModule("purchase");
  taxesStore.fetchAll();
  referenceTypeStore.fetchAll();
});

const addReference = () => {
  router.push({ path: `/material/${getNewUuid()}` });
};

const editReference = (reference: Reference) => {
  router.push({ path: `/material/${reference.id}` });
};

const deleteReference = (reference: Reference) => {
  confirm.require({
    message: `Está segur que vol eliminar el material ${reference.description}?`,
    icon: "pi pi-question-circle",
    acceptIcon: "pi pi-check",
    rejectIcon: "pi pi-times",
    accept: async () => {
      const response = await referenceStore.deleteReference(reference.id);
      if (!response.result) {
        toast.add({
          severity: "warn",
          summary: response.errors[0],
          life: 5000,
          closable: true,
        });
      } else {
        toast.add({
          severity: "success",
          summary: "Material eliminat correctament",
          life: 5000,
        });
      }
    },
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
