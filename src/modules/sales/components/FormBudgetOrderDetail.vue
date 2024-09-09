<template>
  <TabView v-model:activeIndex="activeTab">
    <TabPanel header="Referència">
      <form v-if="detail">
        <section class="three-columns">
          <div class="mb-2">
            <DropdownReference
              label="Referència"
              v-model="detail.referenceId"
              :customerId="header.customerId"
              :fullName="true"
              @update:modelValue="getReferenceInfo()"
            ></DropdownReference>
          </div>
          <div>
            <BaseInput
              class="mb-2"
              label="Preu"
              v-model="referencePrice"
              :type="BaseInputType.CURRENCY"
              disabled
            ></BaseInput>
          </div>
          <div class="mb-2">
            <DropdownWorkmasters
              label="Ruta de fabricació"
              v-model="detail.workMasterId"
              :referenceId="detail.referenceId"
              @update:modelValue="getWorkmasterCost(false)"
            ></DropdownWorkmasters>
          </div>
        </section>

        <section class="five-columns">
          <div>
            <BaseInput
              class="mb-2"
              label="Cost Intern"
              v-model="internalCosts"
              :type="BaseInputType.CURRENCY"
              disabled
            ></BaseInput>
          </div>
          <div>
            <BaseInput
              class="mb-2"
              label="Cost Servei"
              v-model="detail.serviceCost"
              :type="BaseInputType.CURRENCY"
              @update:modelValue="updateCosts()"
              :disabled="detail.workMasterId === null"
            ></BaseInput>
          </div>
          <div>
            <BaseInput
              class="mb-2"
              label="Cost Transport"
              v-model="detail.transportCost"
              :type="BaseInputType.CURRENCY"
              @update:modelValue="updateCosts()"
              :disabled="detail.workMasterId === null"
            ></BaseInput>
          </div>
          <div>
            <BaseInput
              class="mb-2"
              label="Cost Unitari"
              v-model="detail.unitCost"
              :type="BaseInputType.CURRENCY"
              disabled
            ></BaseInput>
          </div>
          <div>
            <BaseInput
              class="mb-2"
              label="Cost Total"
              v-model="detail.totalCost"
              :type="BaseInputType.CURRENCY"
              disabled
            ></BaseInput>
          </div>
        </section>

        <section class="five-columns">
          <div>
            <BaseInput
              class="mb-2"
              label="Quantitat"
              v-model="detail.quantity"
              :type="BaseInputType.NUMERIC"
              :class="{
                'p-invalid': validation.errors.quantity,
              }"
              @update:modelValue="updateQuantity()"
            ></BaseInput>
          </div>
          <div>
            <BaseInput
              class="mb-2"
              label="% Benefici"
              v-model="detail.profit"
              :type="BaseInputType.NUMERIC"
              @update:modelValue="updateImports()"
              :class="{
                'p-invalid': validation.errors.profit,
              }"
            ></BaseInput>
          </div>
          <div>
            <BaseInput
              class="mb-2"
              label="% Descompte"
              v-model="detail.discount"
              :type="BaseInputType.NUMERIC"
              @update:modelValue="updateImports()"
              :class="{
                'p-invalid': validation.errors.discount,
              }"
            ></BaseInput>
          </div>
          <BaseInput
            class="mb-2"
            label="Preu Unitari"
            v-model="detail.unitPrice"
            :type="BaseInputType.CURRENCY"
            @update:modelValue="updateUnitPrice()"
          ></BaseInput>
          <div>
            <BaseInput
              class="mb-2"
              label="Total"
              v-model="detail.amount"
              disabled
              :type="BaseInputType.CURRENCY"
              :class="{
                'p-invalid': validation.errors.amount,
              }"
            ></BaseInput>
          </div>
        </section>

        <section>
          <div>
            <BaseInput
              class="mb-2"
              label="Descripció"
              v-model="detail.description"
              :type="BaseInputType.TEXT"
              :class="{
                'p-invalid': validation.errors.description,
              }"
            ></BaseInput>
          </div>
        </section>

        <Button
          :disabled="readonly"
          :label="textActionButton"
          @click="submitForm"
          style="float: right"
        />
      </form>
    </TabPanel>
    <TabPanel header="Marges">
      <TableWorkmasterProfit
        :workMasterId="detail.workMasterId"
        :quantity="detail.quantity"
        @updateProfitAverage="copyProfitAverage"
      />
    </TabPanel>
  </TabView>
</template>
<script setup lang="ts">
import DropdownReference from "../../shared/components/DropdownReference.vue";
import { computed, ref, watch, toRefs, onMounted } from "vue";
import {
  Budget,
  BudgetDetail,
  SalesOrderDetail,
  SalesOrderHeader,
} from "../types";
import * as Yup from "yup";
import {
  FormValidation,
  FormValidationResult,
} from "../../../utils/form-validator";
import { useToast } from "primevue/usetoast";
import { BaseInputType, FormActionMode } from "../../../types/component";
import { useReferenceStore } from "../../shared/store/reference";
import { useWorkMasterStore } from "../../production/store/workmaster";
import { ProductionCosts } from "../../production/types";
import _ from "lodash";
import DropdownWorkmasters from "../../production/components/DropdownWorkmasters.vue";
import TableWorkmasterProfit from "./TableWorkmasterProfit.vue";

const workmasterStore = useWorkMasterStore();
const referenceStore = useReferenceStore();
const toast = useToast();
const props = defineProps<{
  formAction: FormActionMode;
  header: Budget | SalesOrderHeader;
  detail: BudgetDetail | SalesOrderDetail;
  readonly?: boolean;
}>();

const copyProfitAverage = (profitAverage: number) => {
  props.detail.profit = profitAverage;
  updateImports();

  activeTab.value = 0;
};
const activeTab = ref(0);

