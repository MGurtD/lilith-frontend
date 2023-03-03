<template>
  <div class="grid p-fluid">
    <div class="col-12 md:col-11"></div>
    <div class="col-12 md:col-1">
      <Button
        label="Afegir"
        icon="pi pi-add"
        class="p-button-success"
        @click="openDialog(0)"
      ></Button>
    </div>
  </div>
  <div class="row">
    <DataTable
      :value="employeecategories"
      v-model:selection="currentEmployeeCategory"
      datakey="id"
      stripedRows
      responsiveLayout="scroll"
      :paginator="true"
      showGridlines
      :rows="10"
      @row-click="onRowSelect"
    >
      <template #empty> No hi ha categories. </template>
      <template #loading> Carregant categories, si us plau espereu. </template>
      <Column field="code" header="Codi" :sortable="true"> </Column>
      <Column field="description" header="Descripció"> </Column>
      <Column field="account" header="Compte comptable" :sortable="true">
      </Column>
      <Column
        field="costPrice"
        header="Preu Cost"
        :sortable="true"
        mode="decimal"
        :minFractionDigits="2"
        :maxFractionDigits="2"
      >
        <template #body="slotProps">
          {{ formatCurrency(slotProps.data.costPrice) }}
        </template>
      </Column>
      <Column
        field="salePrice"
        header="Preu Venta"
        :sortable="true"
        mode="decimal"
        :minFractionDigits="2"
        :maxFractionDigits="2"
      >
        <template #body="slotProps">
          {{ formatCurrency(slotProps.data.salePrice) }}
        </template>
      </Column>
      <Column field="active" header="Actiu" :sortable="true">
        <template #body="slotProps">
          <Checkbox
            v-model="slotProps.data.active"
            :binary="true"
            :disabled="true"
          />
        </template>
      </Column>
      <Column field="id" header="">
        <template #body="slotProps">
          <Button
            label=""
            icon="pi pi-pencil"
            @click="openDialog(slotProps.data.id)"
          />
          &nbsp;&nbsp;
          <Button
            label=""
            icon="pi pi-trash"
            @click="drop(slotProps.data.id)"
          />
        </template>
      </Column>
    </DataTable>
    <Dialog header="Categoria d'article" v-model:visible="display">
      <div>
        <div class="grid p-fluid">
          <div class="col-12 md:col-4">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon"> Codi: </span>
              <InputText
                placeholder="Codi"
                v-model="currentEmployeeCategory.code"
              />
            </div>
          </div>
          <div class="col-12 md:col-8">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon"> Descripció: </span>
              <InputText
                placeholder="Descripció"
                v-model="currentEmployeeCategory.description"
              />
            </div>
          </div>
          <div class="col-12 md:col-6">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon"> Compte comptable: </span>
              <InputText
                placeholder="Compte Comptable"
                v-model="currentEmployeeCategory.account"
              />
            </div>
          </div>
          <div class="col-12 md:col-3">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon"> Preu de cost: </span>
              <InputNumber
                placeholder="Cost Price"
                mode="decimal"
                :minFractionDigits="2"
                :maxFractionDigits="2"
                v-model="currentEmployeeCategory.costPrice"
                currency="EUR"
                locale="es-ES"
              />
              <span class="p-inputgroup-addon">€</span>
            </div>
          </div>
          <div class="col-12 md:col-3">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon"> Preu de venta: </span>
              <InputNumber
                placeholder="Sale Price"
                mode="decimal"
                :minFractionDigits="2"
                :maxFractionDigits="2"
                v-model="currentEmployeeCategory.salePrice"
                currency="EUR"
                locale="es-ES"
              />
              <span class="p-inputgroup-addon">€</span>
            </div>
          </div>

          <div class="col-12 md:col-2">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <Checkbox
                  v-model="currentEmployeeCategory.active"
                  :binary="true"
                />
                &nbsp;&nbsp;Activa
              </span>
            </div>
          </div>
          <div class="col-12 md:col-10"></div>
          <div class="col-12 md:col-8"></div>
          <div class="col-12 md:col-2">
            <Button label="Acceptar" @click="save()" />
          </div>
          <div class="col-12 md:col-2">
            <Button label="Cancelar" @click="closeDialog()" />
          </div>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script lang="ts">
