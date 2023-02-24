import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from 'store'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import Button from 'primevue/button'
import Card from 'primevue/card';
import Chart from 'primevue/chart';
import Dropdown from 'primevue/dropdown';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Checkbox from 'primevue/checkbox';
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Calendar from 'primevue/calendar';


createApp(App)
    .use(router)
    .use(store)    
    .use(PrimeVue, {ripple: true})
    .use(ToastService)
    .use(ConfirmationService)
    .component('Button', Button)
    .component('Card', Card)
    .component('Chart', Chart)
    .component("DataTable", DataTable)
    .component("Column", Column)
    .component("Dialog", Dialog)
    .component("InputText", InputText)
    .component("InputNumber", InputNumber)
    .component("Checkbox", Checkbox)
    .component("Toast", Toast)
    .component("ConfirmDialog", ConfirmDialog)
    .component("Dropdown", Dropdown)
    .component("TabView", TabView)
    .component("TabPanel", TabPanel)
    .component("Calendar", Calendar)
    .mount('#app')
