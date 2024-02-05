<template>
  <DataTable
    :value="filteredData"
    tableStyle="min-width: 100%"
    scrollable
    scrollHeight="80vh"
    sort-field="reference.code"
    :sort-order="1"
    @row-click="editRow"
  >
    <template #header>
      <div
        class="flex flex-wrap align-items-center justify-content-between gap-2"
      >
        <div class="datatable-filter">
          <div class="filter-field">
            <label class="block text-900 mb-2">Referència</label>
            <DropdownReference
              label=""
              v-model="filter.referenceId"
              :fullName="true"
            ></DropdownReference>
          </div>
        </div>
        <div class="datatable-buttons">
          <Button
            class="datatable-button mr-2"
            :icon="PrimeIcons.FILTER_SLASH"
            rounded
            raised
            @click="cleanFilter"
          />
          <Button
            :icon="PrimeIcons.PLUS"
            rounded
            raised
            @click="createButtonClick"
          />
        </div>
      </div>
    </template>
    <Column
      field="reference.code"
      sortable
      header="Referencia"
      style="width: 50%"
    >
      <template #body="slotProps">
        {{ referenceStore.getFullName(slotProps.data.reference) }}
      </template>
    </Column>
    <Column
      field="baseQuantity"
      header="Quantitat Base"
      style="width: 25%"
    ></Column>
    <Column header="Desactivada" style="width: 25%">
      <template #body="slotProps">
        <BooleanColumn :value="slotProps.data.disabled" />
      </template>
    </Column>
    <Column>
      <template #body="slotProps">
        <i
          :class="PrimeIcons.COPY"
          class="grid_copy_column_button"
          @click="copyButton($event, slotProps.data)"
        />
      </template>
    </Column>
    <Column>
      <template #body="slotProps">
        <i
          :class="PrimeIcons.TIMES"
          class="grid_delete_column_button"
          @click="deleteButton($event, slotProps.data)"
        />
      </template>
    </Column>
  </DataTable>

  <Dialog
    v-model:visible="dialogOptions.visible"
    :header="dialogOptions.title"
    :closable="dialogOptions.closable"
    :modal="dialogOptions.modal"
  >
    <div>
      <DropdownReference
        label="Referència"
        v-model="workmasterStore.workmaster!.referenceId"
        :fullName="true"
      ></DropdownReference>
    </div>
    <br />
    <div>
      <Button
        label="Crear"
        style="float: right"
        @click="onCreateSubmit"
      ></Button>
    </div>
  </Dialog>
  <Dialog
    v-model:visible="copyDialogOptions.visible"
    :header="copyDialogOptions.title"
    :closable="true"
    :modal="true"
  >
    <section class="two-columns">
      <div><h3>Origen</h3></div>
      <div><h3>Destí</h3></div>
    </section>
    <section class="two-columns">
      <div>
        <p>
          {{
            referenceStore.getFullNameById(
              workmasterStore.workmasterToCopy!.workmaster.referenceId
            )
          }}
        </p>
        <!--<BaseInput
          v-if="workmasterStore.workmasterToCopy"
          class="mb-2"
          label="Referència Origen"
          :v-model="
            referenceStore.getFullNameById(
              workmasterStore.workmasterToCopy.workmaster.referenceId
            )
          "
          disabled="true"
        ></BaseInput>-->
      </div>
      <div>
        <!-- 
           v-if="
            workmasterStore.workmasterToCopy &&
            workmasterStore.workmasterToCopy.referenceId
          "
        -->
        <DropdownReference
          label="Referència existent:"
          v-model="workmasterStore.workmasterToCopy!.referenceId"
          :fullName="true"
          @change="checkDestinyCode"
        ></DropdownReference>
        <BaseInput
          class="mb-2"
          label="Nou codi:"
          id="referenceCode"
          v-model="workmasterStore.workmasterToCopy!.referenceCode"
          @change="checkDestinyId"
        ></BaseInput>
      </div>
    </section>
    <div>
      <Button
        label="Copiar"
        style="float: right"
        @click="onCopySubmit"
      ></Button>
    </div>
  </Dialog>
