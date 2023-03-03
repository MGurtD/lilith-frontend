<template>    
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
        <Column field="description" header="Descripció" :sortable="true">

        </Column>
        <Column field="eventdate" header="Data"  :sortable="true"></Column>
        <Column field="saleprice" header="Preu de venta" >
            <template #body="slotProps">
                    {{formatCurrency(slotProps.data.saleprice)}}
                </template></Column>
        <Column field="id" header="" style="text-align: right;">
            <template #body="slotProps">
                    <Button label="" icon="pi pi-pencil" @click="openDialog(slotProps.data.id)" aria-label="Modificar dades generals"/>
                    &nbsp;&nbsp;
                    <Button label="" icon="pi pi-trash" @click="drop(slotProps.data.id)"/>
            </template>
                
        </Column>
    </DataTable>
    <Dialog header="Detall de l'event" :breakpoints="{'960px': '95vw', '640px': '100vw'}" :style="{width: '95vw'}" v-model:visible="display" >
        <TabView lazy>
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
                    <div class="col-12 md:col-3">
                    <div class="p-inputgroup">
                        <span class="p-inputgroup-addon">
                            Descompte:
                        </span>
                        <InputNumber v-model="currentEvent.discount" 
                                    placeholder="Descompte:" 
                                    suffix=" %" 
                                    :minFractionDigits="2"
                                    :maxFractionDigits="2"
                                     />
                                     <span class="p-inputgroup-addon" @click="setDiscount()"><i class="pi pi-calculator"></i></span>
                        
                        </div>
                    </div>
                    <div class="col-12 md:col-3">
                    <div class="p-inputgroup">
                        <span class="p-inputgroup-addon">
                            Import:
                        </span>
                        <InputNumber v-model="currentEvent.grossprice" 
                                    placeholder="Import brut:" 
                                    mode="currency" 
                                    currency="EUR"
                                    :disabled="true"
                                     />
                        
                        </div>
                    </div>
                    <div class="col-12 md:col-3"></div>
                    <br />
                    <!-- Persones -->
                    <div class="col-12 md:col-3">
                    <div class="p-inputgroup">
                        <span class="p-inputgroup-addon">
                            Persones:
                        </span>
                        <InputNumber v-model="currentEvent.participants" 
                                    placeholder="Persones:"                                     
                                     />
                        
                    </div>
                    </div>
                    <div class="col-12 md:col-3">
                    <div class="p-inputgroup">
                        <span class="p-inputgroup-addon">
                            Cost persona:
                        </span>
                        <InputNumber v-model="currentEvent.costparticipant" 
                                    placeholder="Import brut:" 
                                    mode="currency" 
                                    currency="EUR"
                                    :disabled="true"
                                     />
                        
                        </div>
                    </div>
                    <div class="col-12 md:col-3">
                    <div class="p-inputgroup">
                        <span class="p-inputgroup-addon">
                            Import persona:
                        </span>
                        <InputNumber v-model="currentEvent.priceparticipant" 
                                    placeholder="Import brut:" 
                                    mode="currency" 
                                    currency="EUR"
                                    :disabled="true"
                                     />
                        
                        </div>
                    </div>
                    <div class="col-12 md:col-3"></div>
                    <br />
                    <div class="col-12 md:col-4">
                    <div class="p-inputgroup">
                        <span class="p-inputgroup-addon">
                            Cost:
                        </span>
                        <InputNumber v-model="currentEvent.realcost" placeholder="Cost real:" :disabled="true" mode="currency" currency="EUR"  />
                        </div>
                        
                    </div>
                    <div class="col-12 md:col-4">
                    <div class="p-inputgroup">
                        <span class="p-inputgroup-addon">
                            Preu:
                        </span>
                        <InputNumber v-model="currentEvent.saleprice" 
                                    placeholder="Preu de venta:" 
                                    mode="currency" 
                                    @input="getMargins()"
                                    @blur="getMargins()"
                                    @focus="getMargins()"
                                    currency="EUR"  />
                        
                        </div>
                    </div>
                    <div class="col-12 md:col-4">
                        <div class="p-inputgroup">
                        <span class="p-inputgroup-addon">
                            Marge:
                        </span>
                        <InputNumber :model-value="margin" 
                                    placeholder="Marge:" 
                                    suffix=" %" 
                                    :minFractionDigits="2"
                                    :maxFractionDigits="2"
                                    :disabled="true" />
                        <span class="p-inputgroup-addon" :visible="marginAlert"><i class="pi pi-exclamation-triangle"></i></span>
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
        <TabPanel header="Articles" :disabled="currentEvent.id === 0 ? true : false">
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
                    <div class="col-12 md:col-1"></div>
                    <div class="col-12 md:col-1">
                    <Button label="Afegir" icon="pi pi-add" class="p-button-success" @click="addEventItem()"></Button>
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
                :rows="6"
                filterDisplay="menu"
                :globalFilterFields="['itemDescription']"
                @row-click="onItemRowSelect"

            >
                <Column field="itemCode" header="Codi" :sortable="true" />
                <Column field="itemDescription" header="Descripció" :sortable="true" />
                <Column field="initialquantity" header="Quantitat" :sortable="true" />
                <Column field="costPrice" header="Preu de cost" :sortable="true" />
                <Column field="salePrice" header="Preu de venda" :sortable="true" />
                <Column field="totalCost" header="Cost linea" >
                    <template #body="slotProps">
                        {{ slotProps.data.costPrice * slotProps.data.initialquantity }}
                    </template>
                </Column>
                <Column field="totalImport" header="Import linea" >
                    <template #body="slotProps">
                        {{ slotProps.data.salePrice * slotProps.data.initialquantity }}
                    </template>
                </Column>
                <Column field="margin" header="Marge linea" >
                    <template #body="slotProps">
                        {{ 100 - 
                                (((slotProps.data.costPrice * slotProps.data.initialquantity)/
                                (slotProps.data.salePrice * slotProps.data.initialquantity))*100.0)
                                 }}
                    </template>
                </Column>
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
        <TabPanel header="Persones" :disabled="currentEvent.id === 0 ? true : false">
            <div>
                <div class="grid p-fluid">
                    <div class="col-12 md:col-6">
                        <div class="p-inputgroup">
                        <span class="p-inputgroup-addon"> Categories: </span>
                        <Dropdown
                            :options="categories"
                            v-model="selectedCategory"
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
                                v-model="selectedEmployeeCategoryQuantity"
                                />
                        </div>
                    </div>
                    <div class="col-12 md:col-2">
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon"> Temps: </span>
                                <InputNumber
                                placeholder="Temps"
                                v-model="selectedEmployeeCategoryTime"
                                />
                        </div>
                    </div>
                    <div class="col-12 md:col-1"></div>
                    <div class="col-12 md:col-1">
                    <Button label="Afegir" icon="pi pi-add" class="p-button-success" @click="addEventEmployeeCategory()"></Button>
                    </div>
                </div>
            </div>
            <!--currentEventEmployeeCategories-->
            <DataTable
                :value="currentEventEmployeeCategories"
                v-model:selection="newEventEmployeeCategory"
                datakey="id"
                stripedRows
                responsiveLayout="scroll"
                :paginator="true"
                showGridlines
                :rows="6"                                
                @row-click="onEmployeeCategoryRowSelect"

            >
            <Column field="employeecategorydescription" header="Descripció" :sortable="true" />
            <Column field="initialquantity" header="Persones" />
            <Column field="initialtime" header="Hores" />
            <Column field="costPrice" header="P.C. hora/persona" />
            <Column field="salePrice" header="P.V. hora/persona" />
            <Column field="totalCost" header="Cost linea" >
                    <template #body="slotProps">
                        {{ slotProps.data.costPrice * slotProps.data.initialquantity * slotProps.data.initialtime }}
                    </template>
                </Column>
                <Column field="totalImport" header="Import linea" >
                    <template #body="slotProps">
                        {{ slotProps.data.salePrice * slotProps.data.initialquantity * slotProps.data.initialtime }}
                    </template>
                </Column>
                <Column field="margin" header="Marge linea" >
                    <template #body="slotProps">
                        {{ 100 - 
                                (((slotProps.data.costPrice * slotProps.data.initialquantity * slotProps.data.initialtime)/
                                (slotProps.data.salePrice * slotProps.data.initialquantity * slotProps.data.initialtime))*100.0)
                                 }}
                    </template>
                </Column>
                <Column field="id" header="" style="text-align: right;">
                    <template #body="slotProps">
                    <Button
                        label=""
                        icon="pi pi-trash"
                        @click="dropEmployeeCategory(slotProps.data.id)"
                    />
                    </template>
                </Column>
            </DataTable>
        </TabPanel>
    </TabView>
    </Dialog>
    </div>
