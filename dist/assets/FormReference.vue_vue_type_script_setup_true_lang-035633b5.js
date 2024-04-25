import{d as L,v as N,H as V,j as q,r as D,h as y,c as d,e as l,i as r,n as u,y as i,k as t,l as c,m as M,G as Y,a as n,s as p}from"./index-98d6f8aa.js";import{c as $,a as b,d as F,F as P}from"./form-validator-f8953ae6.js";import{F as j}from"./FileEntityPicker-1901a6e9.js";import{u as z}from"./tax-524f221f.js";import{u as G}from"./reference-73298289.js";import{u as H}from"./referenceType-73769758.js";const O=l("br",null,null,-1),X={key:0},A={class:"three-columns"},J={class:"mt-1"},K={class:"mt-1"},Q={key:0,class:"mt-1"},W={key:1,class:"mt-1"},Z=l("label",{class:"block text-900 mb-2"},"Tipus de material",-1),x={key:0,class:"three-columns"},ee={class:"mt-1"},oe=l("label",{class:"block text-900 mb-2"},"Format",-1),se={class:"mt-1"},le={class:"mt-1"},re=l("label",{class:"block text-900 mb-2"},"Impost",-1),te={key:1,class:"five-columns"},ae={class:"mt-1"},ie={class:"mt-1"},ne={class:"mt-1"},de={class:"mt-1"},ue=l("label",{class:"block text-900 mb-2"},"Impost",-1),ce={class:"mt-1"},me=l("label",{class:"block text-900 mb-2"},"Servei",-1),pe=l("br",null,null,-1),ke=L({__name:"FormReference",props:{module:{},reference:{}},emits:["submit","cancel"],setup(w,{emit:E}){const m=w,I=N(),C=V(()=>m.module==="sales"),k=V(()=>m.module==="purchase");V(()=>m.module==="production");const R=q(),U=z(),T=G(),_=H(),h=$().shape({code:b().required("El codi és obligatori").max(50,"El codi no pot superar els 50 carácters"),description:b().required("La descripció és obligatori").max(250,"La descripció pot superar els 250 carácters"),version:b().required("La versió és obligatoria").max(20,"La versió pot superar els 20 carácters"),cost:F().required("El cost es obligatori"),price:F().required("El preu es obligatori"),taxId:b().required("El tipus d'iva es obligatori")}),a=D({result:!1,errors:{}}),S=()=>{const e=new P(h);a.value=e.validate(m.reference)},g=async()=>{if(S(),a.value.result)E("submit",m.reference);else{let e="";Object.entries(a.value.errors).forEach(o=>{e+=`${o[1].map(v=>v)}.   `}),R.add({severity:"warn",summary:"Formulari inválid",detail:e,life:5e3})}};return(e,o)=>{const v=y("Button"),f=y("Dropdown"),B=y("Checkbox");return n(),d(Y,null,[l("div",null,[r(v,{label:"Guardar",class:"grid_add_row_button",size:"small",onClick:g}),O]),e.reference?(n(),d("form",X,[l("section",A,[l("div",J,[r(i,{class:u(["mb-2",{"p-invalid":a.value.errors.code}]),label:"Codi",id:"code",modelValue:e.reference.code,"onUpdate:modelValue":o[0]||(o[0]=s=>e.reference.code=s)},null,8,["modelValue","class"])]),l("div",K,[r(i,{class:u(["mb-2",{"p-invalid":a.value.errors.description}]),label:"Descripció",id:"description",modelValue:e.reference.description,"onUpdate:modelValue":o[1]||(o[1]=s=>e.reference.description=s)},null,8,["modelValue","class"])]),C.value?(n(),d("div",Q,[r(i,{type:t(p).TEXT,label:"Versió",id:"version",modelValue:e.reference.version,"onUpdate:modelValue":o[2]||(o[2]=s=>e.reference.version=s)},null,8,["type","modelValue"])])):c("",!0),k.value?(n(),d("div",W,[Z,r(f,{modelValue:e.reference.referenceTypeId,"onUpdate:modelValue":o[3]||(o[3]=s=>e.reference.referenceTypeId=s),editable:"",options:t(_).referenceTypes,optionValue:"id",optionLabel:"name",class:u(["w-full",{"p-invalid":a.value.errors.taxid}])},null,8,["modelValue","options","class"])])):c("",!0)]),k.value?(n(),d("section",x,[l("div",ee,[oe,r(f,{modelValue:e.reference.referenceFormatId,"onUpdate:modelValue":o[4]||(o[4]=s=>e.reference.referenceFormatId=s),editable:"",options:t(T).referenceFormats,optionValue:"id",optionLabel:"description",class:u(["w-full",{"p-invalid":a.value.errors.taxid}])},null,8,["modelValue","options","class"])]),l("div",se,[r(i,{type:t(p).CURRENCY,label:"Últim cost de compra",id:"lastCost",modelValue:e.reference.lastCost,"onUpdate:modelValue":o[5]||(o[5]=s=>e.reference.lastCost=s),disabled:""},null,8,["type","modelValue"])]),l("div",le,[re,r(f,{modelValue:e.reference.taxId,"onUpdate:modelValue":o[6]||(o[6]=s=>e.reference.taxId=s),editable:"",options:t(U).taxes,optionValue:"id",optionLabel:"name",class:u(["w-full",{"p-invalid":a.value.errors.taxid}])},null,8,["modelValue","options","class"])])])):c("",!0),C.value?(n(),d("section",te,[l("div",ae,[r(i,{type:t(p).CURRENCY,label:"Cost Teóric Fabricació",id:"workMasterCost",modelValue:e.reference.workMasterCost,"onUpdate:modelValue":o[7]||(o[7]=s=>e.reference.workMasterCost=s),disabled:""},null,8,["type","modelValue"])]),l("div",ie,[r(i,{type:t(p).CURRENCY,label:"Cost Última Fabricació",id:"lastCost",modelValue:e.reference.lastCost,"onUpdate:modelValue":o[8]||(o[8]=s=>e.reference.lastCost=s),disabled:""},null,8,["type","modelValue"])]),l("div",ne,[r(i,{type:t(p).CURRENCY,label:"Preu",id:"price",modelValue:e.reference.price,"onUpdate:modelValue":o[9]||(o[9]=s=>e.reference.price=s)},null,8,["type","modelValue"])]),l("div",de,[ue,r(f,{modelValue:e.reference.taxId,"onUpdate:modelValue":o[10]||(o[10]=s=>e.reference.taxId=s),editable:"",options:t(U).taxes,optionValue:"id",optionLabel:"name",class:u(["w-full",{"p-invalid":a.value.errors.taxid}])},null,8,["modelValue","options","class"])]),l("div",ce,[me,r(B,{modelValue:e.reference.isService,"onUpdate:modelValue":o[11]||(o[11]=s=>e.reference.isService=s),class:"w-full",binary:!0},null,8,["modelValue"])])])):c("",!0),l("section",null,[pe,e.reference?(n(),M(j,{key:0,title:"Documentació",entity:"referenceMaps",id:t(I).params.id},null,8,["id"])):c("",!0)])])):c("",!0)],64)}}});export{ke as _};