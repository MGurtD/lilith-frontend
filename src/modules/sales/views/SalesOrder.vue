<template>
    <Button label="Guardar" class="grid_add_row_button" @click="submitForm" />
    <TabView>
    <TabPanel header="Comanda"  v-if="salesOrder">
    <FormSalesOrder
    ref="salesOrderForm"
    salesOrder="salesOrder"
    @submit="onSalesOrderSubmit"
    />
    <TabView>
        <TabPanel header="Referències">
        <TableSalesOrderReferences
          :salesOrderDetails="salesOrder.salesOrderDetails"
          @add="(det: SalesOrderDetail) => openReferencesForm(FormActionMode.CREATE, det)"
          @edit="(det: SalesOrderDetail) => openReferencesForm(FormActionMode.EDIT, det)"
          @delete="(det: SalesOrderDetail) => openReferencesForm(FormActionMode.CREATE, det)"
        />
      </TabPanel>
      </TabView>
    </TabPanel>
      </TabView>
    <Dialog
    v-if="selectedSalesOrderDetail"
    :closable="true"
    v-model:visible="isDialogVisible"
    :header="dialogTitle"
    position="bottom"
  >
    <FormSalesOrderReference
      :formAction="formDetailMode"
      :salesOrderDetail="selectedSalesOrderDetail"
      @submit="onSalesOrderReferenceSubmit"
    />
  </Dialog>
</template>
<script setup lang="ts">
  import { computed, onMounted, ref } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { PrimeIcons } from "primevue/api";
  
  import { storeToRefs } from "pinia";
  import { Reference, SalesOrderDetail, SalesOrderHeader } from "../types";
  import { useStore } from "../../../store";
  import { formatDate, getNewUuid } from "../../../utils/functions";
  import { useToast } from "primevue/usetoast";
  import { FormActionMode } from "../../../types/component";  
  import FormSalesOrder from "../components/FormSalesOrder.vue";
  import { useSalesOrderStore } from "../store/salesOrder";
  import FormSalesOrderReference from "../components/FormSalesOrderReference.vue";
  import TableSalesOrderReferences from "../components/TableSalesOrderReferences.vue";
  
  const salesOrderForm = ref();

  const formMode = ref(FormActionMode.EDIT);
  const route = useRoute();
  const router = useRouter();
  const store = useStore();
  const salesOrderStore = useSalesOrderStore();
  const { salesOrder } = storeToRefs(salesOrderStore);
  
  const dialogTitle = computed(() => {
  return formDetailMode.value === FormActionMode.CREATE
    ? "Escull referència"
    : "Modifica referència";
});
  const isDialogVisible = ref(false);
  const formDetailMode = ref(FormActionMode.EDIT);

  const selectedSalesOrderDetail = ref(
    undefined as undefined | SalesOrderDetail
  );

  const loadView = async () => {
    //await referenceStore.fetchReference(route.params.id as string);    
    await salesOrderStore.GetById(route.params.id as string);
    let pageTitle = "";
    if (!salesOrder.value) {
      formMode.value = FormActionMode.CREATE;
      salesOrderStore.setNewSalesOrder(route.params.id as string);      
      pageTitle = "Alta de comanda";
    } else {
      formMode.value = FormActionMode.EDIT;
      pageTitle = `Comanda ${salesOrder.value.salesOrderNumber}`;
    }
  
    store.setMenuItem({
      icon: PrimeIcons.BUILDING,
      backButtonVisible: true,
      title: pageTitle,
    });
  };
  
  onMounted(async () => {
    await loadView();
    
  });
  

  const submitForm = () => {
    const form = salesOrderForm.value as any;
    form.submitForm();
  }

  const openReferencesForm = (
    formMode: FormActionMode,
    salesOrderDetail: SalesOrderDetail
  ) => {
    if (formMode === FormActionMode.CREATE){
      salesOrderDetail.id = getNewUuid();
    }
    salesOrderDetail.salesOrderHeaderId = salesOrder.value!.id;
    formDetailMode.value = formMode;
    isDialogVisible.value = true;
  }

  const toast = useToast();

  const onSalesOrderSubmit = async( salesOrder: SalesOrderHeader) => {
    let result = false;
    let message = "";

    if (formMode.value === FormActionMode.CREATE){
      result = await salesOrderStore.Create(salesOrder);
      message = result ? "Comanda creada" : "Error al crear la comanda";
    }else{
      result = false;
      message = "Falta el mètode update";
    }

    toast.add({
      life: 5000,
      severity: result ? "success" : "error",
      summary: message,
    });

    if (result) {
      router.back();
    }
  };

  const onSalesOrderReferenceSubmit = async (salesOrderDetail: SalesOrderDetail) => {
    salesOrder.value?.salesOrderDetails?.push(salesOrderDetail);
    const form = salesOrderForm.value as any;
    isDialogVisible.value = false;
  }
  
  </script>
  