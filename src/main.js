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


createApp(App)
    .use(router)
    .use(store)    
    .use(PrimeVue, {ripple: true})
    .use(ToastService)
    .use(ConfirmationService)
    .component('Button', Button)
    .component('Card', Card)
    .component('Chart', Chart)
    .mount('#app')
