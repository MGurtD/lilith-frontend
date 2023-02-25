<template>
    <Toast />
    <div class="grid p-fluid">
        <div class="col-12 md:col-11"></div>
        <div class="col-12 md:col-1">
        <Button label="Afegir" icon="pi pi-add" class="p-button-success" @click="openDialog(0)"></Button>
        </div>
    </div>
    <div class="row">
        <DataTable :value="items" v-model:selection="currentItem" datakey="id" stripedRows responsiveLayout="scroll" 
                    :paginator="true"  showGridlines :rows="10"
                    filterDisplay="menu" :globalFilterFields="['description']"
                    @row-click="onRowSelect">    
            <template #empty>
                    No hi ha articles.
                </template>
                <template #loading>
                    Carregant articles, si us plau espereu.
                </template>    
            <Column field="code" header="Codi" :sortable="true">

            </Column>
            <Column field="description" header="Descripció">
                <template #filter="{filterModel}">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by name"/>
                </template>
            </Column>
            <Column field="costprice" header="Preu Cost" :sortable="true">
                <template #body="slotProps">
                    {{formatCurrency(slotProps.data.costPrice)}}
                </template>
            </Column>
            <Column field="salePrice" header="Preu Venta" :sortable="true">
                <template #body="slotProps">
                    {{formatCurrency(slotProps.data.salePrice)}}
                </template>
            </Column>
            <Column field="categoryDescription" header="Categoria" :sortable="true"></Column>
            <Column field="forPurchase" header="Compra" :sortable="true">
                <template #body="slotProps">
                    <Checkbox v-model="slotProps.data.forPurchase" :binary="true" :disabled="true"/>                    
                </template>
                
            </Column>
            <Column field="forManufacture" header="Producció" :sortable="true">
                <template #body="slotProps">
                    <Checkbox v-model="slotProps.data.forManufacture" :binary="true" :disabled="true"/>                    
                </template>
            </Column>
            <Column field="forSale" header="Venta" :sortable="true">
                <template #body="slotProps">
                    <Checkbox v-model="slotProps.data.forSale" :binary="true" :disabled="true"/>
                </template>
            </Column>
            <Column field="active" header="Actiu" :sortable="true">
                <template #body="slotProps">
                    <Checkbox v-model="slotProps.data.active" :binary="true" :disabled="true"/>
                </template>
            </Column>
            <Column field="id" header="">
                <template #body="slotProps">
                    <Button label="" icon="pi pi-pencil" @click="openDialog(slotProps.data.id)"/>
                    &nbsp;&nbsp;
                    <Button label="" icon="pi pi-trash" @click="drop(slotProps.data.id)"/>
                </template>
                
            </Column>
        </DataTable>
    </div>
    <Dialog header="Article" v-model:visible="display" >

        <div>
        <div class="grid p-fluid">
            <div class="col-12 md:col-4">
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                        Codi:
                    </span>
                    <InputText placeholder="Codi" v-model="currentItem.code" />
                </div>
            </div>

            <div class="col-12 md:col-8">
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                        Descripció:
                    </span>
                    <InputText placeholder="Descripció" v-model="currentItem.description" />                    
                </div>
            </div>
            <div class="col-12 md:col-4">
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                        Categoria:
                    </span>
                    <Dropdown v-model="currentItem.categoryId" :options="categories" optionLabel="description" optionValue="id" dataKey="id" />
                </div>
            </div>
            <div class="col-12 md:col-4">
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                        Preu de cost:
                    </span>
                    <InputNumber placeholder="Cost Price" mode="decimal" :minFractionDigits="2" :maxFractionDigits="2" v-model="currentItem.costPrice" currency="EUR" locale="es-ES"/>    
                    <span class="p-inputgroup-addon">€</span>                
                </div>
            </div>
            <div class="col-12 md:col-4">
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                        Preu de venta:
                    </span>
                    <InputNumber placeholder="Preu de venta" mode="decimal" :minFractionDigits="2" :maxFractionDigits="2" v-model="currentItem.salePrice" currency="EUR" locale="es-ES" />
                    <span class="p-inputgroup-addon">€</span>
                </div>
            </div>

            <div class="col-12 md:col-3">
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">                        
                        <Checkbox v-model="currentItem.forPurchase" :binary="true"/>
                        &nbsp;&nbsp;Es de compra
                    </span>                    
                </div>
            </div>

            <div class="col-12 md:col-3">
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">                        
                        <Checkbox v-model="currentItem.forSale" :binary="true"/>
                        &nbsp;&nbsp;Es de venta
                    </span>                    
                </div>
            </div>
            <div class="col-12 md:col-3">
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">                        
                        <Checkbox v-model="currentItem.forManufacture" :binary="true"/>
                        &nbsp;&nbsp;Es de producció
                    </span>                    
                </div>
            </div>
            <div class="col-12 md:col-3">
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">                        
                        <Checkbox v-model="currentItem.active" :binary="true"/>
                        &nbsp;&nbsp;Actiu
                    </span>                    
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
    <ConfirmDialog />
