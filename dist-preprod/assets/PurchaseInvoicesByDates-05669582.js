import{d as O,j as z,u as A,r as C,o as L,P as b,h,c as R,i as n,w as r,k as u,a as U,e as d,G as I,H as v,n as x,I as w,R as H,O as M,W as B,X as j,p as W,b as $,f as q}from"./index-948abaa8.js";import{u as K,a as Q}from"./purchaseInvoices-041fdab3.js";import{u as X}from"./lifecycle-46486c41.js";import"./index-76940908.js";import"./suppliers.service-0e59a7bd.js";const N=_=>(W("data-v-d7fff4d5"),_=_(),$(),_),J={class:"flex flex-wrap align-items-center justify-content-between gap-2"},Y={class:"datatable-filter"},Z={class:"filter-field"},ee=N(()=>d("label",{class:"block text-900 mb-2"},"Període",-1)),te={class:"filter-field"},ae=N(()=>d("label",{class:"block text-900 mb-2 mr-3"},"Gestionades",-1)),se={class:"flex flex-wrap gap-3"},oe={class:"flex align-items-center"},ne={class:"datatable-buttons"},le=["onClick"],de="PurchaseInvoice",ie=O({__name:"PurchaseInvoicesByDates",setup(_){const g=z(),P=A(),S=K(),m=X(),y=Q(),c=C({dates:void 0,showManaged:!1}),f=C([]);L(async()=>{y.purchaseInvoices=[],S.fetchMasterData(),m.fetchOneByName(de),P.setMenuItem({icon:b.SERVER,title:"Comptabilització de factures"})});const k=t=>{var a;const e=(a=S.masterData.suppliers)==null?void 0:a.find(o=>o.id===t);return e?e.comercialName:""},F=t=>{var a,o;const e=(o=(a=m.lifecycle)==null?void 0:a.statuses)==null?void 0:o.find(i=>i.id===t);return e?e.name:""},V=t=>t.purchaseInvoiceDueDates?t.purchaseInvoiceDueDates.length===0?w(t.purchaseInvoiceDate):w(t.purchaseInvoiceDueDates[t.purchaseInvoiceDueDates.length-1].dueDate):"",T=t=>{var a,o;const e=(o=(a=m.lifecycle)==null?void 0:a.statuses)==null?void 0:o.find(i=>i.name==="Gestionada");return e&&e.id===t},D=async()=>{var t,e;if(c.value.dates){let a;c.value.showManaged||(a=(e=(t=m.lifecycle)==null?void 0:t.statuses)==null?void 0:e.find(p=>p.name==="Gestionada"));const o=M(c.value.dates[0]),i=M(c.value.dates[1]),l=a?a.id:void 0;await y.GetFiltered(o,i,void 0,l)}else g.add({severity:"info",summary:"Filtre invàlid",detail:"Seleccioni un període",life:5e3})},E=async()=>{var e,a;const t=(a=(e=m.lifecycle)==null?void 0:e.statuses)==null?void 0:a.find(o=>o.name==="Gestionada");if(t){const i={ids:f.value.map(p=>p.id),statusToId:t.id};await y.UpdateInvoicesStatus(i)&&(g.add({severity:"success",summary:"Comptabilització de factures",detail:`Factures comptabilitzades: ${f.value.length}`,life:5e3}),await D())}},G=async t=>{const e=await B.File.GetEntityFiles("PurchaseInvoice",t.id);e&&e.forEach(async a=>{const o=await B.File.Download(a);j(a.originalName,o)})};return(t,e)=>{const a=h("Calendar"),o=h("Checkbox"),i=h("Button"),l=h("Column"),p=h("DataTable");return U(),R("div",null,[n(p,{class:"small-datatable",tableStyle:"min-width: 100%",scrollable:"",scrollHeight:"80vh",sortMode:"multiple",value:u(y).purchaseInvoices,selection:f.value,"onUpdate:selection":e[2]||(e[2]=s=>f.value=s)},{header:r(()=>[d("div",J,[d("div",Y,[d("div",Z,[ee,n(a,{modelValue:c.value.dates,"onUpdate:modelValue":e[0]||(e[0]=s=>c.value.dates=s),numberOfMonths:2,selectionMode:"range",dateFormat:"dd/mm/yy"},null,8,["modelValue"])]),d("div",te,[ae,d("div",se,[d("div",oe,[n(o,{modelValue:c.value.showManaged,"onUpdate:modelValue":e[1]||(e[1]=s=>c.value.showManaged=s),binary:!0,onChange:D},null,8,["modelValue"])])])])]),d("div",ne,[n(i,{class:"datatable-button",icon:u(b).FILTER,rounded:"",raised:"",onClick:D},null,8,["icon"]),n(i,{icon:u(b).CHECK,disabled:f.value.length===0,rounded:"",raised:"",severity:"success",onClick:E},null,8,["icon","disabled"])])])]),default:r(()=>[n(l,{selectionMode:"multiple",style:{width:"2%"}}),n(l,{field:"number",header:"Número",sortable:"",style:{width:"10%"}}),n(l,{header:"Proveïdor",style:{width:"15%"}},{body:r(s=>[I(v(k(s.data.supplierId)),1)]),_:1}),n(l,{header:"Num Fra. Proveïdor",style:{width:"12%"},field:"supplierNumber"}),n(l,{header:"Estat",style:{width:"15%"}},{body:r(s=>[d("span",{class:x({"managed-status":T(s.data.statusId)})},v(F(s.data.statusId)),3)]),_:1}),n(l,{header:"Data",field:"purchaseInvoiceDate",sortable:"",style:{width:"15%"}},{body:r(s=>[I(v(u(w)(s.data.purchaseInvoiceDate)),1)]),_:1}),n(l,{header:"Venciment",style:{width:"15%"}},{body:r(s=>[I(v(V(s.data)),1)]),_:1}),n(l,{field:"baseAmount",header:"Import Base",style:{width:"15%"}},{body:r(s=>[I(v(u(H)(s.data.baseAmount)),1)]),_:1}),n(l,{style:{width:"2%"}},{body:r(s=>[d("i",{class:x([u(b).DOWNLOAD,"download_column"]),onClick:ce=>G(s.data)},null,10,le)]),_:1})]),_:1},8,["value","selection"])])}}});const he=q(ie,[["__scopeId","data-v-d7fff4d5"]]);export{he as default};
