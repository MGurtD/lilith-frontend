import{d as g,o as C,z as I,r as k,j as h,h as p,k as a,c as S,e as s,i as d,n as b,y as w,l as B,a as U,s as M,F as D,v as N,u as q,m as $,P as z,K as P}from"./index-d7e0b608.js";import{u as F}from"./expense-9db481de.js";import{c as j,a as x,F as O}from"./form-validator-788c4f60.js";import{c as T}from"./functions-13b40d42.js";import"./index-0f6d2d18.js";import"./base.service-1e1fcad7.js";import"./suppliers.service-175cce9d.js";import"./v4-a960c1f4.js";const G={key:0},J={class:"four-columns"},K={class:"mt-2"},W=s("label",{class:"block text-900 mb-2"},"Tipus",-1),Y={class:"mt-2"},H=s("label",{class:"block text-900 mb-2"},"Data Alta",-1),Q={class:"mt-2"},X=s("label",{class:"block text-900 mb-2"},"Data Pagament",-1),Z={class:"mt-2"},ee={class:"four-columns"},ae={class:"mt-2"},te=s("label",{class:"block text-900 mb-2"},"Recurrent",-1),se={class:"mt-2"},oe=s("label",{class:"block text-900 mb-2"},"Freqüència",-1),le={class:"mt-2"},ne={class:"mt-2"},ie=s("label",{class:"block text-900 mb-2"},"Data fi",-1),re=s("label",{class:"block text-900 mb-2"},"Descripció",-1),de={class:"mt-2"},me=g({__name:"FormExpense",props:{expense:{}},emits:["submit","cancel"],setup(E,{emit:c}){const n=E;C(()=>{});const v=F(),{expense:e}=I(v),l=k([{id:1,name:"Mensual"},{id:2,name:"Bimensual"},{id:3,name:"Trimestral"},{id:6,name:"Semestral"},{id:12,name:"Anual"}]),y=j().shape({expenseTypeId:x().required("El tipus de despesa es obligatoria"),creationDate:x().required("La data de creació es obligatoria"),paymentDate:x().required("La data de pagament es obligatoria"),amount:x().required("L'import es obligatori")}),i=k({result:!1,errors:{}}),V=()=>{const m=new O(y);i.value=m.validate(n.expense)},r=h(),u=async()=>{if(V(),i.value.result)n.expense.creationDate=T(n.expense.creationDate),n.expense.endDate=T(n.expense.endDate),n.expense.paymentDate=T(n.expense.paymentDate),c("submit",e.value);else{let m="";Object.entries(i.value.errors).forEach(t=>{m+=`${t[1].map(_=>_)}.   `}),r.add({severity:"warn",summary:"Formulari inválid",detail:m,life:5e3})}};return(m,t)=>{const _=p("Dropdown"),f=p("Calendar"),A=p("Checkbox"),L=p("Textarea"),R=p("Button");return a(e)?(U(),S("form",G,[s("section",J,[s("div",K,[W,d(_,{modelValue:a(e).expenseTypeId,"onUpdate:modelValue":t[0]||(t[0]=o=>a(e).expenseTypeId=o),editable:"",options:a(v).expenseTypes,optionValue:"id",optionLabel:"name",class:b(["w-full",{"p-invalid":i.value.errors.expenseTypeId}])},null,8,["modelValue","options","class"])]),s("div",Y,[H,d(f,{id:"creationDate",modelValue:a(e).creationDate,"onUpdate:modelValue":t[1]||(t[1]=o=>a(e).creationDate=o),class:b({"p-invalid":i.value.errors.creationDate})},null,8,["modelValue","class"])]),s("div",Q,[X,d(f,{id:"paymentDate",modelValue:a(e).paymentDate,"onUpdate:modelValue":t[2]||(t[2]=o=>a(e).paymentDate=o),class:b({"p-invalid":i.value.errors.paymentDate})},null,8,["modelValue","class"])]),s("div",Z,[d(w,{label:"Import",id:"amount",modelValue:a(e).amount,"onUpdate:modelValue":t[3]||(t[3]=o=>a(e).amount=o),type:a(M).CURRENCY,class:b({"p-invalid":i.value.errors.amount})},null,8,["modelValue","type","class"])])]),s("section",ee,[s("div",ae,[te,d(A,{modelValue:a(e).recurring,"onUpdate:modelValue":t[4]||(t[4]=o=>a(e).recurring=o),class:"w-full",binary:!0},null,8,["modelValue"])]),s("div",se,[oe,d(_,{modelValue:a(e).frecuency,"onUpdate:modelValue":t[5]||(t[5]=o=>a(e).frecuency=o),disabled:!a(e).recurring,editable:"",options:l.value,optionValue:"id",optionLabel:"name",class:b(["w-full",{"p-invalid":i.value.errors.expenseTypeId}])},null,8,["modelValue","disabled","options","class"])]),s("div",le,[d(w,{label:"Dia de pagament",id:"paymentDay",modelValue:a(e).paymentDay,"onUpdate:modelValue":t[6]||(t[6]=o=>a(e).paymentDay=o),disabled:!a(e).recurring},null,8,["modelValue","disabled"])]),s("div",ne,[ie,d(f,{id:"endDate",modelValue:a(e).endDate,"onUpdate:modelValue":t[7]||(t[7]=o=>a(e).endDate=o),disabled:!a(e).recurring},null,8,["modelValue","disabled"])])]),s("div",null,[re,d(L,{modelValue:a(e).description,"onUpdate:modelValue":t[8]||(t[8]=o=>a(e).description=o),class:"w-full"},null,8,["modelValue"])]),s("div",de,[d(R,{label:"Guardar",class:"mr-2",onClick:u})])])):B("",!0)}}}),ye=g({__name:"Expense",setup(E){const c=k(D.EDIT),n=N(),v=q(),e=F(),{expense:l}=I(e),y=async()=>{await e.fetchExpense(n.params.id);let r="";l.value?(c.value=D.EDIT,r="Modificació de despeses",l.value.creationDate=new Date(l.value.creationDate),l.value.endDate=new Date(l.value.endDate),l.value.paymentDate=new Date(l.value.paymentDate)):(c.value=D.CREATE,e.setNewExpense(n.params.id),r="Alta de despeses"),v.setMenuItem({icon:z.WALLET,backButtonVisible:!0,title:r})};C(async()=>{await y()});const i=h(),V=async()=>{const r=l.value;let u=!1,m="";c.value===D.CREATE?(u=await e.createExpense(r),m="Despesa registrada correctament"):(u=await e.updateExpense(r.id,r),m="Despesa actualizada correctament"),u&&(i.add({severity:"success",summary:m,life:5e3}),P.back())};return(r,u)=>a(l)?(U(),$(me,{key:0,expense:a(l),onSubmit:V},null,8,["expense"])):B("",!0)}});export{ye as default};
