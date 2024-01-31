import{d as B,H as V,j as L,r as q,h as y,c as i,e as l,i as r,n as d,y as u,k as a,l as c,m as N,G as P,a as n,s as f}from"./index-61ceac46.js";import{c as D,a as b,d as U,F as $}from"./form-validator-f8953ae6.js";import{F as Y}from"./FileEntityPicker-449846ca.js";import{u as j}from"./tax-dfbe6a74.js";import{u as z}from"./reference-d9f5317f.js";import{u as G}from"./referenceType-8718da31.js";const H=l("br",null,null,-1),M={key:0},O={class:"three-columns"},X={class:"mt-1"},x={class:"mt-1"},A={key:0,class:"mt-1"},J={key:1,class:"mt-1"},K=l("label",{class:"block text-900 mb-2"},"Tipus de material",-1),Q={key:0,class:"three-columns"},W={class:"mt-1"},Z=l("label",{class:"block text-900 mb-2"},"Format",-1),ee={class:"mt-1"},oe={class:"mt-1"},se=l("label",{class:"block text-900 mb-2"},"Impost",-1),le={key:1,class:"four-columns"},re={class:"mt-1"},te={class:"mt-1"},ae={class:"mt-1"},ne=l("label",{class:"block text-900 mb-2"},"Impost",-1),ie={class:"mt-1"},de=l("label",{class:"block text-900 mb-2"},"Servei",-1),ue=l("br",null,null,-1),Ve=B({__name:"FormReference",props:{module:{},reference:{}},emits:["submit","cancel"],setup(I,{emit:_}){const m=I,k=V(()=>m.module==="sales"),C=V(()=>m.module==="purchase");V(()=>m.module==="production");const E=L(),h=j(),F=z(),T=G(),w=D().shape({code:b().required("El codi és obligatori").max(50,"El codi no pot superar els 50 carácters"),description:b().required("La descripció és obligatori").max(250,"La descripció pot superar els 250 carácters"),version:b().required("La versió és obligatoria").max(20,"La versió pot superar els 20 carácters"),cost:U().required("El cost es obligatori"),price:U().required("El preu es obligatori"),taxId:b().required("El tipus d'iva es obligatori")}),t=q({result:!1,errors:{}}),S=()=>{const e=new $(w);t.value=e.validate(m.reference)},R=async()=>{if(S(),t.value.result)_("submit",m.reference);else{let e="";Object.entries(t.value.errors).forEach(o=>{e+=`${o[1].map(v=>v)}.   `}),E.add({severity:"warn",summary:"Formulari inválid",detail:e,life:5e3})}};return(e,o)=>{const v=y("Button"),p=y("Dropdown"),g=y("Checkbox");return n(),i(P,null,[l("div",null,[r(v,{label:"Guardar",class:"grid_add_row_button",size:"small",onClick:R}),H]),e.reference?(n(),i("form",M,[l("section",O,[l("div",X,[r(u,{class:d(["mb-2",{"p-invalid":t.value.errors.code}]),label:"Codi",id:"code",modelValue:e.reference.code,"onUpdate:modelValue":o[0]||(o[0]=s=>e.reference.code=s)},null,8,["modelValue","class"])]),l("div",x,[r(u,{class:d(["mb-2",{"p-invalid":t.value.errors.description}]),label:"Descripció",id:"description",modelValue:e.reference.description,"onUpdate:modelValue":o[1]||(o[1]=s=>e.reference.description=s)},null,8,["modelValue","class"])]),k.value?(n(),i("div",A,[r(u,{type:a(f).TEXT,label:"Versió",id:"version",modelValue:e.reference.version,"onUpdate:modelValue":o[2]||(o[2]=s=>e.reference.version=s)},null,8,["type","modelValue"])])):c("",!0),C.value?(n(),i("div",J,[K,r(p,{modelValue:e.reference.referenceTypeId,"onUpdate:modelValue":o[3]||(o[3]=s=>e.reference.referenceTypeId=s),editable:"",options:a(T).referenceTypes,optionValue:"id",optionLabel:"name",class:d(["w-full",{"p-invalid":t.value.errors.taxid}])},null,8,["modelValue","options","class"])])):c("",!0)]),C.value?(n(),i("section",Q,[l("div",W,[Z,r(p,{modelValue:e.reference.referenceFormatId,"onUpdate:modelValue":o[4]||(o[4]=s=>e.reference.referenceFormatId=s),editable:"",options:a(F).referenceFormats,optionValue:"id",optionLabel:"description",class:d(["w-full",{"p-invalid":t.value.errors.taxid}])},null,8,["modelValue","options","class"])]),l("div",ee,[r(u,{type:a(f).CURRENCY,label:"Últim preu de compra",id:"lastPurchaseCost",modelValue:e.reference.lastPurchaseCost,"onUpdate:modelValue":o[5]||(o[5]=s=>e.reference.lastPurchaseCost=s)},null,8,["type","modelValue"])]),l("div",oe,[se,r(p,{modelValue:e.reference.taxId,"onUpdate:modelValue":o[6]||(o[6]=s=>e.reference.taxId=s),editable:"",options:a(h).taxes,optionValue:"id",optionLabel:"name",class:d(["w-full",{"p-invalid":t.value.errors.taxid}])},null,8,["modelValue","options","class"])])])):c("",!0),k.value?(n(),i("section",le,[l("div",re,[r(u,{type:a(f).CURRENCY,label:"Cost",id:"cost",modelValue:e.reference.cost,"onUpdate:modelValue":o[7]||(o[7]=s=>e.reference.cost=s)},null,8,["type","modelValue"])]),l("div",te,[r(u,{type:a(f).CURRENCY,label:"Preu",id:"price",modelValue:e.reference.price,"onUpdate:modelValue":o[8]||(o[8]=s=>e.reference.price=s)},null,8,["type","modelValue"])]),l("div",ae,[ne,r(p,{modelValue:e.reference.taxId,"onUpdate:modelValue":o[9]||(o[9]=s=>e.reference.taxId=s),editable:"",options:a(h).taxes,optionValue:"id",optionLabel:"name",class:d(["w-full",{"p-invalid":t.value.errors.taxid}])},null,8,["modelValue","options","class"])]),l("div",ie,[de,r(g,{modelValue:e.reference.isService,"onUpdate:modelValue":o[10]||(o[10]=s=>e.reference.isService=s),class:"w-full",binary:!0},null,8,["modelValue"])])])):c("",!0),l("section",null,[ue,e.reference?(n(),N(Y,{key:0,title:"Documentació",entity:"referenceMaps",id:e.reference.id},null,8,["id"])):c("",!0)])])):c("",!0)],64)}}});export{Ve as _};