const emit = defineEmits<{
  (e: "submit", detail: BudgetDetail | SalesOrderDetail): void;
}>();

// Destructure the user prop to get a reactive reference to the age property
const { detail } = toRefs(props);

const textActionButton = computed(() => {
  return props.formAction === FormActionMode.CREATE ? "Afegir" : "Modificar";
});

onMounted(() => {
  if (props.formAction === FormActionMode.EDIT) {
    getWorkmasterCost(true); // O el valor que necesites
  }
});

const referencePrice = ref(0);

const getReferenceInfo = () => {
  const reference = referenceStore.references!.find(
    (r) => r.id === detail.value.referenceId
  );
  if (reference) {
    detail.value.description = reference.description;
    referencePrice.value = reference.price;
    detail.value.unitPrice = reference.price;
    detail.value.workMasterId = null;
    detail.value.unitCost = reference.lastCost;
    updateImports();
  } else {
    referencePrice.value = 0;
    detail.value.description = "";
    detail.value.unitPrice = 0;
    detail.value.workMasterId = null;
    detail.value.unitCost = 0;
    detail.value.totalCost = 0;
    detail.value.amount = 0;
  }
};

const workmasterCosts = ref<ProductionCosts>({
  machineCost: 0,
  materialCost: 0,
  operatorCost: 0,
  externalTransportCost: 0,
  externalServiceCost: 0,
});
const getWorkmasterCost = async (blockExternalCosts: boolean) => {
  if (detail.value.workMasterId) {
    const costsResponse = await workmasterStore.getCosts(
      detail.value.workMasterId,
      detail.value.quantity
    );

    if (costsResponse.result && costsResponse.content) {
      workmasterCosts.value = costsResponse.content as ProductionCosts;

      // avoid unnecessary updates when user update the quantity
      if (!blockExternalCosts) {
        detail.value.transportCost =
          workmasterCosts.value.externalTransportCost;
        detail.value.serviceCost = workmasterCosts.value.externalServiceCost;
      }

      detail.value.totalCost =
        workmasterCosts.value.machineCost +
        workmasterCosts.value.materialCost +
        workmasterCosts.value.operatorCost +
        detail.value.transportCost +
        detail.value.serviceCost;
      detail.value.unitCost = detail.value.totalCost / detail.value.quantity;

      updateImports();
    }
  } else {
    getReferenceInfo();
    detail.value.transportCost = 0;
    detail.value.serviceCost = 0;
    detail.value.totalCost = 0;
  }
};

const internalCosts = computed(() => {
  if (!detail.value.workMasterId) {
    return 0;
  } else if (
    workmasterCosts.value.machineCost === 0 &&
    workmasterCosts.value.materialCost === 0 &&
    workmasterCosts.value.operatorCost === 0
  ) {
    return (
      detail.value.totalCost -
      detail.value.serviceCost -
      detail.value.transportCost
    );
  } else {
    return (
      workmasterCosts.value.machineCost +
      workmasterCosts.value.materialCost +
      workmasterCosts.value.operatorCost
    );
  }
});

const updateCosts = () => {
  detail.value.totalCost =
    internalCosts.value + detail.value.serviceCost + detail.value.transportCost;
  detail.value.unitCost = detail.value.totalCost / detail.value.quantity;

  updateImports();
};

let isUpdatingQuantity = false;
const updateQuantity = () => {
  isUpdatingQuantity = true;
  if (!detail.value.quantity) {
    detail.value.quantity = 1;
  }

  if (detail.value.workMasterId) {
    getWorkmasterCost(true);
  }

  updateImports();
  isUpdatingQuantity = false;
};

const updateImports = () => {
  // starting from unit cost
  detail.value.unitPrice = detail.value.unitCost;

  // no cost, get price from reference
  if (detail.value.unitPrice === 0) {
    const reference = referenceStore.references!.find(
      (r) => r.id === detail.value.referenceId
    );
    detail.value.unitPrice = reference?.price || 0;
  }

  // apply profit
  if (detail.value.profit > 0) {
    detail.value.unitPrice *= 1 + detail.value.profit / 100;
  }
  // apply discount
  if (detail.value.discount > 0) {
    detail.value.unitPrice *= 1 - detail.value.discount / 100;
  }

  // round it & calculate total price (amount)
  detail.value.unitPrice = _.round(detail.value.unitPrice, 2);
  detail.value.amount = _.round(
    detail.value.unitPrice * detail.value.quantity,
    2
  );
};

const updateUnitPrice = () => {
  detail.value.amount = _.round(
    detail.value.unitPrice * detail.value.quantity,
    2
  );
};

const schema = Yup.object().shape({
  quantity: Yup.number()
    .required("La quantitat és obligatoria")
    .min(1, "La quantitat ha de ser un número positiu"),
  amount: Yup.number()
    .required("El total és obligatori")
    .min(1, "El total ha de ser un número positiu"),
  profit: Yup.number().required("El benefici és obligatori"),
  discount: Yup.number().required("El descompte és obligatori"),
  unitPrice: Yup.number().required("El preu unitari és obligatori"),
});
const validation = ref({
  result: false,
  errors: {},
} as FormValidationResult);

const validate = () => {
  const formValidation = new FormValidation(schema);
  validation.value = formValidation.validate(props.detail);
};

const submitForm = async () => {
  validate();
  if (validation.value.result) {
    emit("submit", props.detail);
  } else {
    let errors = "";
    Object.entries(validation.value.errors).forEach((e) => {
      errors += `${e[1].map((e) => e)}.   `;
    });
    toast.add({
      severity: "warn",
      summary: "Formulari inválid",
      detail: errors,
      life: 5000,
    });
  }
};
</script>
