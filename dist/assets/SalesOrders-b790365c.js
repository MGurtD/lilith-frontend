import{_ as A}from"./ExerciseDatePicker.vue_vue_type_script_setup_true_lang-51f383bf.js";import{_ as G}from"./FormCreateOrderOrInvoice.vue_vue_type_script_setup_true_lang-074f475c.js";import{d as H,g as Y,j as z,x as Q,u as J,r as g,E as K,o as W,P as m,h as f,c as k,i as t,w as d,k as r,G as X,a as D,e as u,C as I,D as N,n as Z,l as ee}from"./index-d7e0b608.js";import{u as te}from"./salesOrder-3df064a0.js";import{u as se}from"./reference-9937b09f.js";import{u as ae}from"./customers-5e8cc374.js";import{u as oe}from"./lifecycle-8e2ada60.js";import{a as P,f as re,g as ie}from"./functions-13b40d42.js";import{u as le}from"./masterData-609dcbb7.js";import"./form-validator-788c4f60.js";import"./index-b8f3c4f6.js";import"./reference.service-b31f7e17.js";import"./base.service-1e1fcad7.js";import"./index-49481bdd.js";import"./v4-a960c1f4.js";const ce={class:"flex flex-wrap align-items-center justify-content-between gap-2"},ne={class:"datatable-filter"},de={class:"filter-field"},ue={class:"filter-field"},me=u("label",{class:"block text-900 mb-2"},"Client",-1),fe={class:"datatable-buttons"},pe=["onClick"],Oe=H({__name:"SalesOrders",setup(_e){const y=Y(),w=z(),E=Q(),o=J(),h=le(),p=te(),O=se(),x=ae(),S=oe(),_=g({customerId:void 0,referenceId:void 0}),c=K({visible:!1,title:"Crear comanda",closable:!0,position:"center",modal:!0});W(async()=>{S.fetchOneByName("SalesOrder"),O.fetchReferences(),x.fetchCustomers(),await h.fetchMasterData(),R(),await v(),o.setMenuItem({icon:m.APPLE,title:"Comandes"})});const R=()=>{var i;const s=new Date().getFullYear().toString(),e=(i=h.exercises)==null?void 0:i.find(l=>l.name===s);e&&(o.exercisePicker.exercise=e,o.exercisePicker.dates=[new Date(o.exercisePicker.exercise.startDate),new Date(o.exercisePicker.exercise.endDate)])},T=()=>{o.cleanExercisePicker(),_.value.customerId=void 0},b=g({}),B=()=>({id:ie(),customerId:"",exerciseId:"",date:new Date}),F=()=>{b.value=B(),c.visible=!0},v=async()=>{if(o.exercisePicker.dates){const s=P(o.exercisePicker.dates[0]),e=P(o.exercisePicker.dates[1]);await p.GetFiltered(s,e,_.value.customerId)}else w.add({severity:"info",summary:"Filtre invàlid",detail:"Seleccioni un període",life:5e3})},V=s=>{var i,l;const e=(l=(i=S.lifecycle)==null?void 0:i.statuses)==null?void 0:l.find(n=>n.id===s);return e?e.name:""},q=async()=>{c.visible=!1,await p.Create(b.value)&&y.push({path:`/salesorder/${b.value.id}`})},L=s=>{s.originalEvent.target.className.includes("grid_delete_column_button")||y.push({path:`/salesorder/${s.data.id}`})},M=(s,e)=>{E.require({message:"Està segur que vol eliminar la comanda?",icon:"pi pi-question-circle",acceptIcon:"pi pi-check",rejectIcon:"pi pi-times",accept:async()=>{await p.Delete(e.id)&&(w.add({severity:"success",summary:"Eliminada",life:3e3}),await v())}})};return(s,e)=>{const i=f("Dropdown"),l=f("Button"),n=f("Column"),U=f("DataTable"),$=f("Dialog");return D(),k(X,null,[t(U,{value:r(p).salesOrders,class:"small-datatable",tableStyle:"min-width: 100%",scrollable:"",scrollHeight:"75vh",sortMode:"multiple",onRowClick:L},{header:d(()=>[u("div",ce,[u("div",ne,[u("div",de,[t(A,{exercises:r(h).exercises,onRangeSelected:v},null,8,["exercises"])]),u("div",ue,[me,t(i,{modelValue:_.value.customerId,"onUpdate:modelValue":e[0]||(e[0]=a=>_.value.customerId=a),editable:"",options:r(x).customers,optionValue:"id",optionLabel:"comercialName",class:"w-full"},null,8,["modelValue","options"])])]),u("div",fe,[t(l,{class:"datatable-button mr-2",icon:r(m).FILTER,rounded:"",raised:"",onClick:v},null,8,["icon"]),t(l,{class:"datatable-button mr-2",icon:r(m).FILTER_SLASH,rounded:"",raised:"",onClick:T},null,8,["icon"]),t(l,{icon:r(m).PLUS,rounded:"",raised:"",onClick:F},null,8,["icon"])])])]),default:d(()=>[t(n,{field:"salesOrderNumber",header:"Número",style:{width:"15%"}}),t(n,{header:"Data",style:{width:"15%"}},{body:d(a=>[I(N(r(re)(a.data.salesOrderDate)),1)]),_:1}),t(n,{field:"customerComercialName",header:"Client",style:{width:"40%"}}),t(n,{header:"Estat",style:{width:"20%"}},{body:d(a=>[I(N(V(a.data.statusId)),1)]),_:1}),t(n,{style:{width:"5%"}},{body:d(a=>{var C;return[a.data.statusId===((C=r(S).lifecycle)==null?void 0:C.initialStatusId)?(D(),k("i",{key:0,class:Z([r(m).TIMES,"grid_delete_column_button"]),onClick:j=>M(j,a.data)},null,10,pe)):ee("",!0)]}),_:1})]),_:1},8,["value"]),t($,{visible:c.visible,"onUpdate:visible":e[1]||(e[1]=a=>c.visible=a),header:c.title,closable:c.closable,modal:c.modal},{default:d(()=>[t(G,{"create-request":b.value,onSubmit:q},null,8,["create-request"])]),_:1},8,["visible","header","closable","modal"])],64)}}});export{Oe as default};
