import{d as L,g as V,u as R,r as N,R as F,o as M,P as u,j,x as q,h as m,m as A,w as l,k as n,a as H,e as c,i as s,G as _,H as f,$ as x,I as P,n as $,y as G}from"./index-abfce291.js";import{u as U}from"./expense-92c0fb7a.js";import"./index-d2d270c9.js";import"./suppliers.service-121dff3b.js";const z={class:"flex flex-wrap align-items-center justify-content-between gap-2"},W={class:"datatable-filter"},J={class:"filter-field"},K=c("label",{class:"block text-900 mb-2"},"Tipus",-1),O={class:"datatable-buttons"},Q=["onClick"],se=L({__name:"Expenses",setup(X){const y=V(),h=R(),e=U(),d=N({dates:void 0,expenseTypeId:void 0}),b=F(()=>{let a=0;return e.expenses&&e.expenses.forEach(o=>a+=o.amount),a});M(async()=>{await e.fetchExpenseTypes(),await e.fetchExpenses(),h.setMenuItem({icon:u.WALLET,title:"Gestió de despeses"})});const T=async()=>{d.value.expenseTypeId&&await e.getFiltered(d.value.expenseTypeId)},v=async()=>{d.value.expenseTypeId="",await e.fetchExpenses()},w=()=>{y.push({path:`/expense/${G()}`})},E=a=>{a.originalEvent.target.className.includes("grid_delete_column_button")||y.push({path:`/expense/${a.data.id}`})},C=j(),g=q(),I=(a,o)=>{g.require({target:a.currentTarget,message:"Està segur que vol eliminar la despesa?",icon:"pi pi-question-circle",acceptIcon:"pi pi-check",rejectIcon:"pi pi-times",accept:async()=>{await e.deleteExpense(o.id)&&(C.add({severity:"success",summary:"Eliminat",life:3e3}),await e.fetchExpenses())}})},k=a=>{var r;const o=(r=e.expenseTypes)==null?void 0:r.find(p=>p.id===a);return o?o.name:""};return(a,o)=>{const r=m("Dropdown"),p=m("Button"),i=m("Column"),D=m("BooleanColumn"),B=m("DataTable");return H(),A(B,{value:n(e).expenses,class:"p-datatable-sm small-datatable",tableStyle:"min-width: 100%",scrollable:"",scrollHeight:"80vh",sortMode:"multiple",onRowClick:E},{header:l(()=>[c("div",z,[c("div",W,[c("div",J,[K,s(r,{modelValue:d.value.expenseTypeId,"onUpdate:modelValue":o[0]||(o[0]=t=>d.value.expenseTypeId=t),editable:"",options:n(e).expenseTypes,optionValue:"id",optionLabel:"name",class:"w-full"},null,8,["modelValue","options"])])]),c("div",O,[s(p,{class:"datatable-button mr-2",icon:n(u).FILTER,rounded:"",raised:"",onClick:T},null,8,["icon"]),s(p,{class:"datatable-button mr-2",icon:n(u).FILTER_SLASH,rounded:"",raised:"",onClick:v},null,8,["icon"]),s(p,{icon:n(u).PLUS,rounded:"",raised:"",onClick:w},null,8,["icon"])])])]),footer:l(()=>[_("Total "+f(n(x)(b.value))+" €",1)]),default:l(()=>[s(i,{field:"description",header:"Descripció",style:{width:"40%"},sortable:""}),s(i,{field:"amount",header:"Import",style:{width:"15%"}},{body:l(t=>[_(f(n(x)(t.data.amount)),1)]),_:1}),s(i,{field:"paymentDate",header:"Data pagament",style:{width:"20%"},sortable:""},{body:l(t=>[_(f(n(P)(t.data.paymentDate)),1)]),_:1}),s(i,{header:"Tipus",style:{width:"15%"}},{body:l(t=>[_(f(k(t.data.expenseTypeId)),1)]),_:1}),s(i,{header:"Recurrent",style:{width:"10%"}},{body:l(t=>[s(D,{value:t.data.recurring,showColor:!1},null,8,["value"])]),_:1}),s(i,null,{body:l(t=>[c("i",{class:$([n(u).TIMES,"grid_delete_column_button"]),onClick:S=>I(S,t.data)},null,10,Q)]),_:1})]),_:1},8,["value"])}}});export{se as default};
