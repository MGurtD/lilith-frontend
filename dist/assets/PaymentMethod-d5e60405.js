import{d as w,j as D,r as E,h as v,c as _,e as o,i as n,n as V,y as M,l as F,a as q,F as c,v as B,g as C,u as I,z as N,o as P,k as g,m as U,P as T}from"./index-30e64f83.js";import{c as $,a as k,d as p,F as O}from"./form-validator-497b2185.js";import{u as R}from"./paymentMethod-0ca437f1.js";import"./index-cb69ecf9.js";import"./base.service-3e1c705c.js";import"./reference.service-385b31b8.js";const A={key:0},L={class:"two-columns"},S={class:"two-columns"},z=o("label",{class:"block text-900 mb-2"},"Dies venciment",-1),j=o("label",{class:"block text-900 mb-2"},"Dia de pagament",-1),G={class:"two-columns"},H=o("label",{class:"block text-900 mb-2"},"Número de pagaments",-1),J=o("label",{class:"block text-900 mb-2"},"Freqüència",-1),K=o("label",{class:"block text-900 mb-2"},"Desactivada",-1),Q={class:"mt-2"},W=w({__name:"FormPaymentMethod",props:{paymentMethod:{}},emits:["submit","cancel"],setup(h,{emit:d}){const i=h,y=D(),b=$().shape({name:k().required("El nom és obligatori").max(250,"El nom comercial no pot superar els 250 carácters"),description:k().required("La descripció és obligatori").max(250,"La descripció no pot superar els 250 carácters"),dueDays:p().required("Els dies de venciment són obligatoris"),paymentDay:p().required("El dia de pagament és obligatori"),numberOfPayments:p().required("El número de pagaments és obligatori"),frequency:p().required("La freqüència és obligatoria")}),l=E({result:!1,errors:{}}),m=()=>{const e=new O(b);l.value=e.validate(i.paymentMethod)},f=async()=>{if(m(),l.value.result)d("submit",i.paymentMethod);else{let e="";Object.entries(l.value.errors).forEach(a=>{e+=`${a[1].map(t=>t)}.   `}),y.add({severity:"warn",summary:"Formulari inválid",detail:e,life:5e3})}};return(e,a)=>{const t=v("InputNumber"),r=v("Checkbox"),u=v("Button");return e.paymentMethod?(q(),_("form",A,[o("div",L,[n(M,{class:V(["mb-2",{"p-invalid":l.value.errors.name}]),label:"Nom",id:"name",modelValue:e.paymentMethod.name,"onUpdate:modelValue":a[0]||(a[0]=s=>e.paymentMethod.name=s)},null,8,["modelValue","class"]),n(M,{class:V(["mb-2",{"p-invalid":l.value.errors.description}]),label:"Descripció",id:"description",modelValue:e.paymentMethod.description,"onUpdate:modelValue":a[1]||(a[1]=s=>e.paymentMethod.description=s)},null,8,["modelValue","class"])]),o("div",S,[o("div",null,[z,n(t,{modelValue:e.paymentMethod.dueDays,"onUpdate:modelValue":a[2]||(a[2]=s=>e.paymentMethod.dueDays=s),class:"w-full mb-2"},null,8,["modelValue"])]),o("div",null,[j,n(t,{modelValue:e.paymentMethod.paymentDay,"onUpdate:modelValue":a[3]||(a[3]=s=>e.paymentMethod.paymentDay=s),class:"w-full mb-2"},null,8,["modelValue"])])]),o("div",G,[o("div",null,[H,n(t,{modelValue:e.paymentMethod.numberOfPayments,"onUpdate:modelValue":a[4]||(a[4]=s=>e.paymentMethod.numberOfPayments=s),class:"w-full mb-2"},null,8,["modelValue"])]),o("div",null,[J,n(t,{modelValue:e.paymentMethod.frequency,"onUpdate:modelValue":a[5]||(a[5]=s=>e.paymentMethod.frequency=s),class:"w-full mb-2"},null,8,["modelValue"])])]),o("div",null,[o("div",null,[K,n(r,{modelValue:e.paymentMethod.disabled,"onUpdate:modelValue":a[6]||(a[6]=s=>e.paymentMethod.disabled=s),class:"w-full",binary:!0},null,8,["modelValue"])])]),o("div",Q,[n(u,{label:"Guardar",class:"mr-2",onClick:f})])])):F("",!0)}}}),te=w({__name:"PaymentMethod",setup(h){const d=E(c.EDIT),i=B(),y=C(),b=I(),l=R(),{paymentMethod:m}=N(l),f=async()=>{await l.fetchOne(i.params.id);let t="";m.value?(d.value=c.EDIT,t=`Forma de pagament ${m.value.name}`):(d.value=c.CREATE,l.setNew(i.params.id),t="Alta de forma de pagament"),b.setMenuItem({icon:T.BUILDING,backButtonVisible:!0,title:t})};P(async()=>{await f()});const e=D(),a=async()=>{const t=m.value;let r=!1,u="";d.value===c.CREATE?(r=await l.create(t),u="Forma de pagament creada correctament"):(r=await l.update(t.id,t),u="Forma de pagament actualizada correctament"),r&&(e.add({severity:"success",summary:u,life:5e3}),y.back())};return(t,r)=>g(m)?(q(),U(W,{key:0,"payment-method":g(m),onSubmit:a},null,8,["payment-method"])):F("",!0)}});export{te as default};
