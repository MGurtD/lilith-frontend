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
      :value="categories"
      v-model:selection="currentCategory"
      datakey="id"
      stripedRows
      responsiveLayout="scroll"
      :paginator="true"
      showGridlines
      :rows="10"
      filterDisplay="menu"
      :globalFilterFields="['description']"
      @row-click="onRowSelect"
    >
      <template #empty> No hi ha categories. </template>
      <template #loading> Carregant categories, si us plau espereu. </template>
      <Column field="code" header="Codi" :sortable="true"> </Column>
      <Column field="description" header="Descripció">
        <template #filter="{ filterModel }">
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            placeholder="Search by name"
          />
        </template>
      </Column>
      <Column field="account" header="Codi" :sortable="true"> </Column>
      <Column field="active" header="Actiu" :sortable="true">
        <template #body="slotProps">
          <Checkbox
            v-model="slotProps.data.active"
            :binary="true"
            :disabled="true"
          />
        </template>
      </Column>
      <Column field="id" header="" style="text-align: right;">
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
              <InputText placeholder="Codi" v-model="currentCategory.code" />
            </div>
          </div>
          <div class="col-12 md:col-8">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon"> Descripció: </span>
              <InputText
                placeholder="Descripció"
                v-model="currentCategory.description"
              />
            </div>
          </div>
          <div class="col-12 md:col-6">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon"> Compte comptable: </span>
              <InputText placeholder="Codi" v-model="currentCategory.account" />
            </div>
          </div>
          <div class="col-12 md:col-">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <Checkbox v-model="currentCategory.active" :binary="true" />
                &nbsp;&nbsp;Activa
              </span>
            </div>
          </div>
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
import categoryService from "../api/category.service";
import { useConfirm } from "primevue/useconfirm";
import { Category } from "../types";

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
      categories: [] as Array<Category>,
      currentCategory: {
        id: 0,
        code: "",
        description: "",
        account: "",
        active: false,
      } as Category,
      currentIndex: -1,
      display: false,
    };
  },
  methods: {
    fetchData() {
      categoryService
        .getAll()
        .then((response) => {
          this.categories = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    onRowSelect(event: any) {
      this.currentCategory = event.data;
    },
    openDialog(currentid: number) {
      if (currentid !== 0) {
        this.currentCategory = this.categories.find(
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
      (this.currentCategory.id = 0),
        (this.currentCategory.code = ""),
        (this.currentCategory.description = ""),
        (this.currentCategory.account = ""),
        (this.currentCategory.active = false);
    },
    save() {
      if (this.currentCategory.id === 0) {
        categoryService.create(this.currentCategory).then((response) => {
          if (response.status === null) {
            this.$toast.add({
              severity: "error",
              summary: "Error Message",
              detail: "Error al crear el registre: ", //+ this.ret?.PromiseResult?.statusText,
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
        categoryService.update(this.currentCategory).then((response) => {
          if (response.status === null) {
            this.$toast.add({
              severity: "error",
              summary: "Error Message",
              detail: "Error a l'actualitzar el registre: ", //this.ret.PromiseResult.statusText,
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
      this.currentCategory = this.categories.find(
        ({ id }) => id === currentid
      ) as any;

      this.confirm.require({
        message:
          "Vols esborrar el registre seleccionat?" + this.currentCategory.code,
        header: "Confirmation",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          categoryService.delete(currentid).then((response) => {
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
  },
  mounted() {
    this.fetchData();
  },
};
</script>
