<template>
    <Toast />
    <div class="grid p-fluid">
        <div class="col-12 md:col-11"></div>
        <div class="col-12 md:col-1">
        <Button label="Afegir" icon="pi pi-add" class="p-button-success" @click="openDialog(0)"></Button>
        </div>
    </div>
    <div class="row">
        <DataTable :value="events" v-model:selection="currentEvent"
        datakey="id" stripedRows responsiveLayout="scroll"
        :paginator="true" showGridlines :rows="10"
        @row-click="onRowSelect" >
        <template #empty>
            No hi ha events.
        </template>
        <template #loading>
            Carregant events, si us plau espereu.
        </template>          
        <Column field="description" header="Descripció">

        </Column>
        <Column field="eventdate" header="Data" ></Column>
        <Column field="saleprice" header="Preu de venta" >
            <template #body="slotProps">
                    {{formatCurrency(slotProps.data.saleprice)}}
                </template></Column>
        <Column field="id" header="" style="text-align: right;">
            <template #body="slotProps">
                    <Button label="" icon="pi pi-pencil" @click="openDialog(slotProps.data.id)" aria-label="Modificar dades generals"/>
                    &nbsp;&nbsp;
                    <!--<Button label="" icon="pi pi-cart-plus" @click="openItemsDialog(slotProps.data.id)" aria-label="Afegir items"/>
                    &nbsp;&nbsp;
                    <Button label="" icon="pi pi-users" @click="openEmployeesDialog(slotProps.data.id)"/>
                    &nbsp;&nbsp;
                    <Button label="" icon="pi pi-eye" @click="openGlobalDialog(slotProps.data.id)"/>
                    &nbsp;&nbsp;-->
                    <Button label="" icon="pi pi-trash" @click="drop(slotProps.data.id)"/>
            </template>
                
        </Column>
    </DataTable>
    <Dialog header="Detall de l'event" v-model:visible="display">
        <div>
            <div class="grid p-fluid">
                <div class="col-12 md:col-8">
                    <div class="p-inputgroup">
                        <span class="p-inputgroup-addon">
                            Descripció:
                        </span>
                        <InputText placeholder="Codi" v-model="currentEvent.description" />
                    </div>
                </div>
                <div class="col-12 md:col-4">
                    <div class="p-inputgroup">
                        <span class="p-inputgroup-addon">
                            Estat
                        </span>
                        <Dropdown placeholder="Estat" v-model="currentEvent.eventstatusid" :options="eventStatus"/>
                    </div>
                </div>
                <div class="col-12 md:col-4">
                    <div class="p-inputgroup">
                        <span class="p-inputgroup-addon">                            
                            Data
                        </span>                        
                        <Calendar v-model="currentEvent.eventdate" />
                    </div>
                </div>
                <div class="col-12 md:col-4">
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                        Categoria:
                    </span>
                    <Dropdown v-model="currentEventStatus" 
                                :options="eventStatus" 
                                optionLabel="Estat:" 
                                optionValue="id"  
                                dataKey="id" />
                    </div>
                </div>
                <div class="col-12 md:col-8"></div>
                <div class="col-12 md:col-2">
                    <Button label="Acceptar" @click="save()"/>
                </div>
                <div class="col-12 md:col-2">
                    <Button label="Cancelar" @click="closeDialog()"/>
                </div>
            </div>
        </div>   
    </Dialog>
    </div>
</template>
<script lang="ts">
import eventService from '../api/event.service';
import eventstatusService from '../api/eventstatus.service';


export default {
    name: "event-list",
    data() {
        return {
            events: [],
            currentEvent: {
                id:0,
                description:'',
                eventdate:'',
                eventstatusid: 0,
                estimatedcost: 0,
                estimatedtime: 0,
                realcost: 0,
                realtime: 0,
                saleprice: 0, 
            },
            currentEventItems: [],
            currentEventEmployeeCategories: [],            
            eventStatus: [],
            currentEventStatus: null,
            display:false,
        };
    },
    methods: {
        fetchData(){
            this.getEvent();
            this.getEventStatus();
        },
        onRowSelect(event: any){
            this.events = event.data;
        },
        openDialog(currentid: number){            
            if (currentid !== 0) {
                eventService.getDetailedById(currentid)
                .then(response => {
                    this.currentEvent = response.data.event                    
                    this.currentEventItems = response.data.item
                    this.currentEventEmployeeCategories = response.data.employeecategories
                })
                .catch(e => {
                    console.log(e)
                });                        
                this.display = true
            }else{
                this.resetData()
                this.fetchData()
                this.display = true
            }
            
        },
        closeDialog(){
            this.display = false
        },
        drop(currentid: number){
            console.log(currentid)
        },
        formatCurrency(value: any) {
            return value.toLocaleString('es-ES', {style: 'currency', currency: 'EUR'});
        },
        resetData(){
            this.currentEvent.id = 0
            this.currentEvent.eventstatusid = 0
            this.currentEvent.description = ''
            this.currentEvent.eventdate = ''
            this.currentEvent.estimatedcost = 0
            this.currentEvent.estimatedtime = 0
            this.currentEvent.realcost = 0
            this.currentEvent.realtime = 0
            this.currentEvent.saleprice = 0
            this.currentEventItems = []
            this.currentEventEmployeeCategories = []
        },
        save(){
            if (this.currentEvent.id === 0){
                eventService.set(this.currentEvent).then((response) => {
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
        }else{
            console.log("update")
        }
    },
        getEventStatus(){
            eventstatusService.getAll()
            .then(response => {
                this.eventStatus = response.data
            })
            .catch(e => {
                console.log(e)
            });
        },
        getEvent() {
            eventService.getAll()
            .then(response => {
                this.events = response.data
            })
            .catch(e => {
                console.log(e)
            });            
        }
    },
    mounted(){
        this.fetchData();
    }
}
</script>