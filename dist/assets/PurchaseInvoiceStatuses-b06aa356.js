import{j as y,u as b,M as g,P as r,f as o,a as P,w as n,l as u,o as x,e as l,h as e,n as k}from"./index-a2430148.js";import{u as B}from"./usetoast.esm-261cff49.js";import{u as E}from"./useconfirm.esm-ca9e0456.js";import{u as T}from"./purchaseInvoiceStatus-b85e22d1.js";import{u as D}from"./vue-router-ffe4063c.js";import{v as M}from"./v4-a960c1f4.js";import"./index-87fd5a83.js";import"./base.service-ac28cfab.js";import"./suppliers.service-1deeab6b.js";const N={class:"flex flex-wrap align-items-center justify-content-between gap-2"},R=l("span",{class:"text-xl text-900 font-bold"},"Estats",-1),j=["onClick"],J=y({__name:"PurchaseInvoiceStatuses",setup(q){const p=B(),h=E(),d=D(),_=b(),s=T();g(async()=>{await s.fetchPurchaseInvoiceStatuses(),_.setMenuItem({icon:r.SERVER,text:"Estats de Factures de Compra"})});const f=()=>{d.push({path:`/purchaseinvoicestatus/${M()}`})},v=t=>{t.originalEvent.target.className.includes("grid_delete_column_button")||d.push({path:`/purchaseinvoicestatus/${t.data.id}`})},C=(t,c)=>{h.require({target:t.currentTarget,message:`Está segur que vol eliminar la sèrie de factures de compra ${c.name}?`,icon:"pi pi-question-circle",acceptIcon:"pi pi-check",rejectIcon:"pi pi-times",accept:async()=>{await s.deletePurchaseInvoiceStatus(c.id)&&(p.add({severity:"success",summary:"Eliminat",life:3e3}),await s.fetchPurchaseInvoiceStatuses())}})};return(t,c)=>{const m=o("Button"),a=o("Column"),S=o("BooleanColumn"),w=o("DataTable");return x(),P(w,{value:u(s).purchaseInvoiceStatuses,tableStyle:"min-width: 100%",onRowClick:v},{header:n(()=>[l("div",N,[R,e(m,{icon:u(r).PLUS,rounded:"",raised:"",onClick:f},null,8,["icon"])])]),default:n(()=>[e(a,{field:"name",header:"Nom",style:{width:"20%"}}),e(a,{field:"description",header:"Descripció",style:{width:"50%"}}),e(a,{header:"Desactivada",style:{width:"20%"}},{body:n(i=>[e(S,{value:i.data.disabled,showColor:!1},null,8,["value"])]),_:1}),e(a,null,{body:n(i=>[l("i",{class:k([u(r).TIMES,"grid_delete_column_button"]),onClick:I=>C(I,i.data)},null,10,j)]),_:1})]),_:1},8,["value"])}}});export{J as default};