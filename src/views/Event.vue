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
        <TabView>
            <TabPanel header="Generals">
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
                                Estat:
                            </span>
                            <Dropdown v-model="currentEvent.eventstatusid" 
                                    :options="eventStatus" 
                                    optionLabel="description" 
                                    optionValue="id"  
                                    dataKey="id" />
                        </div>
                    </div>
                    <div class="col-12 md:col-3">
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">                            
                                Data:
                            </span>                        
                            <Calendar v-model="currentEvent.eventdate" />
                        </div>
                    </div>
                    <div class="col-12 md:col-9"></div>
                    <br />
                    <div class="col-12 md:col-3">
                    <div class="p-inputgroup">
                        <span class="p-inputgroup-addon">
                            Temps estimat:
                        </span>
                        <InputNumber v-model="currentEvent.estimatedtime" placeholder="Temps estimat:"  />
                        </div>
                    </div>
                    <div class="col-12 md:col-3">
                    <div class="p-inputgroup">
                        <span class="p-inputgroup-addon">
                            Cost estimat:
                        </span>
                        <InputNumber v-model="currentEvent.estimatedcost" placeholder="Cost estimat:" />
                        </div>
                    </div>
                    <div class="col-12 md:col-6"></div>
                    <div class="col-12 md:col-3">
                    <div class="p-inputgroup">
                        <span class="p-inputgroup-addon">
                            Temps real:
                        </span>
                        <InputNumber v-model="currentEvent.realtime" placeholder="Temps real:" :disabled="true"  />
                        </div>
                    </div>
                    <div class="col-12 md:col-3">
                    <div class="p-inputgroup">
                        <span class="p-inputgroup-addon">
                            Cost real:
                        </span>
                        <InputNumber v-model="currentEvent.realcost" placeholder="Cost real:" :disabled="true" mode="currency" currency="EUR"  />
                        </div>
                        
                    </div>
                    <div class="col-12 md:col-3">
                    <div class="p-inputgroup">
                        <span class="p-inputgroup-addon">
                            Preu de venta:
                        </span>
                        <InputNumber v-model="currentEvent.saleprice" placeholder="Preu de venta:" mode="currency" currency="EUR"  />
                        <span class="p-inputgroup-addon"><i class="pi pi-exclamation-triangle"></i></span>
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
        </TabPanel>
        <TabPanel header="Articles">
            <div>
                <div class="grid p-fluid">
                    <div class="col-12 md:col-8">
                        <div class="p-inputgroup">
                        <span class="p-inputgroup-addon"> Items: </span>
                        <Dropdown
                            :options="items"
                            v-model="selectedItem"
                            optionLabel="description"
                            optionValue="id"
                            dataKey="id"
                            :filter="true"
                            ></Dropdown>
                        </div>
                    </div>
                    <div class="col-12 md:col-2">
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon"> Quantitat: </span>
                                <InputNumber
                                placeholder="Quantitat"
                                v-model="selectedItemQuantity"
                                />
                        </div>
                    </div>
                </div>
            </div>
            <DataTable
                :value="eventItems"
                v-model:selection="currentEventItems"
                datakey="id"
                stripedRows
                responsiveLayout="scroll"
                :paginator="true"
                showGridlines
                :rows="10"
                filterDisplay="menu"
                :globalFilterFields="['itemDescription']"
                @row-click="onItemRowSelect"

            >
                <Column field="itemCode" header="Codi" :sortable="true" />
                <Column field="itemDescription" header="Descripció" :sortable="true" />
                <Column field="initialQuantity" header="Quantitat" :sortable="true" />
                <Column field="costPrice" header="Preu de cost" :sortable="true" />
                <Column field="salePrice" header="Preu de venda" :sortable="true" />
                <Column field="id" header="" style="text-align: right;">
                    <template #body="slotProps">
                    <Button
                        label=""
                        icon="pi pi-trash"
                        @click="dropItem(slotProps.data.id)"
                    />
                    </template>
                </Column>
            </DataTable>
        </TabPanel>
        <TabPanel header="Persones">

        </TabPanel>
    </TabView>
    </Dialog>
    </div>
</template>
<script lang="ts">
import eventService from '../api/event.service';
import eventstatusService from '../api/eventstatus.service';
import itemService from '../api/item.service';


export default {
    name: "event-list",
    data() {
        return {
            events: [],
            eventItems: [],
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
            currentEventItems: {
                id: 0,
                eventid: 0,
                itemid: 0,
                itemCode: '',
                itemDescription:'',
                initialquantity: 0,
                reloadquantity: 0,
                wastequantity: 0,
                rollbackquantity: 0,
                costPrice: 0,
                salePrice: 0
            },
            items: [],
            selectedItem: null,
            selectedItemQuantity: 0,
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
        onItemRowSelect(event:any){
            this.currentEventItems = event.data;
        },
        openDialog(currentid: number){            
            if (currentid !== 0) {
                eventService.getDetailedById(currentid)
                .then(response => {
                    this.currentEvent = response.data.event                    
                    this.eventItems = response.data.item
                    this.currentEventEmployeeCategories = response.data.employeecategories
                    console.log(this.eventItems)
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
            this.eventItems = []
            this.currentEventEmployeeCategories = []
        },
        save(){
            if (this.currentEvent.id === 0){
                eventService.create(this.currentEvent).then((response) => {
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
        },
        getItems() {
            itemService.getAll()
            .then(response => {
                this.items = response.data
            })
            .catch(e => {
                console.log(e)
            })
        },
        dropItem(itemId: number){
            console.log(itemId)
        }
    },
    mounted(){
        this.fetchData();
        this.getItems();
    }
}
</script>