import { App as VueApp, createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import { createI18n } from "vue-i18n";
import messages from "./i18n/translations";
import router from "./router";

const pinia = createPinia();
const i18n = createI18n({
  locale: "ca", // set locale
  fallbackLocale: "es", // set fallback locale
  messages, // set locale messages
  // If you need to specify other options, you can set other options
  // ...
});
const app: VueApp<Element> = createApp(App).use(router).use(pinia).use(i18n);

import "primevue/resources/primevue.min.css";
import "primevue/resources/themes/lara-light-blue/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "boxicons";
import "material-icons/iconfont/material-icons.css";

import PrimeVue from "primevue/config";
import Tooltip from "primevue/tooltip";
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
import Textarea from "primevue/textarea";
import RadioButton from "primevue/radiobutton";
import ColorPicker from "primevue/colorpicker";
import SplitButton from "primevue/splitbutton";
import ConfirmPopup from "primevue/confirmpopup";
import BaseInput from "./components/BaseInput.vue";
import BooleanColumn from "./components/tables/BooleanColumn.vue";
import ConfirmationService from "primevue/confirmationservice";
import Calendar from "primevue/calendar";
import catalan from "./i18n/catalan";

app.use(PrimeVue, {
  locale: catalan,
});
app.use(ToastService);
app.use(ConfirmationService);

app.directive("tooltip", Tooltip);

app
  .component("Toast", Toast)
  .component("Button", Button)
  .component("SplitButton", SplitButton)
  .component("Card", Card)
  .component("Chart", Chart)
  .component("Calendar", Calendar)
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
  .component("Textarea", Textarea)
  .component("RadioButton", RadioButton)
  .component("BaseInput", BaseInput)
  .component("BooleanColumn", BooleanColumn)
  .component("ColorPicker", ColorPicker);

app.mount("#app");
