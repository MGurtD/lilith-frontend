import{d as L,j,x as q,g as O,u as R,r as U,o as $,P as _,h as u,c as S,i as o,w as n,k as d,a as C,e as c,C as m,D as p,n as G,l as J}from"./index-cfd694c0.js";import{u as z,a as A}from"./purchaseInvoices-e6bd6513.js";import{a as D,f as b}from"./functions-c791afc8.js";import{v as H}from"./v4-a960c1f4.js";import"./index-e82487dd.js";import"./base.service-a4c32e6e.js";import"./index-23b7de5e.js";import"./suppliers.service-075567fb.js";const K={class:"flex flex-wrap align-items-center justify-content-between gap-2"},Q={class:"datatable-filter"},Y={class:"filter-field"},W=c("label",{class:"block text-900 mb-2"},"Període",-1),X={class:"filter-field"},Z=c("label",{class:"block text-900 mb-2"},"Proveïdor",-1),ee={class:"datatable-buttons"},te=["onClick"],N="temges.purchaseinvoice.filter",ue=L({__name:"PurchaseInvoices",setup(ae){const y=j(),k=q(),g=O(),P=R(),h=z(),v=A(),s=U({dates:void 0,supplierId:void 0});$(async()=>{await h.fetchMasterData();const e=localStorage.getItem(N);if(e!==null)s.value=JSON.parse(e),s.value.dates&&(s.value.dates[0]=new Date(s.value.dates[0]),s.value.dates[1]=new Date(s.value.dates[1])),await I();else{let t=new Date,r=new Date;t.setDate(r.getDate()-30);const i=D(t),f=D(r);await v.GetFiltered(i,f)}P.setMenuItem({icon:_.MONEY_BILL,title:"Factures de compra"})});const I=async()=>{if(s.value.dates){const e=D(s.value.dates[0]),t=D(s.value.dates[1]);await v.GetFiltered(e,t,void 0,void 0,s.value.supplierId),localStorage.setItem(N,JSON.stringify(s.value))}else y.add({severity:"info",summary:"Filtre invàlid",detail:"Seleccioni un període",life:5e3})},V=e=>{var r;const t=(r=h.masterData.suppliers)==null?void 0:r.find(i=>i.id===e);return t?t.comercialName:""},w=e=>{var r;const t=(r=h.masterData.statuses)==null?void 0:r.find(i=>i.id===e);return t?t.name:""},x=e=>e.purchaseInvoiceDueDates?e.purchaseInvoiceDueDates.length===0?b(e.purchaseInvoiceDate):b(e.purchaseInvoiceDueDates[e.purchaseInvoiceDueDates.length-1].dueDate):"",B=()=>{g.push({path:`/purchaseInvoice/${H()}`})},E=e=>{e.originalEvent.target.className.includes("grid_delete_column_button")||g.push({path:`/purchaseinvoice/${e.data.id}`})},F=(e,t)=>{k.require({target:e.currentTarget,message:`Està segur que vol eliminar la factura ${t.number}?`,icon:"pi pi-question-circle",acceptIcon:"pi pi-check",rejectIcon:"pi pi-times",accept:async()=>{await v.Delete(t.id)&&(y.add({severity:"success",summary:"Eliminada",life:3e3}),await I())}})};return(e,t)=>{const r=u("Calendar"),i=u("Dropdown"),f=u("Button"),l=u("Column"),M=u("DataTable");return C(),S("div",null,[o(M,{class:"small-datatable",tableStyle:"min-width: 100%",scrollable:"",scrollHeight:"75vh",sortMode:"multiple",value:d(v).purchaseInvoices,onRowClick:E},{header:n(()=>[c("div",K,[c("div",Q,[c("div",Y,[W,o(r,{modelValue:s.value.dates,"onUpdate:modelValue":t[0]||(t[0]=a=>s.value.dates=a),selectionMode:"range",dateFormat:"dd/mm/yy"},null,8,["modelValue"])]),c("div",X,[Z,o(i,{modelValue:s.value.supplierId,"onUpdate:modelValue":t[1]||(t[1]=a=>s.value.supplierId=a),editable:"",options:d(h).masterData.suppliers,optionValue:"id",optionLabel:"comercialName",class:"w-full"},null,8,["modelValue","options"])])]),c("div",ee,[o(f,{class:"datatable-button mr-2",icon:d(_).FILTER,rounded:"",raised:"",onClick:I},null,8,["icon"]),o(f,{icon:d(_).PLUS,rounded:"",raised:"",onClick:B},null,8,["icon"])])])]),default:n(()=>[o(l,{field:"number",header:"Número",sortable:!0,style:{width:"10%"}}),o(l,{header:"Data",field:"purchaseInvoiceDate",sortable:"",style:{width:"10%"}},{body:n(a=>[m(p(d(b)(a.data.purchaseInvoiceDate)),1)]),_:1}),o(l,{header:"Proveïdor",style:{width:"15%"}},{body:n(a=>[m(p(V(a.data.supplierId)),1)]),_:1}),o(l,{header:"Núm. Fra. Proveïdor",style:{width:"15%"},field:"supplierNumber"}),o(l,{header:"Estat",style:{width:"15%"}},{body:n(a=>[m(p(w(a.data.purchaseInvoiceStatusId)),1)]),_:1}),o(l,{header:"Venciment",style:{width:"10%"}},{body:n(a=>[m(p(x(a.data)),1)]),_:1}),o(l,{header:"Import",style:{width:"10%"}},{body:n(a=>[m(p(a.data.netAmount)+" € ",1)]),_:1}),o(l,{style:{width:"5%"}},{body:n(a=>[w(a.data.purchaseInvoiceStatusId)==="Nova"?(C(),S("i",{key:0,class:G([d(_).TIMES,"grid_delete_column_button"]),onClick:T=>F(T,a.data)},null,10,te)):J("",!0)]),_:1})]),_:1},8,["value"])])}}});export{ue as default};
