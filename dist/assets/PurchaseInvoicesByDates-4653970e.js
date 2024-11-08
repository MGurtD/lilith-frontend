import{d as O,j as z,u as A,r as C,o as L,P as b,h as f,c as R,i as n,w as r,k as u,a as U,e as i,G as I,H as v,n as x,I as w,R as H,O as M,Z as B,Y as j,p as $,b as q,f as K}from"./index-40c5ef33.js";import{u as Q,a as W}from"./purchaseInvoices-e2efc5bd.js";import{u as Y}from"./lifecycle-d45e6b06.js";import"./index-5e1e719e.js";import"./suppliers.service-3db6483c.js";const N=_=>($("data-v-46b35620"),_=_(),q(),_),Z={class:"flex flex-wrap align-items-center justify-content-between gap-2"},J={class:"datatable-filter"},X={class:"filter-field"},ee=N(()=>i("label",{class:"block text-900 mb-2"},"Període",-1)),te={class:"filter-field"},ae=N(()=>i("label",{class:"block text-900 mb-2 mr-3"},"Gestionades",-1)),se={class:"flex flex-wrap gap-3"},oe={class:"flex align-items-center"},ne={class:"datatable-buttons"},le=["onClick"],ie="PurchaseInvoice",de=O({__name:"PurchaseInvoicesByDates",setup(_){const g=z(),P=A(),S=Q(),m=Y(),y=W(),c=C({dates:void 0,showManaged:!1}),p=C([]);L(async()=>{y.purchaseInvoices=[],S.fetchMasterData(),m.fetchOneByName(ie),P.setMenuItem({icon:b.SERVER,title:"Comptabilització de factures de compra"})});const k=t=>{var a;const e=(a=S.masterData.suppliers)==null?void 0:a.find(o=>o.id===t);return e?e.comercialName:""},F=t=>{var a,o;const e=(o=(a=m.lifecycle)==null?void 0:a.statuses)==null?void 0:o.find(d=>d.id===t);return e?e.name:""},V=t=>t.purchaseInvoiceDueDates?t.purchaseInvoiceDueDates.length===0?w(t.purchaseInvoiceDate):w(t.purchaseInvoiceDueDates[t.purchaseInvoiceDueDates.length-1].dueDate):"",T=t=>{var a,o;const e=(o=(a=m.lifecycle)==null?void 0:a.statuses)==null?void 0:o.find(d=>d.name==="Gestionada");return e&&e.id===t},D=async()=>{var t,e;if(c.value.dates){let a;c.value.showManaged||(a=(e=(t=m.lifecycle)==null?void 0:t.statuses)==null?void 0:e.find(h=>h.name==="Gestionada"));const o=M(c.value.dates[0]),d=M(c.value.dates[1]),l=a?a.id:void 0;await y.GetFiltered(o,d,void 0,l)}else g.add({severity:"info",summary:"Filtre invàlid",detail:"Seleccioni un període",life:5e3})},E=async()=>{var e,a;const t=(a=(e=m.lifecycle)==null?void 0:e.statuses)==null?void 0:a.find(o=>o.name==="Gestionada");if(t){const d={ids:p.value.map(h=>h.id),statusToId:t.id};await y.UpdateInvoicesStatus(d)&&(g.add({severity:"success",summary:"Comptabilització de factures",detail:`Factures comptabilitzades: ${p.value.length}`,life:5e3}),await D())}},G=async t=>{const e=await B.File.GetEntityFiles("PurchaseInvoice",t.id);e&&e.forEach(async a=>{const o=await B.File.Download(a);j(a.originalName,o)})};return(t,e)=>{const a=f("Calendar"),o=f("Checkbox"),d=f("Button"),l=f("Column"),h=f("DataTable");return U(),R("div",null,[n(h,{class:"small-datatable",tableStyle:"min-width: 100%",scrollable:"",scrollHeight:"80vh",sortMode:"multiple",value:u(y).purchaseInvoices,selection:p.value,"onUpdate:selection":e[2]||(e[2]=s=>p.value=s)},{header:r(()=>[i("div",Z,[i("div",J,[i("div",X,[ee,n(a,{modelValue:c.value.dates,"onUpdate:modelValue":e[0]||(e[0]=s=>c.value.dates=s),numberOfMonths:2,selectionMode:"range",dateFormat:"dd/mm/yy"},null,8,["modelValue"])]),i("div",te,[ae,i("div",se,[i("div",oe,[n(o,{modelValue:c.value.showManaged,"onUpdate:modelValue":e[1]||(e[1]=s=>c.value.showManaged=s),binary:!0,onChange:D},null,8,["modelValue"])])])])]),i("div",ne,[n(d,{class:"datatable-button",icon:u(b).FILTER,rounded:"",raised:"",onClick:D},null,8,["icon"]),n(d,{icon:u(b).CHECK,disabled:p.value.length===0,rounded:"",raised:"",severity:"success",onClick:E},null,8,["icon","disabled"])])])]),default:r(()=>[n(l,{selectionMode:"multiple",style:{width:"2%"}}),n(l,{field:"number",header:"Número",sortable:"",style:{width:"10%"}}),n(l,{header:"Proveïdor",style:{width:"15%"}},{body:r(s=>[I(v(k(s.data.supplierId)),1)]),_:1}),n(l,{header:"Num Fra. Proveïdor",style:{width:"12%"},field:"supplierNumber"}),n(l,{header:"Estat",style:{width:"15%"}},{body:r(s=>[i("span",{class:x({"managed-status":T(s.data.statusId)})},v(F(s.data.statusId)),3)]),_:1}),n(l,{header:"Data",field:"purchaseInvoiceDate",sortable:"",style:{width:"15%"}},{body:r(s=>[I(v(u(w)(s.data.purchaseInvoiceDate)),1)]),_:1}),n(l,{header:"Venciment",style:{width:"15%"}},{body:r(s=>[I(v(V(s.data)),1)]),_:1}),n(l,{field:"baseAmount",header:"Import Base",style:{width:"15%"}},{body:r(s=>[I(v(u(H)(s.data.baseAmount)),1)]),_:1}),n(l,{style:{width:"2%"}},{body:r(s=>[i("i",{class:x([u(b).DOWNLOAD,"download_column"]),onClick:ce=>G(s.data)},null,10,le)]),_:1})]),_:1},8,["value","selection"])])}}});const fe=K(de,[["__scopeId","data-v-46b35620"]]);export{fe as default};
