import { App as VueApp, createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";
import router from "./router";

const pinia = createPinia();
const app: VueApp<Element> = createApp(App).use(router).use(pinia);

import "primevue/resources/primevue.min.css";
import "primevue/resources/themes/lara-light-indigo/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import Toast from "primevue/toast";
import Button from "primevue/button";
import Card from "primevue/card";
import Chart from "primevue/chart";
import Dropdown from "primevue/dropdown";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Checkbox from "primevue/checkbox";
import ConfirmDialog from "primevue/confirmdialog";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import Calendar from "primevue/calendar";
import ConfirmPopup from "primevue/confirmpopup";
import ConfirmationService from "primevue/confirmationservice";

app.use(PrimeVue);
app.use(ToastService);
app.use(ConfirmationService);

app
  .component("Toast", Toast)
  .component("Button", Button)
  .component("Card", Card)
  .component("Chart", Chart)
  .component("DataTable", DataTable)
  .component("Column", Column)
  .component("Dialog", Dialog)
  .component("ConfirmPopup", ConfirmPopup)
  .component("InputText", InputText)
  .component("InputNumber", InputNumber)
  .component("Checkbox", Checkbox)
  .component("ConfirmDialog", ConfirmDialog)
  .component("Dropdown", Dropdown)
  .component("TabView", TabView)
  .component("TabPanel", TabPanel)
  .component("Calendar", Calendar);

app.mount("#app");
