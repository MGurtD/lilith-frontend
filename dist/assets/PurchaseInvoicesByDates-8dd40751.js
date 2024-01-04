import{d as z,j as A,u as L,r as C,o as O,P as _,h as f,c as U,i as n,w as r,k as h,a as R,e as i,C as D,D as y,n as x,p as j,b as H,f as $}from"./index-ca9243eb.js";import{u as q,a as K}from"./purchaseInvoices-572be855.js";import{S as M}from"./index-959fbe55.js";import{f as g,a as B,b as Q}from"./functions-4d7ada1d.js";import{u as W}from"./lifecycle-b10a3b5d.js";import"./index-ad35212a.js";import"./base.service-92b3c0ab.js";import"./reference.service-d9970f26.js";import"./index-2d1ff564.js";import"./suppliers.service-b993ba6f.js";import"./file.service-06c40abe.js";import"./_commonjsHelpers-725317a4.js";import"./v4-a960c1f4.js";const N=v=>(j("data-v-cbce5db2"),v=v(),H(),v),J={class:"flex flex-wrap align-items-center justify-content-between gap-2"},X={class:"datatable-filter"},Y={class:"filter-field"},Z=N(()=>i("label",{class:"block text-900 mb-2"},"Període",-1)),ee={class:"filter-field"},te=N(()=>i("label",{class:"block text-900 mb-2 mr-3"},"Amagar Gestionades",-1)),ae={class:"flex flex-wrap gap-3"},se={class:"flex align-items-center"},oe={class:"datatable-buttons"},ne=["onClick"],le="PurchaseInvoice",ie=z({__name:"PurchaseInvoicesByDates",setup(v){const w=A(),P=L(),S=q(),u=W(),b=K(),c=C({dates:void 0,excludeManaged:!1}),m=C([]);O(async()=>{S.fetchMasterData(),u.fetchOneByName(le),P.setMenuItem({icon:_.SERVER,title:"Comptabilització de factures"})});const k=t=>{var a;const e=(a=S.masterData.suppliers)==null?void 0:a.find(s=>s.id===t);return e?e.comercialName:""},F=t=>{var a,s;const e=(s=(a=u.lifecycle)==null?void 0:a.statuses)==null?void 0:s.find(d=>d.id===t);return e?e.name:""},V=t=>t.purchaseInvoiceDueDates?t.purchaseInvoiceDueDates.length===0?g(t.purchaseInvoiceDate):g(t.purchaseInvoiceDueDates[t.purchaseInvoiceDueDates.length-1].dueDate):"",T=t=>{var a,s;const e=(s=(a=u.lifecycle)==null?void 0:a.statuses)==null?void 0:s.find(d=>d.name==="Gestionada");return e&&e.id===t},I=async()=>{var t,e;if(c.value.dates){let a;c.value.excludeManaged===!0&&(a=(e=(t=u.lifecycle)==null?void 0:t.statuses)==null?void 0:e.find(p=>p.name==="Gestionada"));const s=B(c.value.dates[0]),d=B(c.value.dates[1]),l=a?a.id:void 0;await b.GetFiltered(s,d,void 0,l)}else w.add({severity:"info",summary:"Filtre invàlid",detail:"Seleccioni un període",life:5e3})},E=async()=>{var e,a;const t=(a=(e=u.lifecycle)==null?void 0:e.statuses)==null?void 0:a.find(s=>s.name==="Gestionada");if(t){const d={ids:m.value.map(p=>p.id),statusToId:t.id};await b.UpdateInvoicesStatus(d)&&(w.add({severity:"success",summary:"Comptabilització de factures",detail:`Factures comptabilitzades: ${m.value.length}`,life:5e3}),await I())}},G=async t=>{const e=await M.File.GetEntityFiles("PurchaseInvoice",t.id);e&&e.forEach(async a=>{const s=await M.File.Download(a);Q(a.originalName,s)})};return(t,e)=>{const a=f("Calendar"),s=f("Checkbox"),d=f("Button"),l=f("Column"),p=f("DataTable");return R(),U("div",null,[n(p,{class:"small-datatable",tableStyle:"min-width: 100%",scrollable:"",scrollHeight:"80vh",sortMode:"multiple",value:h(b).purchaseInvoices,selection:m.value,"onUpdate:selection":e[2]||(e[2]=o=>m.value=o)},{header:r(()=>[i("div",J,[i("div",X,[i("div",Y,[Z,n(a,{modelValue:c.value.dates,"onUpdate:modelValue":e[0]||(e[0]=o=>c.value.dates=o),numberOfMonths:2,selectionMode:"range",dateFormat:"dd/mm/yy"},null,8,["modelValue"])]),i("div",ee,[te,i("div",ae,[i("div",se,[n(s,{modelValue:c.value.excludeManaged,"onUpdate:modelValue":e[1]||(e[1]=o=>c.value.excludeManaged=o),binary:!0,onChange:I},null,8,["modelValue"])])])])]),i("div",oe,[n(d,{class:"datatable-button",icon:h(_).FILTER,rounded:"",raised:"",onClick:I},null,8,["icon"]),n(d,{icon:h(_).CHECK,disabled:m.value.length===0,rounded:"",raised:"",severity:"success",onClick:E},null,8,["icon","disabled"])])])]),default:r(()=>[n(l,{selectionMode:"multiple",style:{width:"2%"}}),n(l,{field:"number",header:"Número",sortable:"",style:{width:"10%"}}),n(l,{header:"Proveïdor",style:{width:"15%"}},{body:r(o=>[D(y(k(o.data.supplierId)),1)]),_:1}),n(l,{header:"Num Fra. Proveïdor",style:{width:"12%"},field:"supplierNumber"}),n(l,{header:"Estat",style:{width:"15%"}},{body:r(o=>[i("span",{class:x({"managed-status":T(o.data.statusId)})},y(F(o.data.statusId)),3)]),_:1}),n(l,{header:"Data",field:"purchaseInvoiceDate",sortable:"",style:{width:"15%"}},{body:r(o=>[D(y(h(g)(o.data.purchaseInvoiceDate)),1)]),_:1}),n(l,{header:"Venciment",style:{width:"15%"}},{body:r(o=>[D(y(V(o.data)),1)]),_:1}),n(l,{field:"baseAmount",header:"Import Base",style:{width:"15%"}}),n(l,{style:{width:"2%"}},{body:r(o=>[i("i",{class:x([h(_).DOWNLOAD,"download_column"]),onClick:de=>G(o.data)},null,10,ne)]),_:1})]),_:1},8,["value","selection"])])}}});const ge=$(ie,[["__scopeId","data-v-cbce5db2"]]);export{ge as default};
