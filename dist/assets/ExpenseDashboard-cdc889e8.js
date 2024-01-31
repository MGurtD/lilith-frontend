import{_ as M}from"./ExerciseDatePicker.vue_vue_type_script_setup_true_lang-36531003.js";import{d as O,h,a as g,m as E,w as u,i as o,e as t,D as S,k as c,u as G,r as p,o as U,P as b,H as j,c as W,n as w,C as z,G as K,p as Q,b as Y,V as I,l as A,f as Z}from"./index-61ceac46.js";import{u as q}from"./masterData-0b784b11.js";import{f as J,a as B,_ as X}from"./functions-4d7ada1d.js";import{E as L}from"./index-8c23bb58.js";import"./index-f0d98432.js";import"./base.service-558553c0.js";import"./reference.service-bac3a278.js";import"./_commonjsHelpers-725317a4.js";import"./v4-a960c1f4.js";import"./suppliers.service-dfe346f2.js";const ee=O({__name:"TableConsolidatedExpenses",props:{expenses:{}},setup(_){const m=_;return(D,x)=>{const a=h("Column"),C=h("DataTable");return g(),E(C,{value:m.expenses,tableStyle:"min-width: 100%"},{default:u(()=>[o(a,{field:"type",header:"Tipus de despesa",style:{width:"10%"}}),o(a,{field:"typeDetail",header:"Detall",style:{width:"15%"}}),o(a,{field:"paymentDate",header:"Data pagament",sortable:"",style:{width:"10%"}},{body:u(n=>[t("span",null,S(c(J)(n.data.paymentDate)),1)]),_:1}),o(a,{field:"amount",header:"Import",style:{width:"10%"}},{body:u(n=>[t("span",null,S(n.data.amount)+" €",1)]),_:1}),o(a,{field:"description",header:"Descripció",style:{width:"30%"}})]),_:1},8,["value"])}}}),y=_=>(Q("data-v-7078b6f8"),_=_(),Y(),_),te={class:"dashboard-filter"},ae={class:"dashboard-filter-field"},se={class:"dashboard-filter-field"},oe=y(()=>t("label",null,"Tipus",-1)),le={class:"dashboard-filter-field"},ne=y(()=>t("label",null,"Detall",-1)),re={class:"dashboard-filter-field"},de={class:"block text-900"},ie=y(()=>t("span",null,"Gràfics",-1)),pe={class:"dashboard-container"},ce={class:"dashboard-item"},ue=y(()=>t("header",{class:"dashboard-item-header"}," Agrupat despeses mensual ",-1)),me={class:"dashboard-item-chart"},_e={class:"dashboard-item"},he=y(()=>t("header",{class:"dashboard-item-header"}," Gràfic de despeses per tipologia ",-1)),ye={class:"dashboard-item-chart"},ve=y(()=>t("span",null,"Llistat",-1)),be=O({__name:"ExpenseDashboard",setup(_){const m=G(),D=q(),x=p(0),a=p({dates:void 0,type:"",typeDetail:""}),C=p(void 0),n=p([]),R=()=>{m.cleanExercisePicker(),a.value.type="",a.value.typeDetail=""};U(async()=>{m.setMenuItem({icon:b.MONEY_BILL,title:"Dashboard despeses"}),await D.fetchMasterData(),C.value=await L.ExpenseType.getAll()});const f=p(void 0),F=p({plugins:{legend:{labels:{usePointStyle:!0}}}}),T=p(void 0),N=p({scales:{y:{beginAtZero:!0}}}),$=j(()=>{let d=0;return n.value.length>0&&n.value.forEach(e=>d+=e.amount),d}),V=async d=>{if(m.exercisePicker.dates){const e=B(m.exercisePicker.dates[0]),s=B(m.exercisePicker.dates[1]);d&&(a.value.typeDetail="");const l=await L.Expense.getConsolidated(e,s,a.value.type,a.value.typeDetail);l&&(n.value=l),T.value=k(n.value,"monthPaymentKey"),f.value=k(n.value,"typeDetail")}},k=(d,e)=>{const s={},l=X.groupBy(d,e);s.labels=Object.keys(l);const i=H(s.labels.length);return s.datasets=[{label:"Despeses",data:[],backgroundColor:i,borderColor:i,borderWidth:1}],Object.keys(l).forEach(P=>{let v=0;l[P].forEach(r=>{v+=r.amount}),s.datasets[0].data.push(v)}),s},H=d=>{const e=getComputedStyle(document.body),s=[e.getPropertyValue("--blue-400"),e.getPropertyValue("--green-400"),e.getPropertyValue("--yellow-400"),e.getPropertyValue("--cyan-400"),e.getPropertyValue("--pink-400"),e.getPropertyValue("--indigo-400"),e.getPropertyValue("--orange-400"),e.getPropertyValue("--purple-400"),e.getPropertyValue("--red-400")],l=[];for(;l.length<d;)for(let i=0;i<s.length;i++)l.push(s[i]);return l};return(d,e)=>{var v;const s=h("Dropdown"),l=h("Button"),i=h("TabPanel"),P=h("TabView");return g(),W(K,null,[t("div",te,[t("div",ae,[o(M,{exercises:c(D).exercises,onRangeSelected:e[0]||(e[0]=r=>V(!1))},null,8,["exercises"])]),t("div",se,[oe,o(s,{options:["Despesa","Compra"],modelValue:a.value.type,"onUpdate:modelValue":e[1]||(e[1]=r=>a.value.type=r),onChange:e[2]||(e[2]=r=>V(!0))},null,8,["modelValue"])]),t("div",le,[ne,o(s,{options:(v=f.value)==null?void 0:v.labels,modelValue:a.value.typeDetail,"onUpdate:modelValue":e[3]||(e[3]=r=>a.value.typeDetail=r),onChange:e[4]||(e[4]=r=>V(!1))},null,8,["options","modelValue"])]),t("div",re,[t("label",de,[t("i",{class:w(c(b).WALLET)},null,2),z("   Total despesa "),t("b",null,S($.value.toFixed(2))+" € ",1)])]),o(l,{class:"grid_add_row_button",icon:c(b).FILTER_SLASH,onClick:R},null,8,["icon"])]),o(P,{activeIndex:x.value,"onUpdate:activeIndex":e[5]||(e[5]=r=>x.value=r)},{default:u(()=>[o(i,null,{header:u(()=>[t("i",{class:w([c(b).CHART_BAR,"mr-2"])},null,2),ie]),default:u(()=>[t("div",pe,[t("section",ce,[ue,t("div",me,[T.value?(g(),E(c(I),{key:0,type:"bar",data:T.value,options:N.value},null,8,["data","options"])):A("",!0)])]),t("section",_e,[he,t("div",ye,[f.value?(g(),E(c(I),{key:0,type:"pie",data:f.value,options:F.value},null,8,["data","options"])):A("",!0)])])])]),_:1}),o(i,null,{header:u(()=>[t("i",{class:w([c(b).LIST,"mr-2"])},null,2),ve]),default:u(()=>[o(ee,{scrollable:"",scrollHeight:"80vh",expenses:n.value},null,8,["expenses"])]),_:1})]),_:1},8,["activeIndex"])],64)}}});const ke=Z(be,[["__scopeId","data-v-7078b6f8"]]);export{ke as default};