</template>
<script setup lang="ts">
import DropdownReference from "../../shared/components/DropdownReference.vue";
import { useRouter } from "vue-router";
import { useStore } from "../../../store";
import { computed, onMounted, reactive, ref } from "vue";
import { PrimeIcons } from "primevue/api";
import { DataTableRowClickEvent } from "primevue/datatable";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import { useWorkMasterStore } from "../store/workmaster";
import { useReferenceStore } from "../../shared/store/reference";
import { WorkMaster, WorkMasterToCopy } from "../types";
import { getNewUuid } from "../../../utils/functions";
import { DialogOptions } from "../../../types/component";

const router = useRouter();
const store = useStore();
const toast = useToast();
const confirm = useConfirm();
const workmasterStore = useWorkMasterStore();
const referenceStore = useReferenceStore();

const filter = ref({
  referenceId: undefined,
});

const cleanFilter = () => {
  filter.value.referenceId = undefined;
};

const filteredData = computed(() => {
  if (!workmasterStore.workmasters) return [];
  if (!filter.value.referenceId) return workmasterStore.workmasters;

  return workmasterStore.workmasters!.filter(
    (w) => w.referenceId === filter.value.referenceId
  );
});

const dialogOptions = reactive({
  visible: false,
  title: "Crear ruta",
  closable: true,
  position: "center",
  modal: true,
} as DialogOptions);

const copyDialogOptions = reactive({
  visible: false,
  title: "Copiar ruta",
  closable: true,
  position: "center",
  modal: true,
} as DialogOptions);

onMounted(async () => {
  await workmasterStore.fetchAll();
  await referenceStore.fetchReferencesByModule("sales");

  store.setMenuItem({
    icon: PrimeIcons.CALENDAR,
    title: "Gestió de rutes de fabricació",
  });
});

const createButtonClick = () => {
  const newId = getNewUuid();
  workmasterStore.setNew(newId);

  dialogOptions.visible = true;
};

const copyButton = (event: any, workmaster: WorkMaster) => {
  workmasterStore.workmasterToCopy = {
    workmasterId: workmaster.id,
    workmaster,
    referenceId: null,
    referenceCode: "",
  };
  copyDialogOptions.visible = true;
};

const onCopySubmit = async () => {
  if (workmasterStore.workmasterToCopy!.referenceId === "") {
    workmasterStore.workmasterToCopy!.referenceId = null;
  }
  const copied = await workmasterStore.copy(workmasterStore.workmasterToCopy!);
  await workmasterStore.fetchAll();
  copyDialogOptions.visible = false;
  if (copied) {
    toast.add({
      severity: "success",
      summary: "Copiada",
      life: 3000,
    });
  } else {
    toast.add({
      severity: "error",
      summary: "Hi ha hagut un error en el proces",
      life: 3000,
    });
  }
};

const checkDestinyCode = () => {
  workmasterStore.workmasterToCopy!.referenceCode = "";
};

const checkDestinyId = () => {
  workmasterStore.workmasterToCopy!.referenceId = "";
};

const editRow = (row: DataTableRowClickEvent) => {
  if (
    !(row.originalEvent.target as any).className.includes(
      "grid_delete_column_button"
    ) &&
    !(row.originalEvent.target as any).className.includes(
      "grid_copy_column_button"
    )
  ) {
    router.push({ path: `/workmaster/${row.data.id}` });
  }
};

const onCreateSubmit = async () => {
  if (!workmasterStore.workmaster) return;

  const created = await workmasterStore.create(workmasterStore.workmaster);
  if (created)
    router.push({ path: `/workmaster/${workmasterStore.workmaster.id}` });
};

const deleteButton = (event: any, workmaster: WorkMaster) => {
  confirm.require({
    target: event.currentTarget,
    message: `Está segur que vol eliminar la ruta ${
      workmaster.reference!.description
    }?`,
    icon: "pi pi-question-circle",
    acceptIcon: "pi pi-check",
    rejectIcon: "pi pi-times",
    accept: async () => {
      const deleted = await workmasterStore.delete(workmaster.id);

      if (deleted) {
        toast.add({
          severity: "success",
          summary: "Eliminada",
          life: 3000,
        });
        await workmasterStore.fetchAll();
      }
    },
  });
};
</script>
