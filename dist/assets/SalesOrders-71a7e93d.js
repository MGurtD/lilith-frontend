import{d as L,g as M,j as U,u as q,r as g,E as G,o as $,P as b,h as c,c as j,i as s,w as u,k as m,G as J,a as A,e as n,C as y,D as C}from"./index-f764b8b4.js";import{u as H}from"./salesOrder-3df0b6ac.js";import{u as K}from"./reference-b0a41771.js";import{u as Q}from"./customers-6ccec2f3.js";import{u as z}from"./lifecycle-d84f32ea.js";import{a as _,f as W,g as X}from"./functions-c791afc8.js";import{_ as Y}from"./FormCreateOrderOrInvoice.vue_vue_type_script_setup_true_lang-1c7604f1.js";import{u as Z}from"./masterData-9554e355.js";import"./index-c4048531.js";import"./reference.service-1719d346.js";import"./base.service-ff0cada2.js";import"./index-7bda243d.js";import"./v4-a960c1f4.js";import"./form-validator-2ae99928.js";const ee={class:"flex flex-wrap align-items-center justify-content-between gap-2"},te={class:"datatable-filter"},ae={class:"filter-field"},se=n("label",{class:"block text-900 mb-2"},"Període",-1),oe={class:"filter-field"},le=n("label",{class:"block text-900 mb-2"},"Client",-1),re={class:"datatable-buttons"},I="temges.salesorder.filter",ge=L({__name:"SalesOrders",setup(ne){const h=M(),N=U(),O=q(),V=Z(),f=H(),k=K(),w=Q(),S=z(),e=g({dates:void 0,customerId:void 0,referenceId:void 0}),l=G({visible:!1,title:"Crear comanda",closable:!0,position:"center",modal:!0});$(async()=>{await k.fetchReferences(),await w.fetchCustomers(),await S.fetchOneByName("SalesOrder"),V.fetchMasterData();const a=localStorage.getItem(I);if(a!==null)e.value=JSON.parse(a),e.value.dates&&(e.value.dates[0]=new Date(e.value.dates[0]),e.value.dates[1]=new Date(e.value.dates[1])),await D();else{let t=new Date,r=new Date;t.setDate(r.getDate()-30);const i=_(t),d=_(r);await f.GetBetweenDates(i,d)}O.setMenuItem({icon:b.APPLE,title:"Comandes"})});const p=g({}),x=()=>({id:X(),customerId:"",exerciseId:"",date:new Date}),B=()=>{p.value=x(),l.visible=!0},R=async()=>{l.visible=!1,await f.Create(p.value)&&h.push({path:`/salesorder/${p.value.id}`})},E=a=>{a.originalEvent.target.className.includes("grid_delete_column_button")||h.push({path:`/salesorder/${a.data.id}`})},D=async()=>{if(e.value.dates){const a=_(e.value.dates[0]),t=_(e.value.dates[1]);await f.GetFiltered(a,t,e.value.customerId),localStorage.setItem(I,JSON.stringify(e.value))}else N.add({severity:"info",summary:"Filtre invàlid",detail:"Seleccioni un període",life:5e3})},F=a=>{var r,i;const t=(i=(r=S.lifecycle)==null?void 0:r.statuses)==null?void 0:i.find(d=>d.id===a);return t?t.name:""};return(a,t)=>{const r=c("Calendar"),i=c("Dropdown"),d=c("Button"),v=c("Column"),P=c("DataTable"),T=c("Dialog");return A(),j(J,null,[s(P,{value:m(f).salesOrders,class:"small-datatable",tableStyle:"min-width: 100%",scrollable:"",scrollHeight:"75vh",sortMode:"multiple",onRowClick:E},{header:u(()=>[n("div",ee,[n("div",te,[n("div",ae,[se,s(r,{modelValue:e.value.dates,"onUpdate:modelValue":t[0]||(t[0]=o=>e.value.dates=o),selectionMode:"range",dateFormat:"dd/mm/yy"},null,8,["modelValue"])]),n("div",oe,[le,s(i,{modelValue:e.value.customerId,"onUpdate:modelValue":t[1]||(t[1]=o=>e.value.customerId=o),editable:"",options:m(w).customers,optionValue:"id",optionLabel:"comercialName",class:"w-full"},null,8,["modelValue","options"])])]),n("div",re,[s(d,{class:"datatable-button mr-2",icon:m(b).FILTER,rounded:"",raised:"",onClick:D},null,8,["icon"]),s(d,{icon:m(b).PLUS,rounded:"",raised:"",onClick:B},null,8,["icon"])])])]),default:u(()=>[s(v,{field:"salesOrderNumber",header:"Número",style:{width:"15%"}}),s(v,{header:"Data",style:{width:"15%"}},{body:u(o=>[y(C(m(W)(o.data.salesOrderDate)),1)]),_:1}),s(v,{field:"customerComercialName",header:"Client",style:{width:"40%"}}),s(v,{header:"Estat",style:{width:"20%"}},{body:u(o=>[y(C(F(o.data.statusId)),1)]),_:1})]),_:1},8,["value"]),s(T,{visible:l.visible,"onUpdate:visible":t[2]||(t[2]=o=>l.visible=o),header:l.title,closable:l.closable,modal:l.modal},{default:u(()=>[s(Y,{"create-request":p.value,onSubmit:R},null,8,["create-request"])]),_:1},8,["visible","header","closable","modal"])],64)}}});export{ge as default};
