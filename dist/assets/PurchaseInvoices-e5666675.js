import{_ as $}from"./ExerciseDatePicker.vue_vue_type_script_setup_true_lang-ea172d41.js";import{d as O,j,x as q,g as H,u as Y,Z as A,r as G,o as z,P as p,$ as J,O as g,h as _,c as w,i as a,w as n,k as l,a as S,e as u,G as h,H as f,I as y,n as K,l as Q,y as Z}from"./index-77e4d88f.js";import{u as W,a as X}from"./purchaseInvoices-1543c74e.js";import{u as ee}from"./lifecycle-7ace1220.js";import"./index-4faf08dc.js";import"./suppliers.service-05c90099.js";const te={class:"flex flex-wrap align-items-center justify-content-between gap-2"},se={class:"datatable-filter"},ae={class:"filter-field"},re={class:"filter-field"},ie=u("label",{class:"block text-900 mb-2"},"Proveïdor",-1),ce={class:"datatable-buttons"},oe=["onClick"],ne="PurchaseInvoice",le="temges.purchaseinvoice.filter",_e=O({__name:"PurchaseInvoices",setup(de){const D=j(),N=q(),x=H(),r=Y(),b=A(),P=ee(),m=W(),I=X(),d=G({supplierId:void 0,exercise:void 0});z(async()=>{r.setMenuItem({icon:p.MONEY_BILL,title:"Factures de compra"}),await P.fetchOneByName(ne),await m.fetchMasterData(),F(),C(),await v()}),J(()=>{const e={...d.value,exercisePicker:r.exercisePicker};b.addFilter("PurchaseInvoices","",e)});const C=()=>{const e=b.getFilter("PurchaseInvoices","");e&&(d.value.supplierId=e.supplierId,e.exercisePicker&&(r.exercisePicker.exercise=e.exercisePicker.exercise,r.exercisePicker.dates=[new Date(e.exercisePicker.dates[0]),new Date(e.exercisePicker.dates[1])]))},F=()=>{var i;const e=new Date().getFullYear().toString(),t=(i=m.masterData.exercises)==null?void 0:i.find(c=>c.name===e);t&&(r.exercisePicker.exercise=t,r.exercisePicker.dates=[new Date(r.exercisePicker.exercise.startDate),new Date(r.exercisePicker.exercise.endDate)])},E=()=>{r.cleanExercisePicker(),d.value.supplierId=void 0},v=async()=>{if(r.exercisePicker.dates){const e=g(r.exercisePicker.dates[0]),t=g(r.exercisePicker.dates[1]);await I.GetFiltered(e,t,void 0,void 0,d.value.supplierId),localStorage.setItem(le,JSON.stringify(d.value))}else D.add({severity:"info",summary:"Filtre invàlid",detail:"Seleccioni un període",life:5e3})},B=e=>{var i;const t=(i=m.masterData.suppliers)==null?void 0:i.find(c=>c.id===e);return t?t.comercialName:""},k=e=>{var i,c;const t=(c=(i=P.lifecycle)==null?void 0:i.statuses)==null?void 0:c.find(o=>o.id===e);return t?t.name:""},L=e=>e.purchaseInvoiceDueDates?e.purchaseInvoiceDueDates.length===0?y(e.purchaseInvoiceDate):y(e.purchaseInvoiceDueDates[e.purchaseInvoiceDueDates.length-1].dueDate):"",T=()=>{x.push({path:`/purchaseInvoice/${Z()}`})},V=e=>{e.originalEvent.target.className.includes("grid_delete_column_button")||x.push({path:`/purchaseinvoice/${e.data.id}`})},M=(e,t)=>{N.require({target:e.currentTarget,message:`Està segur que vol eliminar la factura ${t.number}?`,icon:"pi pi-question-circle",acceptIcon:"pi pi-check",rejectIcon:"pi pi-times",accept:async()=>{await I.Delete(t.id)&&(D.add({severity:"success",summary:"Eliminada",life:3e3}),await v())}})};return(e,t)=>{const i=_("Dropdown"),c=_("Button"),o=_("Column"),R=_("DataTable");return S(),w("div",null,[a(R,{class:"small-datatable",tableStyle:"min-width: 100%",scrollable:"",scrollHeight:"80vh",sortMode:"multiple",value:l(I).purchaseInvoices,onRowClick:V},{header:n(()=>[u("div",te,[u("div",se,[u("div",ae,[a($,{exercises:l(m).masterData.exercises,onRangeSelected:v},null,8,["exercises"])]),u("div",re,[ie,a(i,{modelValue:d.value.supplierId,"onUpdate:modelValue":t[0]||(t[0]=s=>d.value.supplierId=s),editable:"",options:l(m).masterData.suppliers,optionValue:"id",optionLabel:"comercialName",class:"w-full"},null,8,["modelValue","options"])])]),u("div",ce,[a(c,{class:"datatable-button mr-2",icon:l(p).FILTER,rounded:"",raised:"",onClick:v},null,8,["icon"]),a(c,{class:"datatable-button mr-2",icon:l(p).FILTER_SLASH,rounded:"",raised:"",onClick:E},null,8,["icon"]),a(c,{icon:l(p).PLUS,rounded:"",raised:"",onClick:T},null,8,["icon"])])])]),default:n(()=>[a(o,{field:"number",header:"Número",sortable:!0,style:{width:"10%"}}),a(o,{header:"Data",field:"purchaseInvoiceDate",sortable:"",style:{width:"10%"}},{body:n(s=>[h(f(l(y)(s.data.purchaseInvoiceDate)),1)]),_:1}),a(o,{header:"Proveïdor",style:{width:"15%"}},{body:n(s=>[h(f(B(s.data.supplierId)),1)]),_:1}),a(o,{header:"Núm. Fra. Proveïdor",style:{width:"15%"},field:"supplierNumber"}),a(o,{header:"Estat",style:{width:"15%"}},{body:n(s=>[h(f(k(s.data.statusId)),1)]),_:1}),a(o,{header:"Venciment",style:{width:"10%"}},{body:n(s=>[h(f(L(s.data)),1)]),_:1}),a(o,{header:"Import",style:{width:"10%"}},{body:n(s=>[h(f(s.data.netAmount)+" € ",1)]),_:1}),a(o,{style:{width:"5%"}},{body:n(s=>[k(s.data.statusId)==="Nova"?(S(),w("i",{key:0,class:K([l(p).TIMES,"grid_delete_column_button"]),onClick:U=>M(U,s.data)},null,10,oe)):Q("",!0)]),_:1})]),_:1},8,["value"])])}}});export{_e as default};