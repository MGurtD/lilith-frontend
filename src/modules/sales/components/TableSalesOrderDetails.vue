<template>
  <DataTable
    @row-click="onEditRow"
    :value="salesOrderDetails"
    tableStyle="min-width: 100%"
    class="p-datatable-sm"
  >
    <template #header>
      <slot name="header"></slot>
    </template>
    <Column field="quantity" header="Quantitat" style="width: 10%" />
    <Column header="Referencia" style="width: 15%">
      <template #body="slotProps">
        {{ referenceStore.getShortNameById(slotProps.data.referenceId) }}
      </template>
    </Column>
    <Column field="description" header="Descripció" style="width: 30%" />
    <Column field="workOrderId" header="Ordre fabr." style="width: 10%">
      <template #body="slotProps">
        <div
          v-if="workOrderStore.getWorkOrderCodeById(slotProps.data.workOrderId)"
        >
          <Tag
            :icon="PrimeIcons.CHECK_CIRCLE"
            severity="success"
            :value="
              workOrderStore.getWorkOrderCodeById(slotProps.data.workOrderId)
            "
          />
        </div>
        <div v-else>
          <Button
            size="small"
            :icon="PrimeIcons.PLUS_CIRCLE"
            value="Generar OF"
            @click="onWorkOrderCreateClick(slotProps.data)"
          />
        </div>
      </template>
    </Column>
    <Column field="unitPrice" header="Preu un." style="width: 10%">
      <template #body="slotProps"> {{ slotProps.data.unitPrice }} € </template>
    </Column>
    <Column field="amount" header="Total" style="width: 10%">
      <template #body="slotProps"> {{ slotProps.data.amount }} € </template>
    </Column>
    <Column style="width: 5%" v-if="!salesOrder.deliveryNoteId">
      <template #body="slotProps">
        <i
          v-if="!slotProps.data.isDelivered"
          :class="PrimeIcons.TIMES"
          class="grid_delete_column_button"
          @click="onDeleteRow($event, slotProps.data)"
        />
      </template>
    </Column>
  </DataTable>

  <Dialog
    :closable="dialogOptions.closable"
    v-model:visible="dialogOptions.visible"
    :header="dialogOptions.title"
    :modal="dialogOptions.modal"
    :style="{ width: '50vw' }"
  >
    <FormCreateWorkorder
      :createWorkOrderDto="createWorkOrderDto"
      :filtered-work-masters="referenceActiveWorkMasters"
      @submit="onWorkOrderCreateSubmit"
    ></FormCreateWorkorder>
  </Dialog>
</template>
<script setup lang="ts">
import { ref } from "vue";
import FormCreateWorkorder from "../../production/components/FormCreateWorkorder.vue";
import Tag from "primevue/tag";
import { PrimeIcons } from "primevue/api";
import { DataTableRowClickEvent } from "primevue/datatable";
import {
  SalesOrderHeader,
  SalesOrderDetail,
  CreateWorkOrderFromSalesOrderDto,
} from "../types";
import { CreateWorkOrderDto, WorkMaster } from "../../production/types";
import { DialogOptions } from "../../../types/component";
import { useConfirm } from "primevue/useconfirm";
import { useReferenceStore } from "../../shared/store/reference";
import { useWorkMasterStore } from "../../production/store/workmaster";
import { useWorkOrderStore } from "../../production/store/workorder";
import { convertDDMMYYYYToDate } from "../../../utils/functions";

const props = defineProps<{
  salesOrder: SalesOrderHeader;
  salesOrderDetails: Array<SalesOrderDetail> | undefined;
}>();

const emit = defineEmits<{
  (e: "edit", salesOrderDetail: SalesOrderDetail): void;
  (e: "delete", salesOrderDetail: SalesOrderDetail): void;
  (e: "createWorkOrder", dto: CreateWorkOrderFromSalesOrderDto): void;
}>();

const confirm = useConfirm();
const referenceStore = useReferenceStore();
const workMasterStore = useWorkMasterStore();
const workOrderStore = useWorkOrderStore();

var selectedDetail = undefined as SalesOrderDetail | undefined;
const dialogOptions = ref({
  closable: true,
  modal: true,
  title: "Generar ordre de fabricació",
  visible: false,
} as DialogOptions);
const referenceActiveWorkMasters = ref([] as Array<WorkMaster>);
const createWorkOrderDto = ref({
  workMasterId: "",
  plannedDate: "",
  plannedQuantity: 0,
  comment: "",
} as CreateWorkOrderDto);

const onEditRow = (row: DataTableRowClickEvent) => {
  if (props.salesOrder.deliveryNoteId) return;

  if (
    !(row.originalEvent.target as any).className.includes(
      "grid_delete_column_button"
    )
  ) {
    emit("edit", row.data);
  }
};

const onDeleteRow = (event: any, salesOrderDetail: SalesOrderDetail) => {
  confirm.require({
    target: event.currentTarget,
    message: `Está segur que vol eliminar la referència?`,
    icon: "pi pi-question-circle",
    acceptIcon: "pi pi-check",
    rejectIcon: "pi pi-times",
    accept: () => {
      emit("delete", salesOrderDetail);
    },
  });
};

const onWorkOrderCreateClick = (salesOrderDetail: SalesOrderDetail) => {
  // Get workmasters of the selected reference
  referenceActiveWorkMasters.value = workMasterStore.getByReferenceId(
    salesOrderDetail.referenceId
  );
  // Clear form data
  createWorkOrderDto.value.workMasterId = "";
  if (referenceActiveWorkMasters.value.length > 0) {
    createWorkOrderDto.value.workMasterId =
      referenceActiveWorkMasters.value[0].id;
  }
  createWorkOrderDto.value.plannedQuantity = salesOrderDetail.quantity;
  createWorkOrderDto.value.plannedDate = props.salesOrder.expectedDate
    ? convertDDMMYYYYToDate(props.salesOrder.expectedDate)
    : "";
  createWorkOrderDto.value.comment = "";
  selectedDetail = salesOrderDetail;

  dialogOptions.value.visible = true;
};

const onWorkOrderCreateSubmit = () => {
  const workOrder = {
    workOrderDto: createWorkOrderDto.value,
    orderDetail: selectedDetail!,
  } as CreateWorkOrderFromSalesOrderDto;

  dialogOptions.value.visible = false;
  emit("createWorkOrder", workOrder);
};
</script>