</template>
<script lang="ts">
import eventService from '../api/event.service';
import eventstatusService from '../api/eventstatus.service';
import itemService from '../api/item.service';
import employeecategoryService from '../api/employeecategory.service';


export default {
    name: "event-list",
    data() {
        //Dades
        return {
            //Formulari principal
            events: [],
            currentEvent: {
                id:0,
                description:'',
                participants:0,
                eventdate:'',
                eventstatusid: 0,
                estimatedcost: 0,
                estimatedtime: 0,
                realcost: 0,
                realtime: 0,
                grossprice:0,
                saleprice: 0, 
                discount: 0,
                costparticipant:0,
                priceparticipant:0,
            },
            eventStatus: [],
            currentEventStatus: null,            
            //Pestanya general
            display:false,
            eventItems: [],            
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
            margin: 0,
            marginAlert: false,
            //Pestanya articles
            newEventItem: {
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
            selectedItem: 0,
            selectedItemQuantity: 0,
            currentEventEmployeeCategories: [],            
            
            eventSaved: true,
            //Pestanya persones
            categories: [],
            selectedCategory: 0,
            selectedEmployeeCategoryQuantity: 0,
            selectedEmployeeCategoryTime: 0,
            newEventEmployeeCategory: {
                id: 0,
                eventid: 0,
                employeecategoryid: 0,
                employeecategorycode: '',
                employeecategorydescription: '',
                initialquantity: 0,
                realquantity:0,
                initialtime:0,
                realtime:0,
                costPrice: 0,
                salePrice: 0
            },

        };
    },
    methods: {
        //General / Events
        fetchData(){
            this.getEvent();
            this.getEventStatus();
            
        },
        onRowSelect(event: any){
            //this.events = event.data;
            
            console.log(event.data)
        },
        openDialog(currentid: number){            
            
            if (currentid !== 0) {
                this.getDetailed(currentid)     
                this.getMargins()           
                this.display = true
            }else{
                this.resetData()
                this.fetchData()
                this.getMargins()
                this.display = true
            }
            
        },
        closeDialog(){
            this.fetchData();
            this.display = false
        },
        drop(currentid: number){
            this.$confirm.require({
            message:
            "Vols esborrar el registre seleccionat? " + this.currentEvent.description,
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            accept: () => {
                eventService.delete(currentid)
                .then(response => {
                    if (response.status === null) {
                            this.$toast.add({
                            severity: "error",
                            summary: "Error Message",
                            detail: "Error a l'esborrar el registre: ", //+ this.ret?.PromiseResult?.statusText,
                            life: 3000,
                            });
                        }
                        if (response.status === 202) {
                            this.$toast.add({
                            severity: "success",
                            summary: "Succes Message",
                            detail: "Registre esborrat",
                            life: 3000,
                            });
                            this.fetchData();
                        }
                })
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
        getEmployeeCategories() {
            employeecategoryService.getAll()
            .then(response => {
                this.categories = response.data
            })
            .catch(e => {
                console.log(e)
            })
        },
        getMargins(){            
            this.margin = 100-((this.currentEvent.realcost/this.currentEvent.saleprice) * 100.0) 
            if (this.margin < 30){
                this.marginAlert = true
            }else{
                this.marginAlert = false
            }
        },
        setDiscount(){                        
            console.log(this.currentEvent.id)
            /*let discount = this.currentEvent.discount
            let grosprice = this.currentEvent.grossprice
            let saleprice = this.currentEvent.saleprice
            if (this.currentEvent.discount === 0){
                this.currentEvent.saleprice = this.currentEvent.grossprice
            }else{
                this.currentEvent.saleprice = this.currentEvent.grossprice * (1-(this.currentEvent.discount/100))
            }*/
            console.log(this.currentEvent)
            this.currentEvent.saleprice = this.currentEvent.grossprice * (1-(this.currentEvent.discount/100))
            //console.log(saleprice, grosprice, )
            //this.currentEvent.saleprice = saleprice
            this.getMargins()
        },
        //Dialog / General    
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
            eventService.update(this.currentEvent).then((response) => {
                if(response.status === null ){
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
                        detail: "Registre actualitzat",
                        life: 3000,
                        });
                        this.fetchData();
                    }
            });

            console.log(this.currentEvent)
        }
        this.closeDialog();
    },    
        getDetailed(currentid: number){
            eventService.getDetailedById(currentid)
                .then(response => {
                    this.currentEvent = response.data.event                    
                    this.eventItems = response.data.item
                    this.currentEventEmployeeCategories = response.data.employeecategory
                    console.log(this.currentEventEmployeeCategories)
                })
                .catch(e => {
                    console.log(e)
                }); 
        },
        //Dialog / Articles
        onItemRowSelect(event:any){
            this.currentEventItems = event.data;
        },
        dropItem(itemId: number){
            this.$confirm.require({
            message:
            "Vols esborrar el registre seleccionat? " + this.currentEventItems.itemCode,
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            accept: () => {
                eventService.deleteItemEvent(itemId)
                .then(response => {
                    if (response.status === null) {
                            this.$toast.add({
                            severity: "error",
                            summary: "Error Message",
                            detail: "Error a l'esborrar el registre: ", //+ this.ret?.PromiseResult?.statusText,
                            life: 3000,
                            });
                        }
                        if (response.status === 202) {
                            eventService.economicCalculations(this.currentEvent.id)
                            .then(response => {
                                this.getDetailed(this.currentEvent.id)
                                if (response.status === null) {
                                        this.$toast.add({
                                        severity: "error",
                                        summary: "Error Message",
                                        detail: "Error a l'afegir el registre: ", //+ this.ret?.PromiseResult?.statusText,
                                        life: 3000,
                                        });
                                    }
                                    if (response.status === 201) {
                                        this.$toast.add({
                                        severity: "success",
                                        summary: "Succes Message",
                                        detail: "Registre afegit",
                                        life: 3000,
                                        });
                                        this.getDetailed(this.currentEvent.id)
                                        this.getMargins()
                                    }
                            })
                            .catch(e =>{
                                console.log(e)
                            })
                        }
                })
            },
            reject: () => {
            //callback to execute when user rejects the action
            },
            onHide: () => {
            //callback to execute when dialog is hidden
            },
        });
        },
        addEventItem(){            
            this.newEventItem.itemid = this.selectedItem
            this.newEventItem.initialquantity = this.selectedItemQuantity
            this.newEventItem.eventid = this.currentEvent.id
            eventService.addItemEvent(this.newEventItem)
            .then(response => {                
                eventService.economicCalculations(this.currentEvent.id)
                .then(response => {
                    this.getDetailed(this.currentEvent.id)
                    if (response.status === null) {
                            this.$toast.add({
                            severity: "error",
                            summary: "Error Message",
                            detail: "Error a l'afegir el registre: ", //+ this.ret?.PromiseResult?.statusText,
                            life: 3000,
                            });
                        }
                        if (response.status === 201) {
                            this.$toast.add({
                            severity: "success",
                            summary: "Succes Message",
                            detail: "Registre afegit",
                            life: 3000,
                            });
                            this.getDetailed(this.currentEvent.id)
                            this.getMargins()
                        }
                })
                .catch(e =>{
                    console.log(e)
                })
            })
            .catch(e => {
                console.log(e)
            })
        },
        //EmployeeCategories tab
        addEventEmployeeCategory(){
            this.newEventEmployeeCategory.employeecategoryid = this.selectedCategory
            this.newEventEmployeeCategory.initialquantity = this.selectedEmployeeCategoryQuantity
            this.newEventEmployeeCategory.initialtime = this.selectedEmployeeCategoryTime
            this.newEventEmployeeCategory.eventid = this.currentEvent.id
            eventService.addEmployeeCategoryEvent(this.newEventEmployeeCategory)
            .then(response => {                
                eventService.economicCalculations(this.currentEvent.id)
                .then(response => {
                    this.getDetailed(this.currentEvent.id)
                    if (response.status === null) {
                            this.$toast.add({
                            severity: "error",
                            summary: "Error Message",
                            detail: "Error a l'afegir el registre: ", //+ this.ret?.PromiseResult?.statusText,
                            life: 3000,
                            });
                        }
                        if (response.status === 201) {
                            this.$toast.add({
                            severity: "success",
                            summary: "Succes Message",
                            detail: "Registre afegit",
                            life: 3000,
                            });
                            this.getDetailed(this.currentEvent.id)
                            this.getMargins()
                        }
                })
                .catch(e =>{
                    console.log(e)
                })
            })
            .catch(e => {
                console.log(e)
            })
        },
        dropEmployeeCategory(employeecategoryId: number){
            this.$confirm.require({
            message:
            "Vols esborrar el registre seleccionat? " + this.newEventEmployeeCategory.employeecategorycode,
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            accept: () => {
                eventService.deleteEmployeeCategoryEvent(employeecategoryId)                
                .then(response => {
                    if (response.status === null) {
                            this.$toast.add({
                            severity: "error",
                            summary: "Error Message",
                            detail: "Error a l'esborrar el registre: ", //+ this.ret?.PromiseResult?.statusText,
                            life: 3000,
                            });
                        }
                        if (response.status === 202) {
                            eventService.economicCalculations(this.currentEvent.id)
                                .then(response => {
                                    this.getDetailed(this.currentEvent.id)
                                    if (response.status === null) {
                                            this.$toast.add({
                                            severity: "error",
                                            summary: "Error Message",
                                            detail: "Error a l'afegir el registre: ", //+ this.ret?.PromiseResult?.statusText,
                                            life: 3000,
                                            });
                                        }
                                        if (response.status === 201) {
                                            this.$toast.add({
                                            severity: "success",
                                            summary: "Succes Message",
                                            detail: "Registre afegit",
                                            life: 3000,
                                            });
                                            this.getDetailed(this.currentEvent.id)
                                            this.getMargins()
                                        }
                                })
                                .catch(e =>{
                                    console.log(e)
                                })
                        }
                })
            },
            reject: () => {
            //callback to execute when user rejects the action
            },
            onHide: () => {
            //callback to execute when dialog is hidden
            },
        });
        },
        onEmployeeCategoryRowSelect(event:any){
            console.log(event.data)
        }
    },
    mounted(){
        this.fetchData();
        this.getItems();
        this.getEmployeeCategories();
        this.getMargins();
    }
}
</script>