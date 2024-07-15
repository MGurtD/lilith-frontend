import{d as V,j as _,r as k,h as v,c as F,e as m,i as p,n as b,y as f,l as w,a as C,F as c,v as h,u as B,z as A,o as I,k as x,m as N,P as $,L as g}from"./index-e365f3be.js";import{u as D}from"./expense-74410281.js";import{c as L,a as E,F as M}from"./form-validator-f8953ae6.js";import"./index-c2ef66bf.js";import"./base.service-8e7a55c1.js";import"./suppliers.service-2eb9b197.js";import"./_commonjsHelpers-725317a4.js";const R={key:0},S={class:"three-columns"},z=m("label",{class:"block text-900 mb-2"},"Desactivada",-1),U={class:"mt-2"},j=V({__name:"FormExpenseType",props:{expenseType:{}},emits:["submit","cancel"],setup(T,{emit:n}){const r=T,u=_(),o=L().shape({name:E().required("El nom és obligatori").max(250,"El nom no pot superar els 250 carácters"),description:E().required("La descripció és obligatori").max(250,"La descripció no pot superar els 250 carácters")}),a=k({result:!1,errors:{}}),d=()=>{const s=new M(o);a.value=s.validate(r.expenseType)},y=async()=>{if(d(),a.value.result)n("submit",r.expenseType);else{let s="";Object.entries(a.value.errors).forEach(e=>{s+=`${e[1].map(t=>t)}.   `}),u.add({severity:"warn",summary:"Formulari inválid",detail:s,life:5e3})}};return(s,e)=>{const t=v("Checkbox"),l=v("Button");return s.expenseType?(C(),F("form",R,[m("div",S,[p(f,{class:b(["mb-2",{"p-invalid":a.value.errors.name}]),label:"Nom",id:"name",modelValue:s.expenseType.name,"onUpdate:modelValue":e[0]||(e[0]=i=>s.expenseType.name=i)},null,8,["modelValue","class"]),p(f,{class:b(["mb-2",{"p-invalid":a.value.errors.description}]),label:"Descripció",id:"description",modelValue:s.expenseType.description,"onUpdate:modelValue":e[1]||(e[1]=i=>s.expenseType.description=i)},null,8,["modelValue","class"]),m("div",null,[z,p(t,{modelValue:s.expenseType.disabled,"onUpdate:modelValue":e[2]||(e[2]=i=>s.expenseType.disabled=i),class:"w-full",binary:!0},null,8,["modelValue"])])]),m("div",U,[p(l,{label:"Guardar",class:"mr-2",onClick:y})])])):w("",!0)}}}),Q=V({__name:"ExpenseType",setup(T){const n=k(c.EDIT),r=h(),u=B(),o=D(),{expenseType:a}=A(o),d=async()=>{await o.fetchExpenseType(r.params.id);let e="";a.value?(n.value=c.EDIT,e=`Tipus de despesa ${a.value.name}`):(n.value=c.CREATE,o.setNewExpenseType(r.params.id),e="Alta de tipus de despesa"),u.setMenuItem({icon:$.FLAG,backButtonVisible:!0,title:e})};I(async()=>{await d()});const y=_(),s=async()=>{const e=a.value;let t=!1,l="";n.value===c.CREATE?(t=await o.createExpenseType(e),l="Tipus de despesa creada correctament"):(t=await o.updateExpenseType(e.id,e),l="Tipus de despesa actualitzada correctament"),t&&(y.add({severity:"success",summary:l,life:5e3}),g.back())};return(e,t)=>x(a)?(C(),N(j,{key:0,expenseType:x(a),onSubmit:s},null,8,["expenseType"])):w("",!0)}});export{Q as default};