import { App as VueApp, createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import { i18n } from "./i18n";
import router from "./router";

const pinia = createPinia();
const app: VueApp<Element> = createApp(App).use(router).use(pinia).use(i18n);

import "primevue/resources/primevue.min.css";
import "primevue/resources/themes/lara-light-blue/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

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
import TreeTable from "primevue/treetable";
import Tag from "primevue/tag";
import Panel from "primevue/panel";
import catalan from "./i18n/primevue/catalan";
import Badge from "primevue/badge";
import InputGroupAddon from "primevue/inputgroupaddon";
import InputGroup from "primevue/inputgroup";
import InputIcon from "primevue/inputicon";
import IconField from "primevue/iconfield";
import MultiSelect from "primevue/multiselect";

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
  .component("ColorPicker", ColorPicker)
  .component("TreeTable", TreeTable)
  .component("Tag", Tag)
  .component("Badge", Badge)
  .component("Panel", Panel)
  .component("InputGroup", InputGroup)
  .component("InputGroupAddon", InputGroupAddon)
  .component("InputIcon", InputIcon)
  .component("IconField", IconField)
  .component("MultiSelect", MultiSelect);

app.mount("#app");