import employeeCategoryService from "../api/employeecategory.service";
import { useConfirm } from "primevue/useconfirm";

export default {
  name: "categroy-list",
  setup() {
    const confirm = useConfirm();

    return {
      confirm,
    };
  },
  data() {
    return {
      ret: null,
      employeecategories: [],
      currentEmployeeCategory: {
        id: 0,
        code: "",
        description: "",
        account: "",
        salePrice: 0,
        costPrice: 0,
        active: false,
      },
      currentIndex: -1,
      display: false,
    };
  },
  methods: {
    fetchData() {
      employeeCategoryService
        .getAll()
        .then((response) => {
          console.log(response.data);
          this.employeecategories = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    onRowSelect(event: any) {
      this.currentEmployeeCategory = event.data;
    },
    openDialog(currentid: number) {
      if (currentid !== 0) {
        this.currentEmployeeCategory = this.employeecategories.find(
          ({ id }) => id === currentid
        ) as any;
        this.display = true;
      } else {
        this.resetData();
        this.fetchData();
        this.display = true;
      }
    },
    closeDialog() {
      this.display = false;
    },
    resetData() {
      (this.currentEmployeeCategory.id = 0),
        (this.currentEmployeeCategory.code = ""),
        (this.currentEmployeeCategory.description = ""),
        (this.currentEmployeeCategory.account = ""),
        (this.currentEmployeeCategory.active = false);
    },
    save() {
      if (this.currentEmployeeCategory.id === 0) {
        employeeCategoryService
          .create(this.currentEmployeeCategory)
          .then((response) => {
            if (response.status === null) {
              this.$toast.add({
                severity: "error",
                summary: "Error Message",
                detail: "Error al crear el registre: ", //+ this.ret.PromiseResult.statusText,
                life: 3000,
              });
            }
            if (response.status === 201) {
              this.$toast.add({
                severity: "success",
                summary: "Succes Message",
                detail: "Registre creat",
                life: 3000,
              });
              this.fetchData();
            }
          });
      } else {
        employeeCategoryService
          .update(this.currentEmployeeCategory)
          .then((response) => {
            if (response.status === null) {
              this.$toast.add({
                severity: "error",
                summary: "Error Message",
                detail: "Error a l'actualitzar el registre: ", //+ this.ret.PromiseResult.statusText,
                life: 3000,
              });
            }
            if (response.status === 201) {
              this.$toast.add({
                severity: "success",
                summary: "Succes Message",
                detail: "Registre actualitzat",
                life: 3000,
              });
              this.fetchData();
            }
          });
      }
      this.fetchData();
      this.closeDialog();
    },
    drop(currentid: number) {
      this.currentEmployeeCategory = this.employeecategories.find(
        ({ id }) => id === currentid
      ) as any;

      this.confirm.require({
        message:
          "Vols esborrar el registre seleccionat?" +
          this.currentEmployeeCategory.code,
        header: "Confirmation",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          employeeCategoryService.delete(currentid).then((response) => {
            if (response.status === 202) {
              this.$toast.add({
                severity: "success",
                summary: "Succes Message",
                detail: "Registre eliminat correctament",
                life: 3000,
              });
              this.fetchData();
            }
          });
        },
        reject: () => {
          //callback to execute when user rejects the action
        },
        onHide: () => {
          //callback to execute when dialog is hidden
        },
      });
    },
    formatCurrency(value: any) {
      return value.toLocaleString("es-ES", {
        style: "currency",
        currency: "EUR",
      });
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
