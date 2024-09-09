import{c as P,a as B,F}from"./form-validator-06627164.js";import{d as M,o as S,j as N,r as b,T as L,h,c as D,e as a,i as r,z as i,k as u,n as m,l as q,a as z,s as k}from"./index-feaddf7a.js";import{u as $}from"./plantmodel-69a487e1.js";import{u as j}from"./reference-df7bd263.js";import{R as A}from"./index-7cbe1881.js";const Y={key:0},G=a("br",null,null,-1),O={class:"two-columns-2575 mb-2"},x={class:"four-columns mb-2"},H=a("label",{class:"block text-900 mb-2"},"Tipus de màquina",-1),J=a("label",{class:"block text-900 mb-2"},"Màquina preferida",-1),K=a("label",{class:"block text-900 mb-2"},"Tipus d'operari",-1),Q={class:"four-columns mb-2"},X=a("label",{class:"block text-900 mt-1 mb-1"},"Externa",-1),Z=a("label",{class:"block text-900 mb-2"},"Servei",-1),ae=M({__name:"FormWorkmasterPhase",props:{workmaster:{},phase:{}},emits:["submit","cancel"],setup(v,{emit:V}){const s=v;S(async()=>{c.value=await C.getReferencesByModuleAndCategory("purchase",A.SERVICE)});const y=N(),p=$(),C=j(),c=b(void 0),I=L(()=>s.phase.workcenterTypeId?p.getWorkcentersByTypeId(s.phase.workcenterTypeId):[]),w=()=>{var o;s.phase.preferredWorkcenterId=null;let e=(o=p.workcenterTypes)==null?void 0:o.find(t=>t.id===s.phase.workcenterTypeId);s.phase.profitPercentage=e.profitPercentage},W=()=>{var o,t;let e=(o=p.workcenters)==null?void 0:o.find(n=>n.id===s.phase.preferredWorkcenterId);if(e.profitPercentage>0)s.phase.profitPercentage=e.profitPercentage;else{let n=(t=p.workcenterTypes)==null?void 0:t.find(f=>f.id===s.phase.workcenterTypeId);s.phase.profitPercentage=n.profitPercentage}},T=async()=>{s.phase.isExternalWork?(s.phase.operatorTypeId=null,s.phase.workcenterTypeId=null,s.phase.preferredWorkcenterId=null):(s.phase.externalWorkCost=0,s.phase.transportCost=0,s.phase.serviceReferenceId=null)},g=()=>{if(c.value){const e=c.value.find(o=>o.id===s.phase.serviceReferenceId);e&&(s.phase.externalWorkCost=e.price,s.phase.transportCost=e.transportAmount)}},E=P().shape({code:B().required("El codi és obligatori")}),d=b({result:!1,errors:{}}),R=()=>{const e=new F(E);d.value=e.validate(s.phase)},U=async()=>{if(R(),d.value.result)s.phase.preferredWorkcenterId===""&&(s.phase.preferredWorkcenterId=null),V("submit",s.phase);else{let e="";Object.entries(d.value.errors).forEach(o=>{e+=`${o[1].map(t=>t)}.   `}),y.add({severity:"warn",summary:"Formulari inválid",detail:e,life:5e3})}};return(e,o)=>{const t=h("Button"),n=h("Dropdown"),f=h("Checkbox");return e.phase?(z(),D("form",Y,[a("div",null,[r(t,{label:"Guardar Fase",class:"grid_add_row_button",size:"small",onClick:U}),G]),a("section",O,[a("div",null,[r(i,{label:"Codi de la fase",modelValue:e.phase.code,"onUpdate:modelValue":o[0]||(o[0]=l=>e.phase.code=l)},null,8,["modelValue"])]),a("div",null,[r(i,{label:"Descripció",modelValue:e.phase.description,"onUpdate:modelValue":o[1]||(o[1]=l=>e.phase.description=l)},null,8,["modelValue"])])]),a("section",x,[a("div",null,[H,r(n,{modelValue:e.phase.workcenterTypeId,"onUpdate:modelValue":o[2]||(o[2]=l=>e.phase.workcenterTypeId=l),editable:"",options:u(p).workcenterTypes,optionValue:"id",optionLabel:"name",class:m(["w-full",{"p-invalid":d.value.errors.workcenterTypeId}]),onChange:w},null,8,["modelValue","options","class"])]),a("div",null,[J,r(n,{modelValue:e.phase.preferredWorkcenterId,"onUpdate:modelValue":o[3]||(o[3]=l=>e.phase.preferredWorkcenterId=l),editable:"",options:I.value,optionValue:"id",optionLabel:"description",class:"w-full",onChange:W},null,8,["modelValue","options"])]),a("div",null,[r(i,{type:u(k).NUMERIC,minFractionDigits:2,class:"mb-2",label:"Marge de benefici",id:"profitPercentage",modelValue:e.phase.profitPercentage,"onUpdate:modelValue":o[4]||(o[4]=l=>e.phase.profitPercentage=l),suffix:"%"},null,8,["type","modelValue"])]),a("div",null,[K,r(n,{modelValue:e.phase.operatorTypeId,"onUpdate:modelValue":o[5]||(o[5]=l=>e.phase.operatorTypeId=l),editable:"",options:u(p).operatorTypes,optionValue:"id",optionLabel:"description",class:m(["w-full",{"p-invalid":d.value.errors.operatorTypeId}])},null,8,["modelValue","options","class"])])]),a("section",Q,[a("div",null,[X,r(f,{modelValue:e.phase.isExternalWork,"onUpdate:modelValue":o[6]||(o[6]=l=>e.phase.isExternalWork=l),class:"w-full",binary:!0,onChange:T},null,8,["modelValue"])]),a("div",null,[Z,r(n,{modelValue:e.phase.serviceReferenceId,"onUpdate:modelValue":o[7]||(o[7]=l=>e.phase.serviceReferenceId=l),editable:"",options:c.value,optionValue:"id",optionLabel:l=>l.code+" - "+l.description,disabled:!e.phase.isExternalWork,class:"w-full",onChange:g},null,8,["modelValue","options","optionLabel","disabled"])]),a("div",null,[r(i,{type:u(k).CURRENCY,label:"Cost servei",modelValue:e.phase.externalWorkCost,"onUpdate:modelValue":o[8]||(o[8]=l=>e.phase.externalWorkCost=l),disabled:!e.phase.isExternalWork,class:m({"p-invalid":d.value.errors.externalWorkCost})},null,8,["type","modelValue","disabled","class"])]),a("div",null,[r(i,{type:u(k).CURRENCY,label:"Cost transport",modelValue:e.phase.transportCost,"onUpdate:modelValue":o[9]||(o[9]=l=>e.phase.transportCost=l),disabled:!e.phase.isExternalWork,class:m({"p-invalid":d.value.errors.externalWorkCost})},null,8,["type","modelValue","disabled","class"])])])])):q("",!0)}}});export{ae as _};
