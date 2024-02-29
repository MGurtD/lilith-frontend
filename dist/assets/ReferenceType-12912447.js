import{d as R,j as E,r as B,h as b,c as _,e as l,i as n,n as p,y as v,k as V,l as w,a as I,s as F,F as f,g as U,v as N,u as g,z as h,o as D,m as M,P}from"./index-555c6e5a.js";import{c as S,a as k,F as $}from"./form-validator-f8953ae6.js";import{u as A}from"./referenceType-3c510c98.js";import"./_commonjsHelpers-725317a4.js";import"./index-8611458c.js";import"./base.service-fff6fc35.js";import"./reference.service-fdfd63b3.js";const z={key:0},L={class:"three-columns"},j={class:"three-columns"},q=l("label",{class:"block text-900 mb-2"},"Color Primari",-1),G=l("label",{class:"block text-900 mb-2"},"Color Secundari",-1),O=l("label",{class:"block text-900 mb-2"},"Desactivat",-1),H={class:"mt-2"},J=R({__name:"FormReferenceType",props:{referenceType:{}},emits:["submit","cancel"],setup(C,{emit:c}){const u=C,d=E(),y=S().shape({name:k().required("El nom és obligatori").max(250,"El nom no pot superar els 250 carácters"),description:k().required("La descripció és obligatori").max(250,"La descripció pot superar els 250 carácters")}),a=B({result:!1,errors:{}}),t=()=>{const e=new $(y);a.value=e.validate(u.referenceType)},T=async()=>{if(t(),a.value.result)c("submit",u.referenceType);else{let e="";Object.entries(a.value.errors).forEach(r=>{e+=`${r[1].map(o=>o)}.   `}),d.add({severity:"warn",summary:"Formulari inválid",detail:e,life:5e3})}};return(e,r)=>{const o=b("ColorPicker"),i=b("Checkbox"),m=b("Button");return e.referenceType?(I(),_("form",z,[l("section",L,[n(v,{class:p(["mb-2",{"p-invalid":a.value.errors.name}]),label:"Nom",id:"name",modelValue:e.referenceType.name,"onUpdate:modelValue":r[0]||(r[0]=s=>e.referenceType.name=s)},null,8,["modelValue","class"]),n(v,{class:p(["mb-2",{"p-invalid":a.value.errors.description}]),label:"Descripció",id:"description",modelValue:e.referenceType.description,"onUpdate:modelValue":r[1]||(r[1]=s=>e.referenceType.description=s)},null,8,["modelValue","class"]),l("div",null,[n(v,{type:V(F).NUMERIC,decimals:2,label:"Densitat g/cm^3",id:"density",modelValue:e.referenceType.density,"onUpdate:modelValue":r[2]||(r[2]=s=>e.referenceType.density=s)},null,8,["type","modelValue"])])]),l("section",j,[l("div",null,[q,n(o,{modelValue:e.referenceType.primaryColor,"onUpdate:modelValue":r[3]||(r[3]=s=>e.referenceType.primaryColor=s),class:p(["mb-2",{"p-invalid":a.value.errors.color}]),label:"Color",id:"color"},null,8,["modelValue","class"])]),l("div",null,[G,n(o,{modelValue:e.referenceType.secondaryColor,"onUpdate:modelValue":r[4]||(r[4]=s=>e.referenceType.secondaryColor=s),class:p(["mb-2",{"p-invalid":a.value.errors.color}]),label:"Color",id:"color"},null,8,["modelValue","class"])]),l("div",null,[O,n(i,{modelValue:e.referenceType.disabled,"onUpdate:modelValue":r[5]||(r[5]=s=>e.referenceType.disabled=s),class:"w-full",binary:!0},null,8,["modelValue"])])]),l("div",H,[n(m,{label:"Guardar",class:"mr-2",onClick:T})])])):w("",!0)}}}),ee=R({__name:"ReferenceType",setup(C){const c=B(f.EDIT),u=U(),d=N(),y=g(),a=A(),{referenceType:t}=h(a),T=async()=>{await a.fetchReferenceType(d.params.id);let o="";t.value?(c.value=f.EDIT,o=`Tipus de material ${t.value.name}`):(c.value=f.CREATE,a.setNewReferenceType(d.params.id),o="Alta de tipus de materials"),y.setMenuItem({icon:P.BUILDING,backButtonVisible:!0,title:o})};D(async()=>{await T()});const e=E(),r=async()=>{const o=t.value;let i=!1,m="";c.value===f.CREATE?(i=await a.createReferenceType(o),m="Tipus de material creat correctament"):(i=await a.updateReferenceType(o.id,o),m="Tipus de material actualizat correctament"),i&&(e.add({severity:"success",summary:m,life:5e3}),u.back())};return(o,i)=>V(t)?(I(),M(J,{key:0,"reference-type":V(t),onSubmit:r},null,8,["reference-type"])):w("",!0)}});export{ee as default};
