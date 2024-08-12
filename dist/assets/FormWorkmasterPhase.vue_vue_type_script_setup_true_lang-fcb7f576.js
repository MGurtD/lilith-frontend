import{c as U,a as B,F}from"./form-validator-6d089293.js";import{d as M,o as P,j as S,r as h,T as N,h as f,c as L,e as l,i as r,z as d,k as p,n as c,l as D,a as q,s as b}from"./index-709c40c8.js";import{u as z}from"./plantmodel-06593ba6.js";import{u as $}from"./reference-ced38a82.js";import{R as j}from"./index-7cbe1881.js";const A={key:0},Y=l("br",null,null,-1),G={class:"two-columns-2575 mb-2"},O={class:"four-columns mb-2"},x=l("label",{class:"block text-900 mb-2"},"Tipus de màquina",-1),H=l("label",{class:"block text-900 mb-2"},"Màquina preferida",-1),J=l("label",{class:"block text-900 mb-2"},"Tipus d'operari",-1),K={class:"four-columns mb-2"},Q=l("label",{class:"block text-900 mt-1 mb-1"},"Externa",-1),X=l("label",{class:"block text-900 mb-2"},"Servei",-1),le=M({__name:"FormWorkmasterPhase",props:{workmaster:{},phase:{}},emits:["submit","cancel"],setup(k,{emit:v}){const a=k;P(async()=>{u.value=await y.getReferencesByModuleAndCategory("purchase",j.SERVICE)});const V=S(),i=z(),y=$(),u=h(void 0),C=N(()=>a.phase.workcenterTypeId?i.getWorkcentersByTypeId(a.phase.workcenterTypeId):[]),I=()=>{var o;a.phase.preferredWorkcenterId=null;let e=(o=i.workcenterTypes)==null?void 0:o.find(t=>t.id===a.phase.workcenterTypeId);a.phase.profitPercentage=e.profitPercentage},w=async()=>{a.phase.isExternalWork?(a.phase.operatorTypeId=null,a.phase.workcenterTypeId=null,a.phase.preferredWorkcenterId=null):(a.phase.externalWorkCost=0,a.phase.transportCost=0,a.phase.serviceReferenceId=null)},W=()=>{if(u.value){const e=u.value.find(o=>o.id===a.phase.serviceReferenceId);e&&(a.phase.externalWorkCost=e.price,a.phase.transportCost=e.transportAmount)}},T=U().shape({code:B().required("El codi és obligatori")}),n=h({result:!1,errors:{}}),g=()=>{const e=new F(T);n.value=e.validate(a.phase)},E=async()=>{if(g(),n.value.result)a.phase.preferredWorkcenterId===""&&(a.phase.preferredWorkcenterId=null),v("submit",a.phase);else{let e="";Object.entries(n.value.errors).forEach(o=>{e+=`${o[1].map(t=>t)}.   `}),V.add({severity:"warn",summary:"Formulari inválid",detail:e,life:5e3})}};return(e,o)=>{const t=f("Button"),m=f("Dropdown"),R=f("Checkbox");return e.phase?(q(),L("form",A,[l("div",null,[r(t,{label:"Guardar Fase",class:"grid_add_row_button",size:"small",onClick:E}),Y]),l("section",G,[l("div",null,[r(d,{label:"Codi de la fase",modelValue:e.phase.code,"onUpdate:modelValue":o[0]||(o[0]=s=>e.phase.code=s)},null,8,["modelValue"])]),l("div",null,[r(d,{label:"Descripció",modelValue:e.phase.description,"onUpdate:modelValue":o[1]||(o[1]=s=>e.phase.description=s)},null,8,["modelValue"])])]),l("section",O,[l("div",null,[x,r(m,{modelValue:e.phase.workcenterTypeId,"onUpdate:modelValue":o[2]||(o[2]=s=>e.phase.workcenterTypeId=s),editable:"",options:p(i).workcenterTypes,optionValue:"id",optionLabel:"name",class:c(["w-full",{"p-invalid":n.value.errors.workcenterTypeId}]),onChange:I},null,8,["modelValue","options","class"])]),l("div",null,[r(d,{type:p(b).NUMERIC,minFractionDigits:2,class:"mb-2",label:"Marge de benefici",id:"profitPercentage",modelValue:e.phase.profitPercentage,"onUpdate:modelValue":o[3]||(o[3]=s=>e.phase.profitPercentage=s),suffix:"%"},null,8,["type","modelValue"])]),l("div",null,[H,r(m,{modelValue:e.phase.preferredWorkcenterId,"onUpdate:modelValue":o[4]||(o[4]=s=>e.phase.preferredWorkcenterId=s),editable:"",options:C.value,optionValue:"id",optionLabel:"description",class:"w-full"},null,8,["modelValue","options"])]),l("div",null,[J,r(m,{modelValue:e.phase.operatorTypeId,"onUpdate:modelValue":o[5]||(o[5]=s=>e.phase.operatorTypeId=s),editable:"",options:p(i).operatorTypes,optionValue:"id",optionLabel:"description",class:c(["w-full",{"p-invalid":n.value.errors.operatorTypeId}])},null,8,["modelValue","options","class"])])]),l("section",K,[l("div",null,[Q,r(R,{modelValue:e.phase.isExternalWork,"onUpdate:modelValue":o[6]||(o[6]=s=>e.phase.isExternalWork=s),class:"w-full",binary:!0,onChange:w},null,8,["modelValue"])]),l("div",null,[X,r(m,{modelValue:e.phase.serviceReferenceId,"onUpdate:modelValue":o[7]||(o[7]=s=>e.phase.serviceReferenceId=s),editable:"",options:u.value,optionValue:"id",optionLabel:s=>s.code+" - "+s.description,disabled:!e.phase.isExternalWork,class:"w-full",onChange:W},null,8,["modelValue","options","optionLabel","disabled"])]),l("div",null,[r(d,{type:p(b).CURRENCY,label:"Cost servei",modelValue:e.phase.externalWorkCost,"onUpdate:modelValue":o[8]||(o[8]=s=>e.phase.externalWorkCost=s),disabled:!e.phase.isExternalWork,class:c({"p-invalid":n.value.errors.externalWorkCost})},null,8,["type","modelValue","disabled","class"])]),l("div",null,[r(d,{type:p(b).CURRENCY,label:"Cost transport",modelValue:e.phase.transportCost,"onUpdate:modelValue":o[9]||(o[9]=s=>e.phase.transportCost=s),disabled:!e.phase.isExternalWork,class:c({"p-invalid":n.value.errors.externalWorkCost})},null,8,["type","modelValue","disabled","class"])])])])):D("",!0)}}});export{le as _};
