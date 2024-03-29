import{d as S,g as L,u as V,r as F,H as N,o as R,P as u,j as M,x as j,h as m,m as q,w as n,k as l,a as A,e as c,i as s,C as _,D as f,n as H}from"./index-19723412.js";import{u as P}from"./expense-54f9ede1.js";import{f as U}from"./functions-79f2dbc4.js";import{v as $}from"./v4-a960c1f4.js";import"./index-21a9ae2e.js";import"./base.service-2e682391.js";import"./suppliers.service-a33ef70d.js";import"./_commonjsHelpers-725317a4.js";const z={class:"flex flex-wrap align-items-center justify-content-between gap-2"},G={class:"datatable-filter"},W={class:"filter-field"},J=c("label",{class:"block text-900 mb-2"},"Tipus",-1),K={class:"datatable-buttons"},O=["onClick"],ne=S({__name:"Expenses",setup(Q){const x=L(),y=V(),e=P(),d=F({dates:void 0,expenseTypeId:void 0}),h=N(()=>{let a=0;return e.expenses&&e.expenses.forEach(o=>a+=o.amount),a.toFixed(2)});R(async()=>{await e.fetchExpenseTypes(),await e.fetchExpenses(),y.setMenuItem({icon:u.WALLET,title:"Gestió de despeses"})});const b=async()=>{d.value.expenseTypeId&&await e.getFiltered(d.value.expenseTypeId)},v=async()=>{d.value.expenseTypeId="",await e.fetchExpenses()},T=()=>{x.push({path:`/expense/${$()}`})},w=a=>{a.originalEvent.target.className.includes("grid_delete_column_button")||x.push({path:`/expense/${a.data.id}`})},E=M(),C=j(),g=(a,o)=>{C.require({target:a.currentTarget,message:"Està segur que vol eliminar la despesa?",icon:"pi pi-question-circle",acceptIcon:"pi pi-check",rejectIcon:"pi pi-times",accept:async()=>{await e.deleteExpense(o.id)&&(E.add({severity:"success",summary:"Eliminat",life:3e3}),await e.fetchExpenses())}})},I=a=>{var r;const o=(r=e.expenseTypes)==null?void 0:r.find(p=>p.id===a);return o?o.name:""};return(a,o)=>{const r=m("Dropdown"),p=m("Button"),i=m("Column"),k=m("BooleanColumn"),D=m("DataTable");return A(),q(D,{value:l(e).expenses,class:"p-datatable-sm small-datatable",tableStyle:"min-width: 100%",scrollable:"",scrollHeight:"80vh",sortMode:"multiple",onRowClick:w},{header:n(()=>[c("div",z,[c("div",G,[c("div",W,[J,s(r,{modelValue:d.value.expenseTypeId,"onUpdate:modelValue":o[0]||(o[0]=t=>d.value.expenseTypeId=t),editable:"",options:l(e).expenseTypes,optionValue:"id",optionLabel:"name",class:"w-full"},null,8,["modelValue","options"])])]),c("div",K,[s(p,{class:"datatable-button mr-2",icon:l(u).FILTER,rounded:"",raised:"",onClick:b},null,8,["icon"]),s(p,{class:"datatable-button mr-2",icon:l(u).FILTER_SLASH,rounded:"",raised:"",onClick:v},null,8,["icon"]),s(p,{icon:l(u).PLUS,rounded:"",raised:"",onClick:T},null,8,["icon"])])])]),footer:n(()=>[_("Total "+f(h.value)+" €",1)]),default:n(()=>[s(i,{field:"description",header:"Descripció",style:{width:"40%"},sortable:""}),s(i,{field:"amount",header:"Import",style:{width:"15%"}},{body:n(t=>[_(f(t.data.amount)+" € ",1)]),_:1}),s(i,{field:"paymentDate",header:"Data pagament",style:{width:"20%"},sortable:""},{body:n(t=>[_(f(l(U)(t.data.paymentDate)),1)]),_:1}),s(i,{header:"Tipus",style:{width:"15%"}},{body:n(t=>[_(f(I(t.data.expenseTypeId)),1)]),_:1}),s(i,{header:"Recurrent",style:{width:"10%"}},{body:n(t=>[s(k,{value:t.data.recurring,showColor:!1},null,8,["value"])]),_:1}),s(i,null,{body:n(t=>[c("i",{class:H([l(u).TIMES,"grid_delete_column_button"]),onClick:B=>g(B,t.data)},null,10,O)]),_:1})]),_:1},8,["value"])}}});export{ne as default};
