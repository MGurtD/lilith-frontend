<template>
  <TabView>
    <TabPanel>
      <template #header>
        <i :class="PrimeIcons.BUILDING" class="mr-2"></i>
        <span>Proveïdor</span>
      </template>
      <form v-if="supplier">
        <section class="three-columns">
          <BaseInput
            class="mb-2"
            label="Nom Comercial"
            id="comercialName"
            v-model="supplier.comercialName"
          ></BaseInput>
          <BaseInput
            class="mb-2"
            label="Nom Fiscal"
            id="taxName"
            v-model="supplier.taxName"
          ></BaseInput>
          <div>
            <label class="block text-900 mb-2">Tipus Proveïdor</label>
            <Dropdown
              v-model="supplier.supplierTypeId"
              editable
              :options="supplierStore.supplierTypes"
              optionValue="id"
              optionLabel="name"
              class="w-full"
            />
          </div>
        </section>

        <section class="three-columns mb-2">
          <div>
            <label class="block text-900 mb-2">País</label>
            <Dropdown
              v-model="supplier.country"
              editable
              :options="['Espanya']"
              class="w-full"
            />
          </div>
          <div>
            <label class="block text-900 mb-2">Província</label>
            <Dropdown
              v-model="supplier.region"
              editable
              :options="spanishGeo.regions"
              optionValue="nm"
              optionLabel="nm"
              class="w-full"
              @change="onRegionChanged"
            />
          </div>
          <div>
            <label class="block text-900 mb-2">Municipi</label>
            <Dropdown
              v-model="supplier.city"
              editable
              :options="spanishGeo.getTownsByRegionName(supplier.region)"
              optionValue="nm"
              optionLabel="nm"
              class="w-full"
            />
          </div>
        </section>
        <section class="three-columns mb-2">
          <BaseInput
            class="mb-2"
            label="Codi Postal"
            id="postalCode"
            v-model="supplier.postalCode"
          ></BaseInput>
          <BaseInput
            class="mb-2"
            label="Direcció"
            id="address"
            v-model="supplier.address"
          ></BaseInput>
          <BaseInput
            class="mb-2"
            label="Telèfon"
            id="phone"
            v-model="supplier.phone"
          ></BaseInput>
        </section>
        <div>
          <label class="block text-900 mb-2">Observacions</label>
          <Textarea v-model="supplier.observations" class="w-full" />
        </div>

        <div class="mt-2">
          <Button label="Guardar" class="mr-2" @click="submitForm" />
        </div>
      </form>
    </TabPanel>
    <TabPanel>
      <template #header>
        <i :class="PrimeIcons.USERS" class="mr-2"></i>
        <span>Contactes</span>
      </template>
      <pre>
        {{ supplierStore.supplier?.contacts }}
      </pre>
    </TabPanel>
  </TabView>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useSuppliersStore } from "../store/suppliers";
import { PrimeIcons } from "primevue/api";

import BaseInput from "../components/BaseInput.vue";
import { storeToRefs } from "pinia";
import { useSpanishGeography } from "../store/geography";
import { Supplier } from "../types";
import { useStore } from "../store";

const route = useRoute();
const store = useStore();
const spanishGeo = useSpanishGeography();
const supplierStore = useSuppliersStore();
const { supplier } = storeToRefs(supplierStore);

onMounted(async () => {
  await supplierStore.fetchSupplier(route.params.id as string);
  supplierStore.fetchSupplierTypes();

  store.setMenuItem({
    icon: PrimeIcons.BUILDING,
    route: "",
    text: `Proveïdor ${supplier.value?.comercialName}`,
  });
});

const onRegionChanged = () => {
  (supplier.value as Supplier).address = "";
};

const submitForm = async () => {
  const data = supplier.value as Supplier;
  await supplierStore.updateSupplier(data.id, data);
};
</script>