</template>
<script>
import itemService from '@/services/item.service';
import categoryService from '@/services/category.service';

//import FilterMatchMode from 'primevue/api';

export default {
    name: "item-list",
    data() {
        return{
            ret: null,
            items: [],            
            categories: [],
            currentCategory:  null,
            currentItem: {  id:0,
                                code: '',
                                description: '',
                                costPrice: 0.0,
                                salePrice: 0.0,
                                categoryId: 0,
                                forPurchase: false,
                                forManufacture: false,
                                forSale: false,
                                active: false,
                            },
            currentIndex: -1,
            code: "",
            display:false,
            
        };
    },
    methods:{
        fetchData(){
            itemService.getAll()
            .then(response =>{
                this.items = response.data;
                console.log(response.data)
            })
            .catch(e => {
                console.log(e);
            });
            categoryService.getAll()
            .then(response =>{
                console.log(this.categories)
                this.categories = response.data
                
            })
            .catch(e => {
                console.log(e);
            });
        },
        formatCurrency(value) {
            return value.toLocaleString('es-ES', {style: 'currency', currency: 'EUR'});
        },
        onRowSelect(event) {
            this.currentItem = event.data
            console.log(event.data);
        },
        openDialog(currentid){
            if (currentid !== 0) {
                console.log("diferent de 0")
                this.currentItem = this.items.find(({id}) => id === currentid)
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
        save(){
            console.log(this.currentCategory)
            this.currentItem.categoryId = this.currentCategory
            if (this.currentItem.id === 0) {
                itemService.set(this.currentItem)
                .then(response => {
                    if (response.status === null){
                        this.$toast.add({severity:'error', summary: 'Error Message', detail:'Error al crear el registre: ' + this.ret.PromiseResult.statusText, life: 3000});    
                    }
                    if (response.status === 201){
                        this.$toast.add({severity:'success', summary: 'Succes Message', detail:'Registre creat' , life: 3000});                      
                    }
                })
            }else{
                itemService.update(this.currentItem)
                .then(response => {
                    if (response.status === null){
                        this.$toast.add({severity:'error', summary: 'Error Message', detail:'Error a l\'actualitzar el registre: ' + this.ret.PromiseResult.statusText, life: 3000});    
                    }
                    if (response.status === 201){
                        this.$toast.add({severity:'success', summary: 'Succes Message', detail:'Registre actualitzat' , life: 3000});  
                    }
                })

            }
            this.fetchData()
            this.closeDialog()
        },
        drop(id){       
            this.$confirm.require({
                message: 'Vols esborrar el registre seleccionat?' + this.currentItem.code,
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    itemService.delete(id)
                    .then(response => {
                        if (response.status === 202){
                        this.$toast.add({severity:'success', summary: 'Succes Message', detail:'Registre eliminat correctament' , life: 3000});  
                        this.fetchData()  
                    }
                    })
                },
                reject: () => {
                    //callback to execute when user rejects the action
                },
                onShow: () => {
                    //callback to execute when dialog is shown
                },
                onHide: () => {
                    //callback to execute when dialog is hidden
                }
            });
            
        },
        resetData(){
            this.currentItem.id = 0
            this.currentItem.code = ''
            this.currentItem.description = ''
            this.currentItem.costPrice = 0.0
            this.currentItem.salePrice = 0.0
            this.currentItem.categoryId = 0
            this.currentItem.forPurchase = false
            this.currentItem.forManufacture = false
            this.currentItem.forSale = false
            this.currentItem.active = false
        }
    },
    mounted(){        
        this.fetchData();                
    },

    
}

</script>
