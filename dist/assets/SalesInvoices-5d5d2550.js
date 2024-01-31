import{d as L,o as V,h as y,m as U,w as l,a as B,K as j,i as a,C as h,D,k as d,c as F,n as O,P as I,l as Y,j as A,x as G,g as H,u as z,r as P,E as K,G as Q,e as p}from"./index-61ceac46.js";import{u as J}from"./lifecycle-89ce980f.js";import{f as N,a as T,g as W}from"./functions-4d7ada1d.js";import{_ as X}from"./ExerciseDatePicker.vue_vue_type_script_setup_true_lang-36531003.js";import{u as Z}from"./invoice-068cc9b1.js";import{u as ee}from"./customers-9f789090.js";import{u as te}from"./masterData-0b784b11.js";import{_ as se}from"./FormCreateOrderOrInvoice.vue_vue_type_script_setup_true_lang-db20a81d.js";import"./index-f0d98432.js";import"./base.service-558553c0.js";import"./reference.service-bac3a278.js";import"./_commonjsHelpers-725317a4.js";import"./v4-a960c1f4.js";import"./index-dbe80950.js";import"./form-validator-f8953ae6.js";const ae=["onClick"],oe=L({__name:"TableInvoices",props:{invoices:{},customers:{}},emits:["edit","delete"],setup(E,{emit:w}){const C=E,u=J();V(async()=>{await u.fetchOneByName("SalesInvoice")});const o=e=>{var s;const r=(s=C.customers)==null?void 0:s.find(n=>n.id===e);return r?r.comercialName:""},_=e=>{var s;const r=(s=u.lifecycle)==null?void 0:s.statuses.find(n=>n.id===e);return r?r.name:""},v=e=>e.salesInvoiceDueDates?e.salesInvoiceDueDates.length===0?N(e.invoiceDate):N(e.salesInvoiceDueDates[e.salesInvoiceDueDates.length-1].dueDate):"",m=e=>{e.originalEvent.target.className.includes("grid_delete_column_button")||w("edit",e.data)},f=(e,r)=>{w("delete",r)};return(e,r)=>{const s=y("Column"),n=y("DataTable");return B(),U(n,{class:"small-datatable",tableStyle:"min-width: 100%",scrollable:"",scrollHeight:"80vh",sortMode:"multiple",value:e.invoices,onRowClick:m},{header:l(()=>[j(e.$slots,"filter")]),default:l(()=>[a(s,{field:"invoiceNumber",header:"Número",sortable:!0,style:{width:"10%"}}),a(s,{header:"Data",field:"purchaseInvoiceDate",sortable:"",style:{width:"15%"}},{body:l(t=>[h(D(d(N)(t.data.invoiceDate)),1)]),_:1}),a(s,{header:"Client",style:{width:"15%"}},{body:l(t=>[h(D(o(t.data.customerId)),1)]),_:1}),a(s,{header:"Estat",style:{width:"15%"}},{body:l(t=>[h(D(_(t.data.statusId)),1)]),_:1}),a(s,{header:"Venciment",style:{width:"15%"}},{body:l(t=>[h(D(v(t.data)),1)]),_:1}),a(s,{header:"Import",style:{width:"15%"}},{body:l(t=>[h(D(t.data.netAmount)+" € ",1)]),_:1}),a(s,{style:{width:"5%"}},{body:l(t=>{var S;return[t.data.statusId===((S=d(u).lifecycle)==null?void 0:S.initialStatusId)?(B(),F("i",{key:0,class:O([d(I).TIMES,"grid_delete_column_button"]),onClick:k=>f(k,t.data)},null,10,ae)):Y("",!0)]}),_:1})]),_:3},8,["value"])}}}),ie={class:"flex flex-wrap align-items-center justify-content-between gap-2"},re={class:"datatable-filter"},ne={class:"filter-field"},ce={class:"filter-field"},le=p("label",{class:"block text-900 mb-2"},"Client",-1),de={class:"datatable-buttons"},ke=L({__name:"SalesInvoices",setup(E){const w=A(),C=G(),u=H(),o=z(),_=te(),v=ee(),m=Z(),f=P({customerId:void 0}),e=K({visible:!1,title:"Crear factura",closable:!0,position:"center",modal:!0});V(async()=>{v.fetchCustomers(),await _.fetchMasterData(),s(),await n(),o.setMenuItem({icon:I.MONEY_BILL,title:"Factures de venta"})});const r=()=>{o.cleanExercisePicker(),f.value.customerId=void 0},s=()=>{var g;const c=new Date().getFullYear().toString(),i=(g=_.exercises)==null?void 0:g.find(b=>b.name===c);i&&(o.exercisePicker.exercise=i,o.exercisePicker.dates=[new Date(o.exercisePicker.exercise.startDate),new Date(o.exercisePicker.exercise.endDate)])},n=async()=>{let c="",i="";o.exercisePicker.dates&&(c=T(o.exercisePicker.dates[0]),i=T(o.exercisePicker.dates[1])),await m.GetFiltered(c,i,void 0,void 0,f.value.customerId)},t=P({}),S=()=>({id:W(),customerId:"",exerciseId:"",date:new Date}),k=()=>{t.value=S(),e.visible=!0},q=async()=>{await m.Create(t.value)&&u.push({path:`/sales-invoice/${t.value.id}`})},R=c=>{u.push({path:`/sales-invoice/${c.id}`})},$=c=>{C.require({message:"Està segur que vol eliminar la factura?",icon:"pi pi-question-circle",acceptIcon:"pi pi-check",rejectIcon:"pi pi-times",accept:async()=>{await m.Delete(c.id)&&(w.add({severity:"success",summary:"Eliminada",life:3e3}),await n())}})};return(c,i)=>{const g=y("Dropdown"),b=y("Button"),M=y("Dialog");return B(),F(Q,null,[a(oe,{invoices:d(m).invoices,customers:d(v).customers,onEdit:R,onDelete:$},{filter:l(()=>[p("div",ie,[p("div",re,[p("div",ne,[a(X,{exercises:d(_).exercises,onRangeSelected:n},null,8,["exercises"])]),p("div",ce,[le,a(g,{modelValue:f.value.customerId,"onUpdate:modelValue":i[0]||(i[0]=x=>f.value.customerId=x),editable:"",options:d(v).customers,optionValue:"id",optionLabel:"comercialName",class:"w-full"},null,8,["modelValue","options"])])]),p("div",de,[a(b,{class:"datatable-button mr-2",icon:d(I).FILTER,rounded:"",raised:"",onClick:n},null,8,["icon"]),a(b,{class:"datatable-button mr-2",icon:d(I).FILTER_SLASH,rounded:"",raised:"",onClick:r},null,8,["icon"]),a(b,{icon:d(I).PLUS,rounded:"",raised:"",onClick:k},null,8,["icon"])])])]),_:1},8,["invoices","customers"]),a(M,{visible:e.visible,"onUpdate:visible":i[1]||(i[1]=x=>e.visible=x),header:e.title,closable:e.closable,modal:e.modal},{default:l(()=>[a(se,{"create-request":t.value,onSubmit:q},null,8,["create-request"])]),_:1},8,["visible","header","closable","modal"])],64)}}});export{ke as default};
