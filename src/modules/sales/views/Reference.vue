<template>
  <FormReference v-if="reference" :reference="reference" @submit="submitForm" />

  <TabView v-if="reference">
    <TabPanel header="Documentació">
      <FileEntityPicker
        title="Documentació"
        entity="referenceMaps"
        :id="reference.id"
      />
    </TabPanel>
    <TabPanel
      header="Rutes de fabricació"
      v-if="formMode === FormActionMode.EDIT"
    >
      <DataTable
        :value="workmasterStore.workmasters"
        tableStyle="min-width: 100%"
        scrollable
        scrollHeight="80vh"
        sort-field="reference.code"
        :sort-order="1"
        @row-click="editWorkmaster"
      >
        <template #header>
          <div
            class="flex flex-wrap align-items-center justify-content-between gap-2"
          >
            <div>
              <label class="block text-900">Rutes de fabricació</label>
            </div>
            <div class="datatable-buttons">
              <Button
                :icon="PrimeIcons.PLUS"
                rounded
                raised
                @click="createWorkmaster"
              />
            </div>
          </div>
        </template>
        <Column
          field="baseQuantity"
          header="Quantitat Base"
          style="width: 10%"
        ></Column>
        <Column field="machineCost" header="Cost màquina" style="width: 10%">
          <template #body="slotProps">
            {{ formatCurrency(slotProps.data.machineCost) }}
          </template>
        </Column>
        <Column field="operatorCost" header="Cost operari" style="width: 10%">
          <template #body="slotProps">
            {{ formatCurrency(slotProps.data.operatorCost) }}
          </template>
        </Column>
        <Column field="materialCost" header="Cost material" style="width: 10%">
          <template #body="slotProps">
            {{ formatCurrency(slotProps.data.materialCost) }}
          </template>
        </Column>
        <Column field="externalCost" header="Cost extern" style="width: 10%">
          <template #body="slotProps">
            {{ formatCurrency(slotProps.data.externalCost) }}
          </template>
        </Column>
        <Column header="Cost total" style="width: 10%">
          <template #body="slotProps">
            {{
              formatCurrency(
                slotProps.data.machineCost +
                  slotProps.data.operatorCost +
                  slotProps.data.materialCost +
                  slotProps.data.externalCost
              )
            }}
          </template>
        </Column>
        <!--     <Column>
      <template #body="slotProps">
        <i
          :class="PrimeIcons.COPY"
          class="grid_copy_column_button"
          @click="copyWorkmaster($event, slotProps.data)"
        />
      </template>
    </Column> -->
        <Column>
          <template #body="slotProps">
            <i
              :class="PrimeIcons.TIMES"
              class="grid_delete_column_button"
              @click="deleteWorkmaster($event, slotProps.data)"
            />
          </template>
        </Column>
      </DataTable>
    </TabPanel>
  </TabView>
</template>
<script setup lang="ts">
import FormReference from "../components/FormReference.vue";
import FileEntityPicker from "../../../components/FileEntityPicker.vue";
import { onMounted, ref } from "vue";
import { FormActionMode } from "../../../types/component";
import { PrimeIcons } from "primevue/api";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useStore } from "../../../store";
import { useToast } from "primevue/usetoast";
import { useReferenceStore } from "../../shared/store/reference";
import { useTaxesStore } from "../../shared/store/tax";
import { useWorkMasterStore } from "../../production/store/workmaster";
import { Reference, ReferenceCategoryEnum } from "../../shared/types";
import { getNewUuid } from "../../../utils/functions";
import { DataTableRowClickEvent } from "primevue/datatable";
import { useConfirm } from "primevue/useconfirm";
import { formatCurrency } from "../../../utils/functions";

const formMode = ref(FormActionMode.EDIT);
const route = useRoute();
const router = useRouter();
const store = useStore();
const taxesStore = useTaxesStore();
const referenceStore = useReferenceStore();
const workmasterStore = useWorkMasterStore();
const confirm = useConfirm();

const { reference } = storeToRefs(referenceStore);
const id = ref("");
const module = ref("");

const loadView = async () => {
  taxesStore.fetchAll();
  workmasterStore.fetchByReferenceId(id.value);
  await referenceStore.fetchReference(id.value);

  let pageTitle = "";
  if (!reference.value) {
    formMode.value = FormActionMode.CREATE;
    referenceStore.setNewReference(id.value, ReferenceCategoryEnum.PRODUCT);
    pageTitle = `Alta de referència`;
  } else {
    formMode.value = FormActionMode.EDIT;
    pageTitle = `Referència ${reference.value.code} - ${reference.value.description}`;
  }

  store.setMenuItem({
    icon: PrimeIcons.BUILDING,
    backButtonVisible: true,
    title: pageTitle,
  });
};

onMounted(async () => {
  id.value = route.params.id as string;
  module.value = route.params.module as string;
  await loadView();
});

const toast = useToast();
const submitForm = async () => {
  const data = reference.value as Reference;
  let result = false;
  let message = "";

  if (formMode.value === FormActionMode.CREATE) {
    result = await referenceStore.createReference(data);
    if (result) message = "Referència creada correctament";
    else message = "La referència + versió introduïda ja existeix";
  } else {
    result = await referenceStore.updateReference(data.id, data);
    message = "Referència actualizada correctament";
  }

  toast.add({
    severity: result ? "success" : "warn",
    summary: message,
    life: 5000,
  });

  if (result) {
    if (formMode.value === FormActionMode.EDIT) {
      router.back();
    } else {
      loadView();
    }
  }
};

// Workmasters
const createWorkmaster = async () => {
  if (reference.value) {
    const newId = getNewUuid();
    workmasterStore.setNew(newId, reference.value.id);

    if (workmasterStore.workmaster) {
      const created = await workmasterStore.create(workmasterStore.workmaster);
      if (created) {
        router.push({ path: `/workmaster/${newId}` });
      }
    }
  }
};

const editWorkmaster = (row: DataTableRowClickEvent) => {
  router.push({ path: `/workmaster/${row.data.id}` });
};

const deleteWorkmaster = async (event: any, workmaster: any) => {
  event.stopPropagation();

  confirm.require({
    target: event.currentTarget,
    message: `Está segur que vol eliminar la ruta seleccionada?`,
    icon: "pi pi-question-circle",
    acceptIcon: "pi pi-check",
    rejectIcon: "pi pi-times",
    accept: async () => {
      const result = await workmasterStore.delete(workmaster.id);
      if (result) {
        toast.add({
          severity: "success",
          summary: "Ruta eliminada correctament",
          life: 5000,
        });

        await workmasterStore.fetchByReferenceId(reference.value!.id);
      } else {
        toast.add({
          severity: "warn",
          summary: "No s'ha pogut eliminar la ruta",
          life: 5000,
        });
      }
    },
  });
};
</script>
