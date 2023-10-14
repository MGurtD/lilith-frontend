import{u as T}from"./suppliers-fdccb4f4.js";import{u as B}from"./masterData-bab25dc3.js";import{d as L,j as U,r as V,h as b,a as N,c as $,e as a,i as t,k as d,x as G,g as J,u as Q,E as K,o as W,P as g,w as h,G as X,C,D as q,n as Z,l as ee}from"./index-193b38f8.js";import{c as te,a as P,e as se,F as ae}from"./form-validator-f563cc7d.js";import{c as oe,a as F,f as ie,g as re}from"./functions-781c12cd.js";import{_ as le}from"./ExerciseDatePicker.vue_vue_type_script_setup_true_lang-ee55b965.js";import{u as ne}from"./receipt-6eae55de.js";import"./suppliers.service-2fe23f14.js";import"./base.service-2dd42137.js";import"./index-02bc8c9e.js";import"./reference.service-bbdc7d76.js";import"./v4-a960c1f4.js";import"./index-7269c4cb.js";const ce={class:"mt-2"},de=a("label",{class:"block text-900 mb-2"},"Proveïdor",-1),ue={class:"mt-2"},pe=a("label",{class:"block text-900 mb-2"},"Exercici",-1),me={class:"mt-2"},fe=a("label",{class:"block text-900 mb-2"},"Data",-1),be={class:"mt-2"},_e=L({__name:"FormCreateReceipt",props:{createRequest:{}},emits:["submit"],setup(E,{emit:R}){const w=E,I=U(),l=B(),_=T(),x=te().shape({exerciseId:P().required("L'exercici és obligatori"),supplierId:P().required("El client és obligatori"),date:se().required("La data és obligatoria")}),p=V({result:!1,errors:{}}),y=()=>{const o=new ae(x);p.value=o.validate(w.createRequest)},m=()=>{if(y(),p.value.result)w.createRequest.date=oe(w.createRequest.date),R("submit",w.createRequest);else{let o="";Object.entries(p.value.errors).forEach(c=>{o+=`${c[1].map(u=>u)}.   `}),I.add({severity:"warn",summary:"Formulari inválid",detail:o,life:5e3})}};return(o,c)=>{const u=b("Dropdown"),S=b("Calendar"),k=b("Button");return N(),$("form",null,[a("div",ce,[de,t(u,{class:"w-full",modelValue:o.createRequest.supplierId,"onUpdate:modelValue":c[0]||(c[0]=v=>o.createRequest.supplierId=v),editable:"",options:d(_).suppliers,optionValue:"id",optionLabel:"comercialName"},null,8,["modelValue","options"])]),a("div",ue,[pe,t(u,{class:"w-full",modelValue:o.createRequest.exerciseId,"onUpdate:modelValue":c[1]||(c[1]=v=>o.createRequest.exerciseId=v),editable:"",options:d(l).exercises,optionValue:"id",optionLabel:"name"},null,8,["modelValue","options"])]),a("div",me,[fe,t(S,{modelValue:o.createRequest.date,"onUpdate:modelValue":c[2]||(c[2]=v=>o.createRequest.date=v)},null,8,["modelValue"])]),a("footer",be,[t(k,{label:"Crear",onClick:m,style:{float:"right"}})])])}}}),ve={class:"flex flex-wrap align-items-center justify-content-between gap-2"},he={class:"datatable-filter"},we={class:"filter-field"},ye={class:"filter-field"},xe=a("label",{class:"block text-900 mb-2"},"Proveïdor",-1),ge={class:"datatable-buttons"},Re=["onClick"],Be=L({__name:"Receipts",setup(E){const R=U(),w=G(),I=J(),l=Q(),_=ne(),x=T(),p=B(),y=V({supplierId:void 0,exercise:void 0}),m=K({visible:!1,title:"Crear albarà",closable:!0,position:"center",modal:!0});W(async()=>{l.setMenuItem({icon:g.MONEY_BILL,title:"Albarans de compra"}),x.fetchSuppliers(),await p.fetchMasterData(),await _.fetchReceipts(),o(),await u()});const o=()=>{var n;const s=new Date().getFullYear().toString(),e=(n=p.exercises)==null?void 0:n.find(i=>i.name===s);e&&(l.exercisePicker.exercise=e,l.exercisePicker.dates=[new Date(l.exercisePicker.exercise.startDate),new Date(l.exercisePicker.exercise.endDate)])},c=()=>{l.cleanExercisePicker(),y.value.supplierId=void 0},u=async()=>{if(l.exercisePicker.dates){const s=F(l.exercisePicker.dates[0]),e=F(l.exercisePicker.dates[1]);await _.fetchFiltered(s,e,y.value.supplierId)}else R.add({severity:"info",summary:"Filtre invàlid",detail:"Seleccioni un període",life:5e3})},S=s=>{var n;const e=(n=x.suppliers)==null?void 0:n.find(i=>i.id===s);return e?e.comercialName:""},k=s=>{var n;const e=(n=p.lifecycles)==null?void 0:n.find(i=>i.name==="Receipts");if(e){const i=e.statuses.find(f=>f.id===s);if(i)return i.name}return""},v=()=>{D.value=M(),m.visible=!0},D=V({}),M=()=>({id:re(),supplierId:"",exerciseId:"",date:new Date}),j=async()=>{await _.createReceipt(D.value)&&I.push({path:`/receipts/${D.value.id}`})},O=s=>{s.originalEvent.target.className.includes("grid_delete_column_button")||I.push({path:`/receipts/${s.data.id}`})},Y=(s,e)=>{w.require({target:s.currentTarget,message:`Està segur que vol eliminar l'albarà ${e.number}?`,icon:"pi pi-question-circle",acceptIcon:"pi pi-check",rejectIcon:"pi pi-times",accept:async()=>{await _.deleteReceipt(e.id)&&(R.add({severity:"success",summary:"Eliminat",life:3e3}),await u())}})};return(s,e)=>{const n=b("Dropdown"),i=b("Button"),f=b("Column"),A=b("DataTable"),H=b("Dialog");return N(),$(X,null,[a("div",null,[t(A,{class:"small-datatable",tableStyle:"min-width: 100%",scrollable:"",scrollHeight:"75vh",sortMode:"multiple",value:d(_).receipts,onRowClick:O},{header:h(()=>[a("div",ve,[a("div",he,[a("div",we,[t(le,{exercises:d(p).exercises,onRangeSelected:u},null,8,["exercises"])]),a("div",ye,[xe,t(n,{modelValue:y.value.supplierId,"onUpdate:modelValue":e[0]||(e[0]=r=>y.value.supplierId=r),editable:"",options:d(x).suppliers,optionValue:"id",optionLabel:"comercialName",class:"w-full"},null,8,["modelValue","options"])])]),a("div",ge,[t(i,{class:"datatable-button mr-2",icon:d(g).FILTER,rounded:"",raised:"",onClick:u},null,8,["icon"]),t(i,{class:"datatable-button mr-2",icon:d(g).FILTER_SLASH,rounded:"",raised:"",onClick:c},null,8,["icon"]),t(i,{icon:d(g).PLUS,rounded:"",raised:"",onClick:v},null,8,["icon"])])])]),default:h(()=>[t(f,{field:"number",header:"Número",sortable:!0,style:{width:"10%"}}),t(f,{header:"Data",field:"date",sortable:"",style:{width:"10%"}},{body:h(r=>[C(q(d(ie)(r.data.date)),1)]),_:1}),t(f,{header:"Proveïdor",style:{width:"15%"}},{body:h(r=>[C(q(S(r.data.supplierId)),1)]),_:1}),t(f,{header:"Número Proveïdor",style:{width:"15%"},field:"supplierNumber"}),t(f,{header:"Estat",style:{width:"15%"}},{body:h(r=>[C(q(k(r.data.statusId)),1)]),_:1}),t(f,{style:{width:"5%"}},{body:h(r=>[k(r.data.statusId)==="Nou"?(N(),$("i",{key:0,class:Z([d(g).TIMES,"grid_delete_column_button"]),onClick:z=>Y(z,r.data)},null,10,Re)):ee("",!0)]),_:1})]),_:1},8,["value"])]),t(H,{visible:m.visible,"onUpdate:visible":e[1]||(e[1]=r=>m.visible=r),header:m.title,closable:m.closable,modal:m.modal},{default:h(()=>[t(_e,{"create-request":D.value,onSubmit:j},null,8,["create-request"])]),_:1},8,["visible","header","closable","modal"])],64)}}});export{Be as default};
