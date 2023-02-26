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
      :value="eventStatuses"
      v-model:selection="currentEventStatus"
      datakey="id"
      stripedRows
      responsiveLayouts="scroll"
      :paginator="true"
      showGridlines
      :rows="10"
      @row-click="onRowSelect"
    >
      <template #empty> No hi ha estats. </template>
      <template #loading> Carregant estats, si us plau espereu. </template>
      <Column field="code" header="Codi" :sortable="true"> </Column>
      <Column field="description" header="Descripció"> </Column>
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
    <Dialog header="Estats d'events" v-model:visible="display">
      <div>
        <div class="grid p-fluid">
          <div class="col-12 md:col-4">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon"> Codi: </span>
              <InputText placeholder="Codi" v-model="currentEventStatus.code" />
            </div>
          </div>
          <div class="col-12 md:col-8">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon"> Descripció </span>
              <InputText
                placeholder="Descripció"
                v-model="currentEventStatus.description"
              />
            </div>
          </div>
          <div class="col-12 md:col-2">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <Checkbox v-model="currentEventStatus.active" :binary="true" />
                &nbsp;&nbsp; Actiu
              </span>
            </div>
          </div>
          <div class="col-12 md:col-6"></div>
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
import eventstatusService from "../api/eventstatus.service";
import { useConfirm } from "primevue/useconfirm";

export default {
  name: "eventstatus-ist",
  setup() {
    const confirm = useConfirm();

    return {
      confirm,
    };
  },
  data() {
    return {
      eventStatuses: [],
      currentEventStatus: {
        id: 0,
        code: "",
        description: "",
        active: false,
      },
      currentIndex: -1,
      display: false,
    };
  },
  methods: {
    fetchData() {
      eventstatusService
        .getAll()
        .then((response) => {
          this.eventStatuses = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    onRowSelect(event: any) {
      this.currentEventStatus = event.data;
    },
    openDialog(currentid: number) {
      if (currentid !== 0) {
        this.currentEventStatus = this.eventStatuses.find(
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
      (this.currentEventStatus.id = 0),
        (this.currentEventStatus.code = ""),
        (this.currentEventStatus.description = ""),
        (this.currentEventStatus.active = false);
    },
    save() {
      if (this.currentEventStatus.id === 0) {
        eventstatusService.create(this.currentEventStatus).then((response) => {
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
        eventstatusService.update(this.currentEventStatus).then((response) => {
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
      this.currentEventStatus = this.eventStatuses.find(
        ({ id }) => id === currentid
      ) as any;
      this.$confirm.require({
        message:
          "Vols esborrar el registre seleccionat?" +
          this.currentEventStatus.code,
        header: "Confirmation",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          eventstatusService.delete(currentid).then((response) => {
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
