<template>
    <Toast />
    <div class="grid p-fluid">
        <div class="col-12 md:col-11"></div>
        <div class="col-12 md:col-1">
        <Button label="Afegir" icon="pi pi-add" class="p-button-success" @click="openDialog(0)"></Button>
        </div>
    </div>
    <div class="row">
        <DataTable :value="categories" v-model:selection="currentCategory" 
        datakey="id" stripedRows responsiveLayout="scroll" 
        :paginator="true"  showGridlines :rows="10" filterDisplay="menu" 
        :globalFilterFields="['description']" @row-click="onRowSelect">    
        <template #empty>
            No hi ha categories.
        </template>
        <template #loading>
            Carregant categories, si us plau espereu.
        </template>  
        <Column field="code" header="Codi" :sortable="true">

        </Column>
        <Column field="description" header="Descripció">
            <template #filter="{filterModel}">
                <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by name"/>
            </template>
        </Column>
        <Column field="account" header="Codi" :sortable="true">

        </Column>
        <Column field="active" header="Actiu" :sortable="true">
                <template #body="slotProps">
                    <Checkbox v-model="slotProps.data.active" :binary="true"  disabled="true"/>
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
        <Dialog header="Categoria d'article" v-model:visible="display" >
            <div>
                <div class="grid p-fluid">
                    <div class="col-12 md:col-4">
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                                Codi:
                            </span>
                            <InputText placeholder="Codi" v-model="currentCategory.code" />
                        </div>
                    </div>
                    <div class="col-12 md:col-8">
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                            Descripció:
                            </span>
                            <InputText placeholder="Descripció" v-model="currentCategory.description" />                    
                        </div>
                    </div>            
                    <div class="col-12 md:col-6">
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">
                            Compte comptable:
                            </span>
                            <InputText placeholder="Codi" v-model="currentCategory.account" />
                        </div>
                    </div>
                    <div class="col-12 md:col-">
                        <div class="p-inputgroup">
                            <span class="p-inputgroup-addon">                        
                                <Checkbox v-model="currentCategory.active" :binary="true"/>
                                &nbsp;&nbsp;Activa
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
    </div>
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import categoryService from '@/services/category.service';
import Button from 'primevue/button'
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Checkbox from 'primevue/checkbox';
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog';


export default {
    name: "categroy-list",
    components: {
        Column,
        DataTable,
        Button,
        Dialog,
        InputText,
        Checkbox,
        Toast,
        ConfirmDialog        
    },
    data() {
        return {
            ret: null,
            categories: [],
            currentCategory: {
                id:0,
                code:'',
                description:'',
                account:'',
                active: false,
            },
            currentIndex: -1,
            display:false,            
        };    
    },
    methods:{
        fetchData(){
            categoryService.getAll()
            .then(response => {
                this.categories = response.data;
            })
            .catch(e => {
                console.log(e)
            });
        },
        onRowSelect(event){
            this.currentCategory = event.data;
        },
        openDialog(currentid){
            if (currentid !== 0) {                
                this.currentCategory = this.categories.find(({id}) => id === currentid)
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
        resetData(){
            this.currentCategory.id = 0,
            this.currentCategory.code = '',
            this.currentCategory.description = '',
            this.currentCategory.account = '',
            this.currentCategory.active = false
        }
    },
    mounted(){        
        this.fetchData();                
    },

}

</Script>