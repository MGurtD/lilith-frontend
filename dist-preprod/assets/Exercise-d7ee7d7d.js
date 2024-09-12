import{d as w,j as U,r as F,h as x,c as B,e as l,i as r,n as v,z as n,l as I,a as g,D,F as b,g as N,v as T,u as O,E as $,C as A,o as L,k as y,m as R,P as S}from"./index-948abaa8.js";import{c as q,a as E,e as k,f as M,F as z}from"./form-validator-ae6c613c.js";const P={key:0},j={class:"two-columns"},G={class:"two-columns",style:{"margin-bottom":"1rem"}},J=l("label",{class:"block text-900 mb-2"},"Data inici",-1),H=l("label",{class:"block text-900 mb-2"},"Data fi",-1),K={class:"four-columns"},Q={class:"four-columns mt-2"},W=l("label",{class:"block text-900 mb-2"},"Desactivat",-1),X={class:"mt-2"},Y=w({__name:"FormExercise",props:{exercise:{}},emits:["submit","cancel"],setup(C,{emit:c}){const d=C,p=U(),V=q().shape({name:E().required("El nom és obligatori").max(250,"El nom no pot superar els 250 carácters"),description:E().required("La descripció és obligatori").max(250,"La descripció pot superar els 250 carácters"),startDate:k().required("La data d'inici es obligatoria"),endDate:k().required("La data final es obligatoria").min(M("startDate"),"La data final de l'exercici ha de ser posterior a l'inici")}),o=F({result:!1,errors:{}}),i=()=>{const e=new z(V);o.value=e.validate(d.exercise)},f=async()=>{if(i(),o.value.result)d.exercise.startDate=D(d.exercise.startDate),d.exercise.endDate=D(d.exercise.endDate),c("submit",d.exercise);else{let e="";Object.entries(o.value.errors).forEach(a=>{e+=`${a[1].map(t=>t)}.   `}),p.add({severity:"warn",summary:"Formulari inválid",detail:e,life:5e3})}};return(e,a)=>{const t=x("Calendar"),u=x("Checkbox"),m=x("Button");return e.exercise?(g(),B("form",P,[l("div",j,[r(n,{class:v(["mb-2",{"p-invalid":o.value.errors.name}]),label:"Nom",id:"name",modelValue:e.exercise.name,"onUpdate:modelValue":a[0]||(a[0]=s=>e.exercise.name=s)},null,8,["modelValue","class"]),r(n,{class:v(["mb-2",{"p-invalid":o.value.errors.description}]),label:"Descripció",id:"description",modelValue:e.exercise.description,"onUpdate:modelValue":a[1]||(a[1]=s=>e.exercise.description=s)},null,8,["modelValue","class"])]),l("div",G,[l("div",null,[J,r(t,{modelValue:e.exercise.startDate,"onUpdate:modelValue":a[2]||(a[2]=s=>e.exercise.startDate=s),dateFormat:"dd/mm/yy",class:v({"p-invalid":o.value.errors.startDate})},null,8,["modelValue","class"])]),l("div",null,[H,r(t,{modelValue:e.exercise.endDate,"onUpdate:modelValue":a[3]||(a[3]=s=>e.exercise.endDate=s),dateFormat:"dd/mm/yy",class:v({"p-invalid":o.value.errors.endDate})},null,8,["modelValue","class"])])]),l("section",K,[l("div",null,[r(n,{label:"Pressupostos",modelValue:e.exercise.budgetCounter,"onUpdate:modelValue":a[4]||(a[4]=s=>e.exercise.budgetCounter=s)},null,8,["modelValue"])]),l("div",null,[r(n,{label:"Comandes de venta",modelValue:e.exercise.salesOrderCounter,"onUpdate:modelValue":a[5]||(a[5]=s=>e.exercise.salesOrderCounter=s)},null,8,["modelValue"])]),l("div",null,[r(n,{label:"Albarans de venta",modelValue:e.exercise.deliveryNoteCounter,"onUpdate:modelValue":a[6]||(a[6]=s=>e.exercise.deliveryNoteCounter=s)},null,8,["modelValue"])]),l("div",null,[r(n,{label:"Factures de venta",modelValue:e.exercise.salesInvoiceCounter,"onUpdate:modelValue":a[7]||(a[7]=s=>e.exercise.salesInvoiceCounter=s)},null,8,["modelValue"])])]),l("div",Q,[l("div",null,[r(n,{label:"Comandes de compra",modelValue:e.exercise.purchaseOrderCounter,"onUpdate:modelValue":a[8]||(a[8]=s=>e.exercise.purchaseOrderCounter=s)},null,8,["modelValue"])]),l("div",null,[r(n,{label:"Albarans de recepció",modelValue:e.exercise.receiptCounter,"onUpdate:modelValue":a[9]||(a[9]=s=>e.exercise.receiptCounter=s)},null,8,["modelValue"])]),l("div",null,[r(n,{label:"Factures de compra",modelValue:e.exercise.purchaseInvoiceCounter,"onUpdate:modelValue":a[10]||(a[10]=s=>e.exercise.purchaseInvoiceCounter=s)},null,8,["modelValue"])]),l("div",null,[W,r(u,{modelValue:e.exercise.disabled,"onUpdate:modelValue":a[11]||(a[11]=s=>e.exercise.disabled=s),class:"w-full",binary:!0},null,8,["modelValue"])])]),l("div",X,[r(m,{label:"Guardar",class:"mr-2",onClick:f})])])):I("",!0)}}}),_=w({__name:"Exercise",setup(C){const c=F(b.EDIT),d=N(),p=T(),V=O(),o=$(),{exercise:i}=A(o),f=async()=>{await o.fetchOne(p.params.id);let t="";i.value?(c.value=b.EDIT,t=`Exercici ${i.value.name}`,i.value.startDate=new Date(i.value.startDate),i.value.endDate=new Date(i.value.endDate)):(c.value=b.CREATE,o.setNew(p.params.id),t="Alta d'exercici"),V.setMenuItem({icon:S.BUILDING,backButtonVisible:!0,title:t})};L(async()=>{await f()});const e=U(),a=async()=>{const t=i.value;let u=!1,m="";c.value===b.CREATE?(u=await o.create(t),m="Exercici creat correctament"):(u=await o.update(t.id,t),m="Exercici actualizat correctament"),u&&(e.add({severity:"success",summary:m,life:5e3}),d.back())};return(t,u)=>y(i)?(g(),R(Y,{key:0,exercise:y(i),onSubmit:a},null,8,["exercise"])):I("",!0)}});export{_ as default};
